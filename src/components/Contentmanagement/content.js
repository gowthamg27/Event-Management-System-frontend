import React, { useState } from 'react';
import './ContentManagement.css';

const ContentManagement = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({
    title: '',
    date: '',
    topic: '',
    speaker: '',
    description: '',
    status: 'upcoming'
  });

  const handleAddSession = (e) => {
    e.preventDefault();
    setSessions([...sessions, newSession]);
    setNewSession({
      title: '',
      date: '',
      topic: '',
      speaker: '',
      description: '',
      status: 'upcoming'
    });
  };

  return (
    <div className="content-management">
      <header>
        <button className="back-button">Back</button>
        <h1>Content Management</h1>
      </header>

      <section className="content-overview">
        <div className="summary-box">
          <h3>Total Sessions</h3>
          <p>{sessions.length}</p>
        </div>
        <div className="summary-box">
          <h3>Upcoming Sessions</h3>
          <p>{sessions.filter(session => session.status === 'upcoming').length}</p>
        </div>
        <div className="summary-box">
          <h3>Past Sessions</h3>
          <p>{sessions.filter(session => session.status === 'past').length}</p>
        </div>
      </section>

      <section className="content-list">
        <input type="text" placeholder="Search sessions" className="search-bar" />
        <div className="filter-options">
          {/* Filter options implementation */}
        </div>
        <table className="sessions-table">
          <thead>
            <tr>
              <th>Session Title</th>
              <th>Date</th>
              <th>Topic</th>
              <th>Speaker</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
              <tr key={index}>
                <td>{session.title}</td>
                <td>{session.date}</td>
                <td>{session.topic}</td>
                <td>{session.speaker}</td>
                <td>{session.status}</td>
                <td>
                  <button className="view-button">View</button>
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-controls">
          {/* Pagination controls implementation */}
        </div>
      </section>

      <section className="add-session">
        <h2>Add New Session</h2>
        <form onSubmit={handleAddSession}>
          <input
            type="text"
            placeholder="Session Title"
            value={newSession.title}
            onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
            required
          />
          <input
            type="date"
            value={newSession.date}
            onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Topic"
            value={newSession.topic}
            onChange={(e) => setNewSession({ ...newSession, topic: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Speaker"
            value={newSession.speaker}
            onChange={(e) => setNewSession({ ...newSession, speaker: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={newSession.description}
            onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
            required
          />
          <select
            value={newSession.status}
            onChange={(e) => setNewSession({ ...newSession, status: e.target.value })}
          >
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="past">Past</option>
          </select>
          <button type="submit">Add Session</button>
        </form>
      </section>

      <section className="export-reports">
        <button className="export-button">Export Sessions</button>
        <button className="report-button">Generate Report</button>
      </section>
    </div>
  );
};

export default ContentManagement;