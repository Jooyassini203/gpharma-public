import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Ajustement = db.define(
  "ajustement",
  {
    motif: {
      type: DataTypes.CHAR(1000),
      allowNull: false,
      unique: true,
    },
    date_saisi: {
      type: DataTypes.DATE,
      //   defaultValue: ''
      allowNull: false,
    },
    date_ajustement: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: "1",
    },
  },
  { paranoid: true, freezeTableName: true }
);

export default Ajustement;
