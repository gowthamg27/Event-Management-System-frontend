import React, { useState } from 'react';
import './BoothPlacement.css';

const BoothPlacement = () => {
  const [booths, setBooths] = useState([]);
  const [selectedBooth, setSelectedBooth] = useState(null);

  const handleAddBooth = () => {
    // Logic to add a new booth
  };

  const handleEditBooth = (booth) => {
    // Logic to edit a booth
  };

  const handleRemoveBooth = (boothId) => {
    // Logic to remove a booth
  };

  const handleSaveLayout = () => {
    // Logic to save the current layout
  };

  const handleExportLayout = () => {
    // Logic to export the layout
  };

  const handleGenerateReport = () => {
    // Logic to generate a report
  };

  return (
    <div className="booth-placement">
      <header>
        <button className="back-button">Back</button>
        <h1>Booth Placement</h1>
      </header>

      <section className="floor-plan-overview">
        <div className="current-layout">
          {/* Floor plan display */}
        </div>
        <div className="zoom-controls">
          <button>Zoom In</button>
          <button>Zoom Out</button>
        </div>
        <div className="legend">
          {/* Legend items */}
        </div>
      </section>

      <section className="booth-management">
        <div className="search-filter">
          <input type="text" placeholder="Search booths" />
          <select>
            <option>Filter by Sponsor</option>
          </select>
          <select>
            <option>Filter by Booth Type</option>
          </select>
        </div>
        <button className="add-booth" onClick={handleAddBooth}>Add Booth</button>
        <table className="booth-list">
          <thead>
            <tr>
              <th>Booth Number</th>
              <th>Sponsor/Exhibitor Name</th>
              <th>Booth Type</th>
              <th>Booth Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {booths.map(booth => (
              <tr key={booth.id}>
                <td>{booth.number}</td>
                <td>{booth.sponsor}</td>
                <td>{booth.type}</td>
                <td>{booth.size}</td>
                <td>
                  <button onClick={() => handleEditBooth(booth)}>Edit</button>
                  <button onClick={() => handleRemoveBooth(booth.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="booth-details">
        {selectedBooth && (
          <>
            <h2>Booth Details</h2>
            <p>Booth Number: {selectedBooth.number}</p>
            <p>Sponsor/Exhibitor: {selectedBooth.sponsor}</p>
            <p>Booth Type: {selectedBooth.type}</p>
            <p>Booth Size: {selectedBooth.size}</p>
            <button onClick={() => handleEditBooth(selectedBooth)}>Edit Booth</button>
            <button onClick={() => handleRemoveBooth(selectedBooth.id)}>Remove Booth</button>
          </>
        )}
      </section>

      <section className="drag-drop-tool">
        <div className="interactive-floor-plan">
          {/* Interactive floor plan for drag and drop */}
        </div>
        <button onClick={handleSaveLayout}>Save Layout</button>
      </section>

      <section className="export-reports">
        <button onClick={handleExportLayout}>Export Layout</button>
        <button onClick={handleGenerateReport}>Generate Report</button>
      </section>
    </div>
  );
};

export default BoothPlacement;