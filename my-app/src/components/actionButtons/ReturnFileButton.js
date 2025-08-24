import React, { useState } from 'react';

function ReturnFileButton() {
  const [fileName, setFileName] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const formData = new FormData();
    formData.append('csvfile', file);

    try {
      const res = await fetch('http://localhost:3001/api/import-csv', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error('Fehler beim Import der CSV-Daten');
      }

      const message = await res.text();
      alert(`✅ ${message}`);
    } catch (err) {
      console.error('❌ Importfehler:', err);
      alert('Fehler beim CSV-Import: ' + err.message);
    }
  };

  const triggerFileDialog = () => {
    document.getElementById('csvInput').click();
  };

  return (
    <div>
      <button className="action-button" onClick={triggerFileDialog}>
        Rückläuferdatei einlesen
      </button>
      <input
        type="file"
        id="csvInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".csv"
      />
    </div>
  );
}

export default ReturnFileButton;

