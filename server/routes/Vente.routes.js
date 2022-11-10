import express from "express";
import {
  getAll,
  getSpecific,
  createOne,
  updateOne,
  deleteOne,
  getGuichetNonLivrer,
  updateOneVenteDetail,
} from "../controllers/Vente.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const VenteRouter = express.Router();
VenteRouter.get("/vente/myGuichet/:utilisateur_id", Autentification, getAll);
VenteRouter.get(
  "/vente/GuichetNonLivrer",
  Autentification,
  getGuichetNonLivrer
);
VenteRouter.get("/vente/details/:id", Autentification, getSpecific);
VenteRouter.post("/vente/Guichet/", Autentification, createOne);
VenteRouter.put("/vente/Guichet/:id", Autentification, updateOne);
VenteRouter.put("/vente/details/:id", Autentification, updateOneVenteDetail);
VenteRouter.delete("/vente/Guichet/:id", Autentification, deleteOne);
export default VenteRouter;
