import Box from '@mui/material/Box';
import './create-habbit-form.scss';
import {useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/stateHooks';
import {
  addChangeableHabit,
  changeHabitList
} from '../../actions/actions';
import {useNavigate} from 'react-router-dom';
import FormToggleButton from '../../components/form-fields/form-toggle-button';
import FormTextField from '../../components/form-fields/form-text-field';
import {useForm} from 'react-hook-form';
import FormButton from '../../components/form-fields/form-button';
import {FormData, Habit} from '../../types';
import {cloneDeep} from 'lodash';
import {Typography} from '@mui/material';
import {addHabit, updateHabit} from '../../actions/api-actions';

const CreateHabitForm = () => {
  const buttonData = [
    {
      label: '21 день',
      toggleValue: 21
    },
    {
      label: '30 дней',
      toggleValue: 30
    }
  ];

  const changeableHabit = useAppSelector(state => state.changeableHabit);
  const challengeHabitsList = useAppSelector(state => state.challengeHabitsList);

  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const countDays = useRef(21);
  const setCountDays = (value: number) => {
    countDays.current = value
  };

  const createDaysList = (period: number) => {
    const list = new Array(period).fill({color: ''});
    const daysArray = list.map(item => Object.assign({}, item));
    daysArray.forEach(item => {
      item.id = Math.random() * list.length;
    });
    return daysArray;
  };

  useEffect(() => {
    if (!changeableHabit) {
      reset({habitName: '', habitDescription: ''})
      countDays.current = 21
    }
  }, [])

  const defaultValues = {
    habitName: changeableHabit?.name || '',
    habitDescription: changeableHabit?.description || '',
    period: changeableHabit?.period || 21
  }

  const methods = useForm<FormData>({defaultValues: defaultValues})
  const {handleSubmit, control, reset} = methods;

  const saveHabit = (data: FormData) => {
    const {habitName: name, habitDescription: description} = data;

    const habit = {
      name,
      description,
      // TODO: заменить id
      id: changeableHabit ? changeableHabit.id : Math.random() * 2 * Math.random(),
      period: countDays.current,
      colorsValue: [],
      completedDays: 0,
      value: 0,
      checkedDays: createDaysList(countDays.current)
    };

    const habitsList = cloneDeep(challengeHabitsList)

    if (changeableHabit) {
      const changeElement = habitsList.find(item => item.id === changeableHabit.id)
      if (changeElement) {
        for (let key in changeElement) {
          changeElement.name = habit.name as string;
          changeElement.description = habit.description as string;
        }
        dispatch(addChangeableHabit(null));
        dispatch(updateHabit(changeElement))
        navigate('/habits-list');
      }
    } else {
      dispatch(addHabit(habit as Habit))
      reset({habitName: '', habitDescription: ''})
      // TODO: выставлять дефолтное значение 21
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 1, width: '25ch'},
        bgcolor: 'background.default'
      }}
      autoComplete="off"
      className="habit-form">
      <Typography
        component="span"
        color="text.primary"
        sx={{
          fontSize: '18px',
          lineHeight: '18px',
          marginBottom: '20px'
        }}>
        Создать новую привычку
      </Typography>
      <FormTextField fieldName="habitName" control={control}/>
      <FormTextField fieldName="habitDescription" control={control}/>
      <div className="habit-form__period">
        <Typography
          component="span"
          color="text.primary"
          sx={{
            fontSize: '16px',
            lineHeight: '16px',
            marginBottom: '15px'
          }}>
          Выбрать период:
        </Typography>
        <FormToggleButton
          groupData={buttonData}
          action={setCountDays}
          defaultValue={defaultValues.period}
          styleData={{
            'marginBottom': '20px'
          }}
        />
        <FormButton
          buttonWidth="200px"
          buttonTitle="Сохранить"
          action={handleSubmit(saveHabit)}
        />
      </div>
    </Box>
  );
};

export default CreateHabitForm;