import React from "react";
import Nav from "../../nav";
import FouterNav from "../../nav/FooterNav";
import Table from "./Table";
import View from "./View";

function Produit() {
  return (
    <>
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: "90vh", marginTop: "-8vh" }}
      > 
        <Table />
        <View />
      </div>
      <FouterNav />
    </>
  );
}

export default Produit;
