const defaultState = {
  count: 0
}

const reducer = (state, action) => {
  if (!state) state = defaultState
  
  switch (action.type) {
    case 'add':
      return {
        ...state,
        count: state.count + 1
      }
  
    default:
      return state
  }
}

export default reducer