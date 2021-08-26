import React from 'react';
import {PolarArea } from 'react-chartjs-2';
import { makeStyles, useTheme} from "@material-ui/core";

const PolarAreaChart = React.memo(()=>{

    const theme = useTheme()

    const classes = useStyles()

    const data = {
        labels: ['PRIMARY', 'SECONDARY', 'ERROR', 'WARNING', 'INFO', 'SUCCESS'],
        datasets:[ {
            label: 'Votes',
            data: [2, 3, 20, 5, 1, 4],
            backgroundColor: [
                theme.palette.primary.light,
                theme.palette.secondary.light,
                theme.palette.error.light,
                theme.palette.warning.light,
                theme.palette.info.light,
                theme.palette.success.light,
            ],
            hoverBackgroundColor: [
                theme.palette.primary.dark,
                theme.palette.secondary.dark,
                theme.palette.error.dark,
                theme.palette.warning.dark,
                theme.palette.info.dark,
                theme.palette.success.dark,
            ],
            borderColor: [
                theme.palette.primary.light,
                theme.palette.secondary.light,
                theme.palette.error.light,
                theme.palette.warning.light,
                theme.palette.info.light,
                theme.palette.success.light,
            ],
            hoverBorderColor: [
                theme.palette.primary.dark,
                theme.palette.secondary.dark,
                theme.palette.error.dark,
                theme.palette.warning.dark,
                theme.palette.info.dark,
                theme.palette.success.dark,
            ],
            borderWidth: 1,
        }]
    }

    const options = {
        responsive: true
    }


    return(
        <>
            <div className='header'>
                <h1 className='title'>Polar Area Chart</h1>
            </div>
            <div className={classes.content}>
                <PolarArea data={data} options={options} fallbackContent={<div>你的浏览器暂不支持canvas!</div>}/>
            </div>
        </>
    );
})

const useStyles = makeStyles({
    content: {
        maxWidth: 600,
        margin: 'auto',
        padding: '16px 32px',
    }
})

export default PolarAreaChart;
