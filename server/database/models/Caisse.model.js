import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Caisse = db.define(
  "caisse",
  {
    nom_caisse: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: "1",
    },
  },
  { freezeTableName: true }
);

export default Caisse;
