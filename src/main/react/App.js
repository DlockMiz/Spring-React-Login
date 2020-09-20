import React, { Component } from "react";
import NavBar from "./Components/Navigation/NavBar";
import UserNavBar from "./Components/Navigation/UserNavBar";
import { HashRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AdminNavBar from "./Components/Navigation/AdminNavBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.changeAuthzRole = this.changeAuthzRole.bind(this);
  }

  state = {
    authz: "",
  };

  componentDidMount() {
    this.interceptAxios();
    this.checkAuthzRole();
  }

  checkAuthzRole() {
    const authz = sessionStorage.getItem("authz");
    if (authz) {
      this.setState({ authz: authz });
    }
    if (Cookies.get("jwt") && !authz) {
      axios.get("/api/getAuthority").then((response) => {
        const role = response.data[0].name;
        this.setState({
          authz: role,
        });
        sessionStorage.setItem("authz", role);
      });
    }
  }

  changeAuthzRole() {
    this.setState({ authz: sessionStorage.getItem("authz") });
  }

  interceptAxios() {
    axios.interceptors.request.use(function (config) {
      const header = Cookies.get("jwt");
      if (header) {
        config.headers.Authorization = "Bearer " + header;
      }
      return config;
    });
  }
  render() {
    return (
      <div className="App">
        <HashRouter>
          {!this.state.authz && <NavBar></NavBar>}
          {this.state.authz == "ROLE_USER" && (
            <UserNavBar changeAuthzRole={this.changeAuthzRole}></UserNavBar>
          )}
          {this.state.authz == "ROLE_ADMIN" && (
            <AdminNavBar changeAuthzRole={this.changeAuthzRole}></AdminNavBar>
          )}
          <Switch>
            <Route
              path="/login"
              render={(props) => (
                <Login changeAuthzRole={this.changeAuthzRole} />
              )}
            />
            <Route path="/register" component={Register} />
            <Route path="/" component={Welcome} replace></Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
