import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { styles } from "./styles.js";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    failedLogin: false,
    loading: false,
  };

  login = () => {
    var postData = {
      username: this.state.email,
      password: this.state.password,
    };
    this.setState({ loading: true });
    axios
      .post("/api/login", postData)
      .then((response) => {
        this.setState({ loading: false });
        sessionStorage.setItem("authz", response.data[0].name);
        this.props.changeAuthzRole();
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 401) {
          this.setState({ failedLogin: true, loading: false });
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            {this.state.failedLogin && (
              <Grid component={Box} item xs={12}>
                <Alert severity="error">Incorrect username/password</Alert>
              </Grid>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => this.setState({ email: event.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={this.state.loading}
              className={classes.submit}
              onClick={this.login}
            >
              {this.state.loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/#/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
export default withRouter(withStyles(styles)(Login));
