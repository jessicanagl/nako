import React, { useState } from 'react';

function CSVButton() {
  const handleClick = () => {
    const link = document.createElement('a');
    link.href = '/V3.csv';  // Der Pfad zur Datei im public-Ordner
    link.download = 'data.csv';  // Der Name der Datei, die heruntergeladen wird
    document.body.appendChild(link); // Füge den Link zum DOM hinzu
    link.click(); // Klicke auf den Link
    document.body.removeChild(link); // Entferne den Link wieder
  };

  return (
    <button className="action-button" onClick={handleClick}>
      CSV-Datei erstellen
    </button>
  );
}

export default CSVButton;

