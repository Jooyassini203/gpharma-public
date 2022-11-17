import express from "express";
import {
  getAll,
  getSpecific,
  createOne,
  updateOne,
  updateActive,
  updateStatus,
  deleteOne,
  getActive,
} from "../controllers/Marge_beneficiaire.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const Marge_beneficiaireRouter = express.Router();
Marge_beneficiaireRouter.get("/Marge_beneficiaire/", Autentification, getAll);
Marge_beneficiaireRouter.get(
  "/Marge_beneficiaire/active",
  Autentification,
  getActive
);
Marge_beneficiaireRouter.get(
  "/Marge_beneficiaire/:id",
  Autentification,
  getSpecific
);
Marge_beneficiaireRouter.post(
  "/Marge_beneficiaire/",
  Autentification,
  createOne
);
Marge_beneficiaireRouter.put(
  "/Marge_beneficiaire/:id",
  Autentification,
  updateOne
);
Marge_beneficiaireRouter.put(
  "/Marge_beneficiaire/active/:id",
  Autentification,
  updateActive
);
Marge_beneficiaireRouter.put(
  "/marge_beneficiaireStatus/:id",
  Autentification,
  updateStatus
);
Marge_beneficiaireRouter.delete(
  "/Marge_beneficiaire/:id",
  Autentification,
  deleteOne
);
export default Marge_beneficiaireRouter;
