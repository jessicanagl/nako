import React, { useState, useEffect } from 'react';
import ReturnFileButton from './ReturnFileButton';
import CSVButton from './CSVButton';

function FileProcessingComponent() {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    console.log("Ausgewählte Datei: ", selectedFile);  // Ausgabe der Datei im State
  }, [selectedFile]);

  return (
    <div>
      <ReturnFileButton onFileSelect={(file) => setSelectedFile(file)} />
      <CSVButton file={selectedFile} />
    </div>
  );
}

export default FileProcessingComponent;