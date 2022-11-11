import express from "express";
import {
  getStatGeneral,
  getStatVente,
} from "../controllers/Accueil.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const AccueilRouter = express.Router();
AccueilRouter.get("/Accueil/StatGeneral", Autentification, getStatGeneral);
AccueilRouter.get(
  "/Accueil/StatVente/:YearMonth",
  Autentification,
  getStatVente
);
export default AccueilRouter;
