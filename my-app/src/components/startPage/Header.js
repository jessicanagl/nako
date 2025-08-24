import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <a href="/" className="logo-link">
          <FontAwesomeIcon icon={faHome} className="home-icon" />
        </a>
      </div>
      <h1 className="title">Kompetenzzentrum Mortalitäts-Follow-Up Vitalitätsstatusprüfung</h1>
    </header>
  );
}

export default Header;

