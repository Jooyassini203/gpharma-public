import express from "express";
import {
  getAll,
  getSpecific,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/Voie.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const VoieRouter = express.Router();
VoieRouter.get("/Voie/", Autentification, getAll);
VoieRouter.get("/Voie/:id", Autentification, getSpecific);
VoieRouter.post("/Voie/", Autentification, createOne);
VoieRouter.put("/Voie/:id", Autentification, updateOne);
VoieRouter.delete("/Voie/:id", Autentification, deleteOne);
export default VoieRouter;
