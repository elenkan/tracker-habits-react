import Box from '@mui/material/Box';
import './create-habbit-form.scss';
import {useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/stateHooks';
import {
  addCalendarHabit,
  addChangeableHabit,
  addHabit,
  changeCalendarHabitList,
  changeHabitList
} from '../../actions/actions';
import {useNavigate} from 'react-router-dom';
import FormToggleButton from '../../components/form-fields/form-toggle-button';
import FormTextField from '../../components/form-fields/form-text-field';
import {useForm} from 'react-hook-form';
import FormButton from '../../components/form-fields/form-button';
import {FormData} from '../../types';
import FormNumberField from '../../components/form-fields/form-number-field';

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
  const modeType = useAppSelector(state => state.mode);
  const challengeHabitsList = useAppSelector(state => state.challengeHabitsList);
  const calendarHabitsList = useAppSelector(state => state.calendarHabitsList);

  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const countDays = useRef(21);
  const setCountDays = (value: number) => {
    countDays.current = value
  };

  useEffect(() => {
    reset({habitName: '', habitDescription: '', weekPeriod: 1})
    if (modeType === 'challenge') {
      countDays.current = 21
    }
  }, [modeType])

  const defaultValues = {
    habitName: !!changeableHabit ? changeableHabit.name : '',
    habitDescription: !!changeableHabit ? changeableHabit.description : '',
    weekPeriod: !!changeableHabit && changeableHabit.weekPeriod ? changeableHabit.weekPeriod : 1
  }

  const methods = useForm<FormData>({defaultValues: defaultValues})
  const {handleSubmit, control, reset} = methods;

  const saveHabit = (data: FormData) => {
    const {habitName: name, habitDescription: description, weekPeriod} = data;

    const habit = {
      name,
      description,
      // TODO: заменить id
      id: changeableHabit ? changeableHabit.id : Math.random() * 2 * Math.random(),
      period: countDays.current,
      weekPeriod
    };

    if (changeableHabit) {
      const changeElement = modeType === 'challenge'
        ? challengeHabitsList.find(item => item.id === changeableHabit.id)
        : calendarHabitsList.find(item => item.id === changeableHabit.id);
        if (changeElement) {
          for (let key in changeElement) {
            changeElement.name = habit.name as string;
            changeElement.description = habit.description as string;
            changeElement.period = habit.period;
            changeElement.weekPeriod = habit.weekPeriod as number;
          }
          dispatch(addChangeableHabit(null));
          modeType === 'challenge' ? dispatch(changeHabitList(challengeHabitsList)) : dispatch(changeCalendarHabitList(calendarHabitsList))
          navigate('/habits-list');
        }
    } else {
      modeType === 'challenge' ? dispatch(addHabit(habit)) : dispatch(addCalendarHabit(habit))
      reset({habitName: '', habitDescription: '', weekPeriod: 1})
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
        <span className="habit-form__subtitle">{modeType === 'challenge' ? 'Выбрать период:' : 'Цель:'}</span>
        {
          modeType === 'challenge'
            ? <FormToggleButton
              groupData={buttonData}
              action={setCountDays}
              defaultValue={21}
              styleData={{
                'marginBottom': '20px'
              }}
            />
            :
            <div
              className="habit-form__target-wrapper">
              <FormNumberField
                fieldName="weekPeriod"
                control={control}
                minValue={1}
                maxValue={7}
                fieldWidth="100px"
              />
              <span>раз в неделю</span>
            </div>

        }
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