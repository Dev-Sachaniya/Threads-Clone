import express from "express";
import { protectRouteMid } from "../middleware/protectRoute.js";
import {
  signupUser,
  logoutUser,
  loginUser,
  followAndUnfollowUser,
  updateUser,
  getUser,
} from "../Controllers/users.js";
const router = express.Router();

router.get("/profile/:username", getUser);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRouteMid, followAndUnfollowUser);
router.post("/update/:id", protectRouteMid, updateUser);

export default router;
