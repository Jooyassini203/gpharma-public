import React from 'react'
import { useRecoilState } from "recoil";
import { isAddState, listProduit, produitSelect, initialize } from '../../../atoms/produit';
import { addData, getData, getUrl, InputForm, updateData, onChange, SelectForm, convertToOption } from "../../../utils/utils";

function Modal() {
    const [isAdd, setIsAdd] = useRecoilState(isAddState);
    const [list, setList] = useRecoilState(listProduit);
    const [produitSelected, setProduitSelected] = useRecoilState(produitSelect);
    const [produit, setProduit] = React.useState(initialize)
    const [isOb, setIsOb] = React.useState(false) 
    const [OptionsUnite, setOptionsUnite] = React.useState([])
    const [OptionsForme, setOptionsForme] = React.useState([])
    const [OptionsFabricant, setOptionsFabricant] = React.useState([])
    const [OptionsFamille, setOptionsFamille] = React.useState([])
    const [OptionsVoie, setOptionsVoie] = React.useState([])
    const [preview, setPreview] = React.useState("");
    const closeRef = React.useRef();
    const inputRef = React.useRef();

    const filterOption = (option, optionSelect) => (
        JSON.stringify(option) === JSON.stringify(optionSelect)
        )

    const {
        code_lot_produit ,
        nom_produit ,
        classification_produit ,
        description ,
        image ,
        presentation_quantite ,
        prix_vente ,
        stock_min ,
        stock_max ,
        quantite_stock ,
        date_der_ravitaillement ,
        fabricant_id ,
        famille_id ,
        forme_id ,
        voie_id ,
        unite_presentation ,
        unite_achat ,
        unite_vente ,
        unite_stock ,
      } = produit

    const handleClickInput = () => { 
        setIsOb(false)
      inputRef.current.click();
    };

    const add = () => { 
       
    };

    const update = () => { 
       
    };
 
    React.useEffect(()=>{ 
        getData('Unite', (data)=>(convertToOption(data, setOptionsUnite)))
        getData('Fabricant', (data)=>(convertToOption(data, setOptionsFabricant)))
        getData('Famille', (data)=>(convertToOption(data, setOptionsFabricant)))
        getData('Forme', (data)=>(convertToOption(data, setOptionsForme)))
        getData('Voie', (data)=>(convertToOption(data, setOptionsVoie)))
    }, [])

    React.useEffect(()=>{
        if(image)
            setPreview(URL.createObjectURL(image));
    }, [image])
      
  return (
    <>
    <div
      className="modal fade"
      id="modalProduit"
      style={{ display: "none" }}
      aria-modal="true"
      data-backdrop="static"
      data-keyboard="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isAdd.status ? "Ajouter" : "Modifier"} un produit
            </h5>
            <button
              ref={closeRef}
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={() => {
                setIsOb(false)
              }}
            >
              <span>×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row text-center"> 
              <img
                  style={{ width: "auto", height: "15vh", borderRadius: "2%" }}
                  src={preview ? preview : "images/product/1.jpg"}
                  alt="Image"
                  className="rounded mx-auto d-block shadow-sm"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Cliqué ici pour changer l'image"
                  onClick={handleClickInput}
                /> 
              <input
                name="logo"
                type="file"
                accept=".jpg,.png,.jpeg"
                className="d-none"
                ref={inputRef}
                onChange={onChange}
              />
            </div>  
            <div className="row">
              <div className="col-4">
              <InputForm preIcon={{"text": "#"}} name="code_lot_produit" val={code_lot_produit} onChange={(e) => onChange(e, setProduit)} obligatory={isOb?"active":""}>Code lot produit</InputForm>
              </div>
              <div className="col-8">
              <InputForm name="nom_produit" val={nom_produit} onChange={(e) => onChange(e, setProduit)} obligatory={isOb?"active":""}>Nom produit</InputForm>
              </div>
            </div> 
            <div className="row">
              <div className="col-3">
              <InputForm postIcon={{"text": "Quatité"}} name="presentation_quantite" val={presentation_quantite} onChange={(e) => onChange(e, setProduit)} obligatory={isOb?"active":""}>Présentation</InputForm>
              </div>
              <div className="col-4">
                <SelectForm
                //   postIcon={{"text": "Unité"}}
                  name="unite_presentation"
                  val={unite_presentation}
                  value={OptionsUnite.filter((option)=>filterOption (option, unite_achat))}
                  onChange={(e) => onChange(e, setProduit, "unite_presentation")}
                  options={OptionsUnite}  obligatory={isOb?"active":""} >Unité de présentation</SelectForm>
              </div>
              <div className="col-5"> 
              <InputForm postIcon={{"text": "Ar"}} name="prix_vente" val={prix_vente} onChange={(e) => onChange(e, setProduit)} obligatory={isOb?"active":""}>Prix de vente</InputForm>
              </div>
            </div> 
            <div className="row">
              <div className="col-4">
                <SelectForm 
                  name="unite_achat"
                  val={unite_achat}
                  value={OptionsUnite.filter((option)=>filterOption (option, unite_achat))}
                  onChange={(e) => onChange(e, setProduit, "unite_achat")}
                  options={OptionsUnite}  obligatory={isOb?"active":""} >Unité d'achat'</SelectForm>
              </div>
              <div className="col-4">
                <SelectForm 
                  name="unite_vente"
                  val={unite_vente}
                  value={OptionsUnite.filter((option)=>filterOption (option, unite_vente))}
                  onChange={(e) => onChange(e, setProduit, "unite_vente")}
                  options={OptionsUnite}  obligatory={isOb?"active":""} >Unité de vente</SelectForm>
              </div>
              <div className="col-4">
                <SelectForm 
                  name="unite_stock"
                  val={unite_stock}
                  value={OptionsUnite.filter((option)=>filterOption (option, unite_stock))}
                  onChange={(e) => onChange(e, setProduit, "unite_stock")}
                  options={OptionsUnite}  obligatory={isOb?"active":""} >Unité de stock</SelectForm>
              </div>
            </div> 
              <InputForm textarea rows="3" name="description" val={description} onChange={(e) => onChange(e, setProduit)} >Description</InputForm>
              <InputForm textarea rows="3" name="classification_produit" val={classification_produit} onChange={(e) => onChange(e, setProduit)} >Classification produit</InputForm>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger light"
              data-dismiss="modal"
              onClick={() => {
                setIsOb(false)
                setPreview('')
                setProduit(initialize)
              }}
            >
              Annuler
            </button>
            <button
              type="button"
              className="btn btn-primary" 
              onClick={() =>  { setIsOb(true);(isAdd.status ? add() : update())}}
            >
              {isAdd.status ? "Ajouter" : "Modifier"}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Modal