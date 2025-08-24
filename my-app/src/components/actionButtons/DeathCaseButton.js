import React, { useState } from 'react';
import Modal from "../../components/Modal";

function DeathCaseButton() {
  const [activeForm, setActiveForm] = useState(null);
  const [formData, setFormData] = useState({
    nachname: "",
    vorname: "",
    sterbedatum: "",
    sterbeort: "",
    kommentar: ""
  });

  const closeModal = () => setActiveForm(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/add-deathcase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Fehler beim Speichern");
      alert("✅ Daten erfolgreich gespeichert!");
      closeModal();
    } catch (error) {
      console.error("❌ Fehler:", error);
      alert("❌ Fehler beim Speichern");
    }
  };

  return (
    <div>
      <button
        className="action-button"
        role="action-button"
        onClick={() => setActiveForm("death")}
      >
        Todesfälle nacherfassen
      </button>

      <Modal show={!!activeForm} onClose={closeModal}>
        {activeForm === "death" && (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "10px" }}>
              <label>Nachname: </label>
              <input
                type="text"
                name="nachname"
                value={formData.nachname}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Vorname: </label>
              <input
                type="text"
                name="vorname"
                value={formData.vorname}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Sterbedatum: </label>
              <input
                type="date"
                name="sterbedatum"
                value={formData.sterbedatum}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Sterbeort: </label>
              <input
                type="text"
                name="sterbeort"
                value={formData.sterbeort}
                onChange={handleChange}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Kommentar: </label>
              <input
                type="text"
                name="kommentar"
                value={formData.kommentar}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Absenden</button>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default DeathCaseButton;

