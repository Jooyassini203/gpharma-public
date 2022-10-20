import db from "../../config/Database.js";
import { MIGRATE } from "../../utils/utils.js";
import { Association, DataTypes } from "sequelize";

import Caisse from "../models/Caisse.model.js";
import Fabricant from "../models/Fabricant.model.js";
import Forme from "../models/Forme.model.js";
import Unite from "../models/Unite.model.js";
import Voie from "../models/Voie.model.js";
import Utilisateur from "../models/Utilisateur.model.js";

import Produit_emplacement from "../models/Produit_emplacement.model.js";
import Ravitaillement_detail from "../models/Ravitaillement_detail.model.js";
import Vente_detail from "../models/Vente_detail.model.js";
import Ajustement_detail from "../models/Ajustement_detail.model.js";
import Ajustement from "../models/Ajustement.model.js";
import Ordonnance from "../models/Ordonnance.model.js";
import Guichet from "../models/Guichet.model.js";
import Societe from "../models/Societe.model.js";
import Client from "../models/Client.model.js";
import Fournisseur from "../models/Fournisseur.model.js";
import Mode_expedition from "../models/Mode_expedition.model.js";
import Emplacement from "../models/Emplacement.model.js";
import Vente from "../models/Vente.model.js";
import Famille from "../models/Famille.model.js";
import Produit from "../models/Produit.model.js";
import Ravitaillement from "../models/Ravitaillement.model.js";

import caisseListe from "../seeders/Caisse.seeder.js";
import fabricantListe from "../seeders/Fabricant.seeder.js";
import familleListe from "../seeders/Famille.seeder.js";
import formeListe from "../seeders/Forme.seeder.js";
import uniteListe from "../seeders/Unite.seeder.js";
import voieListe from "../seeders/Voie.seeder.js";

import utilisateurListe from "../factories/Utilisateur.factorie.js";
import fournisseurListe from "../factories/Fournisseur.factorie.js";

// Association
Produit.belongsToMany(Ajustement, {
  through: Ajustement_detail,
  unique: false,
  foreignKey: "produit_id",
});
Ajustement.belongsToMany(Produit, {
  through: Ajustement_detail,
  unique: false,
  foreignKey: "ajustement_id",
});

Caisse.hasMany(Ravitaillement, {
  foreignKey: {
    name: "caisse_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Ravitaillement.belongsTo(Caisse, {
  foreignKey: {
    name: "caisse_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Caisse.hasMany(Vente, {
  foreignKey: {
    name: "caisse_id",
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
Vente.belongsTo(Caisse, {
  foreignKey: {
    name: "caisse_id",
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

Client.hasOne(Vente, {
  foreignKey: {
    name: "client_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Vente.belongsTo(Client, {
  foreignKey: {
    name: "client_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Societe.hasMany(Client, {
  foreignKey: {
    name: "societe_id",
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
Societe.belongsTo(Client, {
  foreignKey: {
    name: "societe_id",
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

Emplacement.hasMany(Ajustement, {
  foreignKey: {
    name: "emplacement_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Ajustement.belongsTo(Emplacement, {
  foreignKey: {
    name: "emplacement_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Produit.belongsToMany(Emplacement, {
  through: Produit_emplacement,
  unique: false,
  foreignKey: "produit_id",
});
Emplacement.belongsToMany(Produit, {
  through: Produit_emplacement,
  unique: false,
  foreignKey: "emplacement_id",
});

Fabricant.hasMany(Produit, {
  foreignKey: {
    name: "fabricant_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Produit.belongsTo(Fabricant, {
  foreignKey: {
    name: "fabricant_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Forme.hasMany(Produit, {
  foreignKey: {
    name: "forme_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Produit.belongsTo(Forme, {
  foreignKey: {
    name: "forme_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Famille.hasMany(Produit, {
  foreignKey: {
    name: "famille_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Produit.belongsTo(Famille, {
  foreignKey: {
    name: "famille_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Fournisseur.hasMany(Ravitaillement, {
  foreignKey: {
    name: "fournisseur_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Ravitaillement.belongsTo(Fournisseur, {
  foreignKey: {
    name: "fournisseur_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Mode_expedition.hasMany(Ravitaillement, {
  foreignKey: {
    name: "mode_expedition_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Ravitaillement.belongsTo(Mode_expedition, {
  foreignKey: {
    name: "mode_expedition_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Guichet.hasOne(Vente, {
  foreignKey: {
    name: "guichet_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Vente.belongsTo(Guichet, {
  foreignKey: {
    name: "guichet_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Ordonnance.hasOne(Vente, {
  foreignKey: {
    name: "ordonnance_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Vente.belongsTo(Ordonnance, {
  foreignKey: {
    name: "ordonnance_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Produit.belongsToMany(Ravitaillement, {
  through: Ravitaillement_detail,
  unique: false,
  foreignKey: "produit_id",
});
Ravitaillement.belongsToMany(Produit, {
  through: Ravitaillement_detail,
  unique: false,
  foreignKey: "ravitaillement_id",
});

Unite.hasMany(Ravitaillement, {
  foreignKey: {
    name: "unite_achat",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Ravitaillement.belongsTo(Unite, {
  foreignKey: {
    name: "unite_achat",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Unite.hasMany(Produit, {
  foreignKey: {
    name: "unite_presentation",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Produit.belongsTo(Unite, {
  foreignKey: {
    name: "unite_presentation",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Unite.hasMany(Produit, {
  foreignKey: {
    name: "unite_achat",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Produit.belongsTo(Unite, {
  foreignKey: {
    name: "unite_achat",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Unite.hasMany(Produit, {
  foreignKey: {
    name: "unite_vente",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Produit.belongsTo(Unite, {
  foreignKey: {
    name: "unite_vente",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Unite.hasMany(Produit, {
  foreignKey: {
    name: "unite_stock",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Produit.belongsTo(Unite, {
  foreignKey: {
    name: "unite_stock",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Produit.belongsToMany(Vente, {
  through: Vente_detail,
  unique: false,
  foreignKey: "produit_id",
});
Vente.belongsToMany(Produit, {
  through: Vente_detail,
  unique: false,
  foreignKey: "vente_id",
});

Voie.hasMany(Produit, {
  foreignKey: { name: "voie_id", type: DataTypes.INTEGER, allowNull: false },
});
Produit.belongsTo(Voie, {
  foreignKey: { name: "voie_id", type: DataTypes.INTEGER, allowNull: false },
});

Utilisateur.hasMany(Vente, {
  foreignKey: {
    name: "utilisateur_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Vente.belongsTo(Utilisateur, {
  foreignKey: {
    name: "utilisateur_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Utilisateur.hasMany(Ravitaillement, {
  foreignKey: {
    name: "utilisateur_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Ravitaillement.belongsTo(Utilisateur, {
  foreignKey: {
    name: "utilisateur_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

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
        await Famille.bulkCreate(familleListe)
          .then(() => console.log(" ------> Table << Famille >> migrée!"))
          .catch(() =>
            console.log(" ------> Table << Famille >> NON migrée!!!")
          );
        await Voie.bulkCreate(voieListe)
          .then(() => console.log(" ------> Table << Voie >> migrée!"))
          .catch(() => console.log(" ------> Table << Voie >> NON migrée!!!"));
        await Utilisateur.bulkCreate(utilisateurListe)
          .then(() => console.log(" ------> Table << Utilisateur >> migrée!"))
          .catch(() =>
            console.log(" ------> Table << Utilisateur >> NON migrée!!!")
          );
        await Fournisseur.bulkCreate(fournisseurListe)
          .then(() => console.log(" ------> Table << Fournisseur >> migrée!"))
          .catch(() =>
            console.log(" ------> Table << Fournisseur >> NON migrée!!!")
          );
        await Unite.bulkCreate(uniteListe)
          .then(() => console.log(" ------> Table << Unite >> migrée!"))
          .catch(() => console.log(" ------> Table << Unite >> NON migrée!!!"));
      }
    })
    .catch(() => console.log(" \n\n\n\n ERROR \n\n\n "));
};

export default Migration;
