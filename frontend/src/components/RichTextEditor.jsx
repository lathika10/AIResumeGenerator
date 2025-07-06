import React, { useContext, useState } from 'react';
import {
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnBulletList,
  BtnNumberedList,
  BtnLink,
  Editor,
  EditorProvider,
  Separator,
  Toolbar
} from 'react-simple-wysiwyg';
import { AIChatSession } from '../../service/AIModal';
import './RichTextEditor.css';
import { Brain, LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '../resume/context/ResumeInfoContext';
import { toast } from 'react-toastify';

const PROMPT = 'position title: {positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array), give me result in HTML tags';

function RichTextEditor({ value, onRichTextEditorChange, index }) {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    onRichTextEditorChange(e.target.value); // ✅ Fix: extract HTML string
  };

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo.experience[index].title) {
      toast('Please Add Position Title');
      setLoading(false);
      return;
    }

    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const text = await result.response.text();
      const cleanedText = text.replace('[', '').replace(']', '');

      onRichTextEditorChange(cleanedText); // ✅ Fix: just send HTML string
    } catch (error) {
      toast.error('Failed to generate summary');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="rich-text-editor-container">
      {/* <div>
        <button onClick={GenerateSummeryFromAI} disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : <><Brain /> Generate from AI</>}
        </button>
      </div> */}
      <EditorProvider>
        <Editor
          value={value}
          onChange={handleChange}
          containerProps={{ className: 'editor-container' }}
        >
          <Toolbar className="editor-toolbar">
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
