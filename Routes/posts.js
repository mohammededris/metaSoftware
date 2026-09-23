import express from "express";
import {
  createPostSchema,
  updatePostSchema,
} from "../Middlewares/Validations/post.js";
import { verifyToken } from "../Middlewares/auth.js";
import { validate } from "../Middlewares/Validations/validate.js";

import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} from "../Controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", verifyToken, validate(createPostSchema), createPost);
router.put("/:id", verifyToken, validate(updatePostSchema), updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;
