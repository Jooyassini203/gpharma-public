import { QueryTypes } from "sequelize";
import db from "../config/Database.js";

const getCount = async (req, res) => {
  try {
    const count = await db.query(
      `SELECT  (    SELECT COUNT(*)    FROM   forme) AS count_forme
      ,(    SELECT COUNT(*)    FROM   caisse) AS count_caisse
      ,(    SELECT COUNT(*)  FROM   fabricant ) AS count_fabricant
      ,(    SELECT COUNT(*)  FROM   famille ) AS count_famille
      ,(    SELECT COUNT(*)  FROM   mode_expedition ) AS count_mode_expedition
      ,(    SELECT COUNT(*)  FROM   unite ) AS count_unite
      ,(    SELECT COUNT(*)  FROM   voie ) AS count_voie`,
      { type: QueryTypes.SELECT }
    );
    res.status(200).send(count);
  } catch (error) {
    res.status(422).send({ message: error.message });
  }
};
const updateOne = async (req, res) => {};

export { getCount };
