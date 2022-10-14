import { DataTypes } from "sequelize";
import db from "../../config/Database.js";
const Mode_expedition = db.define(
  "ode_expedition",
  {
    nom_mode_expedition: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: "1" },
  },
  { paranoid: true, freezeTableName: true }
);
export default Mode_expedition;
