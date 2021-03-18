import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import { useHistory, withRouter } from "react-router-dom";

class componentName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomId: this.props.match.params.id,
      facilitiesId: "",
      facilities: [],
    };

    this.changeHandler = this.changeHandler.bind(this);
  }

  getFacilities() {
    axios
      .get("/facility")
      .then((response) => {
        console.log(response);
        this.setState({ facilities: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getFacilities();
  }

  changeHandler = (e) => {
    // let id = this.state.facilities.id
    this.setState({ facilitiesId: e.target.value });
    // console.log(this.state)
  };

  submitHandler = (e) => {
    e.preventDefault();

    console.log(this.state);
    axios
      .post("/facilityroom", this.state)
      .then((response) => {
        console.log(response);
        const { history } = this.props;

        if (history) history.push(`/`);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { roomId, facilitiesId, facilities } = this.state;

    return (
      <div>
        <Typography component="h1" variant="h5">
          Select Room Facility
        </Typography>
        <form onSubmit={this.submitHandler}>
          <div>
            <select onChange={this.changeHandler}>
              <option value="">none</option>
              {facilities.map((facility) => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>

          {/* <div>{facilityId}</div> */}

          <Button
            type="submit"
            // fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
          >
            Insert
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(componentName);
