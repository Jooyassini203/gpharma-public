import React from "react";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { listProduit } from "../../../atoms/produit";
import MyDataTable from "../../../utils/mydatatable/MyDataTable";
import {
  ButtonTable,
  confirmDelete,
  deleteData,
  getData,
  getUrl,
} from "../../../utils/utils";
import { useRecoilState } from "recoil";

function Table() {
  const [list, setList] = useRecoilState(listProduit);
  const columns = [
    {
      name: "",
      selector: (row) => (
        <img
          style={{ verticalAlign: "middle" }}
          className="img-1 mr-sm-4 mr-3"
          styles={{ borderRadius: "5%" }}
          src={
            row.image
              ? getUrl("images/fournisseur", row.image)
              : `images/users/3.jpg`
          }
          alt={`image de ${row.nom_fournisseur}`}
        />
      ),
      sortable: true,
      width: "8%",
    },
    {
      name: "Produit",
      selector: (row) => (
        <div className="d-flex align-items-center mr-auto ">
          {/* <span className="num mr-sm-4 mr-3">#{row.code_lot_produit}</span>
          <img src="images/users/3.jpg" className="img-1 mr-sm-4 mr-3" alt={`Image de ${row.designation}`} /> */}
          <div className="w-100">
            <h4 className="mb-sm-2 mb-1 text-black">{row.nom_produit}</h4>
            <p className="fs-14 text-primary font-w600">
              #{row.code_lot_produit}
            </p>
            <p className="fs-14 text-secondary font-w600 text-justify">
              {row.classification_produit}
            </p>
          </div>
        </div>
      ),
      sortable: true,
      width: "20%",
    },
    {
      name: "Détails",
      selector: (row) => (
        <div className="d-flex align-items-center mr-auto pr-2">
          <div>
            <p className="mb-sm-2 mb-1 text-black">
              Fabricant{" "}
              <span className="fs-14 text-primary font-w600">
                {row.nom_fabricant}
              </span>
              ,
            </p>
            <p className="mb-sm-2 mb-1 text-black">
              Famille{" "}
              <span className="fs-14 text-secondary font-w600">
                {row.nom_famille}
              </span>
              ,
            </p>
            <p className="mb-sm-2 mb-1 text-black">
              Forme{" "}
              <span className="fs-14 text-warning font-w600">
                {row.nom_forme}
              </span>
              .
            </p>
          </div>
        </div>
      ),
      width: "10%",
    },
    {
      name: "Unité",
      selector: (row) => (
        <div className="d-flex align-items-center mr-auto pr-2">
          <div>
            <p className="mb-sm-2 mb-1 text-black">
              Unité d'achat :{" "}
              <span className="fs-14 text-primary font-w600">
                {row.nom_achat}
              </span>
              ,
            </p>
            <p className="mb-sm-2 mb-1 text-black">
              Unité de vente :{" "}
              <span className="fs-14 text-secondary font-w600">
                {row.nom_vente}
              </span>
              ,
            </p>
            <p className="mb-sm-2 mb-1 text-black">
              Unité de stock :{" "}
              <span className="fs-14 text-warning font-w600">
                {row.nom_stock}
              </span>
              .
            </p>
            <p className="mb-sm-2 mb-1 text-black">
              Unité de presentation :{" "}
              <span className="fs-14 text-primary font-w600">
                {row.nom_presentation}
              </span>
              ,
            </p>
          </div>
        </div>
      ),
      width: "10%",
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          style={{ cursor: "pointer" }}
          className={
            row.status == "1"
              ? "badge light badge-success"
              : "badge light badge-danger"
          }
        >
          <i
            className={
              row.status == "1"
                ? "fa fa-circle text-success mr-1"
                : "fa fa-circle text-danger mr-1"
            }
          />
          {row.status == "1" ? "Activé" : "Désactivé"}
        </span>
      ),
      sortable: true,
      width: "10%",
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
              data-toggle="modal"
              data-target="#modalViewFournisseur"
              handleClick={() => {
                //   getData("fournisseur", setFournisseur, row.id);
              }}
            />
            <ButtonTable
              importance="warning"
              icon={faEdit}
              data-toggle="modal"
              data-target="#modalFournisseur"
              handleClick={() => {
                // setIsAdd({ status: false });
                //   getData("fournisseur", setFournisseur, row.id);
              }}
            />
            <ButtonTable
              importance="danger"
              icon={faTrash}
              handleClick={() => {
                confirmDelete(
                  "Voulez-vous vraimment supprimé cet produit ?",
                  () => {
                    deleteData("produit", row.id, () => {
                      getData("produit", setList);
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
    getData("produit", setList);
  }, []);
  return (
    <div className="card-body">
      <MyDataTable
        title="Liste des produits"
        data={list}
        columns={columns}
        filterClass="w-100 form-control"
        actions={
          <div className="btn-group float-right">
            <button
              className="btn btn-primary btn-sm mr-3"
              data-toggle="modal"
              data-target="#modalProduit"
              onClick={() => {
                /* setIsAdd({ status: true }) */
              }}
            >
              <i className="fa fa-plus mr-3" />
              Ajout d'un produit
            </button>
            {/* <button className="btn btn-outline-primary btn-sm"
          data-toggle="modal"
          data-target="#modalActivityFournisseur">
          <i className="fa fa-list-alt mr-3"></i>Activités
        </button> */}
          </div>
        }
      />
    </div>
  );
}

export default Table;
