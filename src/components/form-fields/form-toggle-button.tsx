import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {useState} from 'react';
import {MouseEvent} from 'react';

type PropsType = {
  groupData: {
    label: string,
    toggleValue: number | string
  }[],
  action?: (value: number) => void,
  actionStringValue?: (value: string) => void,
  defaultValue?: number | string,
  color?: 'secondary' | 'primary',
  styleData?: object
}

const FormToggleButton = ({groupData, action, actionStringValue, defaultValue, color, styleData = {}}: PropsType) => {
  const [value, setValue] = useState<number | string | null>(defaultValue ? defaultValue : null)

  const handleValue = (
    event: MouseEvent,
    value: any,
  ) => {
    setValue(value)
    if (action) {
      action(value);
    } else if (actionStringValue) {
      actionStringValue(value);
    }

  };

  return (
    <ToggleButtonGroup
      color={color ? color : "primary"}
      exclusive
      value={value}
      onChange={handleValue}
      sx={styleData}
    >
      {
        groupData.map(item =>(
          <ToggleButton
            key={item.toggleValue}
            value={item.toggleValue}
            sx={{
              border: 'none',
              color: '#272727'
            }}
          >
            {item.label}
          </ToggleButton>
        ))
      }
    </ToggleButtonGroup>
  );
}

export default FormToggleButton;