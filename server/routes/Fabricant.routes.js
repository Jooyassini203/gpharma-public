import express from "express";
import {
  getAll,
  getSpecific,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/Fabricant.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const FabricantRouter = express.Router();
FabricantRouter.get("/Fabricant/:id", Autentification, getSpecific);
FabricantRouter.post("/Fabricant/", Autentification, createOne);
FabricantRouter.put("/Fabricant/:id", Autentification, updateOne);
FabricantRouter.delete("/Fabricant/:id", Autentification, deleteOne);
export default FabricantRouter;
