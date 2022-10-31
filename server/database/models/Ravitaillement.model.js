import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Ravitaillement = db.define(
  "ravitaillement",
  {
    motif: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    montant_ht: {
      type: DataTypes.DOUBLE,
    },
    etat_ravitaillement: {
      type: DataTypes.CHAR(10),
      allowNull: false,
    },
    date_saisi: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    date_prev_livraison: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    date_livraison: {
      type: DataTypes.DATE,
      unique: true,
    },
    date_ravitaillement: {
      type: DataTypes.DATE,
    },
    tva: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: "1",
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
  }
);

export default Ravitaillement;
