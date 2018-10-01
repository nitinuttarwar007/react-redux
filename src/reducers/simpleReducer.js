
export function usersAreLoading(state = false, action) {
  switch (action.type) {
      case 'USERS_ARE_LOADING':
          return action.isLoading;

      default:
          return state;
  }
}

export function githubUsers(state = {}, action) {
  switch (action.type) {
    case 'FETCH_USERS':
      return action.payload

    default:
      return state
  }
}

export function UserRepos(state = {}, action) {
  switch (action.type) {
    case 'FETCH_REPOS':
      return action.payload

    default:
      return state
  }
}