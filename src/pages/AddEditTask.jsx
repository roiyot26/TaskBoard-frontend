import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TextField, Button } from '@mui/material'
import { getTaskById, createTask, updateTask } from '../services/task.service'
import { Loader } from '../assets/svg/Loader'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

export function AddEditTask() {
    const { taskId } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {t} = useTranslation()

    const { data: task, isLoading, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById(taskId),
        enabled: !!taskId,
    });

    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task])

    const createTaskMutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries('tasks'); // Refetch tasks list
            navigate('/'); // Navigate back to tasks list after creating
            toast.success('Task created successfully!')
        },
        onError: (error) => {
            toast.error('Error while creating task')
        },
    })
    const updateTaskMutation = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries(['task', taskId]); // Refetch the task details
            queryClient.invalidateQueries('tasks')
            navigate('/')
            toast.success('Task updated successfully!')
        },
        onError: (error) => {
            toast.error('Error while updating task')
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = { title, description, createdAt: Date.now() };

        if (taskId) {
            updateTaskMutation.mutate({ id: taskId, ...newTask });
        } else {
            createTaskMutation.mutate(newTask);
        }
    };


    if (isLoading) return <Loader />;
    if (error) return <p>Error loading task: {error.message}</p>;

    return (
        <>
            <div className='add-edit-task'>
                <form onSubmit={handleSubmit}>
                    <h1>{taskId ? t("edit" ) : t("addTask")}</h1>

                    <TextField
                        label={t("title")}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                        margin="normal"
                    />

                    <TextField
                        label={t("description")}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={2}
                    />

                    <Button type="submit" variant="contained" color="primary">
                        {taskId ? t("updateTask") : t("addTask")}
                    </Button>
                    <Button onClick={() => navigate(`/task/${taskId}`)} variant="contained" color="primary">{t("back")}</Button>
                    <Button onClick={() => navigate(`/`)} variant="contained" color="primary">{t("backToTasks")}</Button>
                </form>
            </div>
        </>
    );
}
