import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Vente = db.define(
  "vente",
  {
    id: {
      type: DataTypes.CHAR(25),
      primaryKey: true, 
      allowNull: false,
    },
    motif: { type: DataTypes.TEXT },
    file_societe: { type: DataTypes.CHAR(255) },
    montant_total: { type: DataTypes.DOUBLE, allowNull: false },
    data_saisi: { type: DataTypes.DATE, allowNull: false },
    data_vente: { type: DataTypes.DATE, allowNull: false },
    societe_prise_en_charge: { type: DataTypes.CHAR(255), allowNull: true },
    etat_vente: { type: DataTypes.BOOLEAN, defaultValue: "1" },
  },
  { paranoid: true, freezeTableName: true }
);
export default Vente;
