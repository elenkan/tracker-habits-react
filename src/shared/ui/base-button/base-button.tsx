import type { CSSProperties } from 'react'
import { Button } from '@mui/material'

interface Props {
  buttonWidth: string
  buttonTitle: string
  action: () => void
  style?: CSSProperties
}

export const BaseButton = ({ buttonWidth, buttonTitle, action, style }: Props) => {
  return (
    <Button
      variant="outlined"
      sx={{
        color: 'primary.main',
        width: buttonWidth,
        '@media (max-width: 600px)': {
          fontSize: '13px',
        },
        ...style,
      }}
      onClick={action}>
      {buttonTitle}
    </Button>
  )
}
