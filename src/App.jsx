import './assets/style/main.scss'
import { Provider } from 'react-redux'

import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { TaskBoardIndex } from './pages/TaskBoardIndex'
import { TaskDetails } from './pages/TaskDetails'
import { Header } from './cmp/Header'
import { store } from './store/store'
import { AddEditTask } from './pages/AddEditTask'

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route element={<TaskBoardIndex />} path="/" />
          <Route element={<TaskDetails />} path="/task/:taskId" />
          <Route element={<AddEditTask />} path="/task/edit/:taskId?" />

        </Routes>
      </Router>
    </Provider>
  )
}

