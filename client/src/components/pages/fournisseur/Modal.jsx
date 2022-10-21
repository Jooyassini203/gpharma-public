import React from 'react'
import { InputForm } from '../../../utils/utils'

function Modal() {
  return (
    <div
        className="modal fade"
        id="modalFournisseur"
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
                }}
              >
                <span>×</span>
              </button>
            </div>
            <div className="modal-body"> 
            <div className="row">
              <InputForm >Nom fournisseur</InputForm>
            </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger light"
                data-dismiss="modal"
                onClick={() => { 
                }}
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(id) => { 
                }}
              >
                {true ? "Ajouter" : "Modifier"}
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Modal