import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { showRightNav } from "../../atoms/nav";
import FooterNav from "./FooterNav";

function RightNav() {
  const [show, setShow] = useRecoilState(showRightNav);
  return (
    <>
      <div className={show ? "chatbox active " : "chatbox"}>
        <div className="chatbox-close" onClick={() => setShow(false)} />
        <div className="custom-tab-1 bg-light">
          <div className="bg-primary pt-3 pb-0 ">
            <p style={{ fontSize: "16px" }} className="text-white text-center ">
              PROFILE
            </p>
          </div>
          <div className="card-body">
            <div className="">
              <div className="profile-blog mb-3">
                <h5 className="text-primary d-inline">Information</h5>
                <img
                  src="images/profile/1.jpg"
                  alt="Image"
                  className="img-fluid mt-4 mb-4 w-100"
                />
              </div>
              <div className="profile-statistics mb-3">
                <div className="modal fade" id="sendMessageModal">
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Send Message</h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          <span>×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form className="comment-form">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="text-black font-w600">
                                  Name <span className="required">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="Author"
                                  name="Author"
                                  placeholder="Author"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="text-black font-w600">
                                  Email <span className="required">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="Email"
                                  placeholder="Email"
                                  name="Email"
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label className="text-black font-w600">
                                  Comment
                                </label>
                                <textarea
                                  rows={8}
                                  className="form-control"
                                  name="comment"
                                  placeholder="Comment"
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group">
                                <input
                                  type="submit"
                                  defaultValue="Post Comment"
                                  className="submit btn btn-primary"
                                  name="submit"
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="row">
                    <div className="col">
                      <h3 className="m-b-0">Josoa Yassini Jacquerel</h3>
                      <span>Administrateur</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a
                      type="button"
                      className="btn btn-primary mb-1"
                      data-toggle="modal"
                      data-target="#sendMessageModal"
                    >
                      Modifier
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-4 mt-3"
        style={{ minHeight: "26vh" }}>
          <h4>
            <a href="post-details.html" className="text-black">
              Administrateur de GPharma
            </a>
          </h4>
          <p className="mt-2 ">
            Cette privillège vous obtroit la contrôlle totale sur la gestion de
            votre pharmacie dans GPharma versoin 2.0.0 . Vous pouvez voir le
            manuel pour en savoir un plus de ce qui est la manipulation du
            logiciel.
          </p>
        </div>
        <div className="bg-light pt-2 w-100 " style={{top:"0vh !important"}} >
        <p className="text-center">
            Copyright © Developed by{" "}
            <a href="https://www.mada-digital.net/" className="text-primary" target="_blank">
              MADA-DIGITAL
            </a>
            {"  "}
            2022
          </p>
        </div>
      </div>
    </>
  );
}

export default RightNav;
