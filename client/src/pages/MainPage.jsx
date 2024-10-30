import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MainTabs from './MainTabs';
const MainPage = () => {
    const tabs = ['React', 'Angular', 'JQuery']
    const general = useSelector(state => state.general)
    console.log('gnx', general)
    return (
        <div>
            <Stack display={'flex'} direction={'row'} justifyContent={'flex-start'} mx={6}>
                {general?.selectedCategories.map((x) => (
                    <Box sx={{ minHeight: '100%', border: '2px solid green', borderRadius:2, width: '100%', mx: 2, my:1,  maxWidth:'28vw', minWidth:'28vw' }}>
                       <MainTabs title={x}/>
                    </Box>
                ))}
            </Stack>

        </div>
    )
}

export default MainPage