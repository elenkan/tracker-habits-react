import { useAppSelector } from 'shared/hooks/stateHooks'
import { habitListSelector } from 'shared/store/selectors'
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
