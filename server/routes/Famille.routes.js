import express from "express";
import {
  getAll,
  getSpecific,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/Famille.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const FamilleRouter = express.Router();
FamilleRouter.get("/Famille/", Autentification, getAll);
FamilleRouter.get("/Famille/:id", Autentification, getSpecific);
FamilleRouter.post("/Famille/", Autentification, createOne);
FamilleRouter.put("/Famille/:id", Autentification, updateOne);
FamilleRouter.delete("/Famille/:id", Autentification, deleteOne);
export default FamilleRouter;
