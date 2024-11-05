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
import { useMutation, useQuery } from '@apollo/client';
import { FILTERED_TASKS, GET_ALL_CATEGORIES } from '../gqlQueries/Quries';
import { EDIT_CATEGORY } from '../gqlQueries/Mutations';
const MainTabs = ({ item }) => {
    const general = useSelector(state => state.general)
    const dispatch = useDispatch()
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [categoryValue, setCategoryValue] = useState(item.name)
    const { loading, error, data } = useQuery(FILTERED_TASKS, {
        variables: {
            category: item.name,
        }
    })
    const categories = useQuery(GET_ALL_CATEGORIES)
    const [editCategory] = useMutation(EDIT_CATEGORY,{
        refetchQueries:['GET_CATEGORIES','getFilteredTasks']
    })
    const handleClose = (tab) => {
        dispatch(selectState({ selectedCategories: general.selectedCategories.filter((x) => x._id != tab._id) }))
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          updateCategory()
        }
    }
    const updateCategory=()=>{
        editCategory({
            variables: {
                editedCategory: {
                    name: categoryValue,
                    _id: item._id
                }
            }
        })
        const index = general.selectedCategories.findIndex((x)=>x._id === item._id)
        dispatch(selectState({ selectedCategories: general.selectedCategories.map((x)=>x._id === item._id ? {...x, name: categoryValue}: x) }))
        setOpenEdit(false)
    }

    return (
        <div key={item._id}>
            <Stack display={'flex'} direction={'row'} justifyContent={'space-between'} px={2} pt={1}>
                <CloseIcon onClick={() => handleClose(item)} sx={{ cursor: 'pointer' }} />

                {openEdit ? <Stack display={'flex'} direction={'row'}><Input inputProps={'aria-label'} style={{ fontSize: '12px' }} value={categoryValue} onChange={(e) => setCategoryValue(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} /> <CheckIcon cursor='pointer' fontSize='small' onClick={() => updateCategory()} /></Stack> : <Typography fontSize={13} fontWeight={'bold'}>{item.name}</Typography>}

                <Stack display={'flex'} direction={'row'} spacing={2}>
                    <EditIcon cursor='pointer' fontSize='small' onClick={() => setOpenEdit(true)} />
                    <DeleteIcon cursor='pointer' fontSize='small' onClick={() => setOpenDelete(true)} />
                </Stack>
            </Stack>
            <div style={{ border: '0.1px solid gray', margin: '4px 6px' }}></div>

            {data && data?.filteredTasks?.map((todo, i) =>
                <Stack direction={'cloumn'} display={'flex'} >
                    <Task todo={todo} index={i} />
                </Stack>
            )}
            <Popup open={openDelete} setOpen={setOpenDelete} item={constant?.confirmationTitle} description={constant?.deleteCategoryDescription} />
        </div>
    )
}

export default MainTabs