import React from "react";
import Nav from "../../nav";
import FooterNav from "../../nav/FooterNav";
import Modal from "./Modal";
import Table from "./Table";
import View from "./View";

function Ajustement() {
  return (
    <div id="main-wrapper" className="show">
      <Nav />
      <div className="content-body" style={{ minHeight: "80vh", marginTop:"-10vh" }}>
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <Modal/>
              <View/>
              <Table/>
            </div>
          </div>
        </div>
      </div>
      <FooterNav />
    </div>
  );
}

export default Ajustement;
