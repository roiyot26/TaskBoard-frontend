
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTaskById } from '../services/task.service';
import { Loader } from '../assets/svg/Loader';
import { SpaceSvg } from '../assets/svg/SpaceSvg';
import { utilService } from "../services/util.service"
import { useTranslation } from 'react-i18next'

export function TaskDetails() {
    const { taskId } = useParams();
    const navigate = useNavigate()
    const {t} = useTranslation()
    const { data: task, isLoading, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById(taskId),
        enabled: !!taskId, // Only run the query if id is available
    });

    if (isLoading) return <Loader />;
    if (error) return <p>Error loading task: {error.message}</p>;
    if (!task) return <SpaceSvg isNoResults={true} />
    return (
        <>
            <div className={`task-details ${utilService.getPriorityClass(task.priority)}`}>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
                <p>{t("priority")}: {task.priority}</p>
                <p>{t("createdAt")}: {new Date(task.createdAt).toLocaleString()}</p>
                <div className='button-group'>
                    <button onClick={() => navigate(`/task/edit/${taskId}`)}>{t("editLow")}</button>
                    <button onClick={() => navigate(`/`)}>{t("back")}</button>
                </div>
            </div>
            <SpaceSvg isNoResults={false} />
        </>
    );
};


