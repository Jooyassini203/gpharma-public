import React from 'react'

function Modal() {
  return (
    <div
        className="modal fade"
        id="modalUtilisateur"
        style={{ display: "none" }}
        aria-modal="true"
        data-backdrop="static"
        data-keyboard="true" 
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isAdd ? "Ajouter" : "Modifier"} un utilsateur
              </h5>
              <button
                ref={closeRef}
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => {
                  setUtilisateur(initialize);
                  setPreview("images/profile/1.jpg")
                  setIsObligatory(false);
                }}
              >
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="text-center mb-3">
                <img
                  style={{ width: "auto", height: "15vh", borderRadius: "2%" }}
                  src={preview ? preview : "images/profile/1.jpg"}
                  alt="Image"
                  className="img-fluid shadow-sm"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Cliqué ici pour changer l'image"
                  onClick={handleClickInput}
                />
              </div>
              <input
                name="image"
                type="file"
                accept=".jpg,.png,.jpeg"
                className="d-none"
                ref={inputRef}
                onChange={onChange}
              />
                
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger light"
                data-dismiss="modal"
                onClick={() => {
                  setUtilisateur(initialize);
                  setPreview("images/profile/1.jpg") 
                  setIsObligatory(false);
                }}
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(id) => {
                  isAdd ? addUser() : updateUser(id);
                  setIsObligatory(true);
                }}
              >
                {isAdd ? "Ajouter" : "Modifier"}
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Modal