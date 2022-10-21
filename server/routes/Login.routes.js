import express from "express";
import { login } from "../controllers/Login.controller.js";
const LoginRouter = express.Router();
LoginRouter.post("/login/", login);
export default LoginRouter;
