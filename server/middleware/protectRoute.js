import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRouteMid = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.json({ message: "unauthorised " });
    }
    const decoded = await jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { protectRouteMid };
