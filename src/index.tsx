import React from 'react'
import { createRoot } from 'react-dom/client'
import App from 'components/app/app'
import { Provider } from 'react-redux'
import { store } from 'store'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { ToastContainer } from 'react-toastify'
import 'index.scss'

const domNode = document.getElementById('root')
const root = createRoot(domNode as HTMLElement)

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
export const auth = getAuth(app)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer className="toast" />
    </Provider>
  </React.StrictMode>
)
