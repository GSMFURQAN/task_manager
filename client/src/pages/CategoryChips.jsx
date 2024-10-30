import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Box, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { selectState } from '../redux/generalSlice';
const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function CategoryChips() {
    const dispatch = useDispatch()
    const general = useSelector(state=>state.general)
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);
  const [SelectedchipData, setSelectedChipData] = React.useState([ ]);

  const handleSelectChips = (chips) => () => {
    // setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    // setSelectedChipData([...SelectedchipData, chips.label])
    console.log('gtx',chips)
    dispatch(selectState({selectedCategories : [...general.selectedCategories, chips.label]}))
  };

  return (
    <Stack display={'flex'} direction={'row'}justifyContent={'flex-start'}>
      <Typography my={'auto'} ml={3}>Categories :</Typography>
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
      {chipData.map((data) => {
        let icon;
        
        if (data.label === 'React') {
            icon = <TagFacesIcon />;
        }
        
        return (
            <ListItem key={data.key}>
            <Chip
              icon={general.selectedCategories.includes(data.label) ? <CheckIcon/> : <AddIcon/>}
              size='small'
              label={data.label}
              onClick={ handleSelectChips(data)}
              disabled={general.selectedCategories.length > 2||general.selectedCategories.includes(data.label) }
              color={general.selectedCategories.includes(data.label) ? 'success' : ''}
              />
          </ListItem>
        );
      })}
    </Paper>
        </Stack>
  );
}
