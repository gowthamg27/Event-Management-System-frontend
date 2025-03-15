import React, { useState } from 'react';
import './ExhibitorPage.css';

const SponsorsExhibitorPage = () => {
  const [activePortals, setActivePortals] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [portals, setPortals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterType = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterStatus = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleAddPortal = () => {
    // Implement add portal functionality
  };

  const handleExportPortals = () => {
    // Implement export portals functionality
  };

  const handleGenerateReport = () => {
    // Implement generate report functionality
  };

  return (
    <div className="sponsors-exhibitor-page">
      <header>
        <button className="back-button">Back</button>
        <h1>Sponsor/Exhibitor Portals</h1>
      </header>

      <section className="portal-overview">
        <div className="summary-box">
          <h2>Total Active Portals</h2>
          <p>{activePortals}</p>
        </div>
        <div className="summary-box">
          <h2>Pending Approvals</h2>
          <p>{pendingApprovals}</p>
        </div>
      </section>

      <section className="portal-list">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search portals..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <select value={filterType} onChange={handleFilterType}>
            <option value="all">All Types</option>
            <option value="sponsor">Sponsor</option>
            <option value="exhibitor">Exhibitor</option>
          </select>
          <select value={filterStatus} onChange={handleFilterStatus}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <table className="portals-table">
          <thead>
            <tr>
              <th>Portal Name</th>
              <th>Type</th>
              <th>Contact Information</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through filtered portals and render rows */}
          </tbody>
        </table>

        <div className="pagination">
          {/* Add pagination controls */}
        </div>
      </section>

      <section className="portal-details">
        <button className="view-details">View Portal Details</button>
        <button className="edit-portal">Edit Portal</button>
        <button className="approve-reject">Approve/Reject</button>
      </section>

      <section className="add-portal">
        <h2>Add New Portal</h2>
        <form>
          {/* Add form fields for new portal */}
          <button onClick={handleAddPortal}>Add Portal</button>
        </form>
      </section>

      <section className="export-reports">
        <button onClick={handleExportPortals}>Export Portals</button>
        <button onClick={handleGenerateReport}>Generate Report</button>
      </section>
    </div>
  );
};

export default SponsorsExhibitorPage;