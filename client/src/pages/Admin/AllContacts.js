import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";

const AllContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

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
        <Layout title={"All Contacts"}>
            <div className="container">
                <h1>All Contacts</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Query Type</th>
                                <th>Message</th>
                                <th>Delete</th> {/* New column for delete button */}
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
                                            className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit" style={{backgroundColor: '#ba2913', color: 'white'}}
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
        </Layout>
    );
};

export default AllContacts;
