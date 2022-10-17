import React from "react";
import { Route, Routes } from "react-router-dom"; 
import Login from "../pages/login";
import Accueil from "../pages/accueil";
import Utilisateur from "../pages/utilisateur";
import NotFound from "../pages/notFound";
import Parametre from "../pages/parametre";

function MyRoute() { 
  return (
    <> 
      <Routes>
        <Route path="/connexion" element={<Login/>} />
        {/* {
          (sessionStorage.getItem('gpharma@2.0.0'))
        } */}
        <Route exact path="/" element={<Accueil/>} />
        <Route exact path="/utilisateur" element={<Utilisateur/>} />
        <Route exact path="/parametre" element={<Parametre/>} />
        
        <Route path="*" element={<NotFound/>} />
      </Routes> 
    </>
  );
}

export default MyRoute;
