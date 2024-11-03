import { useNavigate } from "react-router-dom"
export function TaskPreview({ task, deleteTask }) {
    const navigate = useNavigate()

    function getPriorityClass(priority) {
        if (priority >= 0 && priority <= 0.4) {
            return 'low'
        } else if (priority > 0.4 && priority <= 0.7) {
            return "medium"
        } else if (priority > 0.7 && priority <= 1) {
            return "high"
        } else {
            throw new Error("Priority must be between 0 and 1");
        }
    }

    return (
        <div className={`task-preview ${getPriorityClass(task.priority)}`} onClick={() => navigate(`/task/${task._id}`)} >
            <li >
                <h2>{task.title}</h2>
                <p className="task-preview-description">{task.description}</p>
                <p className="task-preview-prioriy">Priority: {task.priority}</p>
                <div className="button-group">
                    <button onClick={(ev) => deleteTask(ev, task._id)} >Delete</button>
                    <button onClick={(ev) => {
                        ev.stopPropagation()
                        navigate(`/task/edit/${task._id}`)
                    }}>Edit</button>
                </div>
            </li>
        </div>
    )
}
