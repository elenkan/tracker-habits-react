import {AppRouteList} from '../enums';
import {Navigate} from 'react-router-dom';

type PropsType = {
  isAuth: string | null,
  children: JSX.Element
}

const PrivateRoute = ({isAuth, children}: PropsType) => isAuth === 'true' ? children : <Navigate to={AppRouteList.Home}/>;

export default PrivateRoute;
