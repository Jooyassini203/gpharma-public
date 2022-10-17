import express from "express";
import { getCount } from "../controllers/Parametre.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const ParametreRouter = express.Router();

ParametreRouter.get("/count/:name_parametre", Autentification, getCount);

export default ParametreRouter;
