import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "antd";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import UserMenu from "../../components/Layout/UserMenu";

const AllContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reportMode, setReportMode] = useState(false); // Define reportMode state

    useEffect(() => {
        fetchContacts();
    }, []);

    //report
    const [report, setReport] = useState([]);

    useEffect(() => {
        fetchReport();
    }, []);

    //report
    const fetchReport = async () => {
        try {
            const response = await axios.get("/api/v1/getcontact/report");
            setReport(response.data);
        } catch (error) {
            console.error("Error fetching report:", error);
        }
    };

    const fetchContacts = async () => {
        try {
            const response = await axios.get("/api/v1/getcontact/get-contact");
            setContacts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching contacts:", error);
            setLoading(false);
        }
    };
    const handleDelete = async (contactId) => {
        try {
            // Ask for confirmation before deleting
            const confirmed = window.confirm("Are you sure you want to delete this contact?");
            if (!confirmed) {
                return; // Cancel deletion if not confirmed
            }

            await axios.delete(`/api/v1/getcontact/Deletecontact/${contactId}`);

            // Remove the deleted contact from the state
            setContacts((prevContacts) =>
                prevContacts.filter((contact) => contact._id !== contactId)
            );
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };



    return (
        <Layout title={"Dashboard - All Users"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        
                <h1>All Contacts</h1>
                <div>
                    <button onClick={() => setReportMode(false)}>View All Contacts</button>
                    <button onClick={() => setReportMode(true)}>View Contact Query Report</button>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {reportMode ? (
                            <div>
                                <h2>Contact Query Report</h2>
                                <ul>
                                    {report.map((item) => (
                                        <li key={item._id}>
                                            {item._id}: {item.count}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Query Type</th>
                                        <th>Message</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map((contact) => (
                                        <tr key={contact._id}>
                                            <td>{contact.name}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.queryType}</td>
                                            <td>{contact.message}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(contact._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
            </div>
            </div>

        </Layout>
    );
};

export default AllContacts;

