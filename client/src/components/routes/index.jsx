import React from "react";
import { Route, Routes } from "react-router-dom"; 
import Login from "../pages/login";
import Accueil from "../pages/accueil";
import Utilisateur from "../pages/utilisateur";
import NotFound from "../pages/notFound";
import Fournisseur from "../pages/fournisseur";
import Ravitaillement from "../pages/ravitaillement";
import Parametre from "../pages/parametre";
import Middleware from "../middlewares";

function MyRoute() { 
  return (
    <> 
      <Routes>
        <Route path="/connexion" element={<Login/>} /> 
        <Route exact path="/" element={Middleware(Accueil)} />
        <Route exact path="/ravitaillement" element={Middleware(Ravitaillement)} />
        <Route exact path="/fournisseur" element={Middleware(Fournisseur)} />
        <Route exact path="/utilisateur" element={Middleware(Utilisateur)} />
        <Route exact path="/parametre" element={Middleware(Parametre)} />
        
        <Route path="*" element={<NotFound/>} />
      </Routes> 
    </>
  );
}

export default MyRoute;
