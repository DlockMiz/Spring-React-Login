import React from "react";
import NavBar from "./NavBar";
import { HashRouter, Route, Switch } from "react-router-dom";

import Welcome from "./Welcome";
import Login from "./Login";
import Register from "./Register";

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
