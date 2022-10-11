import { DataTypes } from "sequelize";
import db from "../config/Database.js"; 

const Societe = db.define(
  "societe",
  {
    nom_societe: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
    },
    prise_en_charge: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: "1",
    },
  },
  { freezeTableName: true }
);

export default Societe; 