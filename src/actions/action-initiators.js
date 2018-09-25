
/*
 src/actions/action-initiators.js
*/

import axios from 'axios';

export const simpleAction = (items) => dispatch => {
  dispatch({
    type: 'SIMPLE_ACTION',
    payload: items
  })
}

export function itemsFetchData() {
  let url = 'https://api.github.com/search/repositories?q=stars:>1+language:javascript&sort=stars&order=desc&type=Repositories'
  
  return (dispatch) => {
      axios.get(url)
          .then((response) => {
              if (response.status !== 200) {
                  throw Error(response.statusText);
              }
              return response;
          })
          .then((response) => dispatch(simpleAction(response.data.items)))
  };
}
