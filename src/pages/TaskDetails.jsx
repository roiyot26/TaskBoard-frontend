
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTaskById } from '../services/task.service';
import { Loader } from '../assets/svg/Loader';

export function TaskDetails(){
    const {taskId} = useParams();
    const navigate = useNavigate() 
    const { data: task, isLoading, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById(taskId),
        enabled: !!taskId, // Only run the query if id is available
    });

    if (isLoading) return <Loader/>;
    if (error) return <p>Error loading task: {error.message}</p>;
    if (!task) return <p>No task found.</p>
    return (
        <div>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
            <button onClick={()=>navigate(`/task/edit/${taskId}`)}>Edit Task</button>
        </div>
    );
};


