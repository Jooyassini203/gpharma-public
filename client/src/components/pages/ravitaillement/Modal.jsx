import React from "react";

function Modal() {
  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        aria-modal="true"
        data-backdrop="static"
        data-keyboard="true"
        id="modalEdit"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">Modal body text goes here.</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger light"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
