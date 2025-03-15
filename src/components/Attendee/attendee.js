import React, { useState } from 'react';
import { Search, Filter, Eye, Edit2, Trash2, UserPlus, CheckSquare, FileText, BarChart2 } from 'lucide-react';
import './AttendeeManagement.css';

const AttendeeManagement = () => {
  const [attendees, setAttendees] = useState([
    { id: 1, name: 'John Doe', registrationDate: '2024-05-01', ticketType: 'VIP', checkedIn: true },
    { id: 2, name: 'Jane Smith', registrationDate: '2024-05-02', ticketType: 'Regular', checkedIn: false },
  ]);

  const [selectedAttendee, setSelectedAttendee] = useState(null);

  const handleCheckIn = (id) => {
    setAttendees(attendees.map(attendee =>
      attendee.id === id ? { ...attendee, checkedIn: true } : attendee
    ));
  };

  const handleBack = () => {
    // Implement the back action logic, e.g., routing to the previous page
    console.log("Back button clicked");
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 min-h-screen">
      <header className="flex items-center mb-6">
        <button
          onClick={handleBack}
          className="mr-4 p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded">
          Back
        </button>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Attendee Management
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="shadow-lg p-4 rounded bg-white">
          <h3>Total Attendees</h3>
          <p className="text-3xl font-bold">{attendees.length}</p>
        </div>
        <div className="shadow-lg p-4 rounded bg-white">
          <h3>Checked-In</h3>
          <p className="text-3xl font-bold">{attendees.filter(a => a.checkedIn).length}</p>
        </div>
        <div className="shadow-lg p-4 rounded bg-white">
          <h3>Not Checked-In</h3>
          <p className="text-3xl font-bold">{attendees.filter(a => !a.checkedIn).length}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search attendees..."
            className="border border-gray-300 rounded p-2 mr-2"
          />
          <button className="p-2 flex items-center bg-gray-200 rounded">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
        <button className="p-2 flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Attendee
        </button>
      </div>

      <div className="shadow-lg p-4 rounded bg-white mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Registration Date</th>
              <th className="p-2">Ticket Type</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr key={attendee.id} className="hover:bg-gray-100">
                <td className="p-2">{attendee.name}</td>
                <td className="p-2">{attendee.registrationDate}</td>
                <td className="p-2">{attendee.ticketType}</td>
                <td className="p-2">
                  {attendee.checkedIn ? (
                    <span className="text-green-600 font-semibold">Checked-In</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Not Checked-In</span>
                  )}
                </td>
                <td className="p-2">
                  <div className="flex space-x-2">
                    <button className="p-2">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    {!attendee.checkedIn && (
                      <button className="p-2 text-green-600" onClick={() => handleCheckIn(attendee.id)}>
                        <CheckSquare className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between">
        <button className="p-2 border rounded flex items-center">
          <FileText className="h-4 w-4 mr-2" />
          Export Attendee List
        </button>
        <button className="p-2 border rounded flex items-center">
          <BarChart2 className="h-4 w-4 mr-2" />
          Generate Attendance Report
        </button>
      </div>

      {selectedAttendee && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded">
          <h2 className="text-xl font-bold mb-2">Attendee Details</h2>
          <p><strong>Name:</strong> {selectedAttendee.name}</p>
          <p><strong>Registration Date:</strong> {selectedAttendee.registrationDate}</p>
          <p><strong>Ticket Type:</strong> {selectedAttendee.ticketType}</p>
          <p><strong>Status:</strong> {selectedAttendee.checkedIn ? 'Checked-In' : 'Not Checked-In'}</p>
          <button className="mt-4 p-2 bg-gray-200 rounded" onClick={() => setSelectedAttendee(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AttendeeManagement;
