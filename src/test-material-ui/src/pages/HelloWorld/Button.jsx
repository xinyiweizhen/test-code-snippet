import * as React from "react";
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core";


const MButton = (props)=>{

    const classes = useStyles()

    return(
        <div className={classes.root}>
            <p>基本用法：</p>
            <p>variant：</p>
            <Button>variant: text(默认)</Button>
            <Button variant="contained">variant: contained</Button>
            <Button variant="outlined">variant: outlined</Button>

            <p>color：</p>
            <Button variant="contained">Default</Button>
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
            <Button variant="contained" color="primary" href="#contained-buttons">
                Link
            </Button>
        </div>
    )
}

const useStyles = makeStyles((theme)=>({
    root: {
        '& > button' : {
            margin: theme.spacing(1)
        }
    }
}))

export default MButton
