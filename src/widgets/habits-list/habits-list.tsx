import type { Habit } from 'shared/types'
import HabitItem from './ui/habit-item'
import './habits-list.scss'

interface Props {
  list: Habit[]
}

const HabitsList = ({ list }: Props) => {
  const listItems = list.map(item => {
    return <HabitItem habit={item} key={item.id} />
  })

  return <ul className="habits-list">{listItems}</ul>
}

export default HabitsList
