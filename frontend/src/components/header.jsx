import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { UserButton, useUser } from '@clerk/clerk-react';

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="header-container">
      <img src="/logo.svg" alt="Logo" className="header-logo" />

      {isSignedIn ? (
        <div className="header-right">
          <Link to={'/pages/dashboard'}>
          <Button className="dashboard-btn">
            Dashboard
          </Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={'/pages/signin'}>
          <button className="get-started-btn">Get Started</button>
        </Link>
      )}
    </div>
  );
}

export default Header;
