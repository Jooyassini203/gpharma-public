import { bcryptData } from "../../utils/utils.js";
let utilisateurData = [];
utilisateurData.push({
  nom_utilisateur: "JOSOA Yassini Jacquerel",
  nom_login: "YASS",
  type_utilisateur: "ADMIN",
  contact: "0325526802",
  sexe: "HOMME",
  email: "jooyassini@gmail.com",
  mot_de_passe: bcryptData(" "),
});

export default utilisateurData;
