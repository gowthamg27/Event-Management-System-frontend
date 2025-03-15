import React, { useState } from 'react';
import './LiveQAAndPolling.css';

const LiveQAAndPolling = () => {
  const [qaSessions, setQaSessions] = useState([]);
  const [polls, setPolls] = useState([]);
  const [newQA, setNewQA] = useState({ session: '', question: '', status: 'active' });
  const [newPoll, setNewPoll] = useState({ session: '', question: '', options: [], status: 'active' });

  const handleAddQA = (e) => {
    e.preventDefault();
    setQaSessions([...qaSessions, newQA]);
    setNewQA({ session: '', question: '', status: 'active' });
  };

  const handleAddPoll = (e) => {
    e.preventDefault();
    setPolls([...polls, newPoll]);
    setNewPoll({ session: '', question: '', options: [], status: 'active' });
  };

  return (
    <div className="live-qa-and-polling">
      <header>
        <button className="back-button">Back</button>
        <h1>Live Q&A and Polling</h1>
      </header>

      <section className="overview">
        <div className="summary-box">
          <h3>Total Q&A Sessions</h3>
          <p>{qaSessions.length}</p>
        </div>
        <div className="summary-box">
          <h3>Active Polls</h3>
          <p>{polls.filter(poll => poll.status === 'active').length}</p>
        </div>
        <div className="summary-box">
          <h3>Past Polls</h3>
          <p>{polls.filter(poll => poll.status === 'closed').length}</p>
        </div>
      </section>

      <section className="qa-management">
        <h2>Q&A Management</h2>
        <input type="text" placeholder="Search Q&A sessions" className="search-bar" />
        <div className="filter-options">
          {/* Filter options implementation */}
        </div>
        <table className="qa-list">
          <thead>
            <tr>
              <th>Session</th>
              <th>Question</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {qaSessions.map((qa, index) => (
              <tr key={index}>
                <td>{qa.session}</td>
                <td>{qa.question}</td>
                <td>{qa.status}</td>
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
          {/* Pagination controls implementation */}
        </div>
      </section>

      <section className="polling-management">
        <h2>Polling Management</h2>
        <input type="text" placeholder="Search polls" className="search-bar" />
        <div className="filter-options">
          {/* Filter options implementation */}
        </div>
        <table className="poll-list">
          <thead>
            <tr>
              <th>Session</th>
              <th>Poll Question</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {polls.map((poll, index) => (
              <tr key={index}>
                <td>{poll.session}</td>
                <td>{poll.question}</td>
                <td>{poll.status}</td>
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
          {/* Pagination controls implementation */}
        </div>
      </section>

      <section className="add-qa">
        <h2>Add Q&A</h2>
        <form onSubmit={handleAddQA}>
          <input
            type="text"
            placeholder="Session"
            value={newQA.session}
            onChange={(e) => setNewQA({ ...newQA, session: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Question"
            value={newQA.question}
            onChange={(e) => setNewQA({ ...newQA, question: e.target.value })}
            required
          />
          <select
            value={newQA.status}
            onChange={(e) => setNewQA({ ...newQA, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
          <button type="submit">Add Q&A</button>
        </form>
      </section>

      <section className="add-poll">
        <h2>Add Poll</h2>
        <form onSubmit={handleAddPoll}>
          <input
            type="text"
            placeholder="Session"
            value={newPoll.session}
            onChange={(e) => setNewPoll({ ...newPoll, session: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Poll Question"
            value={newPoll.question}
            onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Poll Options (comma-separated)"
            onChange={(e) => setNewPoll({ ...newPoll, options: e.target.value.split(',') })}
            required
          />
          <select
            value={newPoll.status}
            onChange={(e) => setNewPoll({ ...newPoll, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
          <button type="submit">Add Poll</button>
        </form>
      </section>

      <section className="export-reports">
        <button>Export Q&A</button>
        <button>Export Polls</button>
        <button>Generate Report</button>
      </section>
    </div>
  );
};

export default LiveQAAndPolling;