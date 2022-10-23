import { DataTypes } from "sequelize";
import db from "../../config/Database.js";

const Utilisateur = db.define(
  "utilisateur",
  {
    nom_utilisateur: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
    },
    nom_login: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
    },
    type_utilisateur: {
      type: DataTypes.CHAR(25),
      allowNull: false,
    },
    contact: {
      type: DataTypes.CHAR(25),
      allowNull: false,
    },
    sexe: {
      type: DataTypes.CHAR(25),
      allowNull: false,
    },
    email: {
      type: DataTypes.CHAR(100),
    },
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    date_der_log: DataTypes.DATE,
    est_en_ligne: {
      type: DataTypes.BOOLEAN,
      defaultValue: "0",
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: "1",
    },
    isOnline: {
      type: DataTypes.BOOLEAN,
      defaultValue: "0",
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
  }
);

export default Utilisateur;
