import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

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
    condition_paiement: {
      type: DataTypes.CHAR(10000),
      allowNull: false,
      unique: true,
    },
    delais_reglement: {
      type: DataTypes.CHAR(10000),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    nif: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
    },
    stat: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
    },
    sigle: {
      type: DataTypes.CHAR(100),
      unique: true,
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
