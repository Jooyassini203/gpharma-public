import express from "express";
import {
  getAll,
  getSpecific,
  createOne,
  updateOne,
  updateOneRavitaillementDetail,
  validateRavitaillement,
  deleteOne,
} from "../controllers/Ravitaillement.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const RavitaillementRouter = express.Router();
RavitaillementRouter.get("/Ravitaillement/", Autentification, getAll);
RavitaillementRouter.get("/Ravitaillement/:id", Autentification, getSpecific);
RavitaillementRouter.post("/Ravitaillement/", Autentification, createOne);
RavitaillementRouter.put("/Ravitaillement/:id", Autentification, updateOne);
RavitaillementRouter.put(
  "/updateOneRavitaillementDetail/:id",
  Autentification,
  updateOneRavitaillementDetail
);
RavitaillementRouter.put(
  "/validate_ravitaillement/:id",
  Autentification,
  validateRavitaillement
);
RavitaillementRouter.delete("/Ravitaillement/:id", Autentification, deleteOne);
export default RavitaillementRouter;
