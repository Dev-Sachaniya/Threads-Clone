import Post from "../models/post.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const createPost = async (req, res) => {
  try {
    const { postedBy, text, img } = req.body;

    if (!postedBy || !text)
      return res
        .status(500)
        .json({ message: "Please provide text and postedBy " });

    const user = await User.findById(postedBy);
    if (!user) return res.status(404).json({ message: "user not found" });
    if (user._id.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "don't be an angle priya" });

    const maxLength = 500;
    if (text.length > maxLength)
      return res
        .status(401)
        .json({ message: "cannot write more than 500 characteers" });

    const newPost = new Post({
      postedBy,
      text,
      image: img,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).json({ message: "No post found" });
    }
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "unauthorised" });
    }
    await Post.findByIdAndDelete(id);
    return res.status(201).json({ message: "deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!postId) {
      return res.status(404).json({ message: "post not found" });
    }
    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      // if the post is liked by the user then we must unlike it ifthe user clicks on it again
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "unliked" });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      return res.status(200).json({ message: "liked" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const replyPost = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: postId } = req.params; // here we have rename the id as postId,nothing new
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;

    if (!text) {
      return res.status(400).json({ message: "Text field is required" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const reply = { userId, text, userProfilePic, username };
    post.replies.push(reply);
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    req.status(500).json({ message: error.message });
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const following = user.following;
    const feedPost = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    }); // it means find all the post in which postedBy id of the post should in user's following array
    return res.status(200).json({ feedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export {
  replyPost,
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  getFeedPosts,
};
