import { useNavigate } from "react-router-dom"
export function TaskPreview({ task,deleteTask }) {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/task/${task.id}`)} >
            <li >
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>Priority: {task.priority}</p>
                <button onClick={(ev)=>deleteTask(ev,task.id)} >Delete</button>
                <button >Update</button>
            </li>
        </div>
    )
}
