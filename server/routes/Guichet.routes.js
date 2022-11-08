import express from "express";
import {
  getAll,
  getSpecific,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/Guichet.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const GuichetRouter = express.Router();
GuichetRouter.get("/Guichet/", Autentification, getAll);
GuichetRouter.get("/Guichet/:id", Autentification, getSpecific);
GuichetRouter.post("/Guichet/", Autentification, createOne);
GuichetRouter.put("/Guichet/:id", Autentification, updateOne);
GuichetRouter.delete("/Guichet/:id", Autentification, deleteOne);
export default GuichetRouter;
