import type { ReactNode } from 'react'
import './page-layout.scss'

interface PropsType {
  children: ReactNode
}

const PageLayout = ({ children }: PropsType) => {
  return <div className="container">{children}</div>
}

export default PageLayout
