import express from "express";
import {
  getAll,
  getSpecific,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/Vente.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const VenteRouter = express.Router();
VenteRouter.get("/vente/myGuichet/:utilisateur_id", Autentification, getAll);
VenteRouter.get("/vente/details/:id", Autentification, getSpecific);
VenteRouter.post("/vente/Guichet/", Autentification, createOne);
VenteRouter.put("/vente/Guichet/:id", Autentification, updateOne);
VenteRouter.delete("/vente/Guichet/:id", Autentification, deleteOne);
export default VenteRouter;
