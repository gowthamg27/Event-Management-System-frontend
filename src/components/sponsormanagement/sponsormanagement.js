import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaSearch,
  FaPlus,
  FaFileExport,
  FaChartBar,
  FaFilePdf,
  FaFileExcel
} from "react-icons/fa";
import "./SponsorsManagement.css";
import {
  createSponsor,
  getAllSponsors,
  updateSponsor,
  deleteSponsor,
} from "../../services/api";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
const RESET_TIMEOUT = 1 * 60 * 1000;

const SponsorsManagement = () => {
  const [sponsors, setSponsors] = useState([]);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [newSubmissions, setNewSubmissions] = useState(0);
  const resetTimerRef = useRef(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSponsor, setNewSponsor] = useState({
    name: "",
    category: "",
    contact: {
      name: "",
      email: "",
      phone: "",
    },
    status: "Pending",
    package: "",
    sponsorshipAmount: 0,
    eventName: "", //add new content
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const sponsorDetailsRef = useRef(null);
  const [showReportOptions, setShowReportOptions] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  useEffect(() => {
    fetchSponsors();
    startResetTimer();

    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const startResetTimer = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = setTimeout(() => {
      setNewSubmissions(0);
      startResetTimer();
    }, RESET_TIMEOUT);
  };

  const fetchSponsors = async () => {
    try {
      setIsLoading(true);
      const fetchedSponsors = await getAllSponsors();
      const validSponsors = fetchedSponsors.map((sponsor) => ({
        _id: sponsor._id || "",
        name: sponsor.name || "",
        category: sponsor.category || "",
        contact: sponsor.contact || { name: "", email: "", phone: "" },
        status: sponsor.status || "Pending",
        package: sponsor.package || "",
        eventName: sponsor.eventName || "",  // added new content
        sponsorshipAmount: sponsor.sponsorshipAmount || 0,
        createdAt: sponsor.createdAt || "",
        updatedAt: sponsor.updatedAt || "",
      }));
      setSponsors(validSponsors);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching sponsors:", error);
      setError("Failed to fetch sponsors. Please try again.");
      setIsLoading(false);
    }
  };

  const handleEdit = (sponsor) => {
    setSelectedSponsor(sponsor);
    setIsEditing(true);
    setIsViewing(false);
    scrollToSponsorDetails();
  };

  const handleView = (sponsor) => {
    setSelectedSponsor(sponsor);
    setIsViewing(true);
    setIsEditing(false);
    scrollToSponsorDetails();
  };

  const scrollToSponsorDetails = () => {
    if (sponsorDetailsRef.current) {
      sponsorDetailsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedSponsor = await updateSponsor(
        selectedSponsor._id,
        selectedSponsor
      );
      setSponsors(
        sponsors.map((s) => (s._id === updatedSponsor._id ? updatedSponsor : s))
      );
      setIsEditing(false);
      setSelectedSponsor(null);
    } catch (error) {
      console.error("Error updating sponsor:", error);
      setError("Failed to update sponsor. Please try again.");
    }
  };

  const handleReject = async () => {
    const reason = prompt(
      "Please provide a reason for rejecting this sponsor:"
    );
    if (reason !== null) {
      try {
        const rejectedSponsor = {
          ...selectedSponsor,
          status: "Rejected",
          rejectionReason: reason,
        };
        const updatedSponsor = await updateSponsor(
          selectedSponsor._id,
          rejectedSponsor
        );
        setSponsors(
          sponsors.map((s) =>
            s._id === updatedSponsor._id ? updatedSponsor : s
          )
        );
        setSelectedSponsor(updatedSponsor);
      } catch (error) {
        console.error("Error rejecting sponsor:", error);
        setError("Failed to reject sponsor. Please try again.");
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this sponsor?")) {
      try {
        await deleteSponsor(selectedSponsor._id);
        setSponsors(sponsors.filter((s) => s._id !== selectedSponsor._id));
        setSelectedSponsor(null);
        setIsViewing(false);
        setIsEditing(false);
      } catch (error) {
        console.error("Error deleting sponsor:", error);
        setError("Failed to delete sponsor. Please try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      if (name.startsWith("contact.")) {
        const contactKey = name.split(".")[1];
        setSelectedSponsor((prevSponsor) => ({
          ...prevSponsor,
          contact: {
            ...prevSponsor.contact,
            [contactKey]: value,
          },
        }));
      } else {
        setSelectedSponsor((prevSponsor) => ({
          ...prevSponsor,
          [name]: value,
        }));
      }
    } else {
      if (name.startsWith("contact.")) {
        const contactKey = name.split(".")[1];
        setNewSponsor((prevSponsor) => ({
          ...prevSponsor,
          contact: {
            ...prevSponsor.contact,
            [contactKey]: value,
          },
        }));
      } else {
        setNewSponsor((prevSponsor) => ({
          ...prevSponsor,
          [name]: value,
        }));
      }
    }
  };

  const handleApprove = async () => {
    try {
      const approvedSponsor = { ...selectedSponsor, status: "Active" };
      const updatedSponsor = await updateSponsor(
        selectedSponsor._id,
        approvedSponsor
      );
      setSponsors(
        sponsors.map((s) => (s._id === updatedSponsor._id ? updatedSponsor : s))
      );
      setSelectedSponsor(updatedSponsor);
    } catch (error) {
      console.error("Error approving sponsor:", error);
      setError("Failed to approve sponsor. Please try again.");
    }
  };

  const handleReactivate = async () => {
    try {
      const reactivatedSponsor = { ...selectedSponsor, status: "Active" };
      const updatedSponsor = await updateSponsor(
        selectedSponsor._id,
        reactivatedSponsor
      );
      setSponsors(
        sponsors.map((s) => (s._id === updatedSponsor._id ? updatedSponsor : s))
      );
      setSelectedSponsor(updatedSponsor);
    } catch (error) {
      console.error("Error reactivating sponsor:", error);
      setError("Failed to reactivate sponsor. Please try again.");
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const getFilteredSponsors = () => {
    return sponsors.filter((sponsor) => {
      const matchesCategory =
        selectedCategory === "All Categories" ||
        sponsor.category === selectedCategory;
      const matchesSearch =
        sponsor.name &&
        sponsor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "All Statuses" || sponsor.status === selectedStatus;
      return matchesCategory && matchesSearch && matchesStatus;
    });
  };

  const filteredSponsors = getFilteredSponsors();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log("Submitting sponsor data:", newSponsor);
      await createSponsor(newSponsor);
      await fetchSponsors();
      setNewSponsor({
        name: "",
        category: "",
        contact: {
          name: "",
          email: "",
          phone: "",
        },
        status: "Pending",
        package: "",
        sponsorshipAmount: 0,
        eventName: "", // Add this line
      });
      setShowAddForm(false);
      setNewSubmissions((prevCount) => prevCount + 1);
      setIsLoading(false);
    } catch (error) {
      console.error(
        "Error creating sponsor:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message ||
          "Failed to create sponsor. Please try again."
      );
      setIsLoading(false);
    }
  };
  
  const exportFilteredPDF = () => {
    try {
      const doc = new jsPDF();
      const filteredSponsors = getFilteredSponsors();
      const sponsorData = filteredSponsors.map((sponsor) => ({
        Name: sponsor.name,
        Category: sponsor.category,
        Contact: sponsor.contact.name,
        EventName: sponsor.eventName, // added new content
        Package: sponsor.package,
        Status: sponsor.status,
      
      }));

      doc.setFontSize(18);
      doc.text("Filtered Sponsors Report", 14, 22);

      doc.autoTable({
        startY: 30,
        head: [
          [
            "Name",
            "Category",
            "Contact",
            "EventName",// added new content
            "Package",
            "Status",
       
          ],
        ],
        body: sponsorData.map((obj) => Object.values(obj)),
      });

      doc.save("filtered_sponsors_report.pdf");
    } catch (error) {
      console.error("Error generating filtered PDF report:", error);
      setError("Failed to generate filtered PDF report. Please try again.");
    }
  };

  const exportFilteredExcel = () => {
    try {
      const filteredSponsors = getFilteredSponsors();
      const sponsorData = filteredSponsors.map((sponsor) => ({
        Name: sponsor.name,
        Category: sponsor.category,
        Contact: sponsor.contact.name,
        EventName : sponsor.eventName,// added new content
        Package: sponsor.package,
        Status: sponsor.status,
       
      }));

      const ws = XLSX.utils.json_to_sheet(sponsorData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Filtered Sponsors");
      XLSX.writeFile(wb, "filtered_sponsors_report.xlsx");
    } catch (error) {
      console.error("Error generating filtered Excel report:", error);
      setError("Failed to generate filtered Excel report. Please try again.");
    }
  };


  

  const generatePDFReport = () => {
    try {
      const doc = new jsPDF();
      const sponsorData = sponsors.map((sponsor) => ({
        Name: sponsor.name,
        Category: sponsor.category,
        Contact: sponsor.contact.name,
        EventName: sponsor.eventName,  // added new content
        Package: sponsor.package,
        Status: sponsor.status,
       
      }));

      doc.setFontSize(18);
      doc.text("Full Sponsors Report", 14, 22);

      doc.autoTable({
        startY: 30,
        head: [
          [
            "Name",
            "Category",
            "Contact",
            "EventName",  // added new content
            "Package",
            "Status",
            
          ],
        ],
        body: sponsorData.map((obj) => Object.values(obj)),
      });

      doc.save("sponsors_full_report.pdf");
    } catch (error) {
      console.error("Error generating PDF report:", error);
      setError("Failed to generate PDF report. Please try again.");
    }
  };

  const generateExcelReport = () => {
    try {
      const sponsorData = sponsors.map((sponsor) => ({
        Name: sponsor.name,
        Category: sponsor.category,
        Contact: sponsor.contact.name,
        EventName: sponsor.eventName,    // added new content
        Package: sponsor.package,
        Status: sponsor.status,
        
      }));

      const ws = XLSX.utils.json_to_sheet(sponsorData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sponsors");
      XLSX.writeFile(wb, "sponsors_full_report.xlsx");
    } catch (error) {
      console.error("Error generating Excel report:", error);
      setError("Failed to generate Excel report. Please try again.");
    }
  };

  if (isLoading) return <div>Loading sponsors...</div>;
  if (error) return <div>{error}</div>;

  return (
    <motion.div
      className="sponsors-management"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="header">
        <motion.button
          className="back-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowLeft />
        </motion.button>
        <h1>Sponsors Management</h1>
      </header>
      <div className="filters">
        <input
          type="text"
          placeholder="Search Sponsors"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All Categories">All Categories</option>
          <option value="Platinum">Platinum</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Bronze">Bronze</option>
        </select>
        <select value={selectedStatus} onChange={handleStatusChange}>
          <option value="All Statuses">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
        <motion.button
          className="export-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowExportOptions(!showExportOptions)}
        >
          <FaFileExport />
          Export Filtered
        </motion.button>
        {showExportOptions && (
          <div className="export-options">
            <motion.button
              className="export-button pdf"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={exportFilteredPDF}
            >
              <FaFilePdf />
              PDF
            </motion.button>
            <motion.button
              className="export-button excel"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={exportFilteredExcel}
            >
              <FaFileExcel />
              Excel
            </motion.button>
          </div>
        )}
        <motion.button
          className="export-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowReportOptions(!showReportOptions)}
        >
          <FaChartBar />
          Generate Report
        </motion.button>
        {showReportOptions && (
          <div className="report-options">
            <motion.button
              className="report-button pdf"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={generatePDFReport}
            >
              <FaFilePdf />
              PDF
            </motion.button>
            <motion.button
              className="report-button excel"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={generateExcelReport}
            >
              <FaFileExcel />
              Excel
            </motion.button>
          </div>
        )}
        <motion.button
          className="add-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <FaPlus />
          Add Sponsor
        </motion.button>
      </div>
      {showAddForm && (
        <form onSubmit={handleSubmit} className="sponsor-form">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={newSponsor.name}
            onChange={handleInputChange} // Added onChange handler
            required
          />
        
          <select
            name="category"
            value={newSponsor.category}
            onChange={handleInputChange} // Added onChange handler
            required
          >
            <option value="">Select Category</option>
            <option value="Platinum">Platinum</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </select>
          <input
            type="text"
            placeholder="Contact Name"
            name="contact.name"
            value={newSponsor.contact.name}
            onChange={handleInputChange} // Added onChange handler
            required
          />
          <input
            type="email"
            placeholder="Contact Email"
            name="contact.email"
            value={newSponsor.contact.email}
            onChange={handleInputChange} // Added onChange handler
            required
          />
          <input
            type="text"
            placeholder="Contact Phone"
            name="contact.phone"
            value={newSponsor.contact.phone}
            onChange={handleInputChange} // Added onChange handler
          />
          <input
            type="text"
            placeholder="Package"
            name="package"
            value={newSponsor.package}
            onChange={handleInputChange} // Added onChange handler
            required
          />
             <input         // added new content
            type="text"
            placeholder="Event Name"
            name="eventName"
            value={newSponsor.eventName}
            onChange={handleInputChange}
            required
          />

      
          <button type="submit">Submit</button>
        </form>
      )}
      {/* <div className="sponsor-list">
        {filteredSponsors.map((sponsor) => (
          <motion.div
            key={sponsor._id}
            className={`sponsor-item ${
              selectedSponsor === sponsor ? "selected" : ""
            }`}
            onClick={() => handleView(sponsor)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2>{sponsor.name}</h2>
            <p>{sponsor.category}</p>
            <p>{sponsor.status}</p>
          </motion.div>
        ))}
      </div>
      {selectedSponsor && (
        <div className="sponsor-details" ref={sponsorDetailsRef}>
          <h2>{isViewing ? "View" : "Edit"} Sponsor Details</h2>
          {isViewing ? (
            <>
              <p>
                <strong>Name:</strong> {selectedSponsor.name}
              </p>
              <p>
                <strong>Category:</strong> {selectedSponsor.category}
              </p>
              <p>
                <strong>Contact Name:</strong> {selectedSponsor.contact.name}
              </p>
              <p>
                <strong>Contact Email:</strong> {selectedSponsor.contact.email}
              </p>
              <p>
                <strong>Contact Phone:</strong> {selectedSponsor.contact.phone}
              </p>
              <p>
                <strong>Status:</strong> {selectedSponsor.status}
              </p>
              <p>
                <strong>Package:</strong> {selectedSponsor.package}
              </p>
              {selectedSponsor.status === "Rejected" &&
                selectedSponsor.rejectionReason && (
                  <p>
                    <strong>Rejection Reason:</strong>{" "}
                    {selectedSponsor.rejectionReason}
                  </p>
                )}
              <button onClick={() => handleEdit(selectedSponsor)}>Edit</button>
              {selectedSponsor.status === "Pending" && (
                <button onClick={handleApprove}>Approve</button>
              )}
              <button onClick={handleReject}>Reject</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          ) : (
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={selectedSponsor.name}
                onChange={handleInputChange} // Added onChange handler
                required
              />
              <input
                type="text"
                placeholder="Category"
                name="category"
                value={selectedSponsor.category}
                onChange={handleInputChange} // Added onChange handler
                required
              />
              <input
                type="text"
                placeholder="Contact Name"
                name="contact.name"
                value={selectedSponsor.contact.name}
                onChange={handleInputChange} // Added onChange handler
                required
              />
              <input
                type="email"
                placeholder="Contact Email"
                name="contact.email"
                value={selectedSponsor.contact.email}
                onChange={handleInputChange} // Added onChange handler
                required
              />
              <input
                type="text"
                placeholder="Contact Phone"
                name="contact.phone"
                value={selectedSponsor.contact.phone}
                onChange={handleInputChange} // Added onChange handler
              />
              <input
                type="text"
                placeholder="Package"
                name="package"
                value={selectedSponsor.package}
                onChange={handleInputChange} // Added onChange handler
                required
              />
              <button type="submit">Update</button>
            </form>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SponsorsManagement; */}
<div className="sponsor-list">
        {filteredSponsors.map((sponsor) => (
          <motion.div
            key={sponsor._id}
            className={`sponsor-item ${
              selectedSponsor === sponsor ? "selected" : ""
            }`}
            onClick={() => handleView(sponsor)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2>{sponsor.name}</h2>
            <p>{sponsor.category}</p>
            <p>{sponsor.status}</p>
          </motion.div>
        ))}
      </div>
      {selectedSponsor && (
        <div className="sponsor-details" ref={sponsorDetailsRef}>
          <h2>{isViewing ? "View" : "Edit"} Sponsor Details</h2>
          {isViewing ? (
            <>
              <p><strong>Name:</strong> {selectedSponsor.name}</p>
              <p><strong>Category:</strong> {selectedSponsor.category}</p>
              <p><strong>Contact Name:</strong> {selectedSponsor.contact.name}</p>
              <p><strong>Contact Email:</strong> {selectedSponsor.contact.email}</p>
              <p><strong>Contact Phone:</strong> {selectedSponsor.contact.phone}</p>
              <p><strong>Status:</strong> {selectedSponsor.status}</p>
              <p><strong>Event Name:</strong> {selectedSponsor.eventName}</p>
              <p><strong>Package:</strong> {selectedSponsor.package}</p>
              {selectedSponsor.status === "Rejected" && selectedSponsor.rejectionReason && (
                <p><strong>Rejection Reason:</strong> {selectedSponsor.rejectionReason}</p>
              )}
              <button onClick={() => handleEdit(selectedSponsor)}>Edit</button>
              {selectedSponsor.status === "Pending" && (
                <button onClick={handleApprove}>Approve</button>
              )}
              {selectedSponsor.status === "Rejected" ? (
                <button onClick={handleReactivate}>Reactivate</button>
              ) : (
                <button onClick={handleReject}>Reject</button>
              )}
              <button onClick={handleDelete}>Delete</button>
            </>
          ) : (
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={selectedSponsor.name}
                onChange={handleInputChange} // Added onChange handler
                required
              />
              <input
                type="text"
                placeholder="Category"
                name="category"
                value={selectedSponsor.category}
                onChange={handleInputChange} // Added onChange handler
                required
              />
              <input
                type="text"
                placeholder="Contact Name"
                name="contact.name"
                value={selectedSponsor.contact.name}
                onChange={handleInputChange} // Added onChange handler
                required
              />
              <input
                type="email"
                placeholder="Contact Email"
                name="contact.email"
                value={selectedSponsor.contact.email}
                onChange={handleInputChange} // Added onChange handler
                required
              />
              <input
                type="text"
                placeholder="Contact Phone"
                name="contact.phone"
                value={selectedSponsor.contact.phone}
                onChange={handleInputChange} // Added onChange handler
              />
               <input
                type="text"
                placeholder="Event Name"  // added new content--
                name="eventName"
                value={selectedSponsor.eventName}
                onChange={handleInputChange} // Added onChange handler
              />
              <input
                type="text"
                placeholder="Package"
                name="package"
                value={selectedSponsor.package}
                onChange={handleInputChange} // Added onChange handler
                required
              />
              <button type="submit">Update</button>
            </form>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SponsorsManagement;
