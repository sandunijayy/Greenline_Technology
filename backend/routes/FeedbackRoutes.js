import express from "express";
import { 
  createFeedbackController, 
  readAllFeedbackController, 
  readFeedbackController, 
  updateFeedbackController, 
  deleteFeedbackController 
} from  './../controllers/FeedbackController.js';
import { requireSignIn } from "../middlewares/authMiddleware.js";
import Feedback from "../models/feedbackModel.js";

const router = express.Router();

// Create feedback route
router.post("/create-feedback",requireSignIn, createFeedbackController);

// Read all feedback route
router.get("/get-feedback", requireSignIn,readAllFeedbackController);

// Read feedback by ID route
router.get("/Onefeedback/:id", requireSignIn,readFeedbackController);

// Update feedback by ID route
router.put("/Updatefeedback/:id",requireSignIn, updateFeedbackController);

// Delete feedback by ID route
router.delete("/Deletefeedback/:id", deleteFeedbackController);

router.get('/pie-chart', async (req, res) => {
  try {
    const feedbackCounts = await Feedback.aggregate([
      {
        $group: {
          _id: '$serviceType',
          count: { $sum: 1 }
        }
      }
    ]);

    const chartData = {
      labels: ['Good', 'Bad', 'Neutral'],
      datasets: [
        {
          label: 'Feedback Counts',
          data: [0, 0, 0], // Initialize counts to zero
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)', // Blue
            'rgba(255, 99, 132, 0.6)', // Red
            'rgba(255, 206, 86, 0.6)' // Yellow
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }
      ]
    };

    feedbackCounts.forEach(feedback => {
      switch (feedback._id) {
        case 'good':
          chartData.datasets[0].data[0] = feedback.count;
          break;
        case 'bad':
          chartData.datasets[0].data[1] = feedback.count;
          break;
        case 'neutral':
          chartData.datasets[0].data[2] = feedback.count;
          break;
        default:
          break;
      }
    });

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
