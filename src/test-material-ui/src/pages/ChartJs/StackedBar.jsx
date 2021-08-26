import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Button, makeStyles, useTheme} from "@material-ui/core";
import {numbers} from "../../utils/random";



const StackedBar = () => {
    const theme = useTheme()
    const classes = useStyles()

    const [group, setGroup] = React.useState(false)

    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Primary Votes',
                data: [1, 19, 3, 5, 2, 3, 3],
                backgroundColor: theme.palette.primary.light,
                hoverBackgroundColor: theme.palette.primary.dark,
                borderColor: theme.palette.primary.light,
                hoverBorderColor: theme.palette.primary.dark,
                // TODO 设置scales的 ID
                xAxisID: 'xAxis',
                yAxisID: 'yAxis',
                stack: group ? 'stack 0' :undefined,
            },
            {
                label: 'Secondary Votes',
                data: [2, 3, 20, 5, 1, 4, 11],
                backgroundColor: theme.palette.secondary.light,
                hoverBackgroundColor: theme.palette.secondary.dark,
                borderColor: theme.palette.secondary.light,
                hoverBorderColor: theme.palette.secondary.dark,
                // TODO 设置scales的 ID
                xAxisID: 'xAxis',
                yAxisID: 'yAxis',
                stack: group ? 'stack 0' :undefined,
            },
            {
                label: 'Success Votes',
                data: [3, 10, 13, 15, 22, 30, 8],
                backgroundColor: theme.palette.success.light,
                hoverBackgroundColor: theme.palette.success.dark,
                borderColor: theme.palette.success.light,
                hoverBorderColor: theme.palette.success.dark,
                // TODO 设置scales的 ID
                xAxisID: 'xAxis',
                yAxisID: 'yAxis',
                stack: group ? 'stack 1' :undefined,
            },
        ],
    };

    const options = {
        responsive: true,
        interaction: {
            intersect: false,
            mode: 'index',
        },
        plugins: {
            tooltips: {
                mode: 'label'
            },
        },
        scales: {
            yAxis: {
                // TODO 设置堆叠
                stacked: true,
            },
            xAxis: {
                // TODO 设置堆叠
                stacked: true,
            },
        },
    };

    return (
        <>
            <div className='header'>
                <h1 className='title'>Stacked Bar Chart</h1>
                <Button color='primary' variant='contained' onClick={()=> setGroup((v)=>!v)}>{!group ? 'with' : 'without'} group</Button>
            </div>
            <div className={classes.content}>
                <Bar data={data} options={options} fallbackContent={<div>你的浏览器暂不支持canvas!</div>}/>
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

export default StackedBar;
