import {
    combineReducers,
    compose,
    legacy_createStore as createStore,
  } from 'redux'
  import { appReducer } from './reducers/app.reducer.js'
  
  const rootReducer = combineReducers({
    appModule: appReducer,
  })
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  
  export const store = createStore(rootReducer, composeEnhancers())
  
  window.gStore = store
  