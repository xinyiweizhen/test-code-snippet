import * as React from "react";
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const MButton = (props)=>{

    const classes = useStyles()


    return(
        <div className={classes.root}>
            <p>基本用法：</p>
            <p>variant：</p>
            <Button>variant: text(默认)</Button>
            <Button variant="contained">variant: contained</Button>
            <Button variant="outlined">variant: outlined</Button>
            <p>disableElevation：</p>
            <Button variant="contained" color="primary" >
            Able elevation
            </Button>
            <Button variant="contained" color="primary" disableElevation>
            Disable elevation
            </Button>
            <p>disableRipple：</p>
            <Button variant="contained" color="primary" >
            Able Ripple
            </Button>
            <Button variant="contained" color="primary" disableRipple>
            Disable Ripple
            </Button>
            <p>color：</p>
            <Button variant="contained">Default</Button>
            <Button variant="contained" color='inherit'>inherit</Button>
            <Button variant="contained" color="primary">
                color：Primary
            </Button>
            <Button variant="contained" color="secondary">
                color：Secondary
            </Button>
            <p>disabled：</p>
            <Button variant="contained" disabled>
                disabled：Disabled
            </Button>
            <p>href：</p>
            <Button color="primary" href="#/Button">
                Link: text
            </Button>
            <Button variant="contained" color="primary" href="#/Button">
                Link: contained
            </Button>
            <Button variant="outlined" color="primary" href="#/Button">
                Link: outlined
            </Button>
            <p>size：</p>
            <Button size="small" variant="contained" color="primary" >
            size： Small
            </Button>
            <Button size="medium" variant="contained" color="primary" >
            size：Medium
            </Button>
            <Button size="large" variant="contained" color="primary" >
            size：Large
            </Button>
            <p>startIcon and endIcon：</p>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
            >
                startIcon
            </Button>
            <Button
                variant="contained"
                color="secondary"
                endIcon={<DeleteIcon />}
            >
                endIcon
            </Button>
        </div>
    )
}

const useStyles = makeStyles((theme)=>({
    root: {
        '& > button, & > a' : {
            margin: theme.spacing(1)
        }
    }
}))

export default MButton
