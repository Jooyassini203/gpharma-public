import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import UtilisateurRouter from "./routes/Utilisateur.routes.js";
import VoieRouter from "./routes/Voie.routes.js";
import ParametreRouter from "./routes/Parametre.routes.js";

import Migration from "./database/migrations/Migration.js";

console.log("\n\n\tMODE ", process.env.NODE_ENV, "\n\n");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(FileUpload());

app.use(UtilisateurRouter);
app.use(VoieRouter);
app.use(ParametreRouter);

Migration();

app.listen(process.env.PORT, () => {
  console.log(`SERVEUR LANCE SUR LE PORT ${process.env.PORT} ...`);
});
