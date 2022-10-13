import { faker } from "@faker-js/faker"; 
let utilisateurListe = [];
for (let index = 0; index < 15; index++) {
  utilisateurListe.push({
    nom_utilisateur: faker.name.fullName(),
    nom_login: faker.name.firstName(),
    type_utilisateur: "ADMIN",
    contact: faker.phone.number(),
    sexe: "HOMME",
    email: faker.internet.email(),
    mot_de_passe: faker.internet.password(),
    date_der_log: faker.date.future(),
  });
}

export default utilisateurListe;
