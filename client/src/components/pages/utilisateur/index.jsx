import React from "react";
import { useRecoilState } from "recoil";
import Nav from "../../nav";
import FooterNav from "../../nav/FooterNav";
import Modal from "./Modal";
import Viewer from "./Viewer";
import Table from "./Table";
import {
  isAddState,
  listUtilisateurState,
  userSelectState,
} from "../../../atoms/utilisateur";
import { confirmDelete, deleteData, getData } from "../../../utils/utils";
import { userConnected } from "../../../atoms/authentication";

function Utilisateur() {
  const [listUser, setListUser] = useRecoilState(listUtilisateurState);
  const [isAdd, setIsAdd] = useRecoilState(isAddState);
  const [userSelect, setUserSelect] = useRecoilState(userSelectState);
  const [userConnect, setUserConnect] = useRecoilState(userConnected);

  const showModalUpdateUser = (id) => {
    getData(
      "utilisateurs",
      (user) => {
        setUserSelect({ ...user, mot_de_passe: "" });
      },
      userConnect.id + "--//--" + id
    );
  };
  const deleteUser = (id) => {
    confirmDelete("Voulez-vous vraimment supprimé cet utilisateur?", () => {
      deleteData("utilisateur", userConnect.id + "--//--" + id, () => {
        console.log(
          "delete ",
          userConnect.id + "--//--" + id,
          "lancement du mise à jours de la liste"
        );
        getData("utilisateurs", setListUser, userConnect.id);
      });
    });
  };
  const viewUser = (id) => {
    console.log(userConnect.id + "--//--" + id);
    getData(`utilisateurs`, setUserSelect, userConnect.id + "--//--" + id);
  };
  return (
    <div id="main-wrapper" className="show">
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: "90vh", marginTop: "-12vh" }}
      >
        <div className="container-fluid">
          {/* <div className="page-titles" style={{ marginBottom: "0vh" }}>
            <h4>Gestion des utilisateurs</h4>
          </div> */}
          <Table
            isAdd={setIsAdd}
            update={showModalUpdateUser}
            del={deleteUser}
            view={viewUser}
            list={listUser}
          />
          {/* <Viewer data={dataView} /> */}
        </div>
      </div>
      <Modal />
      <Viewer data={userSelect} />
      <FooterNav />
    </div>
  );
}

export default Utilisateur;
