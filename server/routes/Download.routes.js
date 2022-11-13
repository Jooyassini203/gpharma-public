import express from "express";
import { gerneratePdf } from "../controllers/Download.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const DownloadRouter = express.Router();

DownloadRouter.get("/download/pdf/vente/:id", Autentification, gerneratePdf); 

export default DownloadRouter;
