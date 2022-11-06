import React from "react";
import Nav from "../../nav";
import FooterNav from "../../nav/FooterNav";
import { useRecoilState } from "recoil";
import Insert from "./Insert";
import Table from "./Table";
import { isAddState } from "../../../atoms/guichet";

function Guichet() {
  const [isAdd, setIsAdd] = useRecoilState(isAddState);
  return (
    <div id="main-wrapper" className="show">
      <Nav />


      <div className="content-body" style={{ minHeight: "80vh", marginTop:"-10vh" }}>
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              {isAdd == "1" ? <Insert /> : <Table />}
            </div>
          </div>
        </div>
      </div>
      <FooterNav />
    </div>
  );
}

export default Guichet;
