import { createRoot } from 'react-dom/client'
import App from './components/App/App.js'
import './index.css'
import store from './services/store'
import { Provider } from 'react-redux'
import {BrowserRouter} from "react-router-dom";

const root = document.getElementById('root');

if(root) {
    createRoot(root).render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
        ,
    )
}
