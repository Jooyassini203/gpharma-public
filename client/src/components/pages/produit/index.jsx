import React from "react";
import Nav from "../../nav";
import FouterNav from "../../nav/FooterNav";
import Modal from "./Modal";
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
        <Modal/>
        <Table/>
        <View/>
      </div>
      <FouterNav />
    </>
  );
}

export default Produit;
