import React from "react";
import Nav from "../../nav";
import FooterNav from "../../nav/FooterNav";
import Modal from "./Modal";
import Table from "./Table"

function Societe() {
  return (
    <div id="main-wrapper" className="show">
      <Nav />
      <div className="content-body" style={{ minHeight: "80vh", marginTop:"-12vh" }}>
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <Modal/>
              <Table/>
            </div>
          </div>
        </div>
      </div>
      <FooterNav />
    </div>
  );
}

export default Societe;
