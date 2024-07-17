export function todoReducers(state, action) {
  switch (action.type) {
    case "TODO_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "TODO_SUCCESS":
      return {
        ...state,
        loading: false,
        todos: action.payload,
        error: "",
      };
    case "TODO_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  }
}
