import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AppRouteList} from './enums';
import HomePage from '../pages/home-page';
import CreateHabitForm from '../pages/create-habit-form';
import HabitsList from '../pages/habits-list';
import ProgressList from '../pages/progress-list';
import SettingPage from '../pages/settings-page/setting-page';
import Header from '../components/header';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={AppRouteList.Home} element={<HomePage/>}/>
                <Route path={AppRouteList.CreateHabitPage} element={<CreateHabitForm/>}/>
                <Route path={AppRouteList.HabitsPage} element={<HabitsList/>}/>
                <Route path={AppRouteList.ProgressPage} element={<ProgressList/>}/>
                <Route path={AppRouteList.SettingsPage} element={<SettingPage/>}/>
            </Routes>
        </BrowserRouter>);
};

export default AppRouter;
