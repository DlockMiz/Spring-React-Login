import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { styles } from "./styles.js";

class Register extends Component {
  state = {
    email: "",
    password: "",
    disableSubmit: true,
    matchingPasswords: true,
    loading: false,
  };

  resetPage = () => {
    this.setState({
      email: "",
      password: "",
      disableSubmit: true,
      matchingPasswords: true,
      usernameTaken: false,
      loading: false,
    });
  };

  register = () => {
    const postData = {
      username: this.state.email,
      password: this.state.password,
    };
    this.setState({ loading: true, disableSubmit: true });
    axios
      .post("/api/register", postData)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        if (error.response.status == 409) {
          this.setState({
            loading: false,
            usernameTaken: true,
            disableSubmit: false,
          });
        }
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              {this.state.usernameTaken && (
                <Grid component={Box} item xs={12}>
                  <Alert severity="info">Email already taken.</Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(event) => {
                    this.state.password.localeCompare(event.target.value)
                      ? this.setState({
                          disableSubmit: true,
                          matchingPasswords: false,
                        })
                      : this.setState({
                          disableSubmit: false,
                          matchingPasswords: true,
                        });
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              {!this.state.matchingPasswords && (
                <Grid component={Box} item xs={12}>
                  <Alert severity="error">Passwords do not match!</Alert>
                </Grid>
              )}
            </Grid>
            <Button
              onClick={this.register}
              fullWidth
              variant="contained"
              color="primary"
              disabled={this.state.disableSubmit}
              className={classes.submit}
            >
              {this.state.loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Register);
