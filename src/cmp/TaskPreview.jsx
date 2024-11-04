import { useNavigate } from "react-router-dom"
import { utilService } from "../services/util.service"
import { useTranslation } from "react-i18next"
export function TaskPreview({ task, deleteTask }) {
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <div className={`task-preview ${utilService.getPriorityClass(task.priority)}`} onClick={() => navigate(`/task/${task._id}`)} >
            <li >
                <h2>{task.title}</h2>
                <p className="task-preview-description">{task.description}</p>
                <p className="task-preview-prioriy">{t("priority")}: {task.priority}</p>
                <div className="button-group">
                    <button onClick={(ev) => deleteTask(ev, task._id)} >{t("deleteLow")}</button>
                    <button onClick={(ev) => {
                        ev.stopPropagation()
                        navigate(`/task/edit/${task._id}`)
                    }}>{t("editLow")}</button>
                </div>
            </li>
        </div>
    )
}
