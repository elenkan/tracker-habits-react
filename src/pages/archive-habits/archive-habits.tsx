import { useAppSelector } from 'shared/hooks/stateHooks'
import { archiveHabitsListSelector } from 'shared/store/selectors'
import { AppRouteList } from 'app/router/enums'
import { PageLayout } from 'shared/ui'
import ArchiveHabitsList from 'widgets/archive-habits-list'
import MessageScreen from 'widgets/message-screen'

const ArchiveHabitsPage = () => {
  const archiveHabitsList = useAppSelector(archiveHabitsListSelector)

  return (
    <PageLayout>
      {archiveHabitsList.length ? (
        <ArchiveHabitsList list={archiveHabitsList} />
      ) : (
        <MessageScreen
          title="Кажется список завершенных привычек пуст..."
          buttonTitle="Зачекать привычку"
          buttonLink={AppRouteList.HabitsPage}
        />
      )}
    </PageLayout>
  )
}

export default ArchiveHabitsPage
