import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Ravitaillement_detail = db.define(
  "ravitaillement_detail",
  {
    prix_unit: { type: DataTypes.DOUBLE, allowNull: false, unique: false },
    prix_ht: { type: DataTypes.DOUBLE, allowNull: false, unique: false },
    quantite_demande: { type: DataTypes.DOUBLE, allowNull: false, unique: false },
    quantite_livraison: { type: DataTypes.DOUBLE, allowNull: true, unique: false }, 
    status: { type: DataTypes.BOOLEAN, defaultValue: "1", unique: false },
  },
  {
    paranoid: true,
    timestamps: false,
    freezeTableName: true,
  }
);
export default Ravitaillement_detail;
