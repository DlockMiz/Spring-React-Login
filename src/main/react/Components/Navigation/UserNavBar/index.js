import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { styles } from "./styles.js";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";

class UserNavBar extends Component {
  logout = () => {
    Cookies.remove("jwt");
    sessionStorage.removeItem("authz");
    this.props.changeAuthzRole();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar style={{ backgroundColor: "green" }} position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              User Page
            </Typography>
            <div>
              <Button onClick={this.logout} to="/" color="inherit">
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(UserNavBar));
