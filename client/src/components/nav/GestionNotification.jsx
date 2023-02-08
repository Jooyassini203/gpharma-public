import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { listNotifs } from "../../atoms/notification";
import {
  deleteData,
  getIconNotif,
  getNotifsByMilliseconds,
} from "../../utils/utils";

function GestionNotification({socket}) {
  const [list, setList] =  useRecoilState(listNotifs);
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = list.filter((item) => {
    const text = item.label + item.details + item.createdAt;
    return text.toLowerCase().includes(search.toLowerCase());
  });

  const getMyNotif =  () =>{
    getNotifsByMilliseconds((data) => {
      setList(data);
    }, "getAllNotification");
  }

  useEffect(() => { 
  }, []);
  /*  <>
  <ul className="timeline mt-4">
    {list.map((notif, index) => (
      <li key={notif.id} className="mb-1">
        <div className="row m-auto bg-light py-2">
          <div className="col">
            <div className={"badge py-3 "}>
              <i
                className={
                  "fa fa-xl fa-" +
                  getIconNotif(notif.importance) +
                  " text-" +
                  notif.importance
                }
              />
            </div>
          </div>
          <div className="col-8">
            <h6 className="mb-1">{notif.label}</h6>
            <small className="d-block">{notif.details}</small>
            <small className="d-block">{notif.createdAt}</small>
          </div>
          <div className="col ">
            <button className="btn btn-sm btn-danger light">
              <i className="fa fa-trash" />
            </button>
          </div>
        </div>
      </li>
    ))}
    {list.length < 0 ? (
      <li className="text-center">
        Voir tout dans le gestionnaire de notification
      </li>
    ) : null}
  </ul>
</> */
  return (
    <>
      <div style={{ margin: "10px" }}>
        <div className="form-group">
          <label htmlFor="filter-gestion-notification" className="font-w600">
            Filtre
          </label>
          <input
            type="text"
            id="filter-gestion-notification"
            className="form-control"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <table>
          <tbody>
            {filteredData.map((notif, index) => (
              <tr
                key={notif.id}
                className={notif.etat == "NOUVELLE" ? "bg-light" : ""}
                style={{
                  padding: "5px 0px 5px 0px",
                  margin: "0px 0px 10px 0px",
                }}
              >
                <td style={{ padding: "0 0px" }}>
                  <div className={"badge py-3 "}>
                    <i
                      style={{ width: "2vw" }}
                      className={
                        "fa fa-xl fa-" +
                        getIconNotif(notif.importance) +
                        " text-" +
                        notif.importance
                      }
                    />
                  </div>
                </td>
                <td style={{ padding: "10px 10px 10px 10px" }}>
                  <h6 className="mb-1">{notif.label}</h6>
                  <small className="d-block">{notif.details}</small>
                  <small className="d-block">{notif.createdAt}</small>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-light"
                    onClick={() => {
                      deleteData("Notification", notif.id, getMyNotif);
                    }}
                  >
                    <i className="fa fa-trash" style={{ color: "gray" }} />
                  </button>
                </td>
              </tr>
            ))}
            {list.length < 0 ? (
              <tr className="text-center">
                Voir tout dans le gestionnaire de notification
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default GestionNotification;
