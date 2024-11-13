import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { selectState } from '../redux/generalSlice';

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
    const general = useSelector((state) => state.general)
    const [dateFilters, setDateFilters] = useState({
        // fromDate: dayjs().startOf('day').toDate(),
        fromDate: '',
        toDate: ''
    })
    const dispatch = useDispatch()
    const handleAddTask = () => {
        setOpen(true)
    }

    useEffect(() => {
        dispatch(selectState({ ...general, dateFilters }))
    }, [dateFilters])
    return (
        <div style={{ padding: '3px 0px' }}>
            <Stack direction={'row'}>
                <Stack display={'flex'} direction={'column'} spacing={1} width={{ lg: '70%', md: '70%', sm: '96%', xs: '96%' }} ml={{ xs: 0.5, sm: 0.5, md: 4, lg: 4 }}>
                    <Stack display={'flex'} direction={{ xs: 'row', sm: 'row', lg: 'column', md: 'column' }}>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}   >
                                <Stack direction={{ lg: 'row', md: 'row', sm: 'column', xs: 'column' }} display='flex' justifyContent='space-between' height={'auto'} width={'100%'} spacing={1.5}>
                                    <Box>

                                        <DateTimePicker label="From Date" value={dayjs(dateFilters?.fromDate)}
                                            onChange={(e) => setDateFilters({ ...dateFilters, fromDate: e.$d })}
                                            sx={{
                                                '.MuiInputBase-root': {
                                                    // width: { md: '100%', sm: '98%', xs: '98%', lg: '100%' }, // Adjust width here
                                                    height: { xs: '40px', sm: '40px', lg: 'auto', md: 'auto' }, // Adjust height here
                                                },
                                            }} />

                                    </Box>
                                    <Box>
                                        <DateTimePicker label="To Date" value={dayjs(dateFilters?.toDate)}
                                            onChange={(e) => setDateFilters({ ...dateFilters, toDate: e.$d })}
                                            sx={{
                                                '.MuiInputBase-root': {
                                                    // width: { md: '100%', sm: '98%', xs: '98%', lg: '100%' }, // Adjust width here
                                                    height: { xs: '40px', sm: '40px', lg: 'auto', md: 'auto' }, // Adjust height here
                                                },
                                            }} />
                                    </Box>
                                    <Box m={{ lg: 'auto', md: 'auto' }}>
                                        <MyButton text={'Add Task'} color={'primary'} size={'small'} handleClick={handleAddTask} startIcon={<AddIcon />} />
                                    </Box>
                                </Stack>
                            </DemoContainer>
                        </LocalizationProvider>
                        <Box display={{ xs: 'block', sm: 'block', lg: 'none', md: 'none' }}>
                            <Stats />
                        </Box>
                    </Stack>
                    <CategoryChips />
                </Stack>
                <Box display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
                    <Stats />
                </Box>
            </Stack>
            <AddTask open={open} setOpen={setOpen} />
        </div>
    )
}

export default TopFilters