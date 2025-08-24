import React from 'react';

function ContentButton({ onClick }) {
  return (
    <button className="action-button" onClick={onClick}>
      Eingelesene Datei anzeigen
    </button>
  );
}

export default ContentButton;
