const Post = require("../../models/Posts");
const Posts = require("../../models/Posts");
const User = require("../../models/User");

exports.createPosts = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const post = await Posts.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ msg: "error: " + err.message });
  }
};

exports.getFeedPosts = async (req, res) => {
  try {
    const post = await Posts.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(409).json({ msg: "error: " + err.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Posts.find(userId);
    res.status(200).json(post);
  } catch (err) {
    res.status(409).json({ msg: "error: " + err.message });
  }
};

exports.likePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(409).json({ msg: "error: " + err.message });
  }
};
