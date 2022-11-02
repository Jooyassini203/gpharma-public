import React from "react";
import { Link } from "react-router-dom";

function NavElement({ to, icon, title, children }) {
  const a = <a
     type="button"
    className={children ? "has-arrow ai-icon" : "ai-icon"}
    aria-expanded="false"
  >
    <i className={icon} />
    <span className="nav-text ">
      <strong> {title}</strong>
    </span>
  </a>
  return (
    <>
      <li className="">
        {!children ? 
          <Link to={to}
          className={children ? "has-arrow ai-icon" : "ai-icon"}
          aria-expanded="false" >
          <i className={icon} />
          <span className="nav-text ">
            <strong> {title}</strong>
          </span>  
          </Link> 
          : 
          <a
             type="button"
            className={children ? "has-arrow ai-icon" : "ai-icon"}
            aria-expanded="false"
          >
          <i className={icon} />
          <span className="nav-text ">
            <strong> {title}</strong>
          </span>
          </a>}
        {children ? <ul aria-expanded="false">{children}</ul> : ""}
      </li>
    </>
  );
}

export function NavElementChildren({ to, icon, title }) {
  return (
    <li className="">
      <Link to={to} id={"idLink"+title} >
        <i className={icon} />
        {title}
      </Link>
    </li>

  );
}

export default NavElement;
