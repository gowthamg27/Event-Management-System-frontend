import React, { useState } from 'react';
import './PaymentProcessingPage.css';

const PaymentProcessingPage = () => {
  const [paymentOverview, setPaymentOverview] = useState({
    totalRevenue: 50000,
    pendingPayments: 5000,
    completedPayments: 45000
  });

  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('all');

  const [newPayment, setNewPayment] = useState({
    attendeeName: '',
    paymentMethod: '',
    amount: '',
    date: '',
    status: 'pending'
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddPayment = () => {
    // Implement add payment functionality
    setTransactions([...transactions, { ...newPayment, id: Date.now() }]);
    setNewPayment({
      attendeeName: '',
      paymentMethod: '',
      amount: '',
      date: '',
      status: 'pending'
    });
  };

  const handleExportTransactions = () => {
    // Implement export transactions functionality
  };

  const handleGenerateReport = () => {
    // Implement generate report functionality
  };

  return (
    <div className="payment-processing-page">
      <header>
        <button className="back-button">Back</button>
        <h1>Payment Processing</h1>
      </header>

      <section className="payment-overview">
        <div className="summary-box">
          <h2>Total Revenue</h2>
          <p>${paymentOverview.totalRevenue}</p>
        </div>
        <div className="summary-box">
          <h2>Pending Payments</h2>
          <p>${paymentOverview.pendingPayments}</p>
        </div>
        <div className="summary-box">
          <h2>Completed Payments</h2>
          <p>${paymentOverview.completedPayments}</p>
        </div>
      </section>

      <section className="payment-transactions">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={filterPaymentMethod}
            onChange={(e) => setFilterPaymentMethod(e.target.value)}
          >
            <option value="all">All Payment Methods</option>
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>

        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction ID</th>
              <th>Attendee Name</th>
              <th>Payment Method</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.id}</td>
                <td>{transaction.attendeeName}</td>
                <td>{transaction.paymentMethod}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {/* Add pagination controls */}
        </div>
      </section>

      <section className="manual-payment-entry">
        <h2>Manual Payment Entry</h2>
        <form>
          <input
            type="text"
            placeholder="Attendee Name"
            value={newPayment.attendeeName}
            onChange={(e) => setNewPayment({ ...newPayment, attendeeName: e.target.value })}
          />
          <select
            value={newPayment.paymentMethod}
            onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value })}
          >
            <option value="">Select Payment Method</option>
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={newPayment.amount}
            onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
          />
          <input
            type="date"
            value={newPayment.date}
            onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
          />
          <select
            value={newPayment.status}
            onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button type="button" onClick={handleAddPayment}>Add Payment</button>
        </form>
      </section>

      <section className="export-reports">
        <button onClick={handleExportTransactions}>Export Transactions</button>
        <button onClick={handleGenerateReport}>Generate Report</button>
      </section>
    </div>
  );
};

export default PaymentProcessingPage;