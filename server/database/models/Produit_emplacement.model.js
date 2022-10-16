import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Produit_emplacement = db.define(
  "produit_emplacement",
  {
    quantite_produit: { type: DataTypes.DOUBLE, allowNull: false },
    quantite_der_depot: { type: DataTypes.DOUBLE, allowNull: false },
    quantite_der_retrait: { type: DataTypes.DOUBLE, allowNull: false },
    date_der_depot: { type: DataTypes.DATE, allowNull: false },
    date_der_retrait: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: "1" },
  },
  { paranoid: true, freezeTableName: true }
);

export default Produit_emplacement;
