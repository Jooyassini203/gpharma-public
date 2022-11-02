import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Ajustement_detail = db.define(
  "ajustement_detail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    qantite_nouveau_stock: { type: DataTypes.DOUBLE, allowNull: false },
    qantite_nouveau_presentation: { type: DataTypes.DOUBLE, allowNull: false },
    qantite_ancien_stock: { type: DataTypes.DOUBLE, allowNull: false },
    qantite_ancien_presentation: { type: DataTypes.DOUBLE, allowNull: false },
    unite_nouveau_stock: { type: DataTypes.INTEGER, allowNull: false },
    unite_nouveau_presentation: { type: DataTypes.INTEGER, allowNull: false },
    unite_ancien_stock: { type: DataTypes.INTEGER, allowNull: false },
    unite_ancien_presentation: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.INTEGER, defaultValue: "1" },
  },
  { paranoid: true, timestamps: false, freezeTableName: true }
);
export default Ajustement_detail;
