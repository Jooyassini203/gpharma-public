import { DataTypes } from "sequelize";
import db from "../../config/Database.js";
const Vente_detail = db.define(
  "vente_detail",
  {
    quantite_vente: { type: DataTypes.DOUBLE, allowNull: false },
    prix_vente: { type: DataTypes.DOUBLE, allowNull: false },
    montant_vente: { type: DataTypes.DOUBLE, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: "1" },
  },
  { paranoid: true, freezeTableName: true }
);
//   unite_vente: { type: DataTypes.INTEGER(10), allowNull: false },
export default Vente_detail;
