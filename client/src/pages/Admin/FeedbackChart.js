import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const FeedbackChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pie-chart');
        const data = response.data;

        if (!data || !data.labels || !data.datasets) {
          setError('Invalid data format');
        } else {
          setChartData(data);
        }
      } catch (error) {
        console.error('Error fetching feedback data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackData();
  }, []);

  return (
    <div>
      <h2>Feedback Chart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : !chartData.labels || chartData.labels.length === 0 ? (
        <p>No data available</p>
      ) : (
        <Pie
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default FeedbackChart;
