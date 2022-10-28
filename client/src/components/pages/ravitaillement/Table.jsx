import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useRecoilState } from "recoil";
import { listRavitaillement, toggleAddTableEdit } from "../../../atoms/ravitaillement";
import MyDataTable from "../../../utils/mydatatable/MyDataTable";
import {
  ButtonTable,
  confirmDelete,
  deleteData,
  getData,
} from "../../../utils/utils";

function Table() {
  const [toggle, setToggle] = useRecoilState(toggleAddTableEdit);
  const [list, setList] = useRecoilState(listRavitaillement);
  const columns = [
    {
      name: "Motif",
      selector: (row) => row.motif,
      sortable: true,
    },
    {
      name: "Action",
      width: "200px",
      selector: (row) => {
        return (
          <>
            <ButtonTable
              importance="secondary"
              icon={faEye}
              handleClick={() => {
                // getData(
                //   "produit",
                //   (data) => setProduit(data[0]),
                //   row.code_lot_produit
                // );
              }}
            />
            <ButtonTable
              importance="warning"
              icon={faEdit}
              handleClick={() => {
                // setIsAdd({ status: false });
                // getData(
                //   "produit",
                //   (data) => setProduit(data[0]),
                //   row.code_lot_produit
                // );
              }}
            />
            <ButtonTable
              importance="danger"
              icon={faTrash}
              handleClick={() => {
                confirmDelete(
                  <>
                    Voulez-vous vraimment supprimé le ravitaillement{" "}
                    <strong>{row.motif}</strong> ?
                  </>,
                  () => {
                    deleteData("ravitaillement", row.id, () => {
                      getData("ravitaillement", setList);
                    });
                  }
                );
              }}
            />
          </>
        );
      },
    },
  ];
  React.useEffect(() => {
    getData("ravitaillement", (data) => setList(data));
  }, []);
  return (
    <>
      <MyDataTable
        columns={columns}
        data={list}
        title="Liste des ravitaillements efféctuées"
        filterClass="form-control w-100"
        actions={
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              let a = 0;
              if (toggle === 0) a = 1;
              setToggle(a);
            }}
          >
            <i className="fa fa-plus mr-2"></i> Efféctuer un ravitaillement
          </button>
        }
      />
    </>
  );
}

export default Table;
