import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export const urlInsert = (tableName) => {
  return `http://localhost:${process.env.REACT_APP_PORT}/${tableName}`;
};
export const urlRead = (tableName, id = "") => {
  if (!id) return `http://localhost:${process.env.REACT_APP_PORT}/${tableName}`;
  else
    return `http://localhost:${process.env.REACT_APP_PORT}/${tableName}/${id}`;
};
export const urlUpdate = (tableName, id) => {
  return `http://localhost:${process.env.REACT_APP_PORT}/${tableName}/${id}`;
};
export const urlDelete = (tableName, id) => {
  return `http://localhost:${process.env.REACT_APP_PORT}/${tableName}/${id}`;
};
export const getUrl = (dir, name) => {
  return `http://localhost:${process.env.REACT_APP_PORT}/${dir}/${name}`;
};

export const getData = (tableName, setList, id = "") => {
  const get = async () => {
    try {
      const response = await axios.get(urlRead(tableName, id));
      if (response.status === 200 && setList) {
        setList(response.data);
      }
    } catch (error) {
      console.log("Url Read", urlRead(tableName, id));
      toast.error("Une erreur est survenue !");
      console.log(error);
    }
  };
  toast.promise(get, {
    pending: `Chargement des ${tableName} en cours ...`,
    // success: "Promise  Loaded",
    error: `Une erreur de chargement est survenue !`,
  });
};

export const addData = (
  tableName,
  data,
  callBack = null,
  isFormData = false
) => {
  const add = async () => {
    let headers = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    if (!isFormData) headers = {};
    try {
      const responseAdd = await axios.post(urlInsert(tableName), data, headers);
      if (responseAdd) {
        toast.success(responseAdd.data.message);
        callBack();
      }
    } catch (error) {
      toast.error(JSON.parse(error.response.request.response).message);
      console.log("err", JSON.parse(error.response.request.response).message);
    }
  };

  toast.promise(add, {
    pending: `L'ajout d'un(e) ${tableName} est en cours ...`,
    // success: "Promise  Loaded",
    error: `Une erreur est survenue lors du tentative d'ajout!`,
  });
};

export const updateData = (
  tableName,
  id,
  data,
  callBack = null,
  isFormData = false
) => {
  const put = async () => {
    let headers = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    if (!isFormData) headers = {};
    try {
      console.log("up : ", urlUpdate(tableName, id), data, headers);
      const responseUp = await axios.put(
        urlUpdate(tableName, id),
        data,
        headers
      );
      if (responseUp) {
        toast.success(responseUp.data.message);
        console.log("callback", callBack);
        if (callBack) {
          callBack();
        }
      }
    } catch (error) {
      toast.error(JSON.parse(error.response.request.response).message);
      console.log("err", JSON.parse(error.response.request.response).message);
    }
  };

  toast.promise(put, {
    pending: `La modification de cet(te) ${tableName} est en cours ...`,
    // success: "Promise  Loaded",
    error: `Une erreur est survenue lors du tentative de modification!`,
  });
};

export const deleteData = (tableName, id, callBack) => {
  const del = async () => {
    try {
      const responseUp = await axios.delete(urlDelete(tableName, id));
      if (responseUp) {
        toast.success(responseUp.data.message);
        console.log(callBack);
        callBack();
      }
    } catch (error) {
      toast.error(JSON.parse(error.response.request.response).message);
      console.log("err", JSON.parse(error.response.request.response).message);
    }
  };
  toast.promise(del, {
    pending: `Suppression en cours ...`,
    // success: "Promise  Loaded",
    // error: `Une erreur est survenue lors du tentative de suppression!`,
  });
};

export const ButtonTable = ({
  icon,
  children,
  importance,
  handleClick,
  ...props
}) => {
  return (
    <button
      className={
        !importance
          ? "btn btn-sm btn-default light"
          : "btn btn-sm btn-" + importance + " light"
      }
      onClick={handleClick}
      {...props}
    >
      <FontAwesomeIcon
        icon={icon}
        // className={!importance ? "text-warning" : "text-" + importance}
      />
      {children}
    </button>
  );
};

export const InputForm = ({
  children = "",
  val = "",
  name = "",
  onChange,
  password = null,
  email = null,
  number = null,
  integer = null,
  text = null,
  date = null,
  tel = null,
  obligatory = null,
  textarea = null,
  classLabel = "",
  classSpan = "",
  ...props
}) => {
  let type = "text";
  if (text) {
    type = "text";
  } else if (number) {
    type = "number";
  } else if (email) {
    type = "email";
  } else if (password) {
    type = "password";
  } else if (integer) {
    type = "text";
  } else if (tel) {
    type = "tel";
  } else if (date) {
    type = "date";
  }
  if (textarea) {
    return (
      <div className="form-group mb-3">
        <label className={classLabel + " mb-1"} htmlFor={getId(children)}>
          <strong>{children}</strong>
        </label>
        <textarea
          name={name}
          aria-autocomplete="none"
          id={getId(children)}
          value={val}
          className={getClass(val, obligatory) + " w-100"}
          onChange={onChange}
          {...props}
        />
        {/*"Entre ton " + children.toLowerCase()*/}
        <span
          className={classSpan ? classSpan : "text-danger"}
          style={{ fontSize: "12px", marginTop: "0.5vh" }}
        >
          {getSpan(val, obligatory)}
        </span>
      </div>
    );
  }
  return (
    <div className="form-group mb-3">
      <label className={classLabel + " mb-1"} htmlFor={getId(children)}>
        <strong>{children}</strong>
      </label>
      <input
        name={name}
        aria-autocomplete="none"
        id={getId(children)}
        type={type}
        value={val}
        className={getClass(val, obligatory)}
        onChange={onChange}
        {...props}
      />
      {/*"Entre ton " + children.toLowerCase()*/}
      <span
        className={classSpan ? classSpan : "text-danger"}
        style={{ fontSize: "12px", marginTop: "0.5vh" }}
      >
        {getSpan(val, obligatory)}
      </span>
    </div>
  );
};

export const SelectForm = (props) => {
  const { children, obligatory, val, ...prop } = props;
  // console.log(children, val);
  return (
    <div className="form-group mb-3">
      <label htmlFor={getId(children)} className="mb-1">
        <strong>{children}</strong>
      </label>
      <Select styles={{ height: "90%" }} {...prop} />
      <span
        className="text-danger"
        style={{ fontSize: "12px", marginTop: "0.5vh" }}
      >
        {getSpan(val, obligatory)}
      </span>
    </div>
  );
};

const getId = (test) => {
  let string = test
    .toLowerCase()
    .replaceAll(/'/gi, "")
    .replaceAll(/"/gi, "")
    .replaceAll(/\s/gi, "")
    .replaceAll(/</gi, "")
    .replaceAll(/>/gi, "");
  function myReplaceAll(str, find, replace) {
    return str.replace(new RegExp(find, "g"), replace);
  }
  myReplaceAll(string, " ", "");
  return string;
};

const getClass = (cond, obligatory) => {
  if (obligatory === "active") {
    if (cond) return "form-control"; // form-control-sm
    else return "form-control"; //is-invalid form-control-sm
  } else {
    return "form-control"; // form-control-sm
  }
};
const getSpan = (cond, obligatory) => {
  if (obligatory === "active") {
    if (cond) return "";
    else return "Champ obligatoire";
  } else {
    return "";
  }
};

export const sexeOptions = [
  {
    value: "FEMME",
    label: "Femme",
  },
  {
    value: "HOMME",
    label: "Homme",
  },
];

export const changeValJSON = (newData, myJson) => {
  Object.entries(myJson).forEach(([key, value]) => {
    Object.entries(newData).forEach(([key1, value1]) => {
      if (key === key1) {
        myJson[key] = value1;
      }
    });
  });
};

export const getRule = (rule) => {
  let text = "Administrateur";
  if (rule === "CAISSIER") text = "Caissier";
  else if (rule === "GUICHETIER") text = "Guichetier";
  return text;
};
export const confirmDelete = (message, callBack) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div id="react-confirm-alert">
          <div className="react-confirm-alert-overlay">
            <div className="react-confirm-alert">
              <div className="react-confirm-alert-body">
                <h1>Suppression</h1>
                <p>{message}</p>
                <div>
                  <button
                    className="btn btn-danger mr-2"
                    onClick={() => {
                      callBack();
                      onClose();
                    }}
                  >
                    Supprimer
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
  /* confirmAlert({
    title: "Suppression",
    message: message,
    buttons: [
      {
        label: "Supprimer",
        onClick: () => alert("Click Yes"),
      },
      {
        label: "Annuler",
        // onClick: () => alert("Click No"),
      },
    ],
  }); */
};
