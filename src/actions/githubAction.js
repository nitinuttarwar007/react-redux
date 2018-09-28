
/*
 src/actions/githubAction.js
*/

import axios from 'axios';

export function usersAreLoading(bool) {
  return {
      type: 'USERS_ARE_LOADING',
      isLoading: bool
  };
}

export function fetchGithubUsers(items) {
  return {
    type: 'FETCH_USERS',
    payload: items
  };
}

export function fetchUsersRepos(repos) {
  return {
    type: 'FETCH_REPOS',
    payload: repos
  }
}

export function GithubUsersData(value, pageNo) {

  let url = 'https://api.github.com/search/users?q='+ value+'&per_page=30'+'&page='+pageNo

  return (dispatch) => {
      dispatch(usersAreLoading(true));

      axios.get(url)
          .then((response) => {
              if (response.status !== 200) {
                  throw Error(response.statusText);
              }
              dispatch(usersAreLoading(false));
              return response;
          })
          .then((response) => dispatch(fetchGithubUsers(response.data)))
  };
}

export function githubUsersRepos(repo_url) {
  let url = repo_url

  return (dispatch) => {
      dispatch(usersAreLoading(true));

      axios.get(url)
          .then((response) => {
              if (response.status !== 200) {
                  throw Error(response.statusText);
              }
              dispatch(usersAreLoading(false));
              return response;
          })
          .then((response) => dispatch(fetchUsersRepos(response.data)))
  };
}