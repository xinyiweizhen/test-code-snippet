import React from 'react';
import IconButton from '@material-ui/core/IconButton'
import AlarmIcon from '@material-ui/icons/Alarm';

const MIconButton = ()=> {

    return(
        <div>
            <p>基本使用</p>
            <IconButton color='primary'>
                <AlarmIcon/>
            </IconButton>
            <IconButton color='secondary'>
                <AlarmIcon/>
            </IconButton>
        </div>
        
    )
}


export default MIconButton;