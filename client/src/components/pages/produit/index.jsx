import React from "react";
import { useRecoilState } from "recoil";
import { actionEtalage } from "../../../atoms/ravitaillement";
import Nav from "../../nav";
import FouterNav from "../../nav/FooterNav";
import IndexEtalage from "./indexEtalage";
import Modal from "./Modal";
import Table from "./Table";
import View from "./View";

function Produit() {
  const [actEtalage, setActEtalage] = useRecoilState(actionEtalage);
  return (
    <>
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: "90vh", marginTop: "-8vh" }}
      >
        <Modal />
        <Table />
        <View />
      </div>
      {actEtalage.status ? <IndexEtalage /> : null}
      <FouterNav />
    </>
  );
}

export default Produit;
