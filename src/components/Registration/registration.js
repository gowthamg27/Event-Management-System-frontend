// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './RegistrationFormPage.css';
// import { EventContext } from '../context/EventContext';

// const RegistrationFormPage = () => {
//   const [eventInfo, setEventInfo] = useState({
//     title: '',
//     date: '',
//     location: '',
//     description: '',
//     document: null,
//     documentError: '',
//   });

//   const [ticketInfo, setTicketInfo] = useState([{ ticketRange: '', price: 499, discount: '' }]);
//   const [faqFields, setFaqFields] = useState([{ question: '', answer: '' }]);
//   const [websiteInfo, setWebsiteInfo] = useState({
//     pageTitle: '',
//     contactInfo: {
//       email: '',
//       phone: ''
//     }
//   });

//   const [validationErrors, setValidationErrors] = useState({});
//   const [showPreview, setShowPreview] = useState(false);
//   const { addEvent } = useContext(EventContext);  // Use the context here
//   const navigate = useNavigate();

//   // Handle Input Change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEventInfo(prev => ({ ...prev, [name]: value }));
//   };

//   // Handle Document Upload
//   const handleDocumentUpload = (e) => {
//     const file = e.target.files[0];
//     const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
//     const maxSize = 5 * 1024 * 1024; // 5MB

//     if (file) {
//       if (!allowedTypes.includes(file.type)) {
//         setEventInfo(prev => ({ ...prev, document: null, documentError: 'Invalid file type. Only PDF, Word, or PPT files are allowed.' }));
//       } else if (file.size > maxSize) {
//         setEventInfo(prev => ({ ...prev, document: null, documentError: 'File size exceeds 5MB limit.' }));
//       } else {
//         setEventInfo(prev => ({ ...prev, document: file, documentError: '' }));
//       }
//     } else {
//       setEventInfo(prev => ({ ...prev, document: null, documentError: '' }));
//     }
//   };

//   // Handle Contact Info Change
//   const handleContactInfoChange = (e) => {
//     const { name, value } = e.target;
//     setWebsiteInfo(prev => ({
//       ...prev,
//       contactInfo: { ...prev.contactInfo, [name]: value }
//     }));
//   };

//   // Handle Date Selection
//   const handleDateChange = (e) => {
//     const { value } = e.target;
//     setEventInfo(prev => ({ ...prev, date: value }));
//   };

//   // Handle Ticket Info Change
//   const handleTicketRangeChange = (index, value) => {
//     const updatedTickets = [...ticketInfo];
//     updatedTickets[index].ticketRange = value;
//     setTicketInfo(updatedTickets);
//   };

//   const handlePriceChange = (index, value) => {
//     const updatedTickets = [...ticketInfo];
//     updatedTickets[index].price = value;
//     setTicketInfo(updatedTickets);
//   };

//   const handleDiscountChange = (index, value) => {
//     const updatedTickets = [...ticketInfo];
//     updatedTickets[index].discount = value;
//     setTicketInfo(updatedTickets);
//   };

//   // Handle Adding/Removing Ticket Rows
//   const handleAddTicketType = () => {
//     setTicketInfo([...ticketInfo, { ticketRange: '', price: 499, discount: '' }]);
//   };

//   const handleDeleteTicketType = (index) => {
//     const updatedTickets = ticketInfo.filter((_, i) => i !== index);
//     setTicketInfo(updatedTickets);
//   };

//   // Handle FAQ Change
//   const handleFaqChange = (index, field, value) => {
//     const updatedFaqs = [...faqFields];
//     updatedFaqs[index][field] = value;
//     setFaqFields(updatedFaqs);
//   };

//   // Handle Adding/Removing FAQ Rows
//   const addFaqRow = () => {
//     setFaqFields([...faqFields, { question: '', answer: '' }]);
//   };

//   const removeFaqRow = (index) => {
//     const updatedFaqs = faqFields.filter((_, i) => i !== index);
//     setFaqFields(updatedFaqs);
//   };

//   // Validate the entire form
//   const validateForm = () => {
//     const { title, date, location, description } = eventInfo;
//     const { pageTitle, contactInfo } = websiteInfo;
//     const { email, phone } = contactInfo;
//     let isValid = true;
//     const errors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10}$/;
//     const today = new Date().toISOString().split('T')[0];

//     if (!title.trim()) {
//       errors.title = 'Event Name is required.';
//       isValid = false;
//     }
//     if (!date) {
//       errors.date = 'Event Date is required.';
//       isValid = false;
//     } else if (date < today) {
//       errors.date = 'Event Date cannot be in the past.';
//       isValid = false;
//     }
//     if (!location.trim()) {
//       errors.location = 'Event Location is required.';
//       isValid = false;
//     }
//     if (!description.trim()) {
//       errors.description = 'Event Description is required.';
//       isValid = false;
//     }

//     if (!pageTitle.trim()) {
//       errors.pageTitle = 'Page Title cannot be empty.';
//       isValid = false;
//     }

//     if (!emailRegex.test(email)) {
//       errors.email = 'Please enter a valid email address.';
//       isValid = false;
//     }

//     if (!phoneRegex.test(phone)) {
//       errors.phone = 'Please enter a valid 10-digit phone number.';
//       isValid = false;
//     }

//     setValidationErrors(errors);

//     return isValid;
//   };

//   // Handle Publish
//   const handlePublish = () => {
//     if (validateForm()) {
//       const newEvent = {
//         id: Date.now(),
//         ...eventInfo,
//         ticketInfo: ticketInfo,
//         faqFields: faqFields,
//         websiteInfo: websiteInfo
//       };
//       addEvent(newEvent);
//       alert('Event published successfully!');
//       navigate('/events');
//     }
//   };

//   // Handle Preview
//   const handlePreview = () => {
//     if (validateForm()) {
//       setShowPreview(true);
//     }
//   };

//   // Close Preview
//   const handleClosePreview = () => {
//     setShowPreview(false);
//   };

//   return (
//     <div className="registration-form-page">
//       <header>
//         <button className="back-button" onClick={() => navigate(-1)}>Back</button>
//         <h1>Event Registration Form</h1>
//       </header>

//       {/* Event Details Section */}
//       <section className="event-details">
//         <h2>Event Details</h2>
//         <div>
//           <input
//             type="text"
//             name="title"
//             placeholder="Event Name"
//             value={eventInfo.title}
//             onChange={handleInputChange}
//             required
//           />
//           {validationErrors.title && <div className="error">{validationErrors.title}</div>}
//         </div>
//         <div>
//           <input
//             type="date"
//             name="date"
//             value={eventInfo.date}
//             onChange={handleDateChange}
//             required
//           />
//           {validationErrors.date && <div className="error">{validationErrors.date}</div>}
//         </div>
//         <div>
//           <input
//             type="text"
//             name="location"
//             placeholder="Location"
//             value={eventInfo.location}
//             onChange={handleInputChange}
//             required
//           />
//           {validationErrors.location && <div className="error">{validationErrors.location}</div>}
//         </div>
//         <div>
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={eventInfo.description}
//             onChange={handleInputChange}
//             required
//           />
//           {validationErrors.description && <div className="error">{validationErrors.description}</div>}
//         </div>
//         <div>
//           <input
//             type="file"
//             accept=".pdf,.pptx,.ppt,.doc,.docx"
//             onChange={handleDocumentUpload}
//           />
//           {eventInfo.documentError && <div className="error">{eventInfo.documentError}</div>}
//           {eventInfo.document && <div>Document uploaded: {eventInfo.document.name}</div>}
//         </div>
//       </section>

//       {/* Ticket Info Section */}
//       <section className="ticket-info">
//         <h2>Ticket Information</h2>
//         {ticketInfo.map((ticket, index) => (
//           <div key={index} className="ticket-type">
//             <div>
//               <label>Ticket Range:</label>
//               <select
//                 value={ticket.ticketRange}
//                 onChange={(e) => handleTicketRangeChange(index, e.target.value)}
//               >
//                 <option value="">Select Ticket Range</option>
//                 <option value="single">Single Ticket</option>
//                 <option value="2-3">2-3 Tickets</option>
//                 <option value="4-6">4-6 Tickets</option>
//                 <option value="6-10">6-10 Tickets</option>
//                 <option value="above">Above 10 Tickets</option>
//               </select>
//             </div>
//             <div>
//               <label>Price:</label>
//               <input
//                 type="number"
//                 value={ticket.price}
//                 onChange={(e) => handlePriceChange(index, e.target.value)}
//               />
//             </div>
//             <div>
//               <label>Discount (%):</label>
//               <input
//                 type="number"
//                 value={ticket.discount}
//                 onChange={(e) => handleDiscountChange(index, e.target.value)}
//               />
//             </div>
//             <button type="button" onClick={() => handleDeleteTicketType(index)}>Remove</button>
//           </div>
//         ))}
//         <button type="button" onClick={handleAddTicketType}>Add Ticket Type</button>
//       </section>

//       {/* FAQ Section */}
//       <section className="faq">
//         <h2>FAQ</h2>
//         {faqFields.map((faq, index) => (
//           <div key={index} className="faq-item">
//             <div>
//               <label>Question:</label>
//               <input
//                 type="text"
//                 value={faq.question}
//                 onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
//               />
//             </div>
//             <div>
//               <label>Answer:</label>
//               <textarea
//                 value={faq.answer}
//                 onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
//               />
//             </div>
//             <button type="button" onClick={() => removeFaqRow(index)}>Remove</button>
//           </div>
//         ))}
//         <button type="button" onClick={addFaqRow}>Add FAQ</button>
//       </section>

//       {/* Website Info Section */}
//       <section className="website-info">
//         <h2>Website Information</h2>
//         <div>
//           <input
//             type="text"
//             name="pageTitle"
//             placeholder="Page Title"
//             value={websiteInfo.pageTitle}
//             onChange={(e) => setWebsiteInfo(prev => ({ ...prev, pageTitle: e.target.value }))}
//             required
//           />
//           {validationErrors.pageTitle && <div className="error">{validationErrors.pageTitle}</div>}
//         </div>
//         <div>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={websiteInfo.contactInfo.email}
//             onChange={handleContactInfoChange}
//             required
//           />
//           {validationErrors.email && <div className="error">{validationErrors.email}</div>}
//         </div>
//         <div>
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={websiteInfo.contactInfo.phone}
//             onChange={handleContactInfoChange}
//             required
//           />
//           {validationErrors.phone && <div className="error">{validationErrors.phone}</div>}
//         </div>
//       </section>

//       <footer>
//         <button className="publish-button" onClick={handlePublish}>Publish</button>
//         <button className="preview-button" onClick={handlePreview}>Preview</button>
//       </footer>

//       {/* Preview Section */}
//       {showPreview && (
//         <div className="preview-overlay">
//           <div className="preview-content">
//             <button className="close-button" onClick={handleClosePreview}>Close</button>
//             <h2>Preview</h2>
//             <div>
//               <strong>Event Name:</strong> {eventInfo.title}
//             </div>
//             <div>
//               <strong>Date:</strong> {eventInfo.date}
//             </div>
//             <div>
//               <strong>Location:</strong> {eventInfo.location}
//             </div>
//             <div>
//               <strong>Description:</strong> {eventInfo.description}
//             </div>
//             <div>
//               <strong>Document:</strong> {eventInfo.document ? eventInfo.document.name : 'No document uploaded'}
//             </div>
//             <div>
//               <strong>Tickets:</strong>
//               <ul>
//                 {ticketInfo.map((ticket, index) => (
//                   <li key={index}>
//                     {ticket.ticketRange} - ${ticket.price} (Discount: {ticket.discount}%)
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <strong>FAQ:</strong>
//               <ul>
//                 {faqFields.map((faq, index) => (
//                   <li key={index}>
//                     <strong>Q:</strong> {faq.question}<br />
//                     <strong>A:</strong> {faq.answer}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <strong>Page Title:</strong> {websiteInfo.pageTitle}
//             </div>
//             <div>
//               <strong>Email:</strong> {websiteInfo.contactInfo.email}
//             </div>
//             <div>
//               <strong>Phone Number:</strong> {websiteInfo.contactInfo.phone}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RegistrationFormPage;






import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios: npm install axios
import './RegistrationFormPage.css';
import { EventContext } from '../context/EventContext';

const RegistrationFormPage = () => {
  const [eventInfo, setEventInfo] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    document: null,
    documentError: '',
  });

  const [ticketInfo, setTicketInfo] = useState([{ ticketRange: '', price: 499, discount: '' }]);
  const [faqFields, setFaqFields] = useState([{ question: '', answer: '' }]);
  const [websiteInfo, setWebsiteInfo] = useState({
    pageTitle: '',
    contactInfo: {
      email: '',
      phone: ''
    }
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const { addEvent } = useContext(EventContext);  // Use the context here
  const navigate = useNavigate();

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventInfo(prev => ({ ...prev, [name]: value }));
  };

  // Handle Document Upload
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setEventInfo(prev => ({ ...prev, document: null, documentError: 'Invalid file type. Only PDF, Word, or PPT files are allowed.' }));
      } else if (file.size > maxSize) {
        setEventInfo(prev => ({ ...prev, document: null, documentError: 'File size exceeds 5MB limit.' }));
      } else {
        setEventInfo(prev => ({ ...prev, document: file, documentError: '' }));
      }
    } else {
      setEventInfo(prev => ({ ...prev, document: null, documentError: '' }));
    }
  };

  // Handle Contact Info Change
  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setWebsiteInfo(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [name]: value }
    }));
  };

  // Handle Date Selection
  const handleDateChange = (e) => {
    const { value } = e.target;
    setEventInfo(prev => ({ ...prev, date: value }));
  };

  // Handle Ticket Info Change
  const handleTicketRangeChange = (index, value) => {
    const updatedTickets = [...ticketInfo];
    updatedTickets[index].ticketRange = value;
    setTicketInfo(updatedTickets);
  };

  const handlePriceChange = (index, value) => {
    const updatedTickets = [...ticketInfo];
    updatedTickets[index].price = value;
    setTicketInfo(updatedTickets);
  };

  const handleDiscountChange = (index, value) => {
    const updatedTickets = [...ticketInfo];
    updatedTickets[index].discount = value;
    setTicketInfo(updatedTickets);
  };

  // Handle Adding/Removing Ticket Rows
  const handleAddTicketType = () => {
    setTicketInfo([...ticketInfo, { ticketRange: '', price: 499, discount: '' }]);
  };

  const handleDeleteTicketType = (index) => {
    const updatedTickets = ticketInfo.filter((_, i) => i !== index);
    setTicketInfo(updatedTickets);
  };

  // Handle FAQ Change
  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...faqFields];
    updatedFaqs[index][field] = value;
    setFaqFields(updatedFaqs);
  };

  // Handle Adding/Removing FAQ Rows
  const addFaqRow = () => {
    setFaqFields([...faqFields, { question: '', answer: '' }]);
  };

  const removeFaqRow = (index) => {
    const updatedFaqs = faqFields.filter((_, i) => i !== index);
    setFaqFields(updatedFaqs);
  };

  // Validate the entire form
  const validateForm = () => {
    const { title, date, location, description } = eventInfo;
    const { pageTitle, contactInfo } = websiteInfo;
    const { email, phone } = contactInfo;
    let isValid = true;
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const today = new Date().toISOString().split('T')[0];

    if (!title.trim()) {
      errors.title = 'Event Name is required.';
      isValid = false;
    }
    if (!date) {
      errors.date = 'Event Date is required.';
      isValid = false;
    } else if (date < today) {
      errors.date = 'Event Date cannot be in the past.';
      isValid = false;
    }
    if (!location.trim()) {
      errors.location = 'Event Location is required.';
      isValid = false;
    }
    if (!description.trim()) {
      errors.description = 'Event Description is required.';
      isValid = false;
    }

    if (!pageTitle.trim()) {
      errors.pageTitle = 'Page Title cannot be empty.';
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!phoneRegex.test(phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
      isValid = false;
    }

    setValidationErrors(errors);

    return isValid;
  };

  // Handle Publish
  const handlePublish = async () => {
    if (validateForm()) {
      const newEvent = {
        title: eventInfo.title,
        date: eventInfo.date,
        location: eventInfo.location,
        description: eventInfo.description,
        ticketInfo: ticketInfo,
        faqFields: faqFields,
        websiteInfo: websiteInfo
      };

      try {
        const response = await axios.post('http://localhost:5000/api/events', newEvent);
        alert('Event published successfully!');
        navigate('/events'); // Redirect to the event list page
      } catch (error) {
        console.error('Error publishing event:', error);
        alert('Failed to publish event. Please try again.');
      }
    }
  };

  // Handle Preview
  const handlePreview = () => {
    if (validateForm()) {
      setShowPreview(true);
    }
  };

  // Close Preview
  const handleClosePreview = () => {
    setShowPreview(false);
  };

  return (
    <div className="registration-form-page">
      <header>
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        <h1>Event Registration Form</h1>
      </header>

      {/* Event Details Section */}
      <section className="event-details">
        <h2>Event Details</h2>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Event Name"
            value={eventInfo.title}
            onChange={handleInputChange}
            required
          />
          {validationErrors.title && <div className="error">{validationErrors.title}</div>}
        </div>
        <div>
          <input
            type="date"
            name="date"
            value={eventInfo.date}
            onChange={handleDateChange}
            required
          />
          {validationErrors.date && <div className="error">{validationErrors.date}</div>}
        </div>
        <div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={eventInfo.location}
            onChange={handleInputChange}
            required
          />
          {validationErrors.location && <div className="error">{validationErrors.location}</div>}
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={eventInfo.description}
            onChange={handleInputChange}
            required
          />
          {validationErrors.description && <div className="error">{validationErrors.description}</div>}
        </div>
        <div>
          <input
            type="file"
            accept=".pdf,.pptx,.ppt,.doc,.docx"
            onChange={handleDocumentUpload}
          />
          {eventInfo.documentError && <div className="error">{eventInfo.documentError}</div>}
          {eventInfo.document && <div>Document uploaded: {eventInfo.document.name}</div>}
        </div>
      </section>

      {/* Ticket Info Section */}
      <section className="ticket-info">
        <h2>Ticket Information</h2>
        {ticketInfo.map((ticket, index) => (
          <div key={index} className="ticket-type">
            <div>
              <label>Ticket Range:</label>
              <select
                value={ticket.ticketRange}
                onChange={(e) => handleTicketRangeChange(index, e.target.value)}
              >
                <option value="">Select Ticket Range</option>
                <option value="single">Single Ticket</option>
                <option value="2-3">2-3 Tickets</option>
                <option value="4-6">4-6 Tickets</option>
                <option value="6-10">6-10 Tickets</option>
                <option value="above">Above 10 Tickets</option>
              </select>
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                value={ticket.price}
                onChange={(e) => handlePriceChange(index, e.target.value)}
              />
            </div>
            <div>
              <label>Discount (%):</label>
              <input
                type="number"
                value={ticket.discount}
                onChange={(e) => handleDiscountChange(index, e.target.value)}
              />
            </div>
            <button type="button" onClick={() => handleDeleteTicketType(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddTicketType}>Add Ticket Type</button>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <h2>FAQ</h2>
        {faqFields.map((faq, index) => (
          <div key={index} className="faq-item">
            <div>
              <label>Question:</label>
              <input
                type="text"
                value={faq.question}
                onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
              />
            </div>
            <div>
              <label>Answer:</label>
              <textarea
                value={faq.answer}
                onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
              />
            </div>
            <button type="button" onClick={() => removeFaqRow(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addFaqRow}>Add FAQ</button>
      </section>

      {/* Website Info Section */}
      <section className="website-info">
        <h2>Website Information</h2>
        <div>
          <input
            type="text"
            name="pageTitle"
            placeholder="Page Title"
            value={websiteInfo.pageTitle}
            onChange={(e) => setWebsiteInfo(prev => ({ ...prev, pageTitle: e.target.value }))}
            required
          />
          {validationErrors.pageTitle && <div className="error">{validationErrors.pageTitle}</div>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={websiteInfo.contactInfo.email}
            onChange={handleContactInfoChange}
            required
          />
          {validationErrors.email && <div className="error">{validationErrors.email}</div>}
        </div>
        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={websiteInfo.contactInfo.phone}
            onChange={handleContactInfoChange}
            required
          />
          {validationErrors.phone && <div className="error">{validationErrors.phone}</div>}
        </div>
      </section>

      <footer>
        <button className="publish-button" onClick={handlePublish}>Publish</button>
        <button className="preview-button" onClick={handlePreview}>Preview</button>
      </footer>

      {/* Preview Section */}
      {showPreview && (
        <div className="preview-overlay">
          <div className="preview-content">
            <button className="close-button" onClick={handleClosePreview}>Close</button>
            <h2>Preview</h2>
            <div>
              <strong>Event Name:</strong> {eventInfo.title}
            </div>
            <div>
              <strong>Date:</strong> {eventInfo.date}
            </div>
            <div>
              <strong>Location:</strong> {eventInfo.location}
            </div>
            <div>
              <strong>Description:</strong> {eventInfo.description}
            </div>
            <div>
              <strong>Document:</strong> {eventInfo.document ? eventInfo.document.name : 'No document uploaded'}
            </div>
            <div>
              <strong>Tickets:</strong>
              <ul>
                {ticketInfo.map((ticket, index) => (
                  <li key={index}>
                    {ticket.ticketRange} - ${ticket.price} (Discount: {ticket.discount}%)
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <strong>FAQ:</strong>
              <ul>
                {faqFields.map((faq, index) => (
                  <li key={index}>
                    <strong>Q:</strong> {faq.question}<br />
                    <strong>A:</strong> {faq.answer}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Page Title:</strong> {websiteInfo.pageTitle}
            </div>
            <div>
              <strong>Email:</strong> {websiteInfo.contactInfo.email}
            </div>
            <div>
              <strong>Phone Number:</strong> {websiteInfo.contactInfo.phone}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationFormPage;





