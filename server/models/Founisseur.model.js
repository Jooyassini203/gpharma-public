import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Fournisseur = db.define(
  "fournisseur",
  {
    nom_fournisseur: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
    },
    contact_fournisseur: {
        type: DataTypes.CHAR(100),
        unique: true,
    },
    contact_secretaire: {
        type: DataTypes.CHAR(100),
        allowNull: false,
        unique: true,
    },
    compte_PCG: {
      type: DataTypes.CHAR(255),
    },
    logo: {
      type: DataTypes.CHAR(100),
    },
    image: {
      type: DataTypes.CHAR(255),
    },
    email: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
    },
    stock_min: {
        type: DataTypes.DOUBLE(10),
      allowNull: false,
    },
    stock_max: {
        type: DataTypes.DOUBLE(10),
      allowNull: false,
    },
    date_der_ravitaillement: {
      type: DataTypes.DATE,
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

export default Fournisseur;
