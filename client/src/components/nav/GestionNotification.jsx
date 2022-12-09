import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { showRightNav } from "../../atoms/nav";
import MyDataTable from "../../utils/mydatatable/MyDataTable";
import { ButtonTable } from "../../utils/utils";

function GestionNotification() {
  const [list, setList] = useState([]);
  const [show, setShow] = useRecoilState(showRightNav);
  const columns = [
    {
        name: "",
        selector: (row) => row.client.nom_prenom,
        sortable: true,
      },
    {
        name: "",
        width: "150px",
        selector: (row) => {
          return (
            <ButtonTable
              importance="success"
              icon={faListAlt}
              data-toggle="modal"
              data-target="#modalView"
              handleClick={() => {
                 
              }}/>
          );
        },
      },
  ]
  return (
    <>
      <MyDataTable filterClass="form-control w-100" data={list} columns={columns} />
    </>
  );
}

export default GestionNotification;
