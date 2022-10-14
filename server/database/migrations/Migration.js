import Vente_detail from "../models/Vente_detail.model.js";
import Vente from "../models/Vente.model.js";
import db from "../../config/Database.js";
import { MIGRATE } from "../../utils/utils.js";

import Caisse from "../models/Caisse.model.js";
import Fabricant from "../models/Fabricant.model.js";
import Forme from "../models/Forme.model.js";
import Ordonnance from "../models/Ordonnance.model.js";
import Societe from "../models/Societe.model.js";
import Unite from "../models/Unite.model.js";
import Voie from "../models/Voie.model.js";
import Utilisateur from "../models/utilisateur.model.js";

import caisseListe from "../seeders/Caisse.seeder.js";
import fabricantListe from "../seeders/Fabricant.seeder.js";
import formeListe from "../seeders/Forme.seeder.js";
import uniteListe from "../seeders/Unite.seeder.js";
import voieListe from "../seeders/Voie.seeder.js";

import utilisateurListe from "../factories/Utilisateur.factorie.js";

const Migration = async () => {
  //  console.log(" \n\n\n\n Migration \n\n\n ");
  await db
    .sync({ force: MIGRATE })
    .then(async () => {
      if (MIGRATE) {
        await Caisse.bulkCreate(caisseListe)
          .then(() => console.log(" ------> Table << caisse >> migrée!"))
          .catch(() => {
            console.log(" ------> Table << caisse >> NON migrée!!!");
          });
        await Fabricant.bulkCreate(fabricantListe)
          .then(() => console.log(" ------> Table << Fabricant >> migrée!"))
          .catch(() =>
            console.log(" ------> Table << Fabricant >> NON migrée!!!")
          );
        await Forme.bulkCreate(formeListe)
          .then(() => console.log(" ------> Table << Forme >> migrée!"))
          .catch(() => console.log(" ------> Table << Forme >> NON migrée!!!"));
        await Voie.bulkCreate(voieListe)
          .then(() => console.log(" ------> Table << Voie >> migrée!"))
          .catch(() => console.log(" ------> Table << Voie >> NON migrée!!!"));
        await Utilisateur.bulkCreate(utilisateurListe)
          .then(() => console.log(" ------> Table << Utilisateur >> migrée!"))
          .catch(() =>
            console.log(" ------> Table << Utilisateur >> NON migrée!!!")
          );
        await Unite.bulkCreate(uniteListe)
          .then(() => console.log(" ------> Table << Unite >> migrée!"))
          .catch(() => console.log(" ------> Table << Unite >> NON migrée!!!"));
      }
    })
    .catch(() => console.log(" \n\n\n\n ERROR \n\n\n "));
};

export default Migration;
