import { Navigate } from "react-router-dom";

const authentification = (Page) => {
  let userConnect = {};

  if (!window.localStorage.getItem("gpharma@2.0.0"))
    return <Navigate to="/connexion" />; 
  return <Page />;
};
export default authentification;
