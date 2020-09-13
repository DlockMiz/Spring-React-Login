import React, {Component} from "react";
import NavBar from "./Components/NavBar";
import { HashRouter, Route, Switch } from "react-router-dom";
import axios from 'axios'
import Cookies from 'js-cookie';

import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import Register from "./Components/Register";

class App extends Component {
  componentDidMount(){
    axios.interceptors.request.use(function (config) {
      const header = Cookies.get('jwt')
      if(header){
        config.headers.Authorization = "Bearer "+header
      }
      return config;
    });
  }
  render(){
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
}

export default App;
