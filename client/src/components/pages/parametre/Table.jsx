import React from "react";
import MyDataTable from "../../../utils/mydatatable/MyDataTable";
import {
  addData,
  ButtonTable,
  confirmDelete,
  deleteData,
  getData,
  InputForm,
  updateData,
} from "../../../utils/utils";
import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { countArr, table_name } from "../../../atoms/parametre";

function Table() {
  const [tb_name, setTb_name] = useRecoilState(table_name);
  const [countArray, setCountArray] = useRecoilState(countArr);
  const [new_name, setNew_name] = useState("");
  const [edit_item, setEdit_item] = useState({});
  const [listBefore, setListBefore] = useState([]);
  const [list, setList] = useState([]);
  let style = [];
  useEffect(() => {
    setEdit_item({});
    // getData("parametre/count", setCountArray);
    getData(tb_name, setListBefore);
  }, [tb_name]);
  useEffect(() => {
    let i = 0;
    let tempFull = [];
    Object.entries(listBefore).forEach(([key, value]) => {
      let temp = [];
      Object.entries(value).forEach(([k, val]) => {
        if (k == "id") {
          temp["id"] = val;
          temp["rang"] = ++i;
        } else if (k.indexOf("nom") > -1) {
          temp["nom"] = val;
        }
      });
      tempFull.push(temp);
    });
    setList(tempFull);
    //consol.log("list ;", list);
  }, [listBefore]);

  const update = (row) => {
    //consol.log("update", row);
    updateData(
      tb_name,
      row.id,
      JSON.parse(`{"nom_${tb_name}": "${edit_item.nom}"}`),
      () => {
        setEdit_item({});
        getData(tb_name, setListBefore);
        getData("parametre/count", setCountArray);
      }
    );
  };

  const columns = [
    {
      name: "#",
      selector: (row) => list.indexOf(row) + 1,
      sortable: true,
      width: "10%",
    },
    {
      name: "Nom",
      selector: (row) => {
        return (
          <span
            key={row.id}
            onDoubleClick={() => {
              setEdit_item(row);
            }}
          >
            {row.id === edit_item.id ? (
              <input
                key={row.id}
                className="form-control"
                value={edit_item.nom}
                onChange={(e) => {
                  setEdit_item({ id: edit_item.id, nom: e.target.value });
                }}
                onKeyPress={(e) => {
                  if (e.key == "Enter" && edit_item) update(row);
                }}
                // onBlur={update(row)}
              />
            ) : (
              row.nom
            )}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: "Action",
      width: "25%",
      selector: (row) => {
        let iconEdit = faEdit;
        let importance = "warning ml-2";
        if (row.id === edit_item.id) {
          importance = "success ml-2";
          iconEdit = faCheck;
        }
        return (
          <div className="btn-group">
            <ButtonTable
              importance={importance}
              icon={iconEdit}
              data-toggle="modal"
              data-target="#modalUtilisateur"
              handleClick={() => {
                if (iconEdit == faEdit) setEdit_item(row);
                if (iconEdit == faCheck) update(row);
              }}
            />
            <ButtonTable
              importance="danger ml-2"
              icon={faTrash}
              handleClick={() => {
                //consol.log(tb_name);
                confirmDelete(
                  "Voulez-vous vraimment supprimé cet " + tb_name + "?",
                  () => {
                    deleteData(tb_name, row.id, () => {
                      getData("parametre/count", setCountArray);
                      getData(tb_name, setListBefore);
                    });
                  }
                );
              }}
            />
          </div>
        );
      },
    },
  ];
  const formatName = (name) => {
    if (name == "mode_expedition") return "mode d'expedition";
    return name;
  };

  const add = () => {
    if (new_name != "") {
      addData(tb_name, JSON.parse(`{"nom_${tb_name}": "${new_name}"}`), () => {
        setNew_name("");
        getData("parametre/count", setCountArray);
        getData(tb_name, setListBefore);
      });
    }
  };

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
                    value={new_name}
                    onChange={(e) => setNew_name(e.target.value)}
                    placeholder={"Ajout d'un nouveau " + formatName(tb_name)}
                    onKeyPress={(e) => {
                      if (e.key == "Enter") add();
                    }}
                  />
                </div>
                <div className="clearfix mb-3 btn-group">
                  <button
                    type="button"
                    className="btn btn-primary px-3 light"
                    onClick={add}
                  >
                    <i className="fa fa-check" />{" "}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary px-3 light ml-2"
                    onClick={() => setNew_name("")}
                  >
                    <i className="fa fa-trash" />
                  </button>
                </div>
              </div>
              <hr />
              <MyDataTable
                data={list}
                columns={columns}
                filterClass="form-control form-control-sm" 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
