import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Ordonnance = db.define(
  "ordonnance",
  {
    nom_docteur: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
    },
    hopital: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: "1",
    },
  },
  { paranoid: true, freezeTableName: true }
);

export default Ordonnance;
