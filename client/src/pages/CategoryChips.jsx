import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Box, CircularProgress, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { selectState } from '../redux/generalSlice';
import MyPopup from '../MyComponents/MyPopup';
import {  useMutation, useQuery } from '@apollo/client';
import { CREATE_CATEGORY } from '../gqlQueries/Mutations';
import { GET_ALL_CATEGORIES } from '../gqlQueries/Quries';
const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function CategoryChips() {
  const dispatch = useDispatch()
  const general = useSelector(state => state.general)
  const [addCategory, setAddCategory] = React.useState('')
  const [openAddCategory, setOpenAddCategory] = React.useState(false)
  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES )
  const [createCategory, creation] = useMutation(CREATE_CATEGORY,{
    refetchQueries:['GET_CATEGORIES']
  })

  const [SelectedchipData, setSelectedChipData] = React.useState([]);
  const isSmallScreen = useMediaQuery('(max-width:800px)');
  const handleSelectChips = (chips) => () => {
    // setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    // setSelectedChipData([...SelectedchipData, chips.label])
    if(isSmallScreen){
      dispatch(selectState({...general, selectedCategories: [chips] }))
    }else{
      dispatch(selectState({...general, selectedCategories: [...general.selectedCategories, chips] }))
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
     createCategory({
      variables:{
        newCategory: {name:addCategory}
      }
     })
    }
  }
  React.useEffect(()=>{
    if(!creation.loading){
      setTimeout(()=>{
        setOpenAddCategory(false)
      },500)
    }
  },[creation.loading])


  const AddCategoryPopupContent =
    <>
      <Typography variant='h6' mb={2}>Add a category</Typography>
      <Stack display={'flex'} direction={'row'} spacing={9}>
      <TextField label="Category"
        type="text"
        size="small"
        value={addCategory}
        onChange={(e) => setAddCategory(e.target.value)}
        onKeyDown={handleKeyPress} sx={{width:'80%'}}/>
     
        </Stack>
    </>
React.useEffect(()=>{
  setAddCategory('')
},[openAddCategory])

  return (
    <Stack display={'flex'} direction={'row'} justifyContent={'flex-start'}>
      <Typography my={'auto'} >Categories :</Typography>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 0.5,
          m: 0,
        }}
        component="ul"
      >
        { data && data?.categories?.map((item) => {

          return (
            <ListItem key={item._id} >
              <Chip
                sx={{ mx: 0.5 }} icon={general.selectedCategories.includes(item.name) ? <CheckIcon /> : <AddIcon />}
                size='small'
                label={item.name}
                onClick={handleSelectChips(item)}
                disabled={general.selectedCategories.length > 2 || general.selectedCategories.find((x)=>x.name==item.name)}
                color={general.selectedCategories.includes(item.name) ? 'success' : ''}
              />
            </ListItem>
          );
        })}
        <AddIcon sx={{ m: "auto",cursor:'pointer' }} onClick={() => setOpenAddCategory(true)} />
         <MyPopup open={openAddCategory} setOpen={setOpenAddCategory} content={AddCategoryPopupContent} addStyles={{width:{md:'35%', lg:'35%', sm:'60%'}}}/>
      </Paper>
    </Stack>
  );
}
