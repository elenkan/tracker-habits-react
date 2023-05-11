import Box from '@mui/material/Box';
import './create-habbit-form.scss';
import {useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/stateHooks';
import {addChangeableHabit, addHabit, changeHabitList} from '../../actions/actions';
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
  const habitsList = useAppSelector(state => state.habitList);

  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const countDays = useRef(21);
  const setCountDays = (value: number) => {
    countDays.current = value
  };

  const defaultValues = {
    habitName: !!changeableHabit ? changeableHabit.name : '',
    habitDescription: !!changeableHabit ? changeableHabit.description : '',
    weekPeriod: 1
  }

  const methods = useForm<FormData>({defaultValues: defaultValues})
  const {handleSubmit, control, reset} = methods;

  const saveHabit = (data: FormData) => {
    const {habitName: name, habitDescription: description} = data;
    const habit = {
      name,
      description,
      id: changeableHabit ? changeableHabit.id : Math.random() * 2 * Math.random(),
      period: countDays.current
    };

    if (changeableHabit) {
      const list = habitsList.map(item => Object.assign({}, item));
      let listElement = list.find(item => item.id === changeableHabit.id) ?? {name: '', description: ''};
      // @ts-ignore
      listElement.name = habit.name
      // @ts-ignore
      listElement.description = habit.description

      dispatch(changeHabitList(list))
      dispatch(addChangeableHabit(null));
      navigate('/habits-list');
    } else {
      dispatch(addHabit(habit))
      reset({ habitName: '', habitDescription: ''})
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