import { DataTypes } from "sequelize";
import db from "../config/Database.js"; 

const Unite = db.define('unite',{
    nom_unite:{
        type: DataTypes.CHAR(255),
        allowNull: false, 
        unique: true
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: '1'
    }  
},
{ freezeTableName: true })

export default Unite;
/* 
(async () => {
  await db
    .sync({ force: MIGRATE })
    .then(() => {
      console.log(" ------> Table << Unite >> migrée!");
    })
    .catch(() => {
      console.log(" ------> Table << Unite >> NON migrée!!!");
    });
  if (MIGRATE) await Unite.bulkCreate(array);
})(); */
