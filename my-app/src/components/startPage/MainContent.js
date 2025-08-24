import React, { useState, useEffect } from 'react';
import FileReadButton from './FileReadButton';
import StatusButton from '../startPage/StatusButton';

function MainContent() {
  const [showStatusButton, setShowStatusButton] = useState(true);

  useEffect(() => {
    // Prüfen, ob bereits eine Datei im localStorage vorhanden ist
    const storedXML = localStorage.getItem('xmlData');
    
    if (storedXML) {
      setShowStatusButton(false);
    }
  }, []);

  const handleFileRead = () => {
    setShowStatusButton(false);
  };

  return (
    <div className="main-content">
      {showStatusButton && <StatusButton />}
      <FileReadButton onFileRead={handleFileRead} />
    </div>
  );
}

export default MainContent;

