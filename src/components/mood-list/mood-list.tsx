import lists from '../../lists.json';
import {Box, Typography} from '@mui/material';
import './mood-list.scss';
import {useAppDispatch} from '../../hooks/stateHooks';
import {addColorMood} from '../../actions/actions';

const MoodList = () => {
  const list = lists.moodList;
  const dispatch = useAppDispatch();

  // TODO: заменить на useEffect ?
  const colorStyle = (color: string) => {
    return {
      backgroundColor: color
    }
  }
  const setColorMood = (color: string) => {
    dispatch(addColorMood(color))
  };

  const moodListItems = list.map(item => {
    return (
      <li className="mood-list__item" key={item.mood} onClick={() => setColorMood(item.color)}>
        <span className="mood-list__color" style={colorStyle(item.color)}></span>
        <Typography
          component="span"
          color="text.primary"
          sx={{
            fontSize: '16px',
            lineHeight: '16px',
          }}>
          {item.mood}
        </Typography>
      </li>
    );
  });
  return (
    <Box component="div" sx={{bgcolor: 'background.default'}} className="mood">
      <h3 className="mood__title">Как справился (-ась):</h3>
      <ul className="mood-list">
        {moodListItems}
      </ul>
    </Box>);
};

export default MoodList;