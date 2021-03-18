import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


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
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
}))(TableRow);

function createData(name, capacity, type){
    return {name, capacity, type};
}

const rows = [
    createData('roomA', '20', "typeA"),
    createData('roomB', '20', "typeB"),
    createData('roomC', '20', "typeC")
]

const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },

    paper: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
      },
});

function Home() {
    const classes = useStyles();
    return (

    <Container component="main" >
        <div className= {classes.paper}>
            
            <Typography component="h1" variant="h5">
                Room List
            </Typography>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Room Name</StyledTableCell>
                            <StyledTableCell align="left">Room Capacity</StyledTableCell>
                            <StyledTableCell align="left">Room Type</StyledTableCell>
                            <StyledTableCell align="left">Action</StyledTableCell>
                            
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.capacity}</StyledTableCell>
                                <StyledTableCell align="left">{row.type}</StyledTableCell>
                                <StyledTableCell align="left">
                                    <Button variant="contained" color="primary">
                                        Book
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </Container>
    )
}

export default Home
