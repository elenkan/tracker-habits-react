import MuiThemeProvider from './providers/mui-theme-provider/mui-theme-provider'
import AuthProvider from 'app/providers/auth-provider/auth-provider'
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
