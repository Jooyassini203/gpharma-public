import { DataTypes } from "sequelize";
import db from "../../config/Database.js";
const Emplacement = db.define(
  "emplacement",
  {
    nom_emplacement: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: "1" },
  },
  { paranoid: true, freezeTableName: true }
);
export default Emplacement;
