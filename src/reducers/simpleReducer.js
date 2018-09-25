export function githubUsers(state = {}, action) {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      return action.payload

    default:
      return state
  }
}
