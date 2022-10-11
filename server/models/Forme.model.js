import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import array from "./data/Forme.data.js";

const Forme = db.define(
  "forme",
  {
    nom_forme: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: "1",
    },
  },
  { freezeTableName: true }
);

export default Forme;
/* 
(async () => {
  await db
    .sync({ force: MIGRATE })
    .then(() => {
      console.log(" ------> Table << Forme >> migrée!");
    })
    .catch(() => {
      console.log(" ------> Table << Forme >> NON migrée!!!");
    });
  if (MIGRATE) {
    await Forme.bulkCreate(array);
  }
})(); */
