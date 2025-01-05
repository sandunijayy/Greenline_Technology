import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';

const UpdatePosts = ({ fetchPosts }) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [postData, setPostData] = useState({
    topic: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`/api/v1/post/get-posts/${postId}`);
        const postData = response.data.data;
        setPostData(postData);
      } catch (error) {
        console.error('Error fetching post data:', error);
        toast.error('Failed to fetch post data. Please try again.');
      }
    };

    fetchPostData();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/post/update-posts/${postId}`, postData);

      if (data?.success) {
        console.log(`${postData.topic} is updated`);
        fetchPosts();
        toast.success('Post updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        navigate('/get-posts');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update post. Please try again.');
    }
  };

  return (
    <Layout title={'Dashboard - Update Post'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Post</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="topic" className="form-label">Topic</label>
                <input type="text" id="topic" name="topic" className="form-control" value={postData.topic} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea id="description" name="description" className="form-control" rows="5" value={postData.description} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" id="category" name="category" className="form-control" value={postData.category} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdatePosts;
