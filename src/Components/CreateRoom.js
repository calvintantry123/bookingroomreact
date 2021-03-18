import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useHistory, withRouter } from "react-router-dom";

const useStyles = theme =>({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
})

class CreateRoom extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            id: null,
            name: '',
            capacity: '',
            roomType: '',
        }
    }
    
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    submitHandler = e => {
        e.preventDefault()
        // let history = useHistory();

        console.log(this.state)

        axios.post('/room', this.state)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    capacity: response.data.capacity,
                    roomType: response.data.roomType,

                })

                const {history} = this.props;
                if (history) history.push(`/create-facility/${this.state.id}`)
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        
        
        
    }

    render() {
        const { classes } = this.props;
        const {name, capacity, roomType} = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        Create Room
                    </Typography>
                    
                    <form className={classes.form} onSubmit={this.submitHandler} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            value={name}
                            autoComplete="name"
                            autoFocus
                            onChange={this.changeHandler}
                        />

                        <TextField
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            id="capacity"
                            label="capacity"
                            name="capacity"
                            value={capacity}
                            autoComplete="capacity"
                            autoFocus
                            onChange={this.changeHandler}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="roomType"
                            label="roomType"
                            name="roomType"
                            value={roomType}
                            autoComplete="roomType"
                            autoFocus
                            onChange={this.changeHandler}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Create Room
                        </Button>
                        
                    </form>
                </div>
            </Container>
        )
    }
}

export default withRouter((withStyles)(useStyles)(CreateRoom))