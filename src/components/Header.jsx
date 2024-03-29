import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const path = location.pathname;

  function getHeaderText() {
    return path === "/" ? "Find your film" : "My Watchlist";
  }

  function getTargetText(){
    return path === "/" ? "Watchlist" : "Search for movies"
  }

  function getTargetPath() {
    return path === "/" ? "/watchlist" : "/";
  }

  return (
    <div className="header">
      <div className="header-text">
        <div className="find-text">{getHeaderText()}</div>
        <div className="link-container">
          <NavLink className="nav-link" to={getTargetPath()}>{getTargetText()}</NavLink>
        </div>
      </div>
    </div>
  );
}
