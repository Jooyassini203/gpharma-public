import express from "express";
import {
  gerneratePdf
} from "../controllers/Download.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const AccueilRouter = express.Router();

AccueilRouter.get("/download/pdf/vente/:id", Autentification, gerneratePdf); 

export default AccueilRouter;
