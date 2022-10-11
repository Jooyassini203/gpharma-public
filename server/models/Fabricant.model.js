import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import array from "./data/Fabricant.data.js";

const Fabricant = db.define(
  "fabricant",
  {
    nom_fabricant: {
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

export default Fabricant;
/* 
(async () => {
  await db
    .sync({ force: MIGRATE })
    .then(() => {
      console.log(" ------> Table << Fabricant >> migrée!");
    })
    .catch(() => {
      console.log(" ------> Table << Fabricant >> NON migrée!!!");
    });
  if (MIGRATE) {
    await Fabricant.bulkCreate(array);
  }
})(); */
