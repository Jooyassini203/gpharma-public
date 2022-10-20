import authentification from "./Authentification";

const Middleware = (Page) => {
  authentification(Page);
};
export default Middleware;
