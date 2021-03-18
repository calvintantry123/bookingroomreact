import React, { Component } from "react";
import "./App.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Switch, Route, NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import RoomDetail from "./Components/RoomDetail";
import CreateRoom from "./Components/CreateRoom";
import CreateFacility from "./Components/CreateFacility";
import ManageRoom from "./Components/ManageRoom";
import ManageTransaction from "./Components/ManageTransaction";

const useStyles = (theme) => ({
  App: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(6),
  },

  textColor: {
    color: "white",
  },

  register: {
    color: "white",
    marginRight: theme.spacing(6),
  },
});

class App extends React.Component {
  state = {
    isLog: false,
  };

  handleLogin = (isLog) => this.setState({ isLog });

  render() {
    const { classes } = this.props;
    const { isLog } = this.state;
    return (
      <div className={classes.App}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Booking Room
            </Typography>

            <NavLink to="/" className={classes.textColor}>
              <Button color="inherit">Home</Button>
            </NavLink>

            <NavLink to="/login" className={classes.textColor}>
              <Button color="inherit">Login</Button>
            </NavLink>

            <NavLink to="/register" className={classes.textColor}>
              <Button color="inherit">Register</Button>
            </NavLink>

            <NavLink to="/create-room" className={classes.textColor}>
              <Button color="inherit">create room</Button>
            </NavLink>

            <NavLink to="/manage-room" className={classes.textColor}>
              <Button color="inherit">Manage room</Button>
            </NavLink>

            <NavLink to="/manage-booking" className={classes.register}>
              <Button color="inherit">Manage Transaction</Button>
            </NavLink>

            {/* <NavLink to="/edit-profile" className={classes.register}>
                  <Button color="inherit">Edit profile</Button>
                </NavLink> */}
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          {/* <Route path="/login" render={() => !isLog ? <Login isLogin={this.handleLogin} /> : <Home/>}/>   */}
          <Route path="/login" component={Login} />

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/room/:id" component={RoomDetail} />
          <Route path="/create-room/" component={CreateRoom} />
          <Route path="/create-facility/:id" component={CreateFacility} />
          <Route path="/manage-room" component={ManageRoom} />

          <Route path="/manage-booking" component={ManageTransaction} />
          {/* <Route path="update-room/:id" component={UpdateRoom}/> */}
        </Switch>
      </div>
    );
  }
}

export default withStyles(useStyles)(App);
