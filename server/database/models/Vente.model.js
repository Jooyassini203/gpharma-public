import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Vente = db.define(
  "vente",
  {
    motif: { type: DataTypes.CHAR(1000) },
    montant_total: { type: DataTypes.DOUBLE(10), allowNull: false },
    data_vente: { type: DataTypes.DATE, allowNull: false },
    etat_vente: { type: DataTypes.BOOLEAN, defaultValue: "1" },
  },
  { paranoid: true, freezeTableName: true }
);
export default Vente;
