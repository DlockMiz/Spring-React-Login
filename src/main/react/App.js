import React from "react";
import NavBar from "./Components/NavBar";
import { HashRouter, Route, Switch } from "react-router-dom";

import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <NavBar></NavBar>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Welcome}></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
