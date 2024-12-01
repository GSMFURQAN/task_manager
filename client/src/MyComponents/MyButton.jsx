import { Button, Typography } from '@mui/material'
import React from 'react'

const MyButton = ({ color, size, text, handleClick,startIcon,endIcon }) => {
    return (
     <Button color={color} onClick={handleClick} startIcon={startIcon} >{text}</Button>
    )
}

export default MyButton