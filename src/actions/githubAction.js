
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

export function GithubUsersData() {
  let url = 'https://api.github.com/search/repositories?q=stars:>1+language:javascript&sort=stars&order=desc&type=Repositories'
  
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
          .then((response) => dispatch(fetchGithubUsers(response.data.items)))
  };
}
