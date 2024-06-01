import type { ReactNode } from 'react'
import classNames from 'classnames'
import LoadingScreen from 'widgets/loading-screen'
import CongratulationsScreen from 'widgets/congratulations-screen'
import { useAppSelector } from 'shared/hooks/stateHooks'
import { isLoadingSelector, showCongratulationSelector } from './store/selectors'
import './page-layout.scss'

interface Props {
  children: ReactNode
  topMobileIndent?: boolean
  customClass?: string
}

export const PageLayout = ({ children, topMobileIndent, customClass }: Props) => {
  const isLoading = useAppSelector(isLoadingSelector)
  const showCongratulation = useAppSelector(showCongratulationSelector)

  const containerClass =
    customClass || classNames('container', { container_mobile: topMobileIndent })

  return (
    <div className={containerClass}>
      {children}
      {isLoading && <LoadingScreen />}
      {showCongratulation && <CongratulationsScreen />}
    </div>
  )
}
