import './loading-screen.scss'

const LoadingScreen = () => {
  const colors = ['#cc6699', '#08d9d6', '#66ff66']
  return (
    <div className="loading-screen" data-testid="loading-screen">
      <ul className="circles-list">
        {colors.map((item, index) => {
          return <li className="circles-list__item" key={index} style={{ backgroundColor: item }} />
        })}
      </ul>
    </div>
  )
}

export default LoadingScreen
