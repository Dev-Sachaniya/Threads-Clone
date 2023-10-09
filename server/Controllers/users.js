import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../helper/generateTokenCookie.js";

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] }); // if the user with given email or username exists

    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPassCorrect = await bcrypt.compare(password, user?.password || ""); //if username not found then how are we gonna compare the bcrypt , that's why conditional matching
    if (!user || !isPassCorrect) {
      return res.status(400).json({ message: "invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "user logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const followAndUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id); // the one who is going to get followed
    const currentUser = await User.findById(req.user._id); // the one who is going to follow
    if (id == req.user._id) {
      return res
        .status(500)
        .json({ message: "cannot follow yourself you fool" });
    }
    if (!userToModify || !currentUser)
      return res.status(400).json({ message: "user not found" });

    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      //unfollow it
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } }); // update following array of curr user to remove the user whom got unfollowed
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } }); // update follower array of user who got unfollowed , so sad
      res.status(201).json({ message: "user unfollowed successfully" });
    } else {
      // follow it
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } }); // push user id whom got followed to curr user's following array
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } }); // push curr user id to followers array of user who got followed
      res.status(201).json({ message: "user followed successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { name, email, username, password, profilePic, bio } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "user not found" });
    if (req.params.id !== userId.toString())
      return res.status(400).json({ message: "unauthorised" });
    if (password) {
      const salt = bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();
    res.status(200).json({ message: "user updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "login to update the profile" });
  }
};

const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username })
      .select("-password")
      .select("-updatedAt");
    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export {
  signupUser,
  loginUser,
  logoutUser,
  followAndUnfollowUser,
  updateUser,
  getUser,
};
