import express from "express";
import {
  getAll,
  getSpecific,
  createOne,
  updateOne,
  deleteOne,
  updateStatus,
} from "../controllers/Produit.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const ProduitRouter = express.Router();
ProduitRouter.get("/Produit/", Autentification, getAll);
ProduitRouter.get("/Produit/:code_lot_produit", Autentification, getSpecific);
ProduitRouter.post("/Produit/", Autentification, createOne);
ProduitRouter.put("/Produit/:code_lot_produit", Autentification, updateOne);
ProduitRouter.put(
  "/Produit/status/:code_lot_produit",
  Autentification,
  updateStatus
);
ProduitRouter.delete("/Produit/:code_lot_produit", Autentification, deleteOne);
export default ProduitRouter;
