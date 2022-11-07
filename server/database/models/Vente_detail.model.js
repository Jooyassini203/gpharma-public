import { DataTypes } from "sequelize";
import db from "../../config/Database.js";
const Vente_detail = db.define(
  "vente_detail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quantite_vente: { type: DataTypes.DOUBLE, allowNull: false },
    prix_stock: { type: DataTypes.DOUBLE, allowNull: false },
    montant_vente: { type: DataTypes.DOUBLE, allowNull: false },
    unite_vente: { type: DataTypes.CHAR("25"), allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: "1" },
  },
  { paranoid: true, freezeTableName: true }
);
//   unite_vente: { type: DataTypes.INTEGER(10), allowNull: false },
export default Vente_detail;
