import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  likeUnlikePost,
  replyPost,
  getFeedPosts,
} from "../Controllers/posts.js";
import { protectRouteMid } from "../middleware/protectRoute.js";
const router = express.Router();

router.get("/feed/", protectRouteMid, getFeedPosts);
router.get("/:id", getPost);
router.post("/like/:id", protectRouteMid, likeUnlikePost);
router.post("/reply/:id", protectRouteMid, replyPost);
router.delete("/:id", protectRouteMid, deletePost);
router.post("/create", protectRouteMid, createPost);

export default router;
