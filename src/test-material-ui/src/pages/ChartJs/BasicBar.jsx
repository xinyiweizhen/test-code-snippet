import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Button, makeStyles, useTheme} from "@material-ui/core";





const BasicBar = () => {
    const theme = useTheme();

    const classes = useStyles()

    const [horizontal, setHorizontal] = React.useState(false)
    const data = {
        labels: ['PRIMARY', 'SECONDARY', 'ERROR', 'WARNING', 'INFO', 'SUCCESS'],
        datasets: [
            {
                label: 'PALETTE VOTES',
                data: [12, 19, 3, 5, 2, 3],
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
            }
        ],
    };

    const options = {
        responsive: true,
        // TODO　改变水平轴的方向
        indexAxis: horizontal ? 'y' : 'x',
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        plugins: {
            legend: {
                display: true,
                position: horizontal ? 'right' : 'top'
            },
        }
    };
    return (
        <>
            <div className='header'>
                <h1 className='title'>Basic Bar Chart</h1>
                <Button color='primary' variant='contained' onClick={()=> setHorizontal((v)=> !v)}>Switch {!horizontal ? 'Horizontal' : 'Vertical'}</Button>
            </div>
            <div   className={classes.content}>
                <Bar data={data} options={options} />
            </div>
        </>
    )

};

const useStyles = makeStyles({
    content: {
        maxWidth: 800,
        margin: 'auto',
        padding: '16px 32px',
    }
})

export default BasicBar;
