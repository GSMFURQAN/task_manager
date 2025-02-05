import React, { useEffect, useState } from 'react'
import { Box, Input, Stack, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { selectState } from '../redux/generalSlice';
import Task from './Task';
import MyPopup from '../MyComponents/MyPopup';
import constant from '../constants';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { FILTERED_TASKS, GET_ALL_CATEGORIES } from '../gqlQueries/Quries';
import { DELETE_CATEGORY, EDIT_CATEGORY } from '../gqlQueries/Mutations';
import MyButton from '../MyComponents/MyButton';
import AddTask from '../MyComponents/AddTask';
const MainTabs = ({ item }) => {
    const general = useSelector(state => state.general)
    const dispatch = useDispatch()
    const [openDelete, setOpenDelete] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [categoryValue, setCategoryValue] = useState(item.name)
    const [fetchTasks, { loading, error, data }] = useLazyQuery(FILTERED_TASKS, {
        fetchPolicy: 'network-only'
      });
    // Function to trigger the query with dynamic variables
    const handleFetchTasks = (category, dateFilters) => {
        fetchTasks({
          variables: {
              fromDate: dateFilters?.fromDate || null, // Include null for empty dates
            category,
            toDate: dateFilters?.toDate || null,
          }
        });
      };
    useEffect(() => {
        if (item?.name || general?.dateFilters) {
            handleFetchTasks(item.name, general?.dateFilters);
        }
    }, [item, general.dateFilters?.fromDate, general?.dateFilters?.toDate])

    const [deleteId, setDeleteId] = useState('')
    const categories = useQuery(GET_ALL_CATEGORIES)
    const [editCategory] = useMutation(EDIT_CATEGORY, {
        refetchQueries: ['GET_CATEGORIES', 'getFilteredTasks']
    })
    const [deleteCategory] = useMutation(DELETE_CATEGORY, {
        refetchQueries: ['GET_CATEGORIES', 'getFilteredTasks']
    })
    const handleClose = (tab) => {
        dispatch(selectState({...general, selectedCategories: general.selectedCategories.filter((x) => x._id != tab._id) }))
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            updateCategory()
        }
    }
    const updateCategory = () => {
        editCategory({
            variables: {
                editedCategory: {
                    name: categoryValue,
                    _id: item._id
                }
            }
        })
        const index = general.selectedCategories.findIndex((x) => x._id === item._id)
        dispatch(selectState({...general, selectedCategories: general.selectedCategories.map((x) => x._id === item._id ? { ...x, name: categoryValue } : x) }))
        setOpenEdit(false)
    }

    const handleDeleteCategory = () => {
        deleteCategory({
            variables: {
                id: deleteId
            }
        })
        dispatch(selectState({...general, selectedCategories: general.selectedCategories.filter((x) => x._id != deleteId) }))
        setOpenDelete(false)
    }
    const deletePopupContent = (
        <>
            <Typography variant='h5'>{constant?.confirmationTitle}</Typography>
            <br />
            <Typography variant=''>{constant?.deleteCategoryDescription}</Typography>
            <Stack display={'flex'} justifyContent={'flex-end'} direction={'row'} spacing={5} mt={2}>
                <MyButton color={'primary'} text={'Cancel'} handleClick={() => setOpenDelete(false)} />
                <MyButton color={'error'} text={'Delete'} handleClick={handleDeleteCategory} />
            </Stack>
        </>
    )

    return (
        <div key={item._id} style={{ maxHeight: '68vh', overflowY: 'auto' }}>
            <Stack display={'flex'} direction={'row'} justifyContent={'space-between'} px={2} pt={1}   position={'sticky'} top={0} bgcolor={"rgba(31, 28, 28, 0.99)"} zIndex={2}>
                <CloseIcon onClick={() => handleClose(item)} sx={{ cursor: 'pointer' }} />

                {openEdit ? <Stack display={'flex'} direction={'row'}><Input inputProps={'aria-label'} style={{ fontSize: '12px' }} value={categoryValue} onChange={(e) => setCategoryValue(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} /> <CheckIcon cursor='pointer' fontSize='small' onClick={() => updateCategory()} /></Stack> : <Typography fontSize={14} fontWeight={'bold'}>{item.name}</Typography>}

                {item.name != 'Today' ? <Stack display={'flex'} direction={'row'} spacing={2}>
                    <EditIcon cursor='pointer' fontSize='small' onClick={() => setOpenEdit(true)} />
                    <DeleteIcon cursor='pointer' fontSize='small' onClick={() => {
                        setOpenDelete(true);
                        setDeleteId(item._id)
                    }} />
                </Stack>:<div></div>}
            </Stack>
            <div style={{ border: '0.1px solid gray', margin: '0px 6px' }}></div>

            {data && data?.filteredTasks.length > 0 ? data?.filteredTasks?.map((todo, i) =>
                <Stack  >
                    <Task todo={todo} index={i} />
                </Stack>
            )
                :
                <div style={{display:'flex', justifyContent:'center', margin:'4%'}}>

                <MyButton  text={'Add Tasks'} handleClick={() => setOpenAdd(true)} />
                    </div>}
            <MyPopup open={openDelete} setOpen={setOpenDelete} content={deletePopupContent} />
            <AddTask open={openAdd} setOpen={setOpenAdd} />
        </div>
    )
}

export default MainTabs