let arrayValue = ['AMPOULE','BLISTER','BIDON','BOBINE','BOITE','CM','FLACON','KIT','PLAQUETTE','POCHE','SACHET','ROULEAU','SERINGUE','SPARADRAP','TUBE','CPR'];
let uniteListe = [];
for (let index = 0; index < arrayValue.length; index++) {
  uniteListe.push({
    nom_unite: arrayValue[index], 
  });
}

export default uniteListe;
