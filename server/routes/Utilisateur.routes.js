import express from "express";
import {
  getAll,
  getSpecific,
  createOne,
  changePwd,
  updateOne,
  deleteOne,
} from "../controllers/utilisateur.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const UtilisateurRouter = express.Router();

UtilisateurRouter.get("/utilisateurs/:id", Autentification, getAll);
UtilisateurRouter.get("/utilisateur/:id", Autentification, getSpecific);
UtilisateurRouter.post("/utilisateur/", Autentification, createOne);
UtilisateurRouter.put("/utilisateur/:id", Autentification, updateOne);
UtilisateurRouter.delete("/utilisateur/:id", Autentification, deleteOne);
UtilisateurRouter.put("/changePwd/:id", Autentification, changePwd);

export default UtilisateurRouter;
