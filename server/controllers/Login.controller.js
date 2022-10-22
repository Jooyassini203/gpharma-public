import Utilisateur from "../database/models/Utilisateur.model.js";
import bcrypt from "bcrypt";
import cryptojs from "crypto-js";
import { getDateNow } from "../utils/utils.js";

const login = async (req, res) => {
  const nom_login = req.body.nom_login;
  const mot_de_passe = req.body.mot_de_passe;
  const user = await Utilisateur.findOne({ where: { nom_login } });
  if (!user)
    return res
      .status(404)
      .json({ message: "Nom d'utilisateur ou mot de passe incorrect!" });
  bcrypt.compare(mot_de_passe, user.mot_de_passe, async (erreur, result) => {
    if (result) {
      user.set({ date_der_log: getDateNow() });
      await user.save();

      const dataSession = {
        id: user.id,
        type_utilisateur: user.type_utilisateur,
        nom_login: user.nom_login,
        nom_utilisateur: user.nom_utilisateur,
      };
      let dataSessionCrypted = JSON.stringify(dataSession);

      dataSessionCrypted = cryptojs.AES.encrypt(
        dataSessionCrypted,
        process.env.KEY_SESSION
      ).toString();
      console.log("dataSessionCrypted", dataSessionCrypted);

      const userJson = cryptojs.AES.decrypt(
        dataSessionCrypted,
        process.env.KEY_SESSION
      ).toString(cryptojs.enc.Utf8);

      console.log("before parse ", userJson);
      return res
        .status(200)
        .send({ message: "Vous êtes connecté", dataUser: userJson });
    } else
      return res
        .status(404)
        .send({ message: "Nom d'utilisateur ou mot de passe incorrect!" });
  });
};
export { login };
