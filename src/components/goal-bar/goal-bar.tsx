import {ProgressItem} from '../../types';
import CircularProgress from '@mui/material/CircularProgress';
import {Typography, Box} from '@mui/material';
import './goal-bar.scss'

type PropsType = {
    progressValue: ProgressItem
}

const GoalBar = ({progressValue}: PropsType) => {

    const CircularProgressWithLabel = (value: number) => {
        return (
            <Box sx={{position: 'relative', display: 'inline-flex'}}>
                <CircularProgress variant="determinate" value={value}/>
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Typography variant="caption" component="div" color="text.secondary">
                        {`${Math.round(value)}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <div className="goal-bar">
            <div className="goal-bar__circle">
                <h3 className="goal-bar__title">Прогресс выполнения</h3>
                {CircularProgressWithLabel(progressValue.value)}
            </div>
            <div className="goal-bar__days">
                Завершено дней <span>{progressValue.completedDays}</span>{` / ${progressValue.period}`}
            </div>
        </div>)
};

export default GoalBar;