import 'features/loading-screen/loading-screen.scss'

const LoadingScreen = () => {
  const colors = ['#cc6699', '#08d9d6', '#66ff66']
  return (
    <div className="loading-screen" data-testid="loading-screen">
      <ul>
        {colors.map((item, index) => {
          return <li key={index} style={{ backgroundColor: item }}></li>
        })}
      </ul>
    </div>
  )
}

export default LoadingScreen
