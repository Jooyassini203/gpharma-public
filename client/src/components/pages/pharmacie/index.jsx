import React from "react";
import Nav from "../../nav";
import FooterNav from "../../nav/FooterNav";
import Edit from "./Edit"; 

function Pharmacie() {
  return (
    <div id="main-wrapper" className="show">
      <Nav />
      <div className="content-body" style={{ minHeight: "60vh", marginTop:"-8vh" }}>
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <Edit/> 
            </div>
          </div>
        </div>
      </div>
      <FooterNav />
    </div>
  );
}

export default Pharmacie;
