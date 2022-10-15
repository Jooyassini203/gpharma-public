import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Produit = db.define(
  "produit",
  {
    code_lot_produit: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      unique: true,
    },
    nom_produit: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
    },
    classification_produit: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.CHAR(255),
    },
    presentation_quantite: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    stock_min: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    stock_max: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    date_der_ravitaillement: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: "1",
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
  }
);

export default Produit;
