import React from 'react';
import {Line} from 'react-chartjs-2';
import {Button, makeStyles, useTheme} from "@material-ui/core";

const BasicLine = React.memo(()=>{

    const theme = useTheme()

    const classes = useStyles()

    const [fill, setFill] = React.useState(false)

    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets:[ {
            label: 'Primary Votes',
            data: [2, 3, 20, 5, 1, 4, 11],
            fill,
            backgroundColor: theme.palette.primary.light,
            // hoverBackgroundColor: theme.palette.primary.dark,
            borderColor: theme.palette.primary.light,
            // hoverBorderColor: theme.palette.primary.dark,
        }]
    }

    const options = {
        responsive: true,
        scales: {
            y: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    }


    return(
       <>
           <div className='header'>
               <h1 className='title'>Basic Line Chart</h1>
               <Button color='primary' variant='contained' onClick={()=>setFill((v)=>!v)}>set {!fill ? 'fill' : 'no fill'}</Button>
           </div>
           <div className={classes.content}>
               <Line data={data} options={options} fallbackContent={<div>你的浏览器暂不支持canvas!</div>}/>
           </div>
       </>
    );
})

const useStyles = makeStyles({
    content: {
        maxWidth: 800,
        margin: 'auto',
        padding: '16px 32px',
    }
})

export default BasicLine;
