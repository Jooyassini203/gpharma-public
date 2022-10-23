import express from "express";
import { login, logout, reloadDataUser } from "../controllers/Login.controller.js";
import Authentification from "../middlewares/Authentification.middleware.js";
const LoginRouter = express.Router();
LoginRouter.post("/login/", login);
LoginRouter.get("/logout/:id", Authentification, logout);
LoginRouter.get("/reloadDataUser/:id", Authentification, reloadDataUser);
export default LoginRouter;
