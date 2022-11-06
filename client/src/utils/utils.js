import cryptojs from "crypto-js";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

let userConnect = null;
if (localStorage.getItem("gpharma@2.0.0")) {
  const userJson = cryptojs.AES.decrypt(
    localStorage.getItem("gpharma@2.0.0"),
    process.env.REACT_APP_KEY_SESSION
  ).toString(cryptojs.enc.Utf8);
  userConnect = JSON.parse(userJson);
}
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

export const getDateNow = (name = "") => {
  const date = new Date(); //2022-10-22 17:41:30
  let dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  if (name == "date")
    dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  console.log("dateString : ", dateString);
  return dateString;
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
    if (!isFormData) {
      headers = {};
      data["utilisateur_id"] = userConnect.id;
    } else {
      data.append("utilisateur_id", userConnect.id);
    }
    try {
      console.log("post : ", urlInsert(tableName), data, headers);
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

export const getEmplacement = (strEmplacement) => {
  let arr = strEmplacement.slice(0, -6).split("--//--,");
  let finalArr = [];
  for (let i = 0; i < arr.length; i++) {
    const json = JSON.parse(arr[i]);
    finalArr.push(json);
  }
  return finalArr;
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
    if (!isFormData) {
      headers = {};
      data["utilisateur_id"] = userConnect.id;
    } else {
      data.append("utilisateur_id", userConnect.id);
    }
    try {
      console.log("up : ", urlUpdate(tableName, id), data, headers);
      const responseUp = await axios.put(
        urlUpdate(tableName, id),
        data,
        headers
      );
      if (responseUp) {
        toast.success(responseUp.data.message);
        console.log("message", responseUp.data.message);
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
      const response = await axios.delete(urlDelete(tableName, id), {
        utilisateur_id: userConnect.id,
      });
      if (response) {
        toast.success(response.data.message);
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
  file = null,
  tel = null,
  obligatory = null,
  textarea = null,
  classLabel = "",
  classSpan = "",
  preIcon = null,
  postIcon = null,
  ...props
}) => {
  let type = "text";
  let onKeyPress = (e) => {};
  if (text) {
    type = "text";
  } else if (number) {
    type = "number";
  } else if (email) {
    type = "email";
  } else if (file) {
    type = "file";
  } else if (password) {
    type = "password";
  } else if (integer) {
    type = "text";
    onKeyPress = (e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    };
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
      <div className="input-group transparent-append">
        {preIcon ? (
          <div className="input-group-prepend">
            <span className="input-group-text">
              {preIcon.icon ? <i className={preIcon.icon} /> : preIcon.text}
            </span>
          </div>
        ) : (
          ""
        )}
        <input
          name={name}
          aria-autocomplete="none"
          id={getId(children)}
          type={type}
          onKeyPress={onKeyPress}
          value={val}
          className={file ? "custom-file-input" : getClass(val, obligatory)}
          onChange={onChange}
          {...props}
        />
        {file ? <label className="custom-file-label">Choisissez un ficher</label> : null}
        {postIcon ? (
          <div className="input-group-append show-pass">
            <span className="input-group-text">
              {postIcon.icon ? <i className={postIcon.icon} /> : postIcon.text}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
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
  const {
    preIcon = null,
    postIcon = null,
    val,
    children,
    obligatory,
    placeholder = "tse",
    ...prop
  } = props;
  return (
    <div className="form-group mb-3">
      <label className="mb-1">
        <strong>{children}</strong>
      </label>{" "}
      {postIcon || preIcon ? (
        <div className="input-group transparent-append">
          {" "}
          {preIcon ? (
            <div className="input-group-prepend">
              <span className="input-group-text">
                {preIcon.icon ? <i className={preIcon.icon} /> : preIcon.text}
              </span>
            </div>
          ) : (
            ""
          )}
          <Select
            placeholder={placeholder}
            menuPortalTarget={document.body}
            menuPosition={"fixed"}
            {...prop}
          />
          {postIcon ? (
            <div className="input-group-append show-pass ml-2">
              <span className="input-group-text">
                {postIcon.icon ? (
                  <i className={postIcon.icon} />
                ) : (
                  postIcon.text
                )}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <Select styles={{ height: "90%" }} {...prop} />
      )}
      <span
        className="text-danger"
        style={{ fontSize: "12px", marginTop: "0.5vh" }}
      >
        {/* {getSpan(val.value, obligatory)} */}
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
export const getSpan = (cond, obligatory) => {
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
export const confirmDelete = (
  message,
  callBack,
  btnYesText = "Supprimer",
  btnYesClass = "danger",
  title = "danger"
) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div id="react-confirm-alert">
          <div className="react-confirm-alert-overlay">
            <div className="react-confirm-alert">
              <div className="react-confirm-alert-body">
                <h1>{title}</h1>
                <p>{message}</p>
                <div>
                  <button
                    className={"btn btn-" + btnYesClass + " mr-2"}
                    onClick={() => {
                      callBack();
                      onClose();
                    }}
                  >
                    {btnYesText}
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

export const onChange = (e, setItem, nameSelect = "") => {
  if (e.label) {
    console.log("event : ", e);
    setItem((prevState) => ({ ...prevState, [nameSelect]: e }));
    return;
  } else if (e.target.files) {
    setItem((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.files[0],
    }));
    return;
  } else {
    const { name, value } = e.target;
    setItem((prevState) => ({ ...prevState, [name]: value }));
  }
};

export const getClassByNumber = (nbr) => {
  let classText = "primary";
  if (nbr <= 4) classText = "dark";
  else if (nbr <= 12) classText = "success";
  else if (nbr <= 15) classText = "secondary";
  else if (nbr <= 20) classText = "info";
  else if (nbr <= 30) classText = "warning";
  else if (nbr > 30) classText = "danger";
  return classText;
};

export const convertToOption = (data, setOptions, nom = "nom", id = "id") => {
  let tempFull = [];
  let name = "";
  Object.entries(data).forEach(([key, value]) => {
    let temp = { label: "", value: "" };
    Object.entries(value).forEach(([k, val]) => {
      if (k === id) {
        temp.value = val;
      } else if (k.indexOf(nom) > -1) {
        temp.label = val;
        name = k;
      }
    });
    tempFull.push(temp);
  });
  // console.log("setOptions " + name + " :", tempFull);
  setOptions(tempFull);
};

export const verifObligatory = (data, exception = []) => {
  // console.log(
  //   "-------------------------------------------------------------------------------------------------------------------------------------------"
  // );
  let verif = false;
  Object.entries(data).forEach(([key, value]) => {
    if (!exception.includes(key)) {
      if (value === "" || value === null) {
        console.log("exception[i]", key, value);
        verif = true;
      }
    }
  });
  return verif;
};

export const JsonToFormData = (data, file = null, nameColFile = "") => {
  let formData = new FormData();
  if (file) {
    formData.append("file", file);
    delete data[nameColFile];
  }
  formData.append("data", JSON.stringify(data));
  return formData;
};

export const filterOption = (optionSelect, state) => {
  optionSelect.filter(
    (option) => JSON.stringify(option) === JSON.stringify(state)
  );
};
