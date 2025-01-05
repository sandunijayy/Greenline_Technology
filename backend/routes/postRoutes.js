import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createPostController,
  deletePostController,
  getPostController,
  getPostsLikes,
  getSinglePostController,
  updatePostController,
  reactToPostController, 
  // Import the new controller function
} from "../controllers/postController.js";

const router = express.Router();

// Save posts
router.post("/create-post", requireSignIn, isAdmin, createPostController);

router.get("/get-posts", getPostController);

router.get("/get-posts/:id", getSinglePostController);


router.put("/update-posts/:id", requireSignIn, isAdmin, updatePostController);

router.delete(
  "/delete-posts/:id",
  requireSignIn,
  isAdmin,
  deletePostController
);

// New route for reacting to posts
router.post("/react-to-post/:id", requireSignIn, reactToPostController);

router.get('/posts/likes', getPostsLikes);

export default router;
