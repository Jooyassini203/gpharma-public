import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Accueil from "../pages/accueil";
import cryptojs from "crypto-js";

function RouteFilter({ path, element, ...props }) {
  let userConnect = {};
  const userJson = cryptojs.AES.decrypt(
    window.localStorage.getItem("gpharma@2.0.0"),
    process.env.REACT_APP_KEY_SESSION
  ).toString(cryptojs.enc.Utf8);
  userConnect = JSON.parse(userJson);

  const getUrlPage = () => {
    let array = [];
    switch (userConnect.type_utilisateur) {
      case "ADMIN":
        array = [
          "caisse",
          "guichet",
          "ajustement",
          "fournisseur",
          "ravitaillement",
          "produit",
          "parametre",
          "societe",
          "utilisateur",
          "pharmacie",
        ];
        break;
      case "CAISSIER":
        array = ["caisse"];
        break;
      case "GUICHETIER":
        array = ["guichet"];
        break;
      default:
        array = [];
    }
    console.log("array", array);
    return array;
  };

  return (
    <>
      <Routes>
        {" "}
        {getUrlPage().includes(path.slice(0, -1)) ? (
          <Route exact path={path} element={element} />
        ) : (
          <Route exact path={path} element={<Accueil />} />
        )}
      </Routes>
    </>
  );
}

export default RouteFilter;
