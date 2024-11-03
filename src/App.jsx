import './assets/style/main.scss'
import { Provider } from 'react-redux'

import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { TaskBoardIndex } from './pages/TaskBoardIndex'
import { TaskDetails } from './pages/TaskDetails'
import { Header } from './cmp/Header'
import { store } from './store/store'
import { AddEditTask } from './pages/AddEditTask'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export function App() {

  return (
    <Provider store={store}>
        <ToastContainer
        position="bottom-right"
        autoClose={1500}
        closeButton={false}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        pauseOnHover={false}
        toastClassName='toast-override'
        />
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

