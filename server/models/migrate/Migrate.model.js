import db from "../../config/Database.js";
import { MIGRATE } from "../../utils/utils.js";

import caisseListe from "../data/Caisse.data.js";
import fabricantListe from "../data/Fabricant.data.js";
import formeListe from "../data/Forme.data.js";
import uniteListe from "../data/Unite.data.js";
import voieListe from "../data/Voie.data.js";

import Caisse from "../Caisse.model.js";
import Fabricant from "../Fabricant.model.js";
import Forme from "../Forme.model.js"; 
import Ordonnance from "../Ordonnance.model.js"; 
import Societe from "../Societe.model.js"; 
import Unite from "../Unite.model.js";
import Voie from "../Voie.model.js";
import Utilisateur from "../utilisateur.model.js";
import utilisateurListe from "../fakers/Utilisateur.faker.js";

const Migration = async () =>{
    //  console.log(" \n\n\n\n Migration \n\n\n ");
    await db
      .sync({ force: MIGRATE })
      .then(async() => {
          
    if (MIGRATE) {
        await Caisse.bulkCreate(caisseListe).then(()=>console.log(" ------> Table << caisse >> migrée!")).catch(() => {console.log(" ------> Table << caisse >> NON migrée!!!")} );
        await Fabricant.bulkCreate(fabricantListe).then(()=>console.log(" ------> Table << Fabricant >> migrée!")).catch(() => console.log(" ------> Table << Fabricant >> NON migrée!!!") );
        await Forme.bulkCreate(formeListe).then(()=>console.log(" ------> Table << Forme >> migrée!")).catch(() => console.log(" ------> Table << Forme >> NON migrée!!!") ); 
        await Voie.bulkCreate(voieListe).then(()=>console.log(" ------> Table << Voie >> migrée!")).catch(() => console.log(" ------> Table << Voie >> NON migrée!!!") );  
        await Utilisateur.bulkCreate(utilisateurListe).then(()=>console.log(" ------> Table << Utilisateur >> migrée!")).catch(() => console.log(" ------> Table << Utilisateur >> NON migrée!!!") ); 
        await Unite.bulkCreate(uniteListe).then(()=>console.log(" ------> Table << Unite >> migrée!")).catch(() => console.log(" ------> Table << Unite >> NON migrée!!!") ); 
    }
       
      })
      .catch(() => console.log(" \n\n\n\n ERROR \n\n\n ") ); 
}

export default Migration