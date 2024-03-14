import { useAppSelector } from 'hooks/stateHooks'
import { archiveHabitsListSelector } from 'selectors/selectors'
import { AppRouteList } from 'router/enums'
import PageLayout from 'shared/ui/page-layout/page-layout'
import ArchiveHabitsList from 'widgets/archive-habits-list/archive-habits-list'
import MessageScreen from 'shared/ui/message-screen'

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
