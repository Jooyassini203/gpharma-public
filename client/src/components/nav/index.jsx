import cryptojs from "crypto-js";
import React, { useEffect, useState } from "react";
import NavElement, { NavElementChildren } from "./NavElement";
import HeadNav from "./HeadNav";
import LeftNav from "./LeftNav";
import FooterNav from "./FooterNav";
import RightNav from "./RightNav";
import { useRecoilState } from "recoil";
import { userConnected } from "../../atoms/authentication";

function Nav() {
  const [userConnect, setUserConnect] = useRecoilState(userConnected);
  useEffect(() => {
    const userJson = cryptojs.AES.decrypt(
      localStorage.getItem("gpharma@2.0.0"),
      process.env.REACT_APP_KEY_SESSION
    ).toString(cryptojs.enc.Utf8);
    setUserConnect(JSON.parse(userJson));
  }, []);
  return (
    <>
      <HeadNav />
      <RightNav />
      <LeftNav >
        <NavElement to="/" icon="fa fa-television fa-lg" title="Accueil" />
        <NavElement icon="fa fa-shopping-cart fa-lg" title="Vente">
          {userConnect.type_utilisateur == "CAISSIER" ||
          userConnect.type_utilisateur == "ADMIN" ? (
            <NavElementChildren
              to="/caisse"
              icon="fa fa-money-bill-alt"
              title="Caisse"
            />
          ) : null}
          {userConnect.type_utilisateur == "GUICHETIER" ||
          userConnect.type_utilisateur == "ADMIN" ? (
            <NavElementChildren
              to="/guichet"
              icon="fa fa-list-alt"
              title="Guichet"
            />
          ) : null}
        </NavElement>

        {userConnect.type_utilisateur == "ADMIN" ? (
          <>
            <NavElement icon="fa fa-cogs" title="Administation">
              <NavElementChildren
                to="/ajustement"
                icon="fa fa-balance-scale"
                title="Ajustement"
              />
              {/* <NavElementChildren to="/depot" icon="fa fa-warehouse" title="Dépôt" />  */}
              <NavElementChildren
                to="/fournisseur"
                icon="fa fa-industry"
                title="Fournisseur"
              />
              <NavElementChildren
                to="/ravitaillement"
                icon="fa fa-shipping-fast"
                title="Ravitaillement"
              />
              <NavElementChildren
                to="/produit"
                icon="fa fa-dolly-flatbed"
                title="Produit"
              />
              <NavElementChildren
                to="/parametre"
                icon="fa fa-cog"
                title="Paramètre"
              />
              <NavElementChildren
                to="/marge_beneficiaire"
                icon="fa fa-line-chart "
                title="Marge bénéficiaire"
              />
              <NavElementChildren
                to="/societe"
                icon="fa fa-hospital-alt"
                title="Société"
              />
            </NavElement>
        <NavElement
          to="/utilisateur"
          icon="fa fa-user-cog"
          title="Utilisateur"
        />
        <NavElement to="/pharmacie" icon="fa fa-cog" title="Pharmacie" />
          </>
        ) : null}

      </LeftNav>
      <FooterNav />
    </>
  );
}

export default Nav;
