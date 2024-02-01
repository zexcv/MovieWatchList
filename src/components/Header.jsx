import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const path = location.pathname;

  function getHeaderText() {
    return path === "/" ? "Find your film" : "My Watchlist";
  }

  function getTargetPath() {
    return path === "/" ? "/watchlist" : "/";
  }

  return (
    <div className="header">
      <div className="header-text">
        <div className="find-text">{getHeaderText()}</div>
        <div className="link-container">
          <Link to={getTargetPath()}>Watchlist</Link>
        </div>
      </div>
    </div>
  );
}
