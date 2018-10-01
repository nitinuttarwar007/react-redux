/*
 src/reducers/rootReducer.js
*/

import { combineReducers } from 'redux'
import { githubUsers, UserRepos, usersAreLoading } from './simpleReducer'

export default combineReducers({
  githubUsers,
  UserRepos,
  usersAreLoading
})
