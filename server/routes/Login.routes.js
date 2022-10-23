import express from "express";
import { login, logout } from "../controllers/Login.controller.js";
import Authentification from "../middlewares/Authentification.middleware.js";
const LoginRouter = express.Router();
LoginRouter.post("/login/", login);
LoginRouter.get("/logout/:id", Authentification, logout);
export default LoginRouter;
