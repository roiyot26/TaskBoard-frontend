import { useNavigate } from "react-router-dom"
export function TaskPreview({ task, deleteTask }) {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/task/${task._id}`)} >
            <li >
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>Priority: {task.priority}</p>
                <button onClick={(ev) => deleteTask(ev, task._id)} >Delete</button>
                <button onClick={(ev) => {
                    ev.stopPropagation()
                    navigate(`/task/edit/${task._id}`)
                }}>Edit</button>
            </li>
        </div>
    )
}
