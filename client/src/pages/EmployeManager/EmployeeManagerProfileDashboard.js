import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import EmployeeMangerMenu from "../../components/Layout/EmployeeMangerMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { FaUserAlt } from "react-icons/fa";
import EmployeeDistribution from "./EmployeeDistribution.js";
import AttendanceCountChart from "./AttendanceCountChart.js";


const EmployeeManagerProfileDashboard = () => {
  const [auth] = useAuth();
  const [totalEmployeeCount, setTotalEmployeeCount] = useState(0);
  const [hardwareEmployeeCount, setHardwareEmployeeCount] = useState(0);
  const [softwareEmployeeCount, setSoftwareEmployeeCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/auth/employee/totalcount")
      .then((response) => {
        console.log("Total Employee Count Response:", response.data);
        setTotalEmployeeCount(response.data.employeeCount); // Check if the property name is correct
      })
      .catch((error) => {
        console.error("Error fetching total employee count:", error);
        setTotalEmployeeCount(0); // Set a default value or handle error state
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/v1/auth/hardware-employee/count")
      .then((response) => {
        console.log("Hardware Employee Count Response:", response.data);
        setHardwareEmployeeCount(response.data.hardwareEmployeeCount);
      })
      .catch((error) => {
        console.error("Error fetching hardware employee count:", error);
        setHardwareEmployeeCount(0);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/v1/auth/software-employee/count")
      .then((response) => {
        console.log("Software Employee Count Response:", response.data);
        setSoftwareEmployeeCount(response.data.softwareEmployeeCount);
      })
      .catch((error) => {
        console.error("Error fetching software employee count:", error);
        setSoftwareEmployeeCount(0);
      });
  }, []);

  console.log("Total Employee Count:", totalEmployeeCount);
  console.log("Hardware Employee Count:", hardwareEmployeeCount);
  console.log("Software Employee Count:", softwareEmployeeCount);

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <EmployeeMangerMenu />
          </div>
          <div className="col-md-9">
       
              <div className="card mb-4 border border-primary rounded hover-shadow" style={{ backgroundColor: "#d3e0dc" }}>
                <div className="card-body">
                  <h3 className="card-title">Employee Manager Information</h3>
                  <p className="card-text">
                    <strong style={{ color: "#4f3f3e" }}>Name:</strong> {auth?.user?.name}
                    <br />
                    <strong style={{ color: "#4f3f3e" }}>Email:</strong> {auth?.user?.email}
                    <br />
                    <strong style={{ color: "#4f3f3e" }}>Address:</strong> {auth?.user?.address}
                    <br />
                    <strong style={{ color: "#4f3f3e" }}>Contact:</strong> {auth?.user?.phone}
                  </p>
                </div>
              </div> 
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4 border border-primary rounded hover-shadow" style={{ backgroundColor: "#88e8dc" }}>
                  <div className="card-body">
                    <h3 className="card-title" style={{ color: "#007bff", marginBottom: "10px" }}>Total Employees</h3>
                    <div className="d-flex justify-content-between align-items-center">
                      <FaUserAlt size={30} />
                      <span className="fw-bold">{totalEmployeeCount}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 border border-primary rounded hover-shadow" style={{ backgroundColor: "#fcd1d1" }}>
                  <div className="card-body">
                    <h3 className="card-title" style={{ color: "#007bff", marginBottom: "10px" }}>Hardware Employees</h3>
                    <div className="d-flex justify-content-between align-items-center">
                      <FaUserAlt size={30} />
                      <span className="fw-bold">{hardwareEmployeeCount}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 border border-primary rounded hover-shadow" style={{ backgroundColor: "#fde780" }}>
                  <div className="card-body">
                    <h3 className="card-title" style={{ color: "#007bff", marginBottom: "10px" }}>Software Employees</h3>
                    <div className="d-flex justify-content-between align-items-center">
                      <FaUserAlt size={30} />
                      <span className="fw-bold">{softwareEmployeeCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <EmployeeDistribution />
              </div>
              <div className="col-md-6">
                <AttendanceCountChart />
              </div>
            </div>
            
          </div>
        </div>
 
    </Layout>
  );
};

export default EmployeeManagerProfileDashboard;