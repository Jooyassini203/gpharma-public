import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Ajustement_detail = db.define(
  "ajustement_detail",
  {
    qantite_nouveau: { type: DataTypes.DOUBLE(10), allowNull: false },
    qantite_ancien: { type: DataTypes.DOUBLE(10), allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: "1" },
  },
  { paranoid: true, freezeTableName: true }
);
export default Ajustement_detail;
