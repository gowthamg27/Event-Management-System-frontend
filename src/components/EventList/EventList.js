
// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
// import './EventList.css';
// import { EventContext } from '../context/EventContext';

// const EventList = () => {
//   const { events, removeEvent } = useContext(EventContext);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [eventsPerPage] = useState(9);
//   const [filterDate, setFilterDate] = useState('');
//   const [filterLocation, setFilterLocation] = useState('');
//   const [filterStatus, setFilterStatus] = useState('');
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [associatedSponsors, setAssociatedSponsors] = useState([]);

//   useEffect(() => {
//     // Filtering logic
//     const results = events.filter(event =>
//       event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (filterDate ? event.date === filterDate : true) &&
//       (filterLocation ? event.location.toLowerCase().includes(filterLocation.toLowerCase()) : true) &&
//       (filterStatus ? event.status === filterStatus : true)
//     );
//     setFilteredEvents(results);
//     setCurrentPage(1); // Reset to the first page after filtering
//   }, [searchTerm, filterDate, filterLocation, filterStatus, events]);

//   // Pagination logic
//   const indexOfLastEvent = currentPage * eventsPerPage;
//   const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
//   const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this event?')) {
//       removeEvent(id);
//     }
//   };

//   const handleViewEvent = async (event) => {
//     setSelectedEvent(event);
//     // Fetch associated sponsors
//     try {
//       const response = await fetch(`/api/sponsors?eventName=${event.title}`);
//       const sponsors = await response.json();
//       setAssociatedSponsors(sponsors);
//     } catch (error) {
//       console.error("Error fetching associated sponsors:", error);
//       setAssociatedSponsors([]);
//     }
//   };

//   return (
//     <motion.div 
//       className="event-list-container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <header className="event-list-header">
//         <motion.h1
//           initial={{ y: -50 }}
//           animate={{ y: 0 }}
//           transition={{ type: 'spring', stiffness: 300 }}
//         >
//           My Events
//         </motion.h1>
//         <Link to="/create-event" className="create-event-btn">
//           <FaPlus /> Create Event
//         </Link>
//       </header>

//       <motion.div 
//         className="search-filter-container"
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <div className="search-bar">
//           <FaSearch />
//           <input 
//             type="text" 
//             placeholder="Search events..." 
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         {/* Add date, location, and status filter inputs here if needed */}
//       </motion.div>

//       <AnimatePresence>
//         <motion.div className="event-grid">
//           {currentEvents.map((event) => (
//             <motion.div
//               key={event.id} 
//               className="event-card"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               transition={{ duration: 0.3 }}
//               whileHover={{ scale: 1.05 }}
//             >
//               <h3>{event.title}</h3>
//               <p>{event.date}</p>
//               <p>{event.location}</p>
//               <span className={`event-status ${event.status}`}>{event.status}</span>
//               <div className="event-actions">
//                 <motion.button 
//                   className="view-btn"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => handleViewEvent(event)}
//                 >
//                   <FaEye /> View
//                 </motion.button>
//                 <motion.button 
//                   className="edit-btn"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <FaEdit /> Edit
//                 </motion.button>
//                 <motion.button 
//                   className="delete-btn" 
//                   onClick={() => handleDelete(event.id)}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <FaTrash /> Delete
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </AnimatePresence>

//       {/* Event Details Modal */}
//       {selectedEvent && (
//         <motion.div 
//           className="event-details-modal"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <h2>{selectedEvent.title}</h2>
//           <p><strong>Date:</strong> {selectedEvent.date}</p>
//           <p><strong>Location:</strong> {selectedEvent.location}</p>
//           <p><strong>Status:</strong> {selectedEvent.status}</p>
//           <h3>Associated Sponsors</h3>
//           {associatedSponsors.length > 0 ? (
//             <ul>
//               {associatedSponsors.map(sponsor => (
//                 <li key={sponsor._id}>
//                   {sponsor.name} - {sponsor.category}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No associated sponsors found.</p>
//           )}
//           <button onClick={() => setSelectedEvent(null)}>Close</button>
//         </motion.div>
//       )}

//       <motion.div 
//         className="pagination"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//       >
//         {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }).map((_, index) => (
//           <motion.button 
//             key={index} 
//             onClick={() => paginate(index + 1)}
//             className={currentPage === index + 1 ? 'active' : ''}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             {index + 1}
//           </motion.button>
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default EventList;
















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const EventList = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/events');
//         setEvents(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch events. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   if (loading) return <div>Loading events...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="event-list">
//       <h1>Events</h1>
//       {events.length === 0 ? (
//         <p>No events found.</p>
//       ) : (
//         <ul>
//           {events.map((event) => (
//             <li key={event._id}>
//               <h2>{event.title}</h2>
//               <p>Date: {new Date(event.date).toLocaleDateString()}</p>
//               <p>Location: {event.location}</p>
//               <Link to={`/events/${event._id}`}>View Details</Link>
//             </li>
//           ))}
//         </ul>
//       )}
//       <Link to="../Registration/registration.js">Create New Event</Link>
//     </div>
//   );
// };

// export default EventList;

















// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
// import axios from 'axios';
// import './EventList.css';
// import { EventContext } from '../context/EventContext';

// const EventList = () => {
//   const { events, removeEvent } = useContext(EventContext);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [eventsPerPage] = useState(9);
//   const [filterDate, setFilterDate] = useState('');
//   const [filterLocation, setFilterLocation] = useState('');
//   const [filterStatus, setFilterStatus] = useState('');
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [associatedSponsors, setAssociatedSponsors] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/events');
//         setFilteredEvents(response.data);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     // Filtering logic
//     const results = events.filter(event =>
//       event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (filterDate ? event.date === filterDate : true) &&
//       (filterLocation ? event.location.toLowerCase().includes(filterLocation.toLowerCase()) : true) &&
//       (filterStatus ? event.status === filterStatus : true)
//     );
//     setFilteredEvents(results);
//     setCurrentPage(1); // Reset to the first page after filtering
//   }, [searchTerm, filterDate, filterLocation, filterStatus, events]);

//   // Pagination logic
//   const indexOfLastEvent = currentPage * eventsPerPage;
//   const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
//   const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this event?')) {
//       try {
//         await axios.delete(`http://localhost:5000/api/events/${id}`);
//         removeEvent(id);
//       } catch (error) {
//         console.error('Error deleting event:', error);
//       }
//     }
//   };

//   const handleViewEvent = async (event) => {
//     setSelectedEvent(event);
//     try {
//       const response = await axios.get(`http://localhost:5000/api/sponsors?eventName=${event.title}`);
//       setAssociatedSponsors(response.data);
//     } catch (error) {
//       console.error("Error fetching associated sponsors:", error);
//       setAssociatedSponsors([]);
//     }
//   };

//   return (
//     <motion.div 
//       className="event-list-container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <header className="event-list-header">
//         <motion.h1
//           initial={{ y: -50 }}
//           animate={{ y: 0 }}
//           transition={{ type: 'spring', stiffness: 300 }}
//         >
//           My Events
//         </motion.h1>
//         <Link to="/create-event" className="create-event-btn">
//           <FaPlus /> Create Event
//         </Link>
//       </header>

//       <motion.div 
//         className="search-filter-container"
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <div className="search-bar">
//           <FaSearch />
//           <input 
//             type="text" 
//             placeholder="Search events..." 
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         {/* Add date, location, and status filter inputs here if needed */}
//       </motion.div>

//       <AnimatePresence>
//         <motion.div className="event-grid">
//           {currentEvents.map((event) => (
//             <motion.div
//               key={event._id} 
//               className="event-card"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               transition={{ duration: 0.3 }}
//               whileHover={{ scale: 1.05 }}
//             >
//               <h3>{event.title}</h3>
//               <p>{new Date(event.date).toLocaleDateString()}</p>
//               <p>{event.location}</p>
//               <span className={`event-status ${event.status}`}>{event.status}</span>
//               <div className="event-actions">
//                 <motion.button 
//                   className="view-btn"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => handleViewEvent(event)}
//                 >
//                   <FaEye /> View
//                 </motion.button>
//                 <motion.button 
//                   className="edit-btn"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <FaEdit /> Edit
//                 </motion.button>
//                 <motion.button 
//                   className="delete-btn" 
//                   onClick={() => handleDelete(event._id)}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <FaTrash /> Delete
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </AnimatePresence>

//       {/* Event Details Modal */}
//       {selectedEvent && (
//         <motion.div 
//           className="event-details-modal"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <h2>{selectedEvent.title}</h2>
//           <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p>
//           <p><strong>Location:</strong> {selectedEvent.location}</p>
//           <p><strong>Status:</strong> {selectedEvent.status}</p>
//           <h3>Associated Sponsors</h3>
//           {associatedSponsors.length > 0 ? (
//             <ul>
//               {associatedSponsors.map(sponsor => (
//                 <li key={sponsor._id}>
//                   {sponsor.name} - {sponsor.category}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No associated sponsors found.</p>
//           )}
//           <button onClick={() => setSelectedEvent(null)}>Close</button>
//         </motion.div>
//       )}

//       <motion.div 
//         className="pagination"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//       >
//         {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }).map((_, index) => (
//           <motion.button 
//             key={index} 
//             onClick={() => paginate(index + 1)}
//             className={currentPage === index + 1 ? 'active' : ''}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             {index + 1}
//           </motion.button>
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default EventList;



// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
// import axios from 'axios';
// import './EventList.css';

// const EventList = () => {
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [eventsPerPage] = useState(9);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/events');
//         setEvents(response.data);
//         setFilteredEvents(response.data);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     const results = events.filter(event =>
//       event.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredEvents(results);
//     setCurrentPage(1);
//   }, [searchTerm, events]);

//   const indexOfLastEvent = currentPage * eventsPerPage;
//   const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
//   const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this event?')) {
//       try {
//         await axios.delete(`http://localhost:5000/api/events/${id}`);
//         setEvents(events.filter(event => event._id !== id));
//       } catch (error) {
//         console.error('Error deleting event:', error);
//       }
//     }
//   };

//   const handleViewEvent = (event) => {
//     setSelectedEvent(event);
//   };

//   return (
//     <motion.div 
//       className="event-list-container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <header className="event-list-header">
//         <motion.h1
//           initial={{ y: -50 }}
//           animate={{ y: 0 }}
//           transition={{ type: 'spring', stiffness: 300 }}
//         >
//           My Events
//         </motion.h1>
//         <Link to="/create-event" className="create-event-btn">
//           <FaPlus /> Create Event
//         </Link>
//       </header>

//       <motion.div 
//         className="search-filter-container"
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <div className="search-bar">
//           <FaSearch />
//           <input 
//             type="text" 
//             placeholder="Search events..." 
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </motion.div>

//       <AnimatePresence>
//         <motion.div className="event-grid">
//           {currentEvents.map((event) => (
//             <motion.div
//               key={event._id} 
//               className="event-card"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               transition={{ duration: 0.3 }}
//               whileHover={{ scale: 1.05 }}
//             >
//               <h3>{event.title}</h3>
//               <p>{new Date(event.date).toLocaleDateString()}</p>
//               <p>{event.location}</p>
//               <span className={`event-status ${event.status}`}>{event.status}</span>
//               <div className="event-actions">
//                 <motion.button 
//                   className="view-btn"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => handleViewEvent(event)}
//                 >
//                   <FaEye /> View
//                 </motion.button>
//                 <motion.button 
//                   className="edit-btn"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <FaEdit /> Edit
//                 </motion.button>
//                 <motion.button 
//                   className="delete-btn" 
//                   onClick={() => handleDelete(event._id)}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <FaTrash /> Delete
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </AnimatePresence>

//       {/* Event Details Modal */}
//       {selectedEvent && (
//         <motion.div 
//           className="event-details-modal"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <h2>{selectedEvent.title}</h2>
//           <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p>
//           <p><strong>Location:</strong> {selectedEvent.location}</p>
//           <p><strong>Description:</strong> {selectedEvent.description}</p>
//           <p><strong>Status:</strong> {selectedEvent.status}</p>
          
//           <h3>Ticket Information</h3>
//           {selectedEvent.ticketInfo.map((ticket, index) => (
//             <div key={index}>
//               <p>Range: {ticket.ticketRange}</p>
//               <p>Price: ${ticket.price}</p>
//               <p>Discount: {ticket.discount}%</p>
//             </div>
//           ))}

//           <h3>FAQs</h3>
//           {selectedEvent.faqFields.map((faq, index) => (
//             <div key={index}>
//               <p><strong>Q:</strong> {faq.question}</p>
//               <p><strong>A:</strong> {faq.answer}</p>
//             </div>
//           ))}

//           <h3>Website Information</h3>
//           <p><strong>Page Title:</strong> {selectedEvent.websiteInfo.pageTitle}</p>
//           <p><strong>Contact Email:</strong> {selectedEvent.websiteInfo.contactInfo.email}</p>
//           <p><strong>Contact Phone:</strong> {selectedEvent.websiteInfo.contactInfo.phone}</p>

//           <button onClick={() => setSelectedEvent(null)}>Close</button>
//         </motion.div>
//       )}

//       <motion.div 
//         className="pagination"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//       >
//         {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }).map((_, index) => (
//           <motion.button 
//             key={index} 
//             onClick={() => paginate(index + 1)}
//             className={currentPage === index + 1 ? 'active' : ''}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             {index + 1}
//           </motion.button>
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default EventList;


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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  
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
      console.log('Fetched events:', response.data);
      setEvents(response.data);
      setFilteredEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Failed to fetch events. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const removeEvent = (id) => {
    setEvents(prevEvents => prevEvents.filter(event => event._id !== id));
    setFilteredEvents(prevFiltered => prevFiltered.filter(event => event._id !== id));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/events/${id}`);
        if (response.status === 200) {
          removeEvent(id);
          alert('Event deleted successfully');
        } else {
          throw new Error('Unexpected response from server');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        if (error.response) {
          switch (error.response.status) {
            case 404:
              alert(`Event not found on the server. It may have been already deleted. Refreshing local data.`);
              removeEvent(id);
              fetchEvents(); // Refetch to sync with server
              break;
            case 400:
              alert(`Invalid event ID. Please refresh the page and try again.`);
              break;
            default:
              alert(`Server error: ${error.response.data.message || 'Unknown error'}`);
          }
        } else if (error.request) {
          alert('No response from server. Please check your connection and try again.');
        } else {
          alert('Failed to delete event. Please try again.');
        }
      }
    }
  };



  const handleEdit = (id) => {
    navigate(`/edit-event/${id}`);
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <motion.div 
      className="event-list-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="event-list-header">
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
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
            {filteredEvents.map((event) => (
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
          {selectedEvent.ticketInfo.map((ticket, index) => (
            <div key={index}>
              <p>Range: {ticket.ticketRange}</p>
              <p>Price: ${ticket.price}</p>
              <p>Discount: {ticket.discount}%</p>
            </div>
          ))}

          <h3>FAQs</h3>
          {selectedEvent.faqFields.map((faq, index) => (
            <div key={index}>
              <p><strong>Q:</strong> {faq.question}</p>
              <p><strong>A:</strong> {faq.answer}</p>
            </div>
          ))}

          <h3>Website Information</h3>
          <p><strong>Page Title:</strong> {selectedEvent.websiteInfo.pageTitle}</p>
          <p><strong>Contact Email:</strong> {selectedEvent.websiteInfo.contactInfo.email}</p>
          <p><strong>Contact Phone:</strong> {selectedEvent.websiteInfo.contactInfo.phone}</p>

          <button onClick={() => setSelectedEvent(null)}>Close</button>
        </motion.div>
      )}

      <motion.div 
        className="pagination"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }).map((_, index) => (
          <motion.button 
            key={index} 
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {index + 1}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default EventList;