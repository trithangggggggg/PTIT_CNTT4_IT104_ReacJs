
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import stores from './store/stores.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={stores}>
    <App />
  </Provider>,
)
