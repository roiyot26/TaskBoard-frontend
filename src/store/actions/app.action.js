import {SET_FILTER_BY} from '../reducers/app.reducer'
import { store } from '../store'

export function setFilter(filterBy = toyService.getDefaultFilter()) {
  store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}
