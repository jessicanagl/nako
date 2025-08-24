import React from "react";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
    }}>
      <div style={{
        background: "#fff", padding: "24px", borderRadius: "8px", minWidth: "320px", maxWidth: "90vw", boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
      }}>
        {children}
        <div style={{ textAlign: "right", marginTop: "16px" }}>
          <button onClick={onClose}>Schließen</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
