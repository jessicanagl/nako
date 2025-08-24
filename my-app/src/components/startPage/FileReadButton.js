import React, { useState, useEffect } from 'react';
import CSVButton from '../../components/actionButtons/CSVButton';
import ContentButton from '../../components/actionButtons/ContentButton';
import ClearDBButton from '../../components/actionButtons/ClearDBButton';
import DeathCaseButton from '../../components/actionButtons/DeathCaseButton';
import ReturnFileButton from '../../components/actionButtons/ReturnFileButton';
import StatsButton from '../../components/actionButtons/StatsButton';
import THSButton from '../../components/actionButtons/THSButton';
import TableContent from '../../components/actionButtons/TableContent';
import { parseXML } from '../../components/actionButtons/TableContent';

function FileReadButton({ onFileRead }) {
  const [fileName, setFileName] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedXML = localStorage.getItem('xmlData');
    const storedFileName = localStorage.getItem('fileName');

    if (storedXML && storedFileName) {
      const parsedData = parseXML(storedXML);
      setData(parsedData);
      setFileName(storedFileName);
      setShowButtons(true);
    }
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      if (!file.name.endsWith('.xml')) {
        alert("Bitte wählen Sie eine .xml-Datei aus.");
        return;
      }

      setFileName(`${file.name} eingelesen`);
      setShowButtons(true);
      onFileRead();

      const reader = new FileReader();
      reader.onload = async (e) => {
        const xmlContent = e.target.result;
        const parsedData = parseXML(xmlContent);
        setData(parsedData);

        // XML-Daten im localStorage speichern
        localStorage.setItem('xmlData', xmlContent);
        localStorage.setItem('fileName', file.name);

        // 📤 Datei über FormData senden
        try {
          const formData = new FormData();
          formData.append('xmlfile', file);

          const response = await fetch('http://localhost:3001/api/import-xml', {
            method: 'POST',
            body: formData
          });

          if (!response.ok) {
            throw new Error('Fehler beim Import der Personendaten.');
          }

          alert('🎉 Daten erfolgreich in die Datenbank übertragen!');
        } catch (error) {
          console.error('Importfehler:', error);
          alert('❌ Import fehlgeschlagen: ' + error.message);
        }
      };

      reader.readAsText(file);
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleContentButtonClick = () => {
    setShowButtons(false);
    setShowTable(true);
  };

  return (
    <div>
      {!showButtons ? (
        <button className="action-button" onClick={handleClick}>
          Datei einlesen
        </button>
      ) : (
        <div id="my-grid">
          <div id="statusanzeige">
            <h2>Statusanzeige: {fileName || 'Keine Datei eingelesen'}</h2>
          </div>
          <div className="button-container">
            <CSVButton />
            <ContentButton onClick={handleContentButtonClick} />
            <ReturnFileButton />
            <DeathCaseButton />
            <StatsButton />
            <THSButton />
            <ClearDBButton />
          </div>
        </div>
      )}

      {showTable && (
        <div style={{ overflowX: 'auto' }}>
          <TableContent data={data} />
        </div>
      )}

      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".xml"
      />
    </div>
  );
}

export default FileReadButton;


