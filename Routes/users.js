import express from "express";
import {
  createUserSchema,
  loginUserSchema,
} from "../Middlewares/Validations/user.js";


import { validate } from "../Middlewares/Validations/validate.js";

import { register, login } from "../Controllers/users.js";

const router = express.Router();

router.post("/register", validate(createUserSchema), register);
router.post("/login", validate(loginUserSchema), login);

export default router;
