import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import MainTabs from './MainTabs';

const MainPage = () => {
    const general = useSelector(state => state.general)
   console.log('gtx',general)

    return (
        <div>
            <Stack display={'flex'} direction={'row'} justifyContent={'flex-start'} mx={{lg:6,md:6, sm:2,xs:2}}>
                {general?.selectedCategories?.map((x) => (
                    <Box sx={{ minHeight: '100%', border: '2px solid green', borderRadius: 2, width: '100%', mx: 2, my: 1,  minWidth: '28vw' }} maxWidth= {{lg:'28vw', md:'28vw',sm:'100vw',xs:'98vw'}}>
                        <MainTabs item={x} />
                    </Box>
                ))}
            </Stack>

        </div>
    )
}

export default MainPage