import React,{useEffect, useState} from "react";
import AgentSidebar from "../components/AgentSidebar";
import AgentDashboardStats from "../components/AgentDashboardStats";
import BookingStatisticsCard from "../components/BookingStatisticsCard";
import EarningsCard from "../components/EarningsCard";
import RecentlyAdded from "../components/RecentlyAdded";
import LatestInvoices from "../components/LatestInvoices";
import AddLists from "../components/AddLists";
import RecentHotelBookings from "../components/RecentHotelBookings";
import { getAccount, getTourAdmin, getTourOpPaymentHistory,getBookingAdmin,getFeedbackAdmin } from "../services/adminService";

import RecentTourBookings from "../components/RecentTourBookings";
const AgentDashboard = () => {
const [tourOpPaymentHistory, setTourOpPaymentHistory] = useState([]);
const [accounts, setAccounts] = useState([]);
const [tours, setTours] = useState([]);
const [bookings, setBookings] = useState([]);
const [feedback, setFeedback] = useState([]);
useEffect(() => {
  const fetchTourOpPaymentHistory = async () => {
    try {
      const data = await getTourOpPaymentHistory();
      setTourOpPaymentHistory(data);
    } catch (error) {
      console.error('Error fetching tour operator payment history:', error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const data = await getAccount();
      setAccounts(data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const fetchTours = async () => {
    try {
      const data = await getTourAdmin();
      setTours(data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };
const fetchBookings = async () => {
    try {
      const data = await getBookingAdmin();
      console.log("Bookings Data:", data);
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };
  const fetchAllFeedback = async () => {
    try {
      const data = await getFeedbackAdmin();
      console.log("Feedback Data:", data?.data?.feedbacks);
      setFeedback(data?.data?.feedbacks);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };
  fetchAllFeedback();
  fetchTourOpPaymentHistory();
  fetchAccounts();
  fetchTours();
    fetchBookings();
}, []);

return (
  <div className="container">
    <div className="row">
      {/* Sidebar */}
      <AgentSidebar />

      {/* Main content */}
      <div className="col-xl-9 col-lg-8">
        {/* Stats */}
        <div id="dashboard-stats">
          <AgentDashboardStats
            totalBookings={bookings?.bookings?.length}
            totalListings={tours?.data?.length}
            totalIncome={tourOpPaymentHistory?.data?.reduce((sum, inv) => sum + (inv.amount || 0), 0) || 0}
            totalReviews={feedback?.length}
          />
        </div>

        <div className="row">
  {/* Recently Added */}
  <div id="recently-added" className="col-xl-6 col-xxl-5 d-flex">
    <RecentlyAdded accounts={accounts} />
  </div>
  {/* Latest Invoices */}
  <div id="latest-invoices" className="col-xxl-7 col-xl-6 d-flex">
    <LatestInvoices tourOpPaymentHistory={tourOpPaymentHistory} />
  </div>
</div>

      
      </div>
    </div>
  </div>
);

    };

export default AgentDashboard;