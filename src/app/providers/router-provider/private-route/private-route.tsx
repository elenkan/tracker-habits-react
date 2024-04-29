import { AppRouteList } from '../enums'
import { Navigate } from 'react-router-dom'

interface PropsType {
  isAuth: boolean | null
  children: JSX.Element
}

const PrivateRoute = ({ isAuth, children }: PropsType) =>
  isAuth ? children : <Navigate to={AppRouteList.Home} />

export default PrivateRoute
