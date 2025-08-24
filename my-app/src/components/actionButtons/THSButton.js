import React, { useState, useEffect } from 'react';
import './Notification.css';

function THSButton(){
  const [showNotification, setShowNotification] = useState(false);

  const generateXml = () => {
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').split('.')[0];

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<dataroot generated="${now.toISOString()}" xmlns:od="urn:schemas-microsoft-com:officedata">
  <V4_an_THS>
    <timestamp_creation>${timestamp}</timestamp_creation>
    <function>VITALSTATUS_RESPONSE</function>
    <aktenzeichen>622556815</aktenzeichen>
    <participants_prevname_date_day>31</participants_prevname_date_day>
    <participants_prevname_date_month>3</participants_prevname_date_month>
    <participants_prevname_date_year>2018</participants_prevname_date_year>
    <participants_birth_day>1</participants_birth_day>
    <participants_birth_month>1</participants_birth_month>
    <participants_birth_year>1983</participants_birth_year>
    <deceased_state_dbev>0</deceased_state_dbev>
    <previousaddress_zip></previousaddress_zip>
    <previousaddress_habitation></previousaddress_habitation>
    <previousaddress_street></previousaddress_street>
    <previousaddress_no></previousaddress_no>
    <previousaddress_no_add></previousaddress_no_add>
    <previousaddress_addition></previousaddress_addition>
    <deceased>0</deceased>
    <result_state>1</result_state>
    <address_state>1</address_state>
    <date_of_result>2018-03-31T00:00:00</date_of_result>
    <commentary></commentary>
  </V4_an_THS>
</dataroot>`;

    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'V4_an_THS.xml';
    a.click();
    URL.revokeObjectURL(url);

    setShowNotification(true);
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <div>
      {showNotification && (
        <div className="notification">
          <div className="notification-content">
            🎉 XML-Datei erfolgreich erstellt!
            <div className="progress-bar"></div>
          </div>
        </div>
      )}
      <button className="action-button"
        role="action-button"
        onClick={generateXml}>Daten für THS vorbereiten</button>
    </div>
  );
}

export default THSButton;