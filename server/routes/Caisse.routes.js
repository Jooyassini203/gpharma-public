import express from "express";
import {
  getAll,
  getSpecific,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/Caisse.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const CaisseRouter = express.Router();
CaisseRouter.get("/Caisse/", Autentification, getAll);
CaisseRouter.get("/Caisse/:id", Autentification, getSpecific);
CaisseRouter.post("/caisse", Autentification, createOne);
CaisseRouter.put("/Caisse/:id", Autentification, updateOne);
CaisseRouter.delete("/Caisse/:id", Autentification, deleteOne);
export default CaisseRouter;
