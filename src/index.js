import React from 'react'
import ReactDOM from 'react-dom'
/* Provide Store
Providing redux store access to react applycation through provider
*/
import { Provider } from 'react-redux'
import configureStore from './store'
import Main from './components/main';
import registerServiceWorker from './registerServiceWorker'

import '../node_modules/antd/dist/antd.css';
import './index.css'

ReactDOM.render(
  <Provider store={configureStore()}>
    <Main />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
