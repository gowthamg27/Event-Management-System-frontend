import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(9);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const results = events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(results);
    setCurrentPage(1);
  }, [searchTerm, events]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
      setFilteredEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Failed to fetch events. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/events/${id}`);
        if (response.status === 200) {
          setEvents(prevEvents => prevEvents.filter(event => event._id !== id));
          setFilteredEvents(prevFiltered => prevFiltered.filter(event => event._id !== id));
          alert('Event deleted successfully');
        } else {
          throw new Error('Unexpected response from server');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-event/${id}`);
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <motion.div 
      className="event-list-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="event-list-header">
        <motion.h1 initial={{ y: -50 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 300 }}>
          My Events
        </motion.h1>
        <Link to="/create-event" className="create-event-btn">
          <FaPlus /> Create Event
        </Link>
      </header>

      <motion.div 
        className="search-filter-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="search-bar">
          <FaSearch />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <AnimatePresence>
          <motion.div className="event-grid">
            {currentEvents.map((event) => (
              <motion.div
                key={event._id} 
                className="event-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3>{event.title}</h3>
                <p>{new Date(event.date).toLocaleDateString()}</p>
                <p>{event.location}</p>
                <span className={`event-status ${event.status}`}>{event.status}</span>
                <div className="event-actions">
                  <motion.button 
                    className="view-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleViewEvent(event)}
                  >
                    <FaEye /> View
                  </motion.button>
                  <motion.button 
                    className="edit-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(event._id)}
                  >
                    <FaEdit /> Edit
                  </motion.button>
                  <motion.button 
                    className="delete-btn" 
                    onClick={() => handleDelete(event._id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTrash /> Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <motion.div 
          className="event-details-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2>{selectedEvent.title}</h2>
          <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p>
          <p><strong>Location:</strong> {selectedEvent.location}</p>
          <p><strong>Description:</strong> {selectedEvent.description}</p>
          <p><strong>Status:</strong> {selectedEvent.status}</p>
          
          <h3>Ticket Information</h3>
          {selectedEvent.ticketInfo?.map((ticket, index) => (
            <div key={index}>
              <p>Range: {ticket.ticketRange}</p>
              <p>Price: ${ticket.price}</p>
              <p>Discount: {ticket.discount}%</p>
            </div>
          ))}

          <h3>FAQs</h3>
          {selectedEvent.faqFields?.map((faq, index) => (
            <div key={index}>
              <p><strong>Q:</strong> {faq.question}</p>
              <p><strong>A:</strong> {faq.answer}</p>
            </div>
          ))}

          <h3>Website Information</h3>
          {selectedEvent.websiteInfo && (
            <>
              <p><strong>Page Title:</strong> {selectedEvent.websiteInfo.pageTitle}</p>
              <p><strong>Contact Email:</strong> {selectedEvent.websiteInfo.contactInfo?.email}</p>
              <p><strong>Contact Phone:</strong> {selectedEvent.websiteInfo.contactInfo?.phone}</p>
            </>
          )}

          <button onClick={() => setSelectedEvent(null)}>Close</button>
        </motion.div>
      )}

      <motion.div className="pagination" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }).map((_, index) => (
          <motion.button 
            key={index} 
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default EventList;
