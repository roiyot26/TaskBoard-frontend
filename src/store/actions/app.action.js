import { SET_FILTER_BY } from '../reducers/app.reducer'

export function setFilter(filterBy) {
  return {
    type: SET_FILTER_BY,
    filterBy,
  }
}



