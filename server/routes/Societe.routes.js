import express from "express";
import {
  getAll,
  getSpecific,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/Societe.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const SocieteRouter = express.Router();
SocieteRouter.get("/Societe/", Autentification, getAll);
SocieteRouter.get("/Societe/:id", Autentification, getSpecific);
SocieteRouter.post("/Societe/", Autentification, createOne);
SocieteRouter.put("/Societe/:id", Autentification, updateOne);
SocieteRouter.delete("/Societe/:id", Autentification, deleteOne);
export default SocieteRouter;
