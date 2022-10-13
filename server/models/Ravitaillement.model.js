import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Ravitaillement = db.define(
  "ravitaillement",
  {
    motif: {
      type: DataTypes.CHAR(1000),
      allowNull: false,
    },
    montant_ht: {
      type: DataTypes.DOUBLE(10),
    },
    etat_ravitaillement: {
      type: DataTypes.CHAR(10),
      allowNull: false,
    },
    date_saisi: {
      type: DataTypes.DATE,
      //   defaultValue: ''
      unique: true,
    },
    date_prev_livraison: {
      type: DataTypes.DATE,
      //   defaultValue: ''
      unique: true,
    },
    data_livraison: {
      type: DataTypes.DATE,
      unique: true,
    },
    //date commande
    date_ravitaillement: {
      type: DataTypes.DATE,
      //   defaultValue: ''
    },
    tva: {
      type: DataTypes.DOUBLE(10),
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
