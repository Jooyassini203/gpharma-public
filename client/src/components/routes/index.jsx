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
import Produit from "../pages/produit";
import Ajustement from "../pages/ajustement";
import Societe from "../pages/societe";
import Caisse from "../pages/caisse";
import Guichet from "../pages/guichet";
import Pharmacie from "../pages/pharmacie";
import { useRecoilState } from "recoil";
import { userConnected } from "../../atoms/authentication"; 
import cryptojs from "crypto-js";
import Marge_beneficiaire from "../pages/marge_beneficiaire"; 

function MyRoute() {
  const [userConnect, setUserConnect] = useRecoilState(userConnected);
  const getLogin = () => {
    if (localStorage.getItem("gpharma@2.0.0")) {
      return <Navigate to="/" />;
    }
    return <Login />;
  }; 
  React.useEffect(()=>{
    if(localStorage.getItem("gpharma@2.0.0")){ 
      // const userJson = cryptojs.AES.decrypt(
      //   localStorage.getItem("gpharma@2.0.0"),
      // "x85p2qPE2I$7IJ8*EZQQ049bAxhwnr"
      // ).toString(cryptojs.enc.Utf8);
      setUserConnect(JSON.parse(localStorage.getItem("gpharma@2.0.0")));
    }
  },[]) 
  return (
    <>
      <Routes>
        <Route exact path="/connexion" element={getLogin()} />

        <Route exact path="/" element={Middleware(Accueil)} />
        {userConnect.type_utilisateur == "CAISSIER" ||
        userConnect.type_utilisateur == "ADMIN" ? (
          <Route exact path="/caisse" element={Middleware(Caisse)} />
        ) : null}

        {userConnect.type_utilisateur == "GUICHETIER" ||
        userConnect.type_utilisateur == "ADMIN" ? (
          <Route exact path="/guichet" element={Middleware(Guichet)} />
        ) : null}
        {  userConnect.type_utilisateur == "ADMIN" ? (
          <>
            <Route exact path="/ajustement" element={Middleware(Ajustement)} />
            <Route
              exact
              path="/fournisseur"
              element={Middleware(Fournisseur)}
            />
            <Route
              exact
              path="/ravitaillement"
              element={Middleware(Ravitaillement)}
            />
            <Route exact path="/produit" element={Middleware(Produit)} />
            <Route exact path="/parametre" element={Middleware(Parametre)} />
            <Route exact path="/marge_beneficiaire" element={Middleware(Marge_beneficiaire)} />
            <Route exact path="/societe" element={Middleware(Societe)} />
            <Route
              exact
              path="/utilisateur"
              element={Middleware(Utilisateur)}
            />
            <Route exact path="/pharmacie" element={Middleware(Pharmacie)} />
          </>
        ) : null}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default MyRoute;
