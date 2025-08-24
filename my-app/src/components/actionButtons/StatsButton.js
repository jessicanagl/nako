import React, { useState, useEffect } from 'react';
import StatusButton from '../startPage/StatusButton';
import jsPDF from 'jspdf';
import Papa from 'papaparse';

function StatsButtonContainer({ csvFile }) {
    const [showButtons, setShowButtons] = useState(true);
    const [csvData, setCsvData] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (result) => {
                    const data = result.data;

                    const headers = Object.keys(data[0]);
                    const participantIndex = headers.indexOf('Aktenzeichen');
                    const genderIndex = headers.indexOf('Geschlecht');
                    const firstNameIndex = headers.indexOf('auskunft vorname');
                    const lastNameIndex = headers.indexOf('auskunft nachname');
                    const deceasedIndex = headers.indexOf('auskunft sterbedatum');
                    const newAddressIndex = headers.indexOf('adressstatus');

                    if (participantIndex === -1 || genderIndex === -1 || firstNameIndex === -1 || lastNameIndex === -1 || deceasedIndex === -1 || newAddressIndex === -1) {
                        alert('CSV-Daten enthalten keine erforderlichen Spalten.');
                        return;
                    }

                    setCsvData(data);
                },
                error: (error) => {
                    alert('Fehler beim Einlesen der CSV-Datei: ' + error.message);
                }
            });
        }
    };

    const handleClick = () => {
        if (!csvData.length) {
            alert('Bitte wählen Sie zuerst eine CSV-Datei aus.');
            return;
        }

        const participantCount = csvData.length;
        let maleCount = 0;
        let femaleCount = 0;
        let filledFirstNameCount = 0;
        let filledLastNameCount = 0;
        let deceasedCount = 0;
        let newAddressCount = 0; 

        csvData.forEach(row => {
            if (row['Geschlecht'] === 'm') {
                maleCount++;
            } else if (row['Geschlecht'] === 'w') {
                femaleCount++;
            }
            if (row['auskunft vorname'] && row['auskunft vorname'].trim() !== '') {
                filledFirstNameCount++;
            }
            if (row['auskunft nachname'] && row['auskunft nachname'].trim() !== '') {
                filledLastNameCount++;
            }
            if (row['auskunft sterbedatum'] && row['auskunft sterbedatum'].trim() !== '') {
                deceasedCount++;
            }
            if (row['adressstatus'] === '2') {
                newAddressCount++;
            }
        });

        const now = new Date();
        const dateStr = now.toLocaleDateString();
        const timeStr = now.toLocaleTimeString();

        const doc = new jsPDF();

        const maxWidth = 180;
        const title = 'Bericht über das Einlesen der Daten vom Adressdienstleister';
        const titleText = doc.splitTextToSize(title, maxWidth);

        doc.setFontSize(16);
        doc.text(titleText, 10, 10);
        doc.setFontSize(12);
        doc.text(`Erstellt am ${dateStr} um ${timeStr}`, 10, 20 + (titleText.length - 1) * 10);

        const startingYPosition = 40 + (titleText.length - 1) * 10;

        const participantText = doc.splitTextToSize(`Sätze gesamt: ${participantCount}`, maxWidth);
        const maleText = doc.splitTextToSize(`Davon männlich: ${maleCount}`, maxWidth);
        const femaleText = doc.splitTextToSize(`Davon weiblich: ${femaleCount}`, maxWidth);
        const deceasedText = doc.splitTextToSize(`Verstorben: ${deceasedCount}`, maxWidth);
        const firstNameText = doc.splitTextToSize(`Geänderter Vorname: ${filledFirstNameCount}`, maxWidth);
        const lastNameText = doc.splitTextToSize(`Geänderter Nachname: ${filledLastNameCount}`, maxWidth);
        const newAddressText = doc.splitTextToSize(`Verzogen: ${newAddressCount}`, maxWidth);

        const participantY = startingYPosition;
        const maleY = participantY + 10;
        const femaleY = maleY + 10;
        const firstNameY = femaleY + 10;
        const lastNameY = firstNameY + 10;
        const deceasedY = lastNameY + 10;
        const newAddressY = deceasedY + 10;

        doc.text(participantText, 10, participantY);
        doc.text(maleText, 10, maleY);
        doc.text(femaleText, 10, femaleY);
        doc.text(firstNameText, 10, firstNameY);
        doc.text(lastNameText, 10, lastNameY);
        doc.text(deceasedText, 10, deceasedY);
        doc.text(newAddressText, 10, newAddressY);

        const rectPadding = 2;
        const rectHeight = 8;
        doc.rect(8, participantY - 6, maxWidth, rectHeight + rectPadding);
        doc.rect(8, maleY - 6, maxWidth, rectHeight + rectPadding);
        doc.rect(8, femaleY - 6, maxWidth, rectHeight + rectPadding);
        doc.rect(8, firstNameY - 6, maxWidth, rectHeight + rectPadding);
        doc.rect(8, lastNameY - 6, maxWidth, rectHeight + rectPadding);
        doc.rect(8, deceasedY - 6, maxWidth, rectHeight + rectPadding);
        doc.rect(8, newAddressY - 6, maxWidth, rectHeight + rectPadding);

        window.open(doc.output('bloburl'), '_blank');

    };

    return (
        <div>
            {showButtons && (
                <div>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                    />
                    <button className="action-button" role="action-button" onClick={handleClick}>
                        Statistik anzeigen
                    </button>
                </div>
            )}
        </div>
    );
}

export default StatsButtonContainer;
