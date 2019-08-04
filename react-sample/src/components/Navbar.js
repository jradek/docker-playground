import React from "react";

import { Link } from "react-router-dom";

export default function Navbar() {

  const elements = (
    <React.Fragment>
      <li>
        <Link to="/">Posts</Link>
      </li >
      <li>
        <Link to="/hooks">Hooks</Link>
      </li >
      <li>
        <Link to="/st">Sport Timer</Link>
      </li >
      <li>
        <Link to="/temp">Temperature</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </React.Fragment>
  )

  /* in App.js is javascript logic to make the sidenav logic work  */
  return (
    <React.Fragment>
      <nav>
        <div className="nav-wrapper">

          <Link to="/" className="brand-logo">
            React Playground
          </Link>
          <a href="!#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>

          <ul className="right hide-on-med-and-down">
            {elements}
          </ul>

        </div>
      </nav>

      {/* sidenav */}
      <ul className="sidenav" id="mobile-demo">
        {elements}
      </ul>

    </React.Fragment>
  );
}
