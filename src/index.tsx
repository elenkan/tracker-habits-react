import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from 'shared/store'
import App from 'app'
import { ToastContainer } from 'react-toastify'
import 'index.scss'

const domNode = document.getElementById('root') as HTMLElement
const root = createRoot(domNode)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer className="toast" />
    </Provider>
  </React.StrictMode>
)
