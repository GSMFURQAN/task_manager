import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Stack } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import MyButton from '../MyComponents/MyButton';
import AddIcon from '@mui/icons-material/Add';
import CategoryChips from './CategoryChips';
import Stats from './Stats';
import { Height } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { CREATE_CAR } from '../gqlQueries/Mutations';
import AddTask from '../MyComponents/AddTask';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const TopFilters = () => {
    const [open, setOpen] = useState(false)
    // const [createCar, { data, loadind, error }] = useMutation(CREATE_CAR,{
    //     refetchQueries:[
    //         'getAllUsers'
    //     ]
    // })
    const handleAddTask = () => {
       setOpen(true)
    }
return (
    <div>
        <Box>
            <Grid container spacing={2} >
                <Grid size={9} pl={2}>
                    <Item >
                        <Stack display={'flex'} direction={'row'} spacing={8} mx={3}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Box>
                                    <DemoContainer components={['DateTimePicker']}  >
                                        <DateTimePicker label="From Date" style={{ height: '14px' }} />
                                    </DemoContainer>
                                </Box>
                                <Box>
                                    <DemoContainer components={['DateTimePicker']}>
                                        <DateTimePicker label="To Date" size='sm' />
                                    </DemoContainer>
                                </Box>
                            </LocalizationProvider>
                            <div style={{ margin: 'auto' }}>
                                <MyButton text={'Add Task'} color={'primary'} size={'md'} handleClick={handleAddTask} startIcon={<AddIcon />} />
                            </div>

                        </Stack>
                        <Stack mt={1.5}>
                            <CategoryChips />
                        </Stack>
                    </Item>
                </Grid>
                <Grid size={3} pr={1}>
                    <Item>
                        <Stats />
                    </Item>
                </Grid>
            </Grid>
        </Box>
        <AddTask open={open} setOpen={setOpen}/>
    </div>
)
}

export default TopFilters