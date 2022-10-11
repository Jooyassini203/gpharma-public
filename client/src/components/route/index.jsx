import React from "react";
import { Route, Routes } from "react-router-dom"; 
import Login from "../pages/login";
import Accueil from "../pages/accueil";
import Utilisateur from "../pages/utilisateur";
import NotFound from "../pages/notFound";

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
        
        <Route path="*" element={<NotFound/>} />
      </Routes> 
    </>
  );
}

export default MyRoute;
