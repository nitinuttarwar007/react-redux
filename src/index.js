import React from 'react'
import ReactDOM from 'react-dom'
/* Provide Store
Providing redux store access to react applycation through provider
*/
import { Provider } from 'react-redux'
import configureStore from './store'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
