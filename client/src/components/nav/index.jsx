import React, { useState } from "react";
import NavElement, { NavElementChildren } from "./NavElement";
import HeadNav from "./HeadNav";
import LeftNav from "./LeftNav";
import FooterNav from "./FooterNav";
import RightNav from "./RightNav";

function Nav() {
  return (
    <>
      <HeadNav />
      <RightNav />
      <LeftNav>
        <NavElement to="/" icon="fas fa-television" title="Accueil" />
        <NavElement icon="fas fa-shopping-cart" title="Vente">
          <NavElementChildren
            to="/caisse"
            icon="far fa-money-bill-alt"
            title="Caisse"
          />
          <NavElementChildren
            to="/guichet"
            icon="far fa-list-alt"
            title="Guichet"
          />
        </NavElement>

        <NavElement icon="fas fa-cogs" title="Administation">
           <NavElementChildren
            to="/ajustement"
            icon="fas fa-balance-scale"
            title="Ajustement"
          />
          {/* <NavElementChildren to="/depot" icon="fas fa-warehouse" title="Dépôt" />  */}
          <NavElementChildren
            to="/fournisseur"
            icon="fas fa-industry"
            title="Fournisseur"
          />
          <NavElementChildren
            to="/ravitaillement"
            icon="fas fa-shipping-fast"
            title="Ravitaillement"
          />
          <NavElementChildren
            to="/produit"
            icon="fas fa-dolly-flatbed"
            title="Produit"
          />
          <NavElementChildren
            to="/parametre"
            icon="fas fa-cog"
            title="Paramètre"
          />
        </NavElement>

        <NavElement
          to="/utilisateur"
          icon="fas fa-user-cog"
          title="Utilisateur"
        />
      </LeftNav>
      <FooterNav/>
    </>
  );
}

export default Nav;
