import authentification from "./Authentification";

const Middleware = (Page, to = '') => {
  return authentification(Page, to);
};
export default Middleware;
