import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "../node_modules/materialize-css/dist/css/materialize.min.css";
import "../node_modules/materialize-css/dist/js/materialize.min.js";
import M from "../node_modules/materialize-css/dist/js/materialize.min.js";

import "./App.css";

import Navbar from "./components/Navbar";
import About from "./pages/about";
import Home from "./pages/home";
import Temperature from "./pages/temperature";

// Sidenav
// TODO also see: https://github.com/AndyBraveMX/react-learning/tree/master/react-sidenav-materializecss
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  /*var instances =*/ M.Sidenav.init(elems, {
    edge: "left",
    inDuration: 250
  });
});


function App() {
  return (
    <Router>
      {/* <React.StrictMode> */}
      <Navbar />
      <div className="container">
        <Route exact path="/" component={Home} />
      </div>
      <div className="container">
        <Route exact path="/temp" component={Temperature} />
      </div>
      <div className="container">
        <Route exact path="/about" component={About} />
      </div>
      {/* </React.StrictMode> */}
    </Router>
  );
}

export default App;
