import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppRouteList } from './enums'
import PrivateRoute from './private-route'
import HomePage from 'pages/home-page'
import CreateHabitPage from 'pages/create-habit'
import CheckHabit from 'pages/check-habit'
import ArchiveHabitsPage from 'pages/archive-habits'
import ProgressPage from 'pages/progress-page'
import SettingPage from 'pages/settings-page/setting-page'
import NotFoundPage from 'pages/not-found-page'
import Header from 'widgets/header'

const AppRouter = () => {
  const isAuth = localStorage.getItem('checkAuth')

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={AppRouteList.Home} element={<HomePage />} />
        <Route
          path={AppRouteList.CreateHabitPage}
          element={
            <PrivateRoute isAuth={isAuth}>
              <CreateHabitPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRouteList.HabitsPage}
          element={
            <PrivateRoute isAuth={isAuth}>
              <CheckHabit />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRouteList.ArchiveHabits}
          element={
            <PrivateRoute isAuth={isAuth}>
              <ArchiveHabitsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRouteList.ProgressPage}
          element={
            <PrivateRoute isAuth={isAuth}>
              <ProgressPage />
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
    </BrowserRouter>
  )
}

export default AppRouter
