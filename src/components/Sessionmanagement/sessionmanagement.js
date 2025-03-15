import React, { useState } from 'react';
import './SessionManagement.css';

const SessionManagement = () => {
  const [view, setView] = useState('monthly');
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({
    title: '',
    date: '',
    topic: '',
    speaker: '',
    description: '',
    status: 'upcoming'
  });

  const handleViewChange = (newView) => {
    setView(newView);
  };

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

  const handleInputChange = (e) => {
    setNewSession({ ...newSession, [e.target.name]: e.target.value });
  };

  return (
    <div className="session-management">
      <header>
        <button className="back-button">Back</button>
        <h1>Session Scheduling</h1>
      </header>

      <section className="schedule-overview">
        <div className="summary-box">
          <h3>Total Sessions</h3>
          <p>{sessions.length}</p>
        </div>
        <div className="summary-box">
          <h3>Scheduled Sessions</h3>
          <p>{sessions.filter(s => s.status !== 'unscheduled').length}</p>
        </div>
        <div className="summary-box">
          <h3>Unscheduled Sessions</h3>
          <p>{sessions.filter(s => s.status === 'unscheduled').length}</p>
        </div>
      </section>

      <section className="calendar-view">
        <div className="view-controls">
          <button onClick={() => handleViewChange('monthly')} className={view === 'monthly' ? 'active' : ''}>Monthly</button>
          <button onClick={() => handleViewChange('weekly')} className={view === 'weekly' ? 'active' : ''}>Weekly</button>
          <button onClick={() => handleViewChange('daily')} className={view === 'daily' ? 'active' : ''}>Daily</button>
        </div>
        <div className="calendar">
          {/* Calendar implementation goes here */}
        </div>
      </section>

      <section className="session-list">
        <input type="text" placeholder="Search sessions" className="search-bar" />
        <div className="filter-options">
          {/* Filter options implementation goes here */}
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
                  <button>View</button>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-controls">
          {/* Pagination controls implementation goes here */}
        </div>
      </section>

      <section className="add-session">
        <h2>Add New Session</h2>
        <form onSubmit={handleAddSession}>
          <input type="text" name="title" placeholder="Session Title" value={newSession.title} onChange={handleInputChange} required />
          <input type="date" name="date" value={newSession.date} onChange={handleInputChange} required />
          <input type="text" name="topic" placeholder="Topic" value={newSession.topic} onChange={handleInputChange} required />
          <input type="text" name="speaker" placeholder="Speaker" value={newSession.speaker} onChange={handleInputChange} required />
          <textarea name="description" placeholder="Description" value={newSession.description} onChange={handleInputChange} required />
          <select name="status" value={newSession.status} onChange={handleInputChange}>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="past">Past</option>
          </select>
          <button type="submit">Add Session</button>
        </form>
      </section>

      <section className="export-reports">
        <button>Export Schedule</button>
        <button>Generate Report</button>
      </section>
    </div>
  );
};

export default SessionManagement;