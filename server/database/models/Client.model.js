import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Client = db.define(
  "client",
  {
    nom_prenom: { type: DataTypes.CHAR(255), allowNull: false },
    adresse: { type: DataTypes.CHAR(255), allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: "1" },
  },
  { paranoid: true, freezeTableName: true }
);
export default Client;
