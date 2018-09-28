/*
 src/reducers/rootReducer.js
*/

import { combineReducers } from 'redux'
import { githubUsers, githubUserRepos, usersAreLoading } from './simpleReducer'

export default combineReducers({
  githubUsers,
  githubUserRepos,
  usersAreLoading
})
