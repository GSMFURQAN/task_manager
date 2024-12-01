import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import MainTabs from './MainTabs';
const MainPage = () => {
    const general = useSelector(state => state.general)
   console.log('gtx',general)

    return (
        <div >
            <Stack display={'flex'} direction={'row'} justifyContent={'flex-start'} mx={{lg:4,md:4, sm:2,xs:2}}>
                {general?.selectedCategories?.map((x) => (
                    <Box  sx={{ minHeight: '100%', borderRadius: 2, border:'2px solid white', width: '100%', mx: 2, my: 1,  minWidth: '30vw' }} maxWidth= {{lg:'30vw', md:'30vw',sm:'98vw',xs:'98vw'}}>
                        <MainTabs item={x} />
                    </Box>
                ))}
            </Stack>

        </div>
    )
}

export default MainPage