import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import store from './redux/store.ts'
import { Provider } from 'react-redux'

import './i18n/i18n.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
)
