import React from 'react';
import { FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core';

const MFormControl = ()=>{
    return(
        <div>
            <p>基本使用</p>
            <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
        </div>

    )
}

export default MFormControl
