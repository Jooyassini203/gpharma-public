import { redirect } from "react-router-dom";
import Login from "../pages/login";

const authentification = (Page) => {
  console.log(redirect("/connexion"));
  if (!sessionStorage.getItem("gpharma@2.0.0")) {
    return  <Login/>  ;
  }
  return <Page />;
};
export default authentification;
