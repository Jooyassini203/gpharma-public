import React from "react";
import { useRecoilState } from "recoil";
import Nav from "../../nav";
import FooterNav from "../../nav/FooterNav";
import { isAddState } from "../../../atoms/caisse";
import Insert from "./Insert";
import Table from "./Table";
import View from "./View";

function Caisse() { 
  const [isAdd, setIsAdd] = useRecoilState(isAddState)
  return (
    <div id="main-wrapper" className="show">
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: "80vh", marginTop: "-10vh" }}
      >
        <div className="container-fluid">
          {isAdd == "1" ? <Insert /> :<> <Table /> <View/></>}
        </div>
      </div>
      <FooterNav />
    </div>
  );
}

export default Caisse;
