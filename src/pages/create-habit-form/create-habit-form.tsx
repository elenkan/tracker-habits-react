import Box from '@mui/material/Box';
import './create-habbit-form.scss';
import {useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/stateHooks';
import {
  addChangeableHabit,
  addHabit,
  changeHabitList
} from '../../actions/actions';
import {useNavigate} from 'react-router-dom';
import FormToggleButton from '../../components/form-fields/form-toggle-button';
import FormTextField from '../../components/form-fields/form-text-field';
import {useForm} from 'react-hook-form';
import FormButton from '../../components/form-fields/form-button';
import {FormData} from '../../types';
import {cloneDeep} from 'lodash';

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
      period: countDays.current
    };

    if (changeableHabit) {
      const habitsList = cloneDeep(challengeHabitsList)
      const changeElement = habitsList.find(item => item.id === changeableHabit.id)
        if (changeElement) {
          for (let key in changeElement) {
            changeElement.name = habit.name as string;
            changeElement.description = habit.description as string;
          }
          dispatch(addChangeableHabit(null));
          dispatch(changeHabitList(habitsList))
          navigate('/habits-list');
        }
    } else {
      dispatch(addHabit(habit))
      reset({habitName: '', habitDescription: ''})
      // TODO: выставлять дефолтное значение 21
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 1, width: '25ch'},
        boxShadow: '0 1px 12px -4px #bababa',
        borderRadius: '10px',
        width: '400px'
      }}
      autoComplete="off"
      className="habit-form">
      <span className="habit-form__title">Создать новую привычку</span>
      <FormTextField fieldName="habitName" control={control}/>
      <FormTextField fieldName="habitDescription" control={control}/>
      <div className="habit-form__period">
        <span className="habit-form__subtitle">Выбрать период:</span>
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