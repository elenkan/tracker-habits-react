import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useAppDispatch } from 'app/redux/hooks/stateHooks'
import { setShowCongratulation } from 'app/redux/actions/actions'
import 'features/congratulations-screen/congratulations-screen.scss'

const CongratulationsScreen = () => {
  const dispatch = useAppDispatch()
  const handleClickOpen = () => {
    dispatch(setShowCongratulation(false))
  }

  return (
    <div
      className="congratulations-screen"
      onClick={handleClickOpen}
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
