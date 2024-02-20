import {HashRouter, Routes, Route} from 'react-router-dom';
import {AppRouteList} from './enums';
import PrivateRoute from './private-route';
import HomePage from 'pages/home-page';
import CreateHabitForm from 'pages/create-habit-form';
import HabitsList from 'pages/habits-list';
import ArchiveHabitsList from 'pages/archive-habits';
import ProgressList from 'pages/progress-list';
import SettingPage from 'pages/settings-page/setting-page';
import NotFoundPage from 'pages/not-found-page';
import Header from 'components/header';

const AppRouter = () => {
  const isAuth = localStorage.getItem('checkAuth');
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path={AppRouteList.Home} element={<HomePage />} />
        <Route
          path={AppRouteList.CreateHabitPage}
          element={
            <PrivateRoute isAuth={isAuth}>
              <CreateHabitForm />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRouteList.HabitsPage}
          element={
            <PrivateRoute isAuth={isAuth}>
              <HabitsList />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRouteList.ArchiveHabits}
          element={
            <PrivateRoute isAuth={isAuth}>
              <ArchiveHabitsList />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRouteList.ProgressPage}
          element={
            <PrivateRoute isAuth={isAuth}>
              <ProgressList />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRouteList.SettingsPage}
          element={
            <PrivateRoute isAuth={isAuth}>
              <SettingPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRouteList.NotFoundPage} element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
