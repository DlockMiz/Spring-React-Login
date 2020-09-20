import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { styles } from "./styles.js";
import { withStyles } from "@material-ui/core/styles";

import axios from "axios";
import { Container } from "@material-ui/core";

class Welcome extends Component {
  state = {
    msg: "",
  };

  checkUser = () => {
    axios
      .get("/api/user")
      .then((response) => {
        this.setState({ msg: response.data });
      })
      .catch((e) => {
        if (e.response.status == 403) {
          this.setState({ msg: "Not allowed" });
        }
      });
  };
  checkAdmin = () => {
    axios
      .get("/api/admin/test")
      .then((response) => {
        this.setState({ msg: response.data });
      })
      .catch((e) => {
        if (e.response.status == 403) {
          this.setState({ msg: "Not allowed" });
        }
      });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Container component="main" maxWidth="xs">
          <form className={classes.form}>
            <Button
              className={classes.button}
              style={{ backgroundColor: "green" }}
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.checkUser}
            >
              Check User Auth
            </Button>
            <Button
              className={classes.button}
              fullWidth
              variant="contained"
              color="secondary"
              onClick={this.checkAdmin}
            >
              Check Admin Auth
            </Button>
            <div>{this.state.msg}</div>
          </form>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Welcome);
