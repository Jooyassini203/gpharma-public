import React from "react";
import { useRecoilState } from "recoil";
import { toggleAddTableEdit } from "../../../atoms/ravitaillement";
import Nav from "../../nav";
import FooterNav from "../../nav/FooterNav";
import Edit from "./Edit";
import Insert from "./Insert";
import Table from "./Table";
import View from "./View";

function Ravitaillement() {
  const [toggle, setToggle] = useRecoilState(toggleAddTableEdit);
  return (
    <>
      <Nav />
      <button
        style={{ display: "none" }}
        id="btn-view-modal"
        data-toggle="modal"
        data-target="#modalView"
      ></button>
      <div
        className="content-body"
        style={{ minHeight: "90vh", marginTop: "-8vh" }}
      >
        <div className="float-right mr-5"></div>
        <div className="card-body">
          {toggle === 0 ? <Table /> : toggle === 1 ? <Insert /> : <Edit />}
        </div>
      </div>
      <View />
      <FooterNav />
    </>
  );
}

export default Ravitaillement;
