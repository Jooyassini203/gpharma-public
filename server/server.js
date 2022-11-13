import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import UtilisateurRouter from "./routes/Utilisateur.routes.js";
import VoieRouter from "./routes/Voie.routes.js";
import ParametreRouter from "./routes/Parametre.routes.js";

import Migration from "./database/migrations/Migration.js";
import CaisseRouter from "./routes/Caisse.routes.js";
import FormeRouter from "./routes/Forme.routes.js";
import FabricantRouter from "./routes/Fabricant.routes.js";
import FamilleRouter from "./routes/Famille.routes.js";
import UniteRouter from "./routes/Unite.routes.js";
import Mode_expeditionRouter from "./routes/Mode_expedition.routes.js";
import EmplacementRouter from "./routes/Emplacement.routes.js";
import FournisseurRouter from "./routes/Fournisseur.routes.js";
import LoginRouter from "./routes/Login.routes.js";
import SocieteRouter from "./routes/Societe.routes.js";
import ProduitRouter from "./routes/Produit.routes.js";
import RavitaillementRouter from "./routes/Ravitaillement.routes.js";
import AjustementRouter from "./routes/Ajustement.routes.js";
import GuichetRouter from "./routes/Guichet.routes.js";
import VenteRouter from "./routes/Vente.routes.js";
import AccueilRouter from "./routes/Accueil.routes.js";
import EntrepriseRouter from "./routes/Entreprise.routes.js";

console.log("\n\n\tMODE ", process.env.NODE_ENV, "\n\n");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(FileUpload());

app.use(LoginRouter);
app.use(AccueilRouter);

app.use(UtilisateurRouter);
app.use(VoieRouter);
app.use(CaisseRouter);
app.use(EmplacementRouter);
app.use(FormeRouter);
app.use(FamilleRouter);
app.use(FabricantRouter);
app.use(Mode_expeditionRouter);
app.use(UniteRouter);
app.use(ParametreRouter);
app.use(FournisseurRouter);
app.use(SocieteRouter);
app.use(ProduitRouter);
app.use(RavitaillementRouter);
app.use(AjustementRouter);
app.use(GuichetRouter);
app.use(VenteRouter);
app.use(EntrepriseRouter);

Migration();

app.listen(process.env.PORT, () => {
  console.log(`SERVEUR LANCE SUR LE PORT ${process.env.PORT} ...`);
});
