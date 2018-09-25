/*
 src/reducers/rootReducer.js
*/

import { combineReducers } from 'redux'
import { githubUsers } from './simpleReducer'

export default combineReducers({
  githubUsers
})
