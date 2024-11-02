import { TaskList } from "../cmp/TaskList"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTasks, deleteTask, } from '../services/asyncTaskService'
import { useNavigate } from "react-router-dom"
import { Loader } from "../assets/svg/Loader"

export function TaskBoardIndex() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data: tasks, isLoading, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks,
        ///todo:error handeling
    });

    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries('tasks')
            //toast
        },
        onError: (error) => {
           //toast;
        },
    })

    const handleDeleteTask = (ev, taskId) => {
        ev.stopPropagation()
        deleteTaskMutation.mutate(taskId) 
    }

    if (isLoading) return <Loader />
    if (error) return <p>Error loading tasks: {error.message}</p>
    return (
        <div>
            TaskBoardIndex
            <h1>Task List</h1>
            <div>
                <button onClick={()=>navigate('/task/edit')} >Add Task</button>
                <TaskList deleteTask={handleDeleteTask} tasks={tasks} />
            </div>
        </div>
    )
}



