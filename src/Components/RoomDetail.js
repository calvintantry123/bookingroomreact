import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

export class RoomDetail extends Component {
  constructor(props) {
    super(props);

    // let d = new Date();
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

    this.state = {
      userId: 2,
      roomId: this.props.match.params.id,
      checkIn: "",
      checkOut: "",
      status: "",
      room: [],
      date: date,
      facilities: [],
    };
  }

  getDetails = (id) => {
    axios
      .get(`/room/${id}`)
      .then((response) => {
        // console.log(response);
        this.setState({ room: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleStartChange = (e) => {
    this.setState({ checkIn: this.state.date + " " + e.target.value });
  };

  handleEndChange = (e) => {
    this.setState({ checkOut: this.state.date + " " + e.target.value });
  };

  changeDate = (e) => {
    this.setState({ date: e.target.value });
  };

  getFacilityRoom() { 

    axios
      .get("/facilityroom", {
        params: {
          id: this.props.match.params.id,
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({ facilities: response.data})
        // console.log(this.state);

      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    // let history = useHistory();
    let id = this.props.match.params.id;
    this.getDetails(id);

    this.getFacilityRoom();
  }

  submitHandler = (e) => {
    e.preventDefault();

    this.setState({
      checkIn: this.state.date + " " + this.state.checkIn,
    });
    console.log(this.state);
    axios
      .post("/borrowing", this.state)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    // const {room} = this.state.room
    const { classes } = this.props;
    const { userId, roomId, checkIn, checkOut, currDate, facilities } = this.state;
    // const { currDate } = this.date;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Booking a Room
          </Typography>

          <br />
          <Typography component="h1" variant="h5">
            <div>Room Name: {this.state.room.name}</div>
            <div>Room Type: {this.state.room.roomType}</div>
            <div>Room Capacity: {this.state.room.capacity}</div>
            <div>
              Room Facility
            </div>
          </Typography>

          {facilities.map((facility) =>(
              <div key={facility.id}> {facility.facilityName} </div>
            ))}

          <br />

          <form
            className={classes.form}
            noValidate
            onSubmit={this.submitHandler}
          >
            <div>
              <Typography component="h1" variant="h5">
                Date
              </Typography>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="date"
                type="date"
                defaultValue={currDate}
                id="date"
                autoComplete="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.changeDate}
              />
            </div>

            <div>
              <select
                id="checkIn"
                value={currDate + " " + checkIn}
                onChange={this.handleStartChange}
              >
                <option value="">Start Time</option>
                <option value={(currDate, "07:20:00.000")}>
                  {currDate}07:20
                </option>
                <option value={(currDate, "09:20:00.000")}>09:20</option>
                <option value={(currDate, "11:20:00.000")}>11:20</option>
                <option value={(currDate, "13:20:00.000")}>13:20</option>
                <option value={(currDate, "15:20:00.000")}>15:20</option>
              </select>
            </div>

            <div>
              <select
                id="checkOut"
                value={currDate + " " + checkOut}
                onChange={this.handleEndChange}
              >
                <option value="End Time">End Time</option>
                <option value={(currDate, "09:00:00.000")}>09:00</option>
                <option value={(currDate, "11:00:00.000")}>11:00</option>
                <option value={(currDate, "13:00:00.000")}>13:00</option>
                <option value={(currDate, "15:00:00.000")}>15:00</option>
                <option value={(currDate, "17:00:00.000")}>17:00</option>
              </select>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Book
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(RoomDetail);
