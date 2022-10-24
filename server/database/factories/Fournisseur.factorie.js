import { faker } from "@faker-js/faker";
let fournisseurListe = [];
for (let index = 0; index < 6; index++) {
  fournisseurListe.push({
    nom_fournisseur: faker.name.fullName(),
    contact_fournisseur: faker.phone.number(),
    contact_secretaire: faker.phone.number(),
    compte_PCG: "TEST",
    condition_paiement: "FACKERS",
    delais_reglement: "FACKERS",
    email: faker.internet.email(),
    adresse: faker.address.city(),
    nif: faker.internet.password(),
    stat: faker.internet.password(),
    sigle: faker.name.firstName(),
  });
}

export default fournisseurListe;
