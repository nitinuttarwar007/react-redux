/*
 src/reducers/rootReducer.js
*/

import { combineReducers } from 'redux'
import { githubUsers, usersAreLoading } from './simpleReducer'

export default combineReducers({
  githubUsers,
  usersAreLoading
})
