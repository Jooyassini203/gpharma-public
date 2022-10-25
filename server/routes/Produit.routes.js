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
ProduitRouter.get("/Produit/:id", Autentification, getSpecific);
ProduitRouter.post("/Produit/", Autentification, createOne);
ProduitRouter.put("/Produit/:id", Autentification, updateOne);
ProduitRouter.put("/Produit/status/:id", Autentification, updateStatus);
ProduitRouter.delete("/Produit/:id", Autentification, deleteOne);
export default ProduitRouter;
