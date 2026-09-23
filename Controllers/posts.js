import Posts from "../Models/Post.js";
import User from "../Models/User.js";

// GET /posts: Public route to view all blog posts.
const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /posts: Protected route to create a new post (linked to the logged-in user).
const createPost = async (req, res) => {
  const userId = req.user.id; // Assuming the user ID is stored in req.user after token verification
  try {
    const { title, content } = req.body;

    const newPost = new Posts({ title, content, authorId: userId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /posts/:id: Protected route to update a post (only if the user is the owner).
const updatePost = async (req, res) => {
  const post = await Posts.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  if (post.authorId !== req.user.id) {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedPost = await Posts.findByIdAndUpdate(
      id,
      { title, content },
      { new: true },
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /posts/:id: Protected route to delete a post (only if the user is the owner).
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Posts.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { getPosts, createPost, updatePost, deletePost };
