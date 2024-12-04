import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Components/App/App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import { store } from './Components/Redux/Store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
