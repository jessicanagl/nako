import React from 'react';
import WidgetsIcon from '@mui/icons-material/Widgets';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
      </div>
      <div className="navbar-footer">
      <button className="navbar-toggle">
          <WidgetsIcon color="info" />
        </button>
        <ul>
          <li>Einstellungen</li>
          {/* Weitere Navigationspunkte können hier hinzugefügt werden */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;


