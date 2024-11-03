// reducers/app.reducer.js
export const SET_FILTER_BY = 'SET_FILTER_BY';

const initialState = {
  filterBy: {
    title: '',
    priority: '',
    sortBy: 'title',
    isAscending: true,
    page: 1, // default page
    limit: 5, // default limit
  },
};

export function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_FILTER_BY:
      return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } };
    default:
      return state;
  }
}
