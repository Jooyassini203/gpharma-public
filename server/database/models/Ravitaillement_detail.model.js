import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Ravitaillement_detail = db.define(
  "ravitaillement_detail",
  {
    prix_unit: { type: DataTypes.DOUBLE, allowNull: false },
    prix_ht: { type: DataTypes.DOUBLE, allowNull: false },
    quantite_demande: { type: DataTypes.DOUBLE, allowNull: false },
    quantite_livraison: { type: DataTypes.DOUBLE, allowNull: false },
    // unite_achat: { type: DataTypes.INTEGER(10), allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: "1" },
  },
  {
    paranoid: true,
    timestamps: false,
    freezeTableName: true,
  }
);
export default Ravitaillement_detail;
