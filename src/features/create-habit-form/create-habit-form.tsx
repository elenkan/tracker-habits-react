import { useAppDispatch, useAppSelector } from 'shared/hooks/stateHooks'
import { changeableHabitSelector } from './store/selectors'
import { useRef } from 'react'
import { addChangeableHabit } from 'shared/store/actions'
import { addHabit, updateHabit } from 'shared/store/thunks/habit'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { FormToggleButton, FormTextField, FormButton, BaseButton } from 'shared/ui'
import { useForm } from 'react-hook-form'
import type { FormData, Habit } from 'shared/types'
import { AppRouteList } from 'app/router/enums'
import { toggleButtonData } from './model/toggleButtonData'
import { createDaysList } from './lib/createDaysList'
import './create-habbit-form.scss'

const CreateHabitForm = () => {
  const DEFAULT_COUNT_DAYS = 21
  const changeableHabit = useAppSelector(changeableHabitSelector)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const countDays = useRef(DEFAULT_COUNT_DAYS)
  const setCountDays = (value: number) => {
    countDays.current = value
  }

  const defaultValues = {
    habitName: changeableHabit?.name || '',
    habitDescription: changeableHabit?.description || '',
    period: changeableHabit?.period || DEFAULT_COUNT_DAYS,
  }

  const { handleSubmit, control, reset } = useForm<FormData>({ defaultValues })

  const saveHabit = (data: FormData) => {
    const { habitName: name = '', habitDescription: description = '' } = data

    const habit: Habit = {
      name,
      description,
      id: `k${(~~(Math.random() * 1e8)).toString(16)}`,
      period: countDays.current,
      colorsValue: [],
      completedDays: 0,
      completionPercent: 0,
      checkedDays: createDaysList(countDays.current),
    }

    if (changeableHabit) {
      dispatch(updateHabit({ ...changeableHabit, ...{ name, description } }))
      dispatch(addChangeableHabit(null))
      navigate('/habits-list')
    } else {
      dispatch(addHabit(habit))
      reset({ habitName: '', habitDescription: '' })
    }
  }

  const handleCancel = () => {
    dispatch(addChangeableHabit(null))
    navigate(AppRouteList.HabitsPage)
  }

  return (
    <Box
      component="form"
      sx={{
        bgcolor: 'background.default',
      }}
      autoComplete="off"
      className="habit-form">
      <Typography
        component="span"
        color="text.primary"
        sx={{
          fontSize: '18px',
          lineHeight: '18px',
          marginBottom: '20px',
          '@media (max-width: 600px)': {
            fontSize: '16px',
            lineHeight: '16px',
          },
        }}>
        Создать новую привычку
      </Typography>
      <FormTextField fieldName="habitName" control={control} />
      <FormTextField fieldName="habitDescription" control={control} />
      <div className="habit-form__action">
        {!changeableHabit && (
          <>
            <Typography
              component="span"
              color="text.primary"
              sx={{
                fontSize: '16px',
                lineHeight: '16px',
                marginBottom: '15px',
              }}>
              Выбрать период:
            </Typography>
            <FormToggleButton
              groupData={toggleButtonData}
              action={setCountDays}
              defaultValue={defaultValues.period}
              styleData={{
                marginBottom: '20px',
              }}
            />
          </>
        )}
        <FormButton buttonWidth="200px" buttonTitle="Сохранить" action={handleSubmit(saveHabit)} />
        {changeableHabit && (
          <BaseButton
            buttonWidth="200px"
            buttonTitle="Отменить"
            action={handleCancel}
            style={{ marginTop: '15px' }}
          />
        )}
      </div>
    </Box>
  )
}

export default CreateHabitForm
