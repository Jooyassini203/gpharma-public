import express from "express";
import {
  getAll,
  getSpecific,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/Vente.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const GuichetRouter = express.Router();
GuichetRouter.get("/vente/myGuichet/:id", Autentification, getAll);
GuichetRouter.get("/vente/Guichet/:id", Autentification, getSpecific);
GuichetRouter.post("/vente/Guichet/", Autentification, createOne);
GuichetRouter.put("/vente/Guichet/:id", Autentification, updateOne);
GuichetRouter.delete("/vente/Guichet/:id", Autentification, deleteOne);
export default GuichetRouter;
