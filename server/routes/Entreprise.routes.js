import express from "express";
import { 
  getSpecific,
  createOne,
  updateOne, 
} from "../controllers/Entreprise.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const EntrepriseRouter = express.Router(); 
EntrepriseRouter.get("/Entreprise/:id", Autentification, getSpecific);
EntrepriseRouter.post("/Entreprise/", Autentification, createOne);
EntrepriseRouter.put("/Entreprise/:id", Autentification, updateOne); 
export default EntrepriseRouter;
