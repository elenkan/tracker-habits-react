import { AppRouteList } from '../enums'
import { Navigate } from 'react-router-dom'

interface Props {
  isAuth: boolean | null
  children: JSX.Element
}

const PrivateRoute = ({ isAuth, children }: Props) =>
  isAuth ? children : <Navigate to={AppRouteList.Home} />

export default PrivateRoute
