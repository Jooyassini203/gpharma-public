import { QueryTypes } from "sequelize";
import db from "../config/Database.js";

const getCount = async (req, res) => {
  try {
    const count = await db.query(
      "SELECT COUNT(*) AS count FROM " + req.params.name_parametre,
      { type: QueryTypes.SELECT }
    );
    res.status(200).send(count);
  } catch (error) {
    res.status(422).send({ message: error.message });
  }
};
const updateOne = async (req, res) => {};

export { getCount };
