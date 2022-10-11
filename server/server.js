import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import UtilisateurRouter from "./routes/Utilisateur.routes.js";
import VoieRouter from "./routes/Voie.routes.js";

import Migration from "./models/migrate/Migrate.model.js";

console.log("\n\n\tMODE ", process.env.NODE_ENV, "\n\n");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(FileUpload());

app.use(UtilisateurRouter);
app.use(VoieRouter);

Migration()

app.listen(process.env.PORT, () => {
  console.log(`SERVEUR LANCE SUR LE PORT ${process.env.PORT} ...`);
});
