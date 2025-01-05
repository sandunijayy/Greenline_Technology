import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { FaUserAlt, FaUserTie } from "react-icons/fa";
import "animate.css/animate.min.css"; // Import Animate.css for animations
import MostBoughtItemsChart from "./MostBoughtItemsChart";
import CategoryProduct from "./CategoryproductChart";
import Employeemangers from "../../components/Employeemangers";
import { BsCart4 } from "react-icons/bs";
import { Card, Tooltip  } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import SalesReport from "./SalesReport";
const AnimatedNumber = ({ number }) => {
  const [animatedNumber, setAnimatedNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedNumber((prevNumber) => {
        if (prevNumber < number) {
          return prevNumber + 1;
        }
        return prevNumber;
      });
    }, 100); // Adjust the interval for smoother animation

    return () => clearInterval(interval);
  }, [number]);

  return <span>{animatedNumber}</span>;
};

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [totalUsers, setTotalUsers] = useState(0);
  const [employeeManagerCount, setEmployeeManagerCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [showChart, setShowChart] = useState(false);
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };
  const PrintComponent = ({ componentRef }) => {
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
  
    return <button onClick={handlePrint} style={{ background: "#4CAF50", color: "white", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Print as PDF</button>;
  };
  const [chartType, setChartType] = useState(""); // Add a state to store the chart type
  const [emailData, setEmailData] = useState({
    subject: "",
    message: "",
    recipients: [],
  });
  const [notProcessedCount, setNotProcessedCount] = useState(0); // Define notProcessedCount state

  useEffect(() => {
    axios
      .get("/api/v1/auth/admin/count")
      .then((response) => setTotalUsers(response.data.userCount))
      .catch((error) => console.error("Error fetching total users count:", error));

    axios
      .get("/api/v1/auth/admin/users/employeeManager/count")
      .then((response) => setEmployeeManagerCount(response.data.employeeManagerCount))
      .catch((error) => console.error("Error fetching employee managers count:", error));

    axios
      .get("/api/v1/auth/employee/count")
      .then((response) => setEmployeeCount(response.data.employeeCount))
      .catch((error) => console.error("Error fetching employee count:", error));

    axios
      .get("http://localhost:8085/api/v1/auth/notprocessed")
      .then((response) => setNotProcessedCount(response.data.count)) // Update state key to match backend response
      .catch((error) => console.error("Error fetching not processed order count:", error));
  }, []);

  const componentRef = useRef();

  const toggleChart = (type) => {
    setShowChart(!showChart);
    setChartType(type); // Update the chart type state
  };

  const handleEmailInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendEmail = async () => {
    try {
      const response =await axios.post("/api/v1/email/send", emailData);
      console.log("Email sent successfully:", response.data);
      // Clear email input fields after sending
      setEmailData({
        subject: "",
        message: "",
        recipients: [],
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <Layout >
      <div className="container-fluid p-3" >
        <div className="row" >
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9" ref={componentRef}>
            <h1 style={{ color: "#4CAF50", borderBottom: "2px solid #4CAF50", paddingBottom: "10px" }}>Green Line Technology Report</h1>
            <h3 className="card-title">{getGreeting()}</h3>
            <div style={{ 
  backgroundColor: '#f8f9fa',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  animation: 'fadeInRight 0.5s ease forwards',
  '@keyframes fadeInRight': {
    from: { opacity: 0, transform: 'translateX(20px)' },
    to: { opacity: 1, transform: 'translateX(0)' }
  }
}} className="card mb-4 animate__animated">
  <div style={{ textAlign: 'center', animation: 'bounceInDown 1s ease forwards' }}>
    <h3 style={{ color: '#007bff', fontSize: '24px', marginBottom: '10px' }}>Admin Information</h3>
    <h3 style={{ color: '#28a745', fontSize: '28px', animation: 'pulse 1.5s infinite' }}>Hello, {auth?.user?.name}!</h3>
    <style>{`
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      @keyframes bounceInDown {
        0% { transform: translateY(-50px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
    `}</style>
  </div>
  <div style={{ marginTop: '20px', animation: 'fadeIn 1s ease forwards' }}>
    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#6c757d' }}>
      <strong>Name:</strong> {auth?.user?.name}<br />
      <strong>Email:</strong> {auth?.user?.email}<br />
      <strong>Contact:</strong> {auth?.user?.phone}
    </p>
    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `}</style>
  </div>
</div>


<Link to="/dashboard/admin/calender">
      <Tooltip title="Click to see events"   style={{
        width: 300,
        animation: 'fadeInUp 0.5s ease-in-out',
      }}
      className="animated-card">
        <CalendarOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
      </Tooltip>

      </Link>

            <div className="row">
              <div className="col-md-4 animate__animated animate__fadeInUp">
              <div className="card mb-4 border border-primary rounded hover-shadow animate__animated animate__fadeInUp" style={{ backgroundColor: "#e8f5fe" }}>
  <div className="card-body d-flex flex-column align-items-center justify-content-center">
    <h3 className="card-title" style={{ color: "#007bff", marginBottom: "20px" }}>Total Users</h3>
    <div><FaUserAlt size={30} /></div>
    <span className="fw-bold" style={{ fontSize: "2rem" }}><AnimatedNumber number={totalUsers} /></span>
  </div>
</div>

              </div>

              <div className="col-md-4 animate__animated animate__fadeInUp">
                <div className="card mb-4 border border-primary rounded hover-shadow animate__animated animate__fadeInUp" style={{ backgroundColor: "#e8f5fe" }}>
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <h3 className="card-title" style={{ color: "#007bff", marginBottom: "20px" }}>Employee Managers</h3>
                    <div><FaUserTie size={30} /></div>
                    <span className="fw-bold" style={{ fontSize: "2rem" }}><AnimatedNumber number={employeeManagerCount} /></span>
                  </div>
                </div>
              </div>

              <div className="col-md-4 animate__animated animate__fadeInUp">
                <div className="card mb-4 border border-primary rounded hover-shadow animate__animated animate__fadeInUp" style={{ backgroundColor: "#e8f5fe" }}>
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <h3 className="card-title" style={{ color: "#007bff", marginBottom: "20px" }}>Employees</h3>
                    <div><FaUserAlt size={30} /></div>
                    <span className="fw-bold" style={{ fontSize: "2rem" }}><AnimatedNumber number={employeeCount}/></span>
                  </div>
                </div>
              </div>

            </div>

            <div className="row">
              <div className="col-md-6 animate__animated animate__fadeInLeft">
              <div className="card mb-4 border border-primary rounded animate__animated animate__fadeInLeft" style={{ backgroundColor: "#e8f5fe" }}>
  <Link to="/dashboard/admin/chart" style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className="card-body">
      <h3 className="card-title" style={{ color: "#007bff", marginBottom: "10px" }}>Most Bought Items</h3>
      <div className="col-md-12 animate__animated animate__fadeInLeft">
        <MostBoughtItemsChart />
      </div>
    </div>
  </Link>
</div>
                <div className="col-md-9 animate__animated animate__fadeInLeft">
                <div className="card mb-4 border border-primary rounded animate__animated animate__fadeInLeft" style={{ backgroundColor: "#e8f5fe" }}>
               <div className="card-body d-flex flex-column align-items-center justify-content-center animate__animated animate__fadeInLeft">
                <h3 className="card-title" style={{ color: "#007bff", marginBottom: "20px" }}>Not Processed Orders</h3>
           <div><BsCart4 /></div>
        <span className="fw-bold" style={{ fontSize: "2rem" }}>{notProcessedCount}</span>
    </div>
</div>

</div>

              </div>

              <div className="col-md-6 animate__animated animate__fadeInRight">
                <div className="card mb-4 border border-primary rounded animate__animated animate__fadeInRight" style={{ backgroundColor: "#e8f5fe" }}>
                <Link to="/dashboard/admin/chart2" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card-body">
                    <h3 className="card-title" style={{ color: "#007bff", marginBottom: "10px" }}>Category Product</h3>
                    <div className="col-md-12 animate__animated animate__fadeInRight">
                      <CategoryProduct />
                    </div>
                  </div>
                  </Link>
                </div>
                
              </div>

              <div className="col-md-8 animate__animated animate__fadeInUp">
                <div className="card mb-4 border border-primary rounded animate__animated animate__fadeInUp" style={{ backgroundColor: "#e8f5fe" }}>
                  <div className="card-body">
                    <Employeemangers/>
                  </div>
                </div>
              </div>
              <div className="col-md-8 animate__animated animate__fadeInUp">
                <div className="card mb-4 border border-primary rounded animate__animated animate__fadeInUp" style={{ backgroundColor: "#e8f5fe" }}>
                  <div className="card-body">
                    <SalesReport/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    < div><PrintComponent componentRef={componentRef} /></div> 
    </Layout>
    
  );
};

export default AdminDashboard;

