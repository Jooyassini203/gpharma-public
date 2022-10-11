import { Sequelize } from "sequelize";
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
  }
);
db.authenticate()
  .then(() => {
    console.log("Connexion reussi avec succès!");
  })
  .catch(() => {
    console.log("Connexion échoué!");
  });
export default db;
