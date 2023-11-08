import lists from '../../lists.json';
import {Box, Typography} from '@mui/material';
import './difficulty-list.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/stateHooks';
import {addColorDifficulty} from '../../actions/actions';
import type {ChangeEvent} from 'react';
import {useState} from 'react';
import classNames from 'classnames';
import {cloneDeep} from 'lodash';
import type {ColorItem} from '../../types';

const DifficultyList = () => {
  const currentTheme = useAppSelector(state => state.currentTheme);
  const difficultyList = cloneDeep(lists.difficultyList);
  const [list, setList] = useState<ColorItem[]>(difficultyList);
  const dispatch = useAppDispatch();

  // TODO: заменить на useEffect ?
  const colorStyle = (color: string) => {
    return {
      backgroundColor: color,
    };
  };
  const setColorDifficulty = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(addColorDifficulty(e.target.value));
    difficultyList.forEach(item => {
      item.checked = false;
      if (item.color === e.target.value) {
        item.checked = e.target.checked;
      }
    });
    setList([...difficultyList]);
  };

  const difficultyListItems = list.map(item => {
    return (
      <label
        className={classNames('difficulty-list__item', {
          'difficulty-list__item_checked': item.checked,
          'difficulty-list__item_checked-dark': item.checked && currentTheme === 'dark',
        })}
        key={item.difficulty}>
        <input
          name="difficulty"
          type="radio"
          value={item.color}
          checked={item.checked}
          onChange={setColorDifficulty}
        />
        <span className="difficulty-list__color" style={colorStyle(item.color)} />
        <Typography
          component="span"
          color="text.primary"
          sx={{
            fontSize: '16px',
            lineHeight: '16px',
            '@media (max-width: 795px)': {
              fontSize: '15px',
            },
          }}>
          {item.difficulty}
        </Typography>
      </label>
    );
  });
  return (
    <Box component="div" sx={{bgcolor: 'background.default'}} className="difficulty">
      <h3 className="difficulty__title">Как справился (-ась):</h3>
      <fieldset className="difficulty-list">{difficultyListItems}</fieldset>
    </Box>
  );
};

export default DifficultyList;
