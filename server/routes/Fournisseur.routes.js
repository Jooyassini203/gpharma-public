import express from "express";
import {
  getAll,
  getSpecific,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/Fournisseur.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const FournisseurRouter = express.Router();
FournisseurRouter.get("/Fournisseur/", Autentification, getAll);
FournisseurRouter.get("/Fournisseur/:id", Autentification, getSpecific);
FournisseurRouter.post("/Fournisseur/", Autentification, createOne);
FournisseurRouter.put("/Fournisseur/:id", Autentification, updateOne);
FournisseurRouter.delete("/Fournisseur/:id", Autentification, deleteOne);
export default FournisseurRouter;
