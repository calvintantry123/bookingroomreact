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

class Register extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            name: '',
            email: '',
            phoneNumber: '',
            password: '',
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    submitHandler = e => {
        e.preventDefault()

        console.log(this.state)
        axios.post('/user', this.state)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { classes } = this.props;
        const { name, email, phoneNumber, password } = this.state

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} />

                    <Typography component="h1" variant="h5">
                        Sign Up
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
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            autoComplete="email"
                            autoFocus
                            onChange={this.changeHandler}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="phoneNumber"
                            label="Phone Number"
                            name="phoneNumber"
                            type="number"
                            value={phoneNumber}
                            autoComplete="phoneNumber"
                            autoFocus
                            onChange={this.changeHandler}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            id="password"
                            autoComplete="current-password"
                            onChange={this.changeHandler}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>

                            <Grid item>
                            <Link href="/login" variant="body2">
                                {"Already have an account? Log In"}
                            </Link>
                            </Grid>

                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

export default withStyles(useStyles)(Register)
