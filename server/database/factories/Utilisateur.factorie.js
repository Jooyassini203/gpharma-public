import { faker } from "@faker-js/faker";
import { bcryptData } from "../../utils/utils.js";
let utilisateurListe = [];
for (let index = 0; index < 6; index++) {
  utilisateurListe.push({
    nom_utilisateur: faker.name.fullName(),
    nom_login: faker.name.firstName(),
    type_utilisateur: "ADMIN",
    contact: faker.phone.number(),
    sexe: "HOMME",
    email: faker.internet.email(),
    mot_de_passe: bcryptData("password"),
    date_der_log: faker.date.recent(),
  });
}
utilisateurListe.push({
  nom_utilisateur: "Administrateur",
  nom_login: "YASS",
  type_utilisateur: "ADMIN",
  contact: "0325526802",
  sexe: "HOMME",
  email: "jooyassini@gmail.com",
  mot_de_passe: bcryptData(" "),
});

export default utilisateurListe;
