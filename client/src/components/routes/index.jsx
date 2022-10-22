import React from "react";
import { Navigate, Route, Routes } from "react-router-dom"; 
import Login from "../pages/login";
import Accueil from "../pages/accueil";
import Utilisateur from "../pages/utilisateur";
import NotFound from "../pages/notFound";
import Fournisseur from "../pages/fournisseur";
import Ravitaillement from "../pages/ravitaillement";
import Parametre from "../pages/parametre";
import Middleware from "../middlewares";

function MyRoute() {  
  const getLogin = () => {
    if (sessionStorage.getItem('gpharma@2.0.0')) {
      return <Navigate to="/" />
    }
    return <Login/>
  }
  return (
    <> 
      <Routes>
        <Route exact path="/connexion" element={getLogin()} /> 
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
