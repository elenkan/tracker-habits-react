import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { useState } from 'react'
import type { MouseEvent } from 'react'

interface Props {
  groupData: Array<{
    label: string
    toggleValue: number | string
  }>
  action: (value: number) => void
  defaultValue?: number
  color?: 'secondary' | 'primary'
  styleData?: object
}

export const FormToggleButton = ({
  groupData,
  action,
  defaultValue,
  color,
  styleData = {},
}: Props) => {
  const [value, setValue] = useState<number>(defaultValue ?? 21)

  const onChangeValue = (event: MouseEvent, value: any) => {
    if (value === null) return
    setValue(value)
    action(Number(value))
  }

  return (
    <ToggleButtonGroup
      color={color ?? 'primary'}
      exclusive
      value={value}
      onChange={onChangeValue}
      sx={styleData}>
      {groupData.map(item => (
        <ToggleButton
          key={item.toggleValue}
          value={item.toggleValue}
          sx={{
            border: 'none',
            color: 'text.primary',
          }}>
          {item.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
