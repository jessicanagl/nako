import React, { useState } from 'react';
import ReturnFileButton from './ReturnFileButton';
import StatsButtonContainer from './StatsButton';

function FileHandler() {
    const [csvFile, setCsvFile] = useState(null); 


    return (
        <div>
            <ReturnFileButton setCsvFile={setCsvFile} /> 
            <StatsButtonContainer csvFile={csvFile} />
        </div>
    );
}

export default FileHandler;

