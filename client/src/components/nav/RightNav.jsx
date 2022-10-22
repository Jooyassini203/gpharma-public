import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { showRightNav } from "../../atoms/nav";

function RightNav() {
  const [show, setShow] = useRecoilState(showRightNav);
  return (
    <>
      <div className={show ? "chatbox active " : "chatbox"}>
        <div className="chatbox-close" onClick={() => setShow(false)} />
        <div className="custom-tab-1">
          <div
            className="bg-primary pt-3 pb-0 " 
          >
            <p style={{fontSize: "16px"}} className="text-white text-center ">PROFILE</p>
          </div>
          <div className="card-body">
            <div className="profile-blog mb-5">
              <h5 className="text-primary d-inline">Today Highlights</h5>
              <a href="javascript:void()" className="pull-right f-s-16">
                More
              </a>
              <img
                src="images/profile/1.jpg"
                alt
                className="img-fluid mt-4 mb-4 w-100"
              />
              <h4>
                <a href="post-details.html" className="text-black">
                  Darwin Creative Agency Theme
                </a>
              </h4>
              <p className="mb-0">
                A small river named Duden flows by their place and supplies it
                with the necessary regelialia. It is a paradisematic country, in
                which roasted parts of sentences fly into your mouth.
              </p>
            </div>
            <div className="profile-statistics mb-5"> 
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
                    <h3 className="m-b-0">150</h3>
                    <span>Follower</span>
                  </div>
                  <div className="col">
                    <h3 className="m-b-0">140</h3>
                    <span>Place Stay</span>
                  </div>
                  <div className="col">
                    <h3 className="m-b-0">45</h3>
                    <span>Reviews</span>
                  </div>
                </div>
                <div className="mt-4">
                  <a
                    href="javascript:void()"
                    className="btn btn-primary mb-1 mr-1"
                  >
                    Follow
                  </a>
                  <a
                    href="javascript:void()"
                    className="btn btn-primary mb-1"
                    data-toggle="modal"
                    data-target="#sendMessageModal"
                  >
                    Send Message
                  </a>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </>
  );
}

export default RightNav;
