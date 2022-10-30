import express from "express";
import { getCount } from "../controllers/Parametre.controller.js";
import Autentification from "../middlewares/Authentification.middleware.js";
// import { LocalStorage } from "node-localstorage";

// global.localStorage = new LocalStorage("./scratch");

const ParametreRouter = express.Router();

ParametreRouter.get("/parametre/count", Autentification, getCount);
// ParametreRouter.get("/local", (req, res) => {
//   //   localStorage.setItem("myFirstKey", "qsdfqsdfsdfqs");
//   console.log(localStorage.getItem("gpharma@2.0.0"));
//   return res.send(localStorage.getItem("gpharma@2.0.0"));
// });

export default ParametreRouter;
