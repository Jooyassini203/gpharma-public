import { faker } from "@faker-js/faker";
let produitListe = [];
const getNumberRadom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
for (let index = 0; index < 6; index++) {
  produitListe.push({
    code_lot_produit: faker.commerce.productAdjective(),
    nom_produit: faker.commerce.productName(),
    classification_produit: faker.commerce.productDescription(),
    description: faker.commerce.productDescription(),
    // image: faker.image.imageUrl(),
    prix_vente: faker.commerce.price(),
    presentation_quantite: getNumberRadom(1, 20),
    stock_min: getNumberRadom(5, 20),
    stock_max: getNumberRadom(200, 500),
    date_der_ravitaillement: faker.date.recent(),
    fabricant_id: getNumberRadom(1, 32),
    famille_id: getNumberRadom(1, 5),
    forme_id: getNumberRadom(1, 73),
    unite_achat: getNumberRadom(1, 16),
    unite_vente: getNumberRadom(1, 16),
    unite_stock: getNumberRadom(1, 16),
    unite_presentation: getNumberRadom(1, 16),
    voie_id: getNumberRadom(1, 5),
  });
}

export default produitListe;
