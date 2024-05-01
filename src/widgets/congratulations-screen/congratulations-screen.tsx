import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useAppDispatch } from 'shared/hooks/stateHooks'
import { setShowCongratulation } from 'shared/store/actions'
import './congratulations-screen.scss'

const CongratulationsScreen = () => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(setShowCongratulation(false))
  }

  return (
    <div
      className="congratulations-screen"
      onClick={handleClick}
      data-testid="congratulations-screen">
      <Box component="div" className="congratulations-screen__content">
        {['Поздравляем!', 'Челлендж завершен :)'].map(text => (
          <Typography key={text} component="span" color="text.primary">
            {text}
          </Typography>
        ))}
      </Box>
    </div>
  )
}

export default CongratulationsScreen
