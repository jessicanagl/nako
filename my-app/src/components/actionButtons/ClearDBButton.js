import React from 'react';
import { useNavigate } from 'react-router-dom';

function ClearDBButton() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const confirmation = window.confirm("Möchten Sie wirklich die Datenbank löschen und den aktuellen Vorgang beenden?");

    if (confirmation) {
      try {
        // API-Aufruf zum Backend
        const response = await fetch('http://localhost:3001/api/clear-database', {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Fehler beim Löschen der Datenbank.');

        // localStorage leeren
        localStorage.clear();

        alert("Datenbank und lokale Daten wurden erfolgreich geleert.");
        window.location.reload();
      } catch (error) {
        alert("Fehler beim Leeren der Datenbank: " + error.message);
      }
    }
  };

  return (
    <button className="action-button" role="action-button" onClick={handleClick}>
      Datenbank leeren
    </button>
  );
}

export default ClearDBButton;

