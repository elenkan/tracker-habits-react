import lists from '../../lists.json';
import './mood-list.scss';
import {useAppDispatch} from '../../hooks/stateHooks';
import {addColorMood} from '../../actions/actions';

const MoodList = () => {
    const list = lists.moodList;
    const dispatch = useAppDispatch();

    //заменить на useEffect ?
    const colorStyle = (color: string) => {
        return {
            backgroundColor: color
        }
    }
    const setColorMood = (color: string) => {
        dispatch(addColorMood(color))
    };

    const moodListItems = list.map(item => {
        return (
            <li className="mood-list__item" key={item.mood} onClick={() => setColorMood(item.color)}>
                <span className="mood-list__color" style={colorStyle(item.color)}></span>
                <span className="mood-list__mood">{item.mood}</span>
            </li>
        );
    });
    return (
        <div className="mood">
            <h3 className="mood__title">Настроение:</h3>
            <ul className="mood-list">
                {moodListItems}
            </ul>
        </div>);
};

export default MoodList;