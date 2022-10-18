import React from "react";
import Table from "../parametre/Table";
import MyDataTable from "../../../utils/mydatatable/MyDataTable";
import { ButtonTable, getData, InputForm } from "../../../utils/utils";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

function Table() {
  const [tb_name, setTb_name] = useRecoilState(table_name);
  const [list, setList] = useState([]);
  useEffect(() => {
    getData("");
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="right-box-padding">
            <div className="read-content">
              <div className="media pt-3 d-sm-flex d-block justify-content-between">
                <div className="clearfix  w-100 mb-3 mr-2 d-flex">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ajout d'un nouveau ..."
                  />
                </div>
                <div className="clearfix mb-3 btn-group">
                  <a type="button" className="btn btn-primary px-3 light">
                    <i className="fa fa-check" />{" "}
                  </a>
                  <a type="button" className="btn btn-primary px-3 light ml-2">
                    <i className="fa fa-trash" />
                  </a>
                </div>
              </div>
              <hr />
              <MyDataTable
                columns={columns}
                actions={
                  <button
                    type="button"
                    className="btn btn-sm btn-primary float-right"
                    data-toggle="modal"
                    data-target="#modalUtilisateur"
                    onClick={() => {
                      isAdd(true);
                    }}
                  >
                    Ajouter un utilisateur
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
