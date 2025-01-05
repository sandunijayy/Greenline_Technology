import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import UserManagerMenu from "../../components/Layout/UserManagerMenu";
import UserRegistrationChart from "./UserRegistrationChart";
import PieChartUsers from "./PieChartUsers";

const UsermanagerDashboard = () => {
  const [auth] = useAuth(); // Use the useAuth hook to access authentication data

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserManagerMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <strong>Name: {auth?.user?.name}</strong>
              <br />
              <strong>Email: {auth?.user?.email}</strong>
              <br />
              <strong>Contact: {auth?.user?.phone}</strong>
            </div>

            <div className="col-md-6">
              <div
                className="card mb-4 border border-primary rounded"
                style={{ backgroundColor: "#e8f5fe" }}
              >
                <div className="card-body">
                  <h3
                    className="card-title"
                    style={{ color: "#007bff", marginBottom: "10px" }}
                  >
                    User Ragistration data grouped by month
                  </h3>
                  <div className="col-md-12">
                    <UserRegistrationChart />
                  </div>
                  <div>
                    
                  </div>
                </div>

    

              </div>

              <div className="card-body">
                  <h3
                    className="card-title"
                    style={{ color: "#007bff", marginBottom: "10px" }}
                  >
                    User Ragistration data grouped by month
                  </h3>
                  <div className="col-md-12">
                    <PieChartUsers />
                  </div>
                  <div>
                    
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UsermanagerDashboard;
