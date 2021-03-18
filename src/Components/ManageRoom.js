import React, { Component } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import axios from "axios";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = (theme) => ({
  table: {
    minWidth: 700,
  },
  paper: {
    margin: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  color: {
    color: "white",
  },
});

class ManageRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
    };
  }

  componentDidMount() {
    axios
      .get("/room")
      .then((response) => {
        console.log(response);
        this.setState({ rooms: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete(id) {
    axios.delete('/room/'+id)
    .then(response => {
        console.log(response);
        alert("delete success")
        this.setState({ rooms: this.state.rooms.filter(room => room.id !== id)})
    })
  }

  render() {
    const { rooms } = this.state;
    const { classes } = this.props;
    return (
      <Container component="main">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Room List
          </Typography>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow className="row">
                  <StyledTableCell className="cell">Room Name</StyledTableCell>
                  <StyledTableCell align="center">Capacity</StyledTableCell>
                  <StyledTableCell align="center">Room Type</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rooms.map((room) => (
                  <StyledTableRow className="row" key={room.id}>
                    <TableCell component="th" scope="row" className="cell">
                      {room.name}
                    </TableCell>

                    <TableCell align="center">{room.capacity}</TableCell>
                    <TableCell align="center">{room.roomType}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="primary">
                        <NavLink
                          to={{
                            pathname: `create-facility/${room.id}`,
                            state: { room },
                          }}
                          className={classes.color}
                        >
                          update
                        </NavLink>
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.handleDelete(room.id)}
                      >
                        delete
                      </Button>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(ManageRoom);
