import React, { useState } from 'react';

function StatusDisplay({ fileName }) {
  return (
    <div id="status-display">
      <h2>Statusanzeige: {fileName}</h2>
    </div>
  );
}
 export default StatusDisplay;