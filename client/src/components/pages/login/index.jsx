import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, Navigate, redirect } from "react-router-dom";
import { InputForm, urlInsert } from "../../../utils/utils";

function Login() {
  const [showPswd, setShowPswd] = useState(false);
  const [isObligatory, setIsObligatory] = useState(false);
  const [nom_login, setNom_login] = useState("");
  const [mot_de_passe, setMot_de_passe] = useState("");

  const login = () => { 
    setIsObligatory(true);
    if (!nom_login || !mot_de_passe) {
      return;
    }
    toast.promise(
      async () => {
        try {
          const response = await axios.post(urlInsert("login"), {
            nom_login,
            mot_de_passe,
          });
          if (response) { 
            toast.success(response.data.message);
            window.sessionStorage.setItem(
              "gpharma@2.0.0",
              response.data.dataUser
            );
            console.log(window.sessionStorage.getItem("gpharma@2.0.0")); 
          }
        } catch (error) {
          toast.error(JSON.parse(error.response.request.response).message);
        }
      },
      {
        pending: `Authentification en cours ...`,
        error: `Une erreur est survenue lors du tentative d'authentification!`,
      }
    );
  };

  return (
    <div
      className="authincation h-100 align-middle"
      style={{ marginTop: "8vh" }}
    >
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      {/* <a href="index.html"> */}
                      <img
                        src="images/logo.png"
                        style={{ width: "40%" }}
                        alt="Image"
                      />
                      {/* </a> */}
                    </div>
                    <h4 className="text-center mb-4 text-white">
                      <font style={{ verticalAlign: "inherit" }}>
                        <font style={{ verticalAlign: "inherit" }}>
                          Connectez-vous à votre compte
                        </font>
                      </font>
                    </h4>
                    <form action="index.html">
                      <InputForm
                        classLabel="text-white"
                        classSpan="text-secondary"
                        text
                        val={nom_login}
                        onChange={(e) => setNom_login(e.target.value)}
                        obligatory={isObligatory ? "active" : ""}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") login();
                        }}
                      >
                        Nom d'utilisateur
                      </InputForm>
                      <InputForm
                        classLabel="text-white"
                        classSpan="text-secondary"
                        type={!showPswd ? "password" : "text"}
                        val={mot_de_passe}
                        onChange={(e) => setMot_de_passe(e.target.value)}
                        obligatory={isObligatory ? "active" : ""}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            document.getElementById("btn-login").click();
                            // login();
                          }
                        }}
                      >
                        Mot de passe
                      </InputForm>
                      <div className="form-row d-flex justify-content-between mt-4 mb-2">
                        <div className="form-group">
                          <div className="custom-control custom-checkbox ml-1 text-white">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="basic_checkbox_1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="basic_checkbox_1"
                            >
                              Souvenez-vous de moi
                            </label>
                          </div>
                        </div>
                        <div
                          className="form-group  text-white ml-2"
                          onClick={() => setShowPswd(!showPswd)}
                        >
                          <font
                            style={{
                              verticalAlign: "inherit",
                              cursor: "default",
                            }}
                          >
                            {!showPswd ? "Afficher" : "Cacher"} le mot de passe
                          </font>
                        </div>
                      </div>
                      <div className="text-center">
                        <a
                          href="/"
                          id="btn-login"
                          type="button"
                          className="btn bg-white text-primary btn-block"
                          onClick={login}
                        >
                          {/* <button
                        > */}
                          <font style={{ verticalAlign: "inherit" }}>
                            <font style={{ verticalAlign: "inherit" }}>
                              Se connecter
                            </font>
                          </font>
                          {/* </button> */}
                        </a>
                      </div>
                    </form>
                    {/* <div className="new-account mt-3">
                      <p className="text-white"> 
                        <a className="text-white" href="">
                          <font style={{ verticalAlign: "inherit" }}>  
                            Mot de passe oublié? 
                          </font>
                        </a>
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Login;
