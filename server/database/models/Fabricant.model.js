import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Fabricant = db.define(
  "fabricant",
  {
    nom_fabricant: {
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

export default Fabricant;
