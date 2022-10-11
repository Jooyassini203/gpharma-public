import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [showPswd, setShowPswd] = useState(false);
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
                      <img src="images/logo-full.png" alt />
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
                      <div className="form-group">
                        <label className="mb-1 text-white">
                          <strong>
                            <font style={{ verticalAlign: "inherit" }}>
                              <font style={{ verticalAlign: "inherit" }}>
                                Nom d'utilsateur
                              </font>
                            </font>
                          </strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          // defaultValue="hello@example.com"
                        />
                      </div>
                      <div className="form-group">
                        <label className="mb-1 text-white">
                          <strong>
                            <font style={{ verticalAlign: "inherit" }}>
                              <font style={{ verticalAlign: "inherit" }}>
                                Mot de passe
                              </font>
                            </font>
                          </strong>
                        </label>
                        <input
                          type={!showPswd ? "password" : "text"}
                          className="form-control"
                          // defaultValue="Password"
                        />
                      </div>
                      <div className="form-row d-flex justify-content-between mt-4 mb-2">
                        <div class="form-group">
                          <div class="custom-control custom-checkbox ml-1 text-white">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="basic_checkbox_1"
                            />
                            <label
                              class="custom-control-label"
                              for="basic_checkbox_1"
                            >
                              Souvenez-vous de moi
                            </label>
                          </div>
                        </div>
                        <div
                          className="form-group  text-white "
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
                        <Link to="/">
                          {" "}
                          <button
                            type="button"
                            className="btn bg-white text-primary btn-block"
                          >
                            <font style={{ verticalAlign: "inherit" }}>
                              <font style={{ verticalAlign: "inherit" }}>
                                Se connecter
                              </font>
                            </font>
                          </button>
                        </Link>
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
    </div>
  );
}

export default Login;
