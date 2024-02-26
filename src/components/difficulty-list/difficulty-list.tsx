import lists from 'lists.json'
import { Box, Typography, IconButton, Tooltip } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import { useAppDispatch, useAppSelector } from 'hooks/stateHooks'
import { currentThemeSelector } from 'selectors/selectors'
import { addColorDifficulty } from 'actions/actions'
import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { cloneDeep } from 'lodash'
import type { ColorItem } from 'types'
import './difficulty-list.scss'

const DifficultyList = () => {
  const currentTheme = useAppSelector(currentThemeSelector)
  const difficultyList = cloneDeep(lists.difficultyList)
  const [list, setList] = useState<ColorItem[]>(difficultyList)
  const tooltipText = 'Выберите опцию на панели Как справился (-ась), чтобы отметить цветом кружок'
  const dispatch = useAppDispatch()
  const colorStyle = (color: string) => {
    return {
      backgroundColor: color,
    }
  }

  useEffect(() => {
    difficultyList.forEach(item => {
      const { checked, color } = item
      if (checked) {
        dispatch(addColorDifficulty(color))
      }
    })
  }, [])
  const setColorDifficulty = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    dispatch(addColorDifficulty(target.value))
    difficultyList.forEach(item => {
      item.checked = false
      if (item.color === target.value) {
        item.checked = target.checked
      }
    })
    setList([...difficultyList])
  }

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
    )
  })

  return (
    <Box component="div" sx={{ bgcolor: 'background.default' }} className="difficulty">
      <h3 className="difficulty__title">Как справился (-ась):</h3>
      <fieldset className="difficulty-list">{difficultyListItems}</fieldset>
      <Tooltip title={tooltipText}>
        <IconButton
          sx={{
            color: 'modeIcon.secondary',
          }}>
          <HelpIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default DifficultyList
