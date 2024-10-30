import { Button, Typography } from '@mui/material'
import React from 'react'

const MyButton = ({ color, size, text, handleClick,startIcon,endIcon }) => {
    return (
        <div ><Button color={color} onClick={handleClick} startIcon={startIcon} >{text}</Button></div>
    )
}

export default MyButton