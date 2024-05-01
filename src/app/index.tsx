import MuiThemeProvider from './providers/mui-theme-provider'
import AuthProvider from './providers/auth-provider'
import AppRouter from './providers/router-provider'

const App = () => {
  return (
    <MuiThemeProvider>
      <AuthProvider>
        <div className="content" data-testid="content">
          <AppRouter />
        </div>
      </AuthProvider>
    </MuiThemeProvider>
  )
}

export default App
