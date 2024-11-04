import './assets/style/main.scss'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Header } from './cmp/Header'
import { AddEditTask } from './pages/AddEditTask'
import { TaskBoardIndex } from './pages/TaskBoardIndex'
import { TaskDetails } from './pages/TaskDetails'

export function App() {


  return (
    <>
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
    </>
  )
}

