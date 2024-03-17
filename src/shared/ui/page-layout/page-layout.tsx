import type { ReactNode } from 'react'
import classNames from 'classnames'
import './page-layout.scss'

interface PropsType {
  children: ReactNode
  topMobileIndent?: boolean
}

const PageLayout = ({ children, topMobileIndent }: PropsType) => {
  const containerClass = classNames('container', { container_mobile: topMobileIndent })
  return <div className={containerClass}>{children}</div>
}

export default PageLayout
