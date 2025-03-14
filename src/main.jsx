import { createRoot } from 'react-dom/client'
import App from './components/App/App.jsx'
import './index.css'
import store from './services/store.js'
import { Provider } from 'react-redux'
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
)
