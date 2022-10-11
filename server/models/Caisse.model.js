import { DataTypes } from "sequelize";
import db from "../config/Database.js"; 

const Caisse = db.define(
  "ordonnance",
  {
    nom_caisse: {
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

export default Caisse;
/* 
(async () => {
  await db
    .sync({ force: MIGRATE })
    .then(() => {
      console.log(" ------> Table << Caisse >> migrée!");
    })
    .catch(() => {
      console.log(" ------> Table << Caisse >> NON migrée!!!");
    });
  if (MIGRATE) {
    await Caisse.bulkCreate(array);
  }
})(); */
