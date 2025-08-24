import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Korrigierter Import
import Header from './components/startPage/Header';
import Footer from './components/startPage/Footer';
import MainContent from './components/startPage/MainContent';
import FileProcessingComponent from './components/actionButtons/FileProcessingComponent'; // Passe den Pfad hier an, falls sich die Datei woanders befindet

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container">
          <Routes>
            {/* Definiere die Route für MainContent */}
            <Route path="/" element={<MainContent />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

