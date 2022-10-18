import express from "express";
import {
  getAll,
  getSpecific,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/Unite.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
const UniteRouter = express.Router();
UniteRouter.get("/Unite/:id", Autentification, getSpecific);
UniteRouter.post("/Unite/", Autentification, createOne);
UniteRouter.put("/Unite/:id", Autentification, updateOne);
UniteRouter.delete("/Unite/:id", Autentification, deleteOne);
export default UniteRouter;
