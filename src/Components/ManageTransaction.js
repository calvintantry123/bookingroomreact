import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  color: {
    color: "white",
  },
});

export class ManageTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      borrowing: [],
    };
  }

  getTransaction() {
    axios
      .get("borrowing")
      .then((response) => {
        console.log(response);
        this.setState({ borrowing: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getTransaction();
  }

  accHandler(id, e) {
    const idx = this.state.borrowing.findIndex((borrow) => {
      return borrow.id === id;
    })

    const borrow = Object.assign({}, this.state.borrowing[idx]);
    // const borrows = Object.assign({}, this.state.borrowing);
    // borrows[idx] = borrow
    // this.setState({borrowing: borrows})

    axios
      .put(`/borrowing/${id}`, borrow, {
        params: {
          status: "approve",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  rejectHandler(id, e) {

    const idx = this.state.borrowing.findIndex((borrow) => {
      return borrow.id === id;
    })

    const borrow = Object.assign({}, this.state.borrowing[idx]);
    
    axios
      .put(`/borrowing/${id}`, borrow, {
        params: {
          status: "rejected",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  cancelHandler(id, e) {

    const idx = this.state.borrowing.findIndex((borrow) => {
      return borrow.id === id;
    })

    const borrow = Object.assign({}, this.state.borrowing[idx]);
    
    axios
      .put(`/borrowing/${id}`, borrow, {
        params: {
          status: "rejected",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { borrowing } = this.state;
    const { classes } = this.props;

    return (
      <Container component="main">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Room List
          </Typography>
          <br />

          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={this.changeHandler}
          /> */}

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow className="row">
                  <StyledTableCell className="cell">User Name</StyledTableCell>
                  <StyledTableCell align="center">Room Name</StyledTableCell>
                  <StyledTableCell align="center">Check in</StyledTableCell>
                  <StyledTableCell align="center">Check out</StyledTableCell>
                  <StyledTableCell align="center">status</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {borrowing.map((book) => (
                  <StyledTableRow className="row" key={book.id}>
                    <TableCell component="th" scope="row" className="cell">
                      {book.user_name}
                    </TableCell>

                    <TableCell component="th" scope="row" className="cell">
                      {book.room_name}
                    </TableCell>

                    <TableCell component="th" scope="row" className="cell">
                      {book.checkIn}
                    </TableCell>

                    <TableCell component="th" scope="row" className="cell">
                      {book.checkOut}
                    </TableCell>

                    <TableCell component="th" scope="row" className="cell">
                      {book.status}
                    </TableCell>

                    <TableCell component="th" scope="row" className="cell">
                      
                        <button color="primary" onClick={() => this.accHandler(book.id)}>accept</button>

                      <button
                        color="primary"
                        onClick={() => this.rejectHandler(book.id)}
                      >
                        reject
                      </button>

                      <button
                        color="primary"
                        onClick={() => this.cancelHandler(book.id)}
                      >
                        cancel
                      </button>
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

export default withStyles(useStyles)(ManageTransaction);
