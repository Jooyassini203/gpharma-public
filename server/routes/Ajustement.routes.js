import express from "express";
import {
  getAll,
  getAjustementDetails,
  getSpecific,
  createOne,
} from "../controllers/Ajustement.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const AjustementRouter = express.Router();
AjustementRouter.get("/Ajustement/", Autentification, getAll);
AjustementRouter.get(
  "/AjustementDetails/:ajustement_id",
  Autentification,
  getAjustementDetails
);
AjustementRouter.get("/Ajustement/:id", Autentification, getSpecific);
AjustementRouter.post("/Ajustement/", Autentification, createOne);
export default AjustementRouter;
