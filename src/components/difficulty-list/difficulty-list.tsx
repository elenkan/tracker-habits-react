import lists from '../../lists.json';
import {Box, Typography} from '@mui/material';
import './difficulty-list.scss';
import {useAppDispatch} from '../../hooks/stateHooks';
import {addColorDifficulty} from '../../actions/actions';

const DifficultyList = () => {
  const list = lists.difficultyList;
  const dispatch = useAppDispatch();

  // TODO: заменить на useEffect ?
  const colorStyle = (color: string) => {
    return {
      backgroundColor: color
    }
  }
  const setColorDifficulty = (color: string) => {
    dispatch(addColorDifficulty(color))
  };

  const difficultyListItems = list.map(item => {
    return (
      <li className="difficulty-list__item" key={item.difficulty} onClick={() => setColorDifficulty(item.color)}>
        <span className="difficulty-list__color" style={colorStyle(item.color)}/>
        <Typography
          component="span"
          color="text.primary"
          sx={{
            fontSize: '16px',
            lineHeight: '16px',
            '@media (max-width: 795px)': {
              fontSize: '15px'
            }
          }}>
          {item.difficulty}
        </Typography>
      </li>
    );
  });
  return (
    <Box component="div" sx={{bgcolor: 'background.default'}} className="difficulty">
      <h3 className="difficulty__title">Как справился (-ась):</h3>
      <ul className="difficulty-list">
        {difficultyListItems}
      </ul>
    </Box>);
};

export default DifficultyList;