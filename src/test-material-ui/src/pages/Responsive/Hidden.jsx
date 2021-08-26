import React from 'react';
import {Hidden, Typography, Paper } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";

const MHidden = ({width})=>{
    const classes = useStyles()
    return(
        <div>
            <Typography variant="h5">断点之上（Breakpoint up）</Typography>
            <p>当使用任何断点 `up` 属性，给定的*子元素* 将在*断点及以上的范围*时被隐藏。</p>
            <Paper className={classes.container} >
            <p>Current width: {width}</p>
            <div >
                <Hidden xsUp>
                    <Paper elevation={3} className={classes.paper}>xsUp</Paper>
                </Hidden>
                <Hidden smUp>
                    <Paper elevation={3} className={classes.paper} >smUp</Paper>
                </Hidden>
                <Hidden mdUp>
                    <Paper elevation={3} className={classes.paper} >mdUp</Paper>
                </Hidden>
                <Hidden lgUp>
                    <Paper elevation={3} className={classes.paper} >lgUp</Paper>
                </Hidden>
                <Hidden xlUp>
                    <Paper elevation={3} className={classes.paper} >xlUp</Paper>
                </Hidden>
            </div>
            </Paper>
            <br/>
            <Typography variant="h5">断点之下（Breakpoint down）</Typography>
            <p>当使用任何断点 `down` 属性，给定的*子元素* 将在*断点及以下的范围*时被隐藏。</p>
            <Paper className={classes.container} >
                <p>Current width: {width}</p>
                <div >
                    <Hidden xsDown>
                        <Paper elevation={3} className={classes.paper}>xsDown</Paper>
                    </Hidden>
                    <Hidden smDown>
                        <Paper elevation={3} className={classes.paper} >smDown</Paper>
                    </Hidden>
                    <Hidden mdDown>
                        <Paper elevation={3} className={classes.paper} >mdDown</Paper>
                    </Hidden>
                    <Hidden lgDown>
                        <Paper elevation={3} className={classes.paper} >lgDown</Paper>
                    </Hidden>
                    <Hidden xlDown>
                        <Paper elevation={3} className={classes.paper} >xlDown</Paper>
                    </Hidden>
                </div>
            </Paper>
            <br/>
            <Typography variant="h5">仅限断点</Typography>
            <p>当使用断点 `only` 属性，给定的*子元素*将在 *在* 指定的断点（断点数组）被隐藏。</p>
               <span>使用 `only` 属性有这样两种方式：</span>
            <ul>
                <li>列出单独一个断点</li>
                <li>列出一个断点数组</li>
            </ul>
            <Paper className={classes.container} >
                <p>Current width: {width}</p>
                <div >
                    <Hidden only="lg">
                        <Paper className={classes.paper} elevation={3}>Hidden on lg</Paper>
                    </Hidden>
                    <Hidden only="sm">
                        <Paper className={classes.paper} elevation={3}>Hidden on sm</Paper>
                    </Hidden>
                    <Hidden only={['sm', 'lg']}>
                        <Paper className={classes.paper} elevation={3}>Hidden on sm and lg</Paper>
                    </Hidden>
                </div>
            </Paper>
        </div>

    )
}

const useStyles = makeStyles((theme)=>({
    container: {
        padding: theme.spacing(3)

    },
    paper: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
    }
}), {
    name: 'MHidden'
})


export default withWidth()(MHidden)
