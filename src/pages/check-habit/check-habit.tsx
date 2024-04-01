import { useAppSelector } from 'shared/hooks/stateHooks'
import { habitListSelector } from 'shared/store/selectors'
import { PageLayout } from 'shared/ui'
import DifficultyList from 'widgets/difficulty-list'
import HabitsList from 'widgets/habits-list'
import MessageScreen from 'widgets/message-screen'

const CheckHabit = () => {
  const habitList = useAppSelector(habitListSelector)

  return (
    <PageLayout topMobileIndent={true}>
      {habitList.length ? (
        <>
          <DifficultyList />
          <HabitsList list={habitList} />
        </>
      ) : (
        <MessageScreen />
      )}
    </PageLayout>
  )
}

export default CheckHabit
