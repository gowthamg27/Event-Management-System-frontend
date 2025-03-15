import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Dashboard.css';
import { FaCalendar, FaUsers, FaCreditCard, FaMicrophone, FaHandshake, FaQrcode, FaComments, FaUserTie, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Import your components
import EventList from '../EventList/EventList.js';
import PreEventPlanning from '../PreEventPlanning/PreEventPlanning.js';
import SponsorManagement from '../sponsormanagement/sponsormanagement.js';
import BoothPlacementPage from '../booth/BoothPlacementPage.js';
import SpeakerAndContentManagement from '../speakerandcontentmanagement/Speakerandcontentmanagement';
import SessionManagement from '../Sessionmanagement/sessionmanagement.js'; 
import Live from '../Live/live.js'; 
import ContentManagement from '../Contentmanagement/content.js'; 
import Exhibitor from '../ExhibitorPortal/Exhibitor.js';
import Registration from '../Registration/registration.js';
import PaymentProcessing from '../payment/payment.js';
import Attendee from '../Attendee/attendee.js';  
import RegistrationFormPage from '../Registration/registration.js'; 
import { EventProvider } from '../context/EventContext';

// Other components
const AttendeeProfiles = () => <div>Attendee Profiles Page</div>;
const SessionScheduling = () => <div>Session Scheduling Page</div>;
const CheckIn = () => <div>Check-in Dashboard Page</div>;
const NetworkingDashboard = () => <div>Networking Dashboard Page</div>;

// Tile component for the dashboard
const Tile = ({ title, metrics, icon, link }) => (
  <Link to={link} className="dashboard-tile">
    <div className="tile-content">
      <h3>{title}</h3>
      <div className="tile-icon">{icon}</div>
      {metrics.map((metric, index) => (
        <p key={index}>{metric.label}: <span>{metric.value}</span></p>
      ))}
    </div>
  </Link>
);

// Dashboard component
const Dashboard = () => {
  const tiles = [
    {
      title: "Event Summary",
      metrics: [
        { label: "Total Events", value: 10 },
        { label: "Upcoming Event", value: "Annual Conference (May 15)" }
      ],
      icon: <FaCalendar />,
      link: "/events"
    },
    {
      title: "Registrations",
      metrics: [
        { label: "Total Registrations", value: 500 },
        { label: "New Registrations", value: 50 }
      ],
      icon: <FaUsers />,
      link: "/registrations"
    },
    {
      title: "Payment Processing",
      metrics: [
        { label: "Total Revenue", value: "$50,000" },
        { label: "Pending Payments", value: 25 }
      ],
      icon: <FaCreditCard />,
      link: "/payments"
    },
    {
      title: "Attendee Management",
      metrics: [
        { label: "Total Attendees", value: 450 },
        { label: "VIP Attendees", value: 30 }
      ],
      icon: <FaUserTie />,
      link: "/attendees"
    },
    {
      title: "Speaker & Content Management",
      metrics: [
        { label: "Total Sessions", value: 40 },
        { label: "Upcoming Sessions", value: 5 }
      ],
      icon: <FaMicrophone />,
      link: "/sessions"
    },
    {
      title: "Sponsor & Exhibitor Management",
      metrics: [
        { label: "Total Sponsors", value: 20 },
        { label: "New Sponsors", value: 3 }
      ],
      icon: <FaHandshake />,
      link: "/sponsors"
    },
    {
      title: "On-Site Check-in",
      metrics: [
        { label: "Total Check-ins", value: 300 },
        { label: "Pending Check-ins", value: 150 }
      ],
      icon: <FaQrcode />,
      link: "/check-in"
    },
    {
      title: "Networking & Engagement",
      metrics: [
        { label: "Messages Sent", value: 1500 },
        { label: "Meetings Scheduled", value: 75 }
      ],
      icon: <FaComments />,
      link: "/networking"
    },
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        {tiles.map((tile, index) => (
          <Tile key={index} {...tile} />
        ))}
      </div>
    </div>
  );
};

// Sidebar component with collapsible sections for all items
const Sidebar = () => {
  const [eventsOpen, setEventsOpen] = useState(false);
  const [registrationsOpen, setRegistrationsOpen] = useState(false);
  const [attendeesOpen, setAttendeesOpen] = useState(false);
  const [sponsorsOpen, setSponsorsOpen] = useState(false);
  const [speakerOpen, setSpeakerOpen] = useState(false);
  const [onSiteOpen, setOnSiteOpen] = useState(false);
  const [networkingOpen, setNetworkingOpen] = useState(false);

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>Event Manager</h2>
      </div>
      <ul className="sidebar-menu">
        <li><Link to="/"><i className="fas fa-tachometer-alt"></i>Dashboard</Link></li>
        
        {/* Events Section */}
        <li className="menu-section" onClick={() => setEventsOpen(!eventsOpen)}>
          Events {eventsOpen ? <FaChevronUp /> : <FaChevronDown />}
        </li>
        {eventsOpen && (
          <>
            <li className="submenu-item"><Link to="/events"><i className="fas fa-calendar-alt"></i>Event List</Link></li>
            <li className="submenu-item"><Link to="/pre-event"><i className="fas fa-tasks"></i>Pre-event Planning</Link></li>
          </>
        )}

        {/* Registrations Section */}
        <li className="menu-section" onClick={() => setRegistrationsOpen(!registrationsOpen)}>
          Registrations {registrationsOpen ? <FaChevronUp /> : <FaChevronDown />}
        </li>
        {registrationsOpen && (
          <>
            <li className="submenu-item"><Link to="/registrations"><i className="fas fa-user-plus"></i>Registration Form</Link></li>
            <li className="submenu-item"><Link to="/payments"><i className="fas fa-credit-card"></i>Payment Processing</Link></li>
          </>
        )}

        {/* Attendees Section */}
        <li className="menu-section" onClick={() => setAttendeesOpen(!attendeesOpen)}>
          Attendees {attendeesOpen ? <FaChevronUp /> : <FaChevronDown />}
        </li>
        {attendeesOpen && (
          <>
            <li className="submenu-item"><Link to="/attendee-management"><i className="fas fa-users"></i>Attendee Management</Link></li>
            <li className="submenu-item"><Link to="/attendees"><i className="fas fa-user-tie"></i>VIP Attendees</Link></li>
          </>
        )}

        {/* Sponsors Section */}
        <li className="menu-section" onClick={() => setSponsorsOpen(!sponsorsOpen)}>
          Sponsors {sponsorsOpen ? <FaChevronUp /> : <FaChevronDown />}
        </li>
        {sponsorsOpen && (
          <>
            <li className="submenu-item"><Link to="/sponsors"><i className="fas fa-handshake"></i>Sponsor Management</Link></li>
            <li className="submenu-item"><Link to="/exhibitors"><i className="fas fa-handshake"></i>Exhibitor Portals</Link></li>
            <li className="submenu-item"><Link to="/booth-placement"><i className="fas fa-map-marker-alt"></i>Booth Placement</Link></li>
          </>
        )}

        {/* Speaker & Content Management Section */}
        <li className="menu-section" onClick={() => setSpeakerOpen(!speakerOpen)}>
          Speaker & Content Management {speakerOpen ? <FaChevronUp /> : <FaChevronDown />}
        </li>
        {speakerOpen && (
          <>
            <li className="submenu-item"><Link to="/speaker-and-content-management"><i className="fas fa-microphone"></i>Speaker & Content Management</Link></li>
            <li className="submenu-item"><Link to="/session-management"><i className="fas fa-microphone"></i>Session Management</Link></li>
            <li className="submenu-item"><Link to="/live-qa"><i className="fas fa-question-circle"></i>Live Q&A and Polling</Link></li>
            <li className="submenu-item"><Link to="/content-management"><i className="fas fa-clipboard"></i>Content Management</Link></li>
          </>
        )}

        {/* On-site Management Section */}
        <li className="menu-section" onClick={() => setOnSiteOpen(!onSiteOpen)}>
          On-site Management {onSiteOpen ? <FaChevronUp /> : <FaChevronDown />}
        </li>
        {onSiteOpen && (
          <>
            <li className="submenu-item"><Link to="/check-in"><i className="fas fa-qrcode"></i>Check-in</Link></li>
            <li className="submenu-item"><Link to="/badge-printing"><i className="fas fa-id-card"></i>Badge Printing</Link></li>
            <li className="submenu-item"><Link to="/signage"><i className="fas fa-signs-post"></i>Dynamic Signage</Link></li>
          </>
        )}

        {/* Networking & Engagement Section */}
        <li className="menu-section" onClick={() => setNetworkingOpen(!networkingOpen)}>
          Networking & Engagement {networkingOpen ? <FaChevronUp /> : <FaChevronDown />}
        </li>
        {networkingOpen && (
          <>
            <li className="submenu-item"><Link to="/messaging"><i className="fas fa-comments"></i>In-App Messaging</Link></li>
            <li className="submenu-item"><Link to="/meeting-scheduling"><i className="fas fa-calendar-check"></i>Meeting Scheduling</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

// Main App component
const App = () => (
  <Router>
    <EventProvider>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/pre-event" element={<PreEventPlanning />} />
            <Route path="/registrations" element={<Registration />} />
            <Route path="/create-event" element={<RegistrationFormPage />} />
            <Route path="/payments" element={<PaymentProcessing />} />
            <Route path="/attendees" element={<AttendeeProfiles />} />
            <Route path="/attendee-management" element={<Attendee />} />
            <Route path="/sessions" element={<SessionScheduling />} />
            <Route path="/session-management" element={<SessionManagement />} />
            <Route path="/sponsors" element={<SponsorManagement />} />
            <Route path="/booth-placement" element={<BoothPlacementPage />} />
            <Route path="/speaker-and-content-management" element={<SpeakerAndContentManagement />} />
            <Route path="/check-in" element={<CheckIn />} />
            <Route path="/networking" element={<NetworkingDashboard />} />
            <Route path="/live-qa" element={<Live />} />
            <Route path="/content-management" element={<ContentManagement />} />
            <Route path="/exhibitors" element={<Exhibitor />} />
          </Routes>
        </main>
      </div>
    </EventProvider>
  </Router>
);

export default App;
