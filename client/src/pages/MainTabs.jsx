import React, { useState } from 'react'
import { Box, Input, Stack, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { selectState } from '../redux/generalSlice';
import Task from './Task';
import Popup from '../MyComponents/MyPopup';
import constant from '../constants';
const MainTabs = ({ title, data }) => {
    const general = useSelector(state => state.general)
    const dispatch = useDispatch()
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const todos = [
        { id: 1, title: 'hern', note: 'getre sdafanad gionel', dueDate: '30-Oct-2024' },
        { id: 2, title: 'Meeeeehrn', note: 'getanad gionel' },
        { id: 3, title: 'Xewacsrn', note: 'getresdaf  sdzafs afanad gionel' }
    ];
    const handleClose = (tab) => {
        dispatch(selectState({ selectedCategories: general.selectedCategories.filter((x) => x != tab) }))
    }

    const handleKeyPress=(e)=>{
        if(e.key === 'Enter')
        setOpenEdit(false)
    }
    return (
        <div key={title}>
            <Stack display={'flex'} direction={'row'} justifyContent={'space-between'} px={2} pt={1}>
                <CloseIcon onClick={() => handleClose(title)} sx={{ cursor: 'pointer' }} />

                {openEdit ? <Stack display={'flex'} direction={'row'}><Input defaultValue={title} inputProps={'aria-label'} style={{ fontSize: '12px' }} onKeyDown={(e)=>handleKeyPress(e)} /> <CheckIcon cursor='pointer' fontSize='small' onClick={() => setOpenEdit(false)} /></Stack> : <Typography fontSize={13} fontWeight={'bold'}>{title}</Typography>}

                <Stack display={'flex'} direction={'row'} spacing={2}>
                    <EditIcon cursor='pointer' fontSize='small' onClick={() => setOpenEdit(true)} />
                    <DeleteIcon cursor='pointer' fontSize='small' onClick={() => setOpenDelete(true)} />
                </Stack>
            </Stack>
            <div style={{ border: '0.1px solid gray', margin: '4px 6px' }}></div>

            {todos.map((todo, i) =>
                <Stack direction={'cloumn'} display={'flex'} >
                    <Task todo={todo} index={i} />
                </Stack>
            )}
            <Popup open={openDelete} setOpen={setOpenDelete} title={constant?.confirmationTitle} description={constant?.deleteCategoryDescription} />
        </div>
    )
}

export default MainTabs