import React from "react";
import Nav from "../../nav";
import FooterNav from "../../nav/FooterNav";
import StatisticGeneral from './StatisticGeneral'

function Accueil() {
  <div className="col-xl-12">
<div className="card">
<div className="card-header border-0 pb-0">
 <div>
   <h4 className="fs-20 text-black mb-1">Doctor Ability</h4>
   <span className="fs-12">Lorem ipsum dolor sit amet, consectetur</span>
 </div>
</div>
<div className="card-body">
 <div className="row align-items-center">
   <div className="col-lg-5 mb-lg-0 mb-3">
     <div className="d-flex mb-3 align-items-center">
       <span className="fs-12 col-6 p-0 text-black">
         <svg className="mr-2" width={19} height={19} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
           <rect width={19} height={19} fill="#5F74BF" />
         </svg>
         Immunities
       </span>
       <div className="progress rounded-0 col-6 p-0">
         <div className="progress-bar rounded-0 progress-animated" style={{width: '80%', height: 6, background: '#5F74BF'}} role="progressbar">
           <span className="sr-only">60% Complete</span>
         </div>
       </div>
     </div>
     <div className="d-flex mb-3 align-items-center">
       <span className="fs-12 col-6 p-0 text-black">
         <svg className="mr-2" width={19} height={19} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
           <rect width={19} height={19} fill="#FFD439" />
         </svg>
         Stamina
       </span>
       <div className="progress rounded-0 col-6 p-0">
         <div className="progress-bar rounded-0 progress-animated" style={{width: '40%', height: 6, background: '#FFD439'}} role="progressbar">
           <span className="sr-only">60% Complete</span>
         </div>
       </div>
     </div>
     <div className="d-flex mb-3 align-items-center">
       <span className="fs-12 col-6 p-0 text-black">
         <svg className="mr-2" width={19} height={19} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
           <rect width={19} height={19} fill="#FF6E5A" />
         </svg>
         Heart Beat
       </span>
       <div className="progress rounded-0 col-6 p-0">
         <div className="progress-bar rounded-0 progress-animated" style={{width: '90%', height: 6, background: '#FF6E5A'}} role="progressbar">
           <span className="sr-only">60% Complete</span>
         </div>
       </div>
     </div>
     <div className="d-flex align-items-center">
       <span className="fs-12 col-6 p-0 text-black">
         <svg className="mr-2" width={19} height={19} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
           <rect width={19} height={19} fill="#5FBF91" />
         </svg>
         Colestrol
       </span>
       <div className="progress rounded-0 col-6 p-0">
         <div className="progress-bar rounded-0 progress-animated" style={{width: '80%', height: 6, background: '#5FBF91'}} role="progressbar">
           <span className="sr-only">60% Complete</span>
         </div>
       </div>
     </div>
   </div>
   <div className="col-lg-7">
     <div className="row align-items-center">
       <div className="col-lg-6 col-sm-6 mb-sm-0 mb-3">
         <div className="resize-triggers"><div className="expand-trigger"><div style={{width: 311, height: 239}} /></div><div className="contract-trigger" /></div></div>
       <div className="col-lg-6 col-sm-6">
         <div className="d-flex align-items-center">
           <svg className="mr-3" width={25} height={26} viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
             <rect width="3.54545" height={26} rx="1.77273" transform="matrix(-1 0 0 1 24.8184 0)" fill="#757575" />
             <rect width="3.54545" height="18.9091" rx="1.77273" transform="matrix(-1 0 0 1 17.7275 7.09091)" fill="#757575" />
             <rect width="3.54545" height="8.27273" rx="1.77273" transform="matrix(-1 0 0 1 10.6367 17.7273)" fill="#757575" />
             <rect width={4} height={16} rx={2} transform="matrix(-1 0 0 1 4 10)" fill="#757575" />
           </svg>
           <div>
             <p className="fs-12 mb-1">Total Statistic</p>
             <span className="fs-22 text-black font-w600">452,551k</span>
           </div>
         </div>
         <div className="resize-triggers"><div className="expand-trigger"><div style={{width: 311, height: 246}} /></div><div className="contract-trigger" /></div></div>
     </div>
   </div>
 </div>
</div>
</div>
</div>
  return (
    <div id="main-wrapper" className="show">
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: "80vh", marginTop: "-10vh" }}
      >
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div
                  className="col w-100 align-items-center"
                  style={{ marginBottom: " 0vh" }}
                >
                  <p className="text-justify">
                    Bienvenue sur GPHARMA Chez vous, en déplacement, depuis
                    votre tablette, smartphone ou ordinateur personnel, votre
                    officine reste toujours accessible et connectée. Vérifiez
                    l’état de vos stocks, suivez l’évolution de vos ventes,
                    communiquez avec vos collaborateurs, surveillez que tout se
                    passe bien.
                  </p>
                </div>
                <div className="col-3">
                  <div className="mt-2 text-center">
                    <img
                      src="./images/logo.png"
                      style={{ width: "80%", marginTop: "-3vh" }}
                      alt="logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-head d-flex align-items-center mb-sm-4 mb-3 ml-5">
					<div className="mr-auto">
						<h2 className="text-black font-w600">Infos</h2>
						{/* <p className="mb-0">Générale</p> */}
					</div>
					{/* <a href="javascript:void(0)" class="btn btn-outline-primary"><i class="las la-cog scale5 mr-3"></i>Customize Layout</a> */}
				</div>
        <div className="row ml-3">
          <div className="col-xl-3  col-sm-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="media align-items-center">
                  <div className="media-body mr-3">
                    <h2 className="fs-34 text-black font-w600">70</h2>
                    <span>Commande (Ravitaillement)</span>
                  </div>
                  <i className="fa fa-list fa-3x text-primary"></i>
                </div>
              </div>
              <div className="progress  rounded-0" style={{ height: 4 }}>
                <div
                  className="progress-bar rounded-0 bg-secondary progress-animated"
                  style={{ width: "60%", height: 4 }}
                  role="progressbar"
                >
                  {/* <span className="sr-only">90% Complete</span> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3  col-sm-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="media align-items-center">
                  <div className="media-body mr-3">
                    <h2 className="fs-34 text-shipping-fast font-w600">70</h2>
                    <span>Livraison (Ravitaillement)</span>
                  </div>
                  <i className="fa fa-money fa-3x text-primary"></i>
                </div>
              </div>
              <div className="progress  rounded-0" style={{ height: 4 }}>
                <div
                  className="progress-bar rounded-0 bg-secondary progress-animated"
                  style={{ width: "60%", height: 4 }}
                  role="progressbar"
                >
                  {/* <span className="sr-only">90% Complete</span> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="media align-items-center">
                  <div className="media-body mr-3">
                    <h2 className="fs-34 text-black font-w600">76</h2>
                    <span>Guichet (Vente)</span>
                  </div>
                  <i className="fa fa-list-alt fa-3x text-primary"></i>
                </div>
              </div>
              <div className="progress  rounded-0" style={{ height: 4 }}>
                <div
                  className="progress-bar rounded-0 bg-secondary progress-animated"
                  style={{ width: "50%", height: 4 }}
                  role="progressbar"
                >
                  {/* <span className="sr-only">50% Complete</span> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3  col-sm-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="media align-items-center">
                  <div className="media-body mr-3">
                    <h2 className="fs-34 text-black font-w600">70</h2>
                    <span>Caisse (Vente)</span>
                  </div>
                  <i className="fa fa-money fa-3x text-primary"></i>
                </div>
              </div>
              <div className="progress  rounded-0" style={{ height: 4 }}>
                <div
                  className="progress-bar rounded-0 bg-secondary progress-animated"
                  style={{ width: "60%", height: 4 }}
                  role="progressbar"
                >
                  {/* <span className="sr-only">90% Complete</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
 
        <StatisticGeneral/>

      </div>
      <FooterNav />
    </div>
  );
}

export default Accueil;
