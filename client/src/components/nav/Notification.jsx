import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { getDateNow } from "../../utils/utils";

function Notification() {
  const [notifs, setNotifs] = React.useState([]);
  const a = async () => {
    console.log(getDateNow());
    await axios
      .get("http://localhost:5000/getAllNotification", { timeout: 500000 })
      .then((res) => {
        setNotifs(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        a();
      });
  };
  const getIconNotif = (importance) => {
    var faLabel;
    switch (importance) {
      case "info":
        faLabel = "info";
        break;
      case "success":
        faLabel = "check";
        break;
      case "warning":
        faLabel = "check";
        break;
      case "danger":
        faLabel = "times";
        break;
      case "secondary":
        faLabel = "eye";
        break;
    } //fin switch
    return faLabel;
  };
  const hideNofit = (id) =>{
    console.log(id);
  }
  useEffect(() => {
    a();
  }, []);
  /*
    useEffect(() => { 
      const a = setInterval(() => {
          axios.get('teste', {timeout: 5000}).then(()=>{
              console.log('teste 5000ms');
          })
          setNotif(notif => ({...notif, ['nbr']: notif.nbr + 1}))
      }, 1000);
      return () => {
        clearInterval(a);
      };
    }, []); */
  return (
    <div>
      <li className="nav-item dropdown notification_dropdown">
        <a
          className="nav-link  ai-icon"
          type="button"
          role="button"
          data-toggle="dropdown"
        >
          <svg
            width={28}
            height={28}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.75 15.8385V13.0463C22.7471 10.8855 21.9385 8.80353 20.4821 7.20735C19.0258 5.61116 17.0264 4.61555 14.875 4.41516V2.625C14.875 2.39294 14.7828 2.17038 14.6187 2.00628C14.4546 1.84219 14.2321 1.75 14 1.75C13.7679 1.75 13.5454 1.84219 13.3813 2.00628C13.2172 2.17038 13.125 2.39294 13.125 2.625V4.41534C10.9736 4.61572 8.97429 5.61131 7.51794 7.20746C6.06159 8.80361 5.25291 10.8855 5.25 13.0463V15.8383C4.26257 16.0412 3.37529 16.5784 2.73774 17.3593C2.10019 18.1401 1.75134 19.1169 1.75 20.125C1.75076 20.821 2.02757 21.4882 2.51969 21.9803C3.01181 22.4724 3.67904 22.7492 4.375 22.75H9.71346C9.91521 23.738 10.452 24.6259 11.2331 25.2636C12.0142 25.9013 12.9916 26.2497 14 26.2497C15.0084 26.2497 15.9858 25.9013 16.7669 25.2636C17.548 24.6259 18.0848 23.738 18.2865 22.75H23.625C24.321 22.7492 24.9882 22.4724 25.4803 21.9803C25.9724 21.4882 26.2492 20.821 26.25 20.125C26.2486 19.117 25.8998 18.1402 25.2622 17.3594C24.6247 16.5786 23.7374 16.0414 22.75 15.8385ZM7 13.0463C7.00232 11.2113 7.73226 9.45223 9.02974 8.15474C10.3272 6.85726 12.0863 6.12732 13.9212 6.125H14.0788C15.9137 6.12732 17.6728 6.85726 18.9703 8.15474C20.2677 9.45223 20.9977 11.2113 21 13.0463V15.75H7V13.0463ZM14 24.5C13.4589 24.4983 12.9316 24.3292 12.4905 24.0159C12.0493 23.7026 11.716 23.2604 11.5363 22.75H16.4637C16.284 23.2604 15.9507 23.7026 15.5095 24.0159C15.0684 24.3292 14.5411 24.4983 14 24.5ZM23.625 21H4.375C4.14298 20.9999 3.9205 20.9076 3.75644 20.7436C3.59237 20.5795 3.50014 20.357 3.5 20.125C3.50076 19.429 3.77757 18.7618 4.26969 18.2697C4.76181 17.7776 5.42904 17.5008 6.125 17.5H21.875C22.571 17.5008 23.2382 17.7776 23.7303 18.2697C24.2224 18.7618 24.4992 19.429 24.5 20.125C24.4999 20.357 24.4076 20.5795 24.2436 20.7436C24.0795 20.9076 23.857 20.9999 23.625 21Z"
              fill="#007A64"
            />
          </svg>
          <span className="badge light text-white bg-primary">
            {notifs.length}
          </span>
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <div id="DZ_W_Notification1" className="card">
            <ul className="timeline mt-4">
              {notifs.map((notif) => (
                <li key={notif.id} onClick={()=>hideNofit(notif.id)}>
                  <div className="row m-auto">
                    <div className="col-3">
                      <div
                        className={
                          "btn btn-lg btn-" + notif.importance + " light"
                        }
                      >
                        <i
                          className={
                            "fa fa-lg fa-" + getIconNotif(notif.importance)
                          }
                        />
                      </div>
                    </div>
                    <div className="col">
                      <h6 className="mb-1">{notif.label}</h6>
                      <small className="d-block">{notif.details}</small>
                      <small className="d-block">{notif.createdAt}</small>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {notifs.length > 0 ? (
            <a className="all-notification" type="button">
              Voir tout <i className="ti-arrow-right" />
            </a>
          ) : null}
        </div>
      </li>
    </div>
  );
}

export default Notification;
