import db from "../../config/Database.js";
import { MIGRATE } from "../../utils/utils.js";
import { Association, DataTypes } from "sequelize";

import Caisse from "../models/Caisse.model.js";
import Fabricant from "../models/Fabricant.model.js";
import Forme from "../models/Forme.model.js";
import Unite from "../models/Unite.model.js";
import Voie from "../models/Voie.model.js";
import Utilisateur from "../models/Utilisateur.model.js";

import Ajustement_detail from "../models/Ajustement_detail.model.js";
import Ajustement from "../models/Ajustement.model.js";
import Ordonnance from "../models/Ordonnance.model.js";
import Guichet from "../models/Guichet.model.js";
import Societe from "../models/Societe.model.js";
import Client from "../models/Client.model.js";
import Fournisseur from "../models/Fournisseur.model.js";
import Mode_expedition from "../models/Mode_expedition.model.js";
import Ravitaillement from "../models/Ravitaillement.model.js";
import Ravitaillement_detail from "../models/Ravitaillement_detail.model.js";
import Emplacement from "../models/Emplacement.model.js";
import Vente_detail from "../models/Vente_detail.model.js";
import Vente from "../models/Vente.model.js";
import Famille from "../models/Famille.model.js";
import Produit from "../models/Produit.model.js";

import caisseListe from "../seeders/Caisse.seeder.js";
import fabricantListe from "../seeders/Fabricant.seeder.js";
import formeListe from "../seeders/Forme.seeder.js";
import uniteListe from "../seeders/Unite.seeder.js";
import voieListe from "../seeders/Voie.seeder.js";

import utilisateurListe from "../factories/Utilisateur.factorie.js";
import Fournisseur from "../models/Fournisseur.model.js";

// Association
Produit.belongsToMany(Ajustement, {
  through: "Ajustement_detail",
  unique: false,
  foreignKey: "produit_id",
});
Ajustement.belongsToMany(Produit, {
  through: "Ajustement_detail",
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
Caisse.belongsTo(Ravitaillement, {
  foreignKey: {
    name: "caisse_id",
    type: DataTypes.INTEGER,
    allowNull: false,
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

Societe.hasOne(Client, {
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

Emplacement.hasOne(Ajustement, {
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
  through: "Produit_emplacement",
  unique: false,
  foreignKey: "produit_id",
});
Emplacement.belongsToMany(Produit, {
  through: "Produit_emplacement",
  unique: false,
  foreignKey: "emplacement_id",
});

Fabricant.hasOne(Produit, {
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
 
Famille.hasOne(Produit, {
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
 
Fournisseur.hasOne(Ravitaillement, {
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
  through: "Ravitaillement_detail",
  unique: false,
  foreignKey: "produit_id",
});
Ravitaillement.belongsToMany(Produit, {
  through: "Ravitaillement_detail",
  unique: false,
  foreignKey: "ravitaillement_id",
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
