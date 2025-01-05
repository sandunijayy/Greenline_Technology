import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SubmissionPage.css'; // Import CSS file for styling
import Layout from '../../components/Layout/Layout';

const FeedbackDashboard = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatedFormData, setUpdatedFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceType: '',
    ratings: 0,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:8085/api/v1/feedback/get-feedback');
      setFeedbackList(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setError('An error occurred while fetching feedback');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (feedbackId) => {
    const feedback = feedbackList.find((feedback) => feedback._id === feedbackId);
    setSelectedFeedback(feedback);
    setUpdatedFormData({ ...feedback });
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.put(`http://localhost:8085/api/v1/feedback/Updatefeedback/${selectedFeedback._id}`, updatedFormData);

      setFeedbackList((prevFeedbackList) =>
        prevFeedbackList.map((feedback) =>
          feedback._id === selectedFeedback._id ? { ...feedback, ...updatedFormData } : feedback
        )
      );

      setSelectedFeedback(null);
      setUpdatedFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        serviceType: '',
        ratings: 0,
      });
      console.log('Feedback updated successfully');
    } catch (error) {
      console.error('Error updating feedback:', error);
      setError('An error occurred while updating feedback');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (feedbackId) => {
    setIsLoading(true);
    setError(null);

    try {
      const confirmed = window.confirm('Are you sure you want to delete this feedback?');

      if (confirmed) {
        await axios.delete(`http://localhost:8085/api/v1/feedback/Deletefeedback/${feedbackId}`);
        setFeedbackList((prevFeedbackList) => prevFeedbackList.filter((feedback) => feedback._id !== feedbackId));
        console.log('Feedback deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
      setError('An error occurred while deleting feedback');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarRating = (value) => {
    setUpdatedFormData((prevState) => ({
      ...prevState,
      ratings: value,
    }));
  };

  const getRatingLabel = (rating) => {
    switch (rating) {
      case 1:
        return 'Very Bad';
      case 2:
        return 'Unsatisfied';
      case 3:
        return 'Neutral';
      case 4:
        return 'Good';
      case 5:
        return 'Perfect';
      default:
        return 'Unknown';
    }
  };

  return (
    <div>
    <Layout title={"Card Home"}>
    {/* Page Header Start */}
    <div>
      <div className="page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
    
      <div class="container">
          <div class="row">
              <div class="col-lg-12">
                  <div class="ltn__breadcrumb-inner">
                      <h1 class="page-title text-black">Feedbacks</h1>
                      <div class="ltn__breadcrumb-list">
                          <ul>
                              <li><a href="/" class="text-black"><span class="text-black"><i class="fas fa-home"></i></span> Home</a></li>
                              <li>Feedbacks Page</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>
<div>
<div class="ltn__contact-message-area mb-40 mb--500">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ltn__form-box contact-form-box box-shadow white-bg">
                    <div className="p-4">
      <h1>Feedback Submissions</h1>
      {isLoading && <p>Loading feedback...</p>}
      {error && <p className="error-message">{error}</p>}
      {!isLoading && !error && (
        <>
          <div className="table-container">
            <table className="feedback-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Service Type</th>
                  <th>Ratings</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbackList.map((feedback, index) => (
                  <tr key={index}>
                    <td>{feedback.name}</td>
                    <td>{feedback.email}</td>
                    <td>{feedback.phone}</td>
                    <td>{feedback.message}</td>
                    <td>{feedback.serviceType}</td>
                    <td>{getRatingLabel(feedback.ratings)}</td>
                    <td>
      <div className="ltn__contact-message-area mb-20 mb--500">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <button
              className="btn theme-btn-1 btn-effect-1 text-uppercase"
              onClick={() => handleEdit(feedback._id)}
            >
              Update
            </button>
            <button
              className="btn theme-btn-1 btn-effect-1 text-uppercase" style={{backgroundColor: '#ba2913', color: 'white'}}
              onClick={() => handleDelete(feedback._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedFeedback && (
            


            <div className="edit-feedback-modal">
              <h2>Edit Feedback</h2>
              <form onSubmit={handleUpdate}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={updatedFormData.name}
                  onChange={(e) => setUpdatedFormData({ ...updatedFormData, name: e.target.value })}
                  required
                />
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={updatedFormData.email}
                  onChange={(e) => setUpdatedFormData({ ...updatedFormData, email: e.target.value })}
                  required
                />
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  value={updatedFormData.phone}
                  onChange={(e) => setUpdatedFormData({ ...updatedFormData, phone: e.target.value })}
                  required
                />
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  value={updatedFormData.message}
                  onChange={(e) => setUpdatedFormData({ ...updatedFormData, message: e.target.value })}
                  required
                />
                <label htmlFor="serviceType">Service Type:</label>
                <select
                  id="serviceType"
                  value={updatedFormData.serviceType}
                  onChange={(e) => setUpdatedFormData({ ...updatedFormData, serviceType: e.target.value })}
                  required
                >
                  <option value="">Select service type</option>
                  <option value="Good">Good</option>
                  <option value="Bad">Bad</option>
                  <option value="Neutral">Neutral</option>
                </select>

                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      className={`star ${value <= updatedFormData.ratings ? 'selected' : ''}`}
                      onClick={() => handleStarRating(value)}
                    >
                      ⭐️
                    </button>
                  ))}
                </div>
                <button type="submit">Update Feedback</button>
              </form>
              <button onClick={() => setSelectedFeedback(null)}>Close</button>
            </div>
          )}
        </>
      )}
    </div>
</div>
</div>
</div>
</div>
</div>
</div>
  
</Layout>  
  </div>
  );
};

export default FeedbackDashboard;
