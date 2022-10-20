import express from "express";
import {
  getAll,
  getSpecific,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/Emplacement.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const EmplacementRouter = express.Router();
EmplacementRouter.get("/Emplacement/", Autentification, getAll);
EmplacementRouter.get("/Emplacement/:id", Autentification, getSpecific);
EmplacementRouter.post("/Emplacement/", Autentification, createOne);
EmplacementRouter.put("/Emplacement/:id", Autentification, updateOne);
EmplacementRouter.delete("/Emplacement/:id", Autentification, deleteOne);
export default EmplacementRouter;
