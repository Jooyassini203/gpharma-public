import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Forme = db.define(
  "forme",
  {
    nom_forme: {
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

export default Forme;
