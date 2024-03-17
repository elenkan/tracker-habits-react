import { useAppSelector } from 'app/redux/hooks/stateHooks'
import { habitListSelector } from 'app/redux/selectors/selectors'
import PageLayout from 'shared/ui/page-layout/page-layout'
import ProgressList from 'widgets/progress-list/progress-list'
import MessageScreen from 'shared/ui/message-screen'

const ProgressPage = () => {
  const progressData = useAppSelector(habitListSelector)

  return (
    <PageLayout>
      {progressData?.length ? <ProgressList progressData={progressData} /> : <MessageScreen />}
    </PageLayout>
  )
}

export default ProgressPage
