import { TaskList } from "../cmp/TaskList";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, deleteTask } from '../services/task.service';
import { useNavigate } from "react-router-dom";
import { Loader } from "../assets/svg/Loader";
import { TaskFilter } from "../cmp/TaskFilter";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { Pagination } from "../cmp/Pagination";
import { toast } from 'react-toastify'
import { NoResluts } from "../assets/svg/NoResluts";

export function TaskBoardIndex() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const filterBy = useSelector((state) => state.appModule.filterBy);
    const [currentPage, setCurrentPage] = useState(1);

    const { data: tasksData, isLoading, error } = useQuery({
        queryKey: ['tasks', filterBy, currentPage],
        queryFn: () => getTasks({
            ...filterBy,
            page: currentPage,
            limit: filterBy.limit || 5,
        }),
        staleTime: 1000 * 60 * 5,
        onError: (error) => {
            toast.error(`Error fetching tasks`);
        }
    });


    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
            toast.success('Task deleted successfully');
        },
        onError: (error) => {
            toast.error(`Error deleting task`);
        },
    });
    
    const handleDeleteTask = (ev, taskId) => {
        ev.stopPropagation();
        deleteTaskMutation.mutate(taskId);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (isLoading) return <Loader />;
    if (error) return <p>Error loading tasks: {error.message}</p>;
    if(!tasksData.tasks) return <NoResluts/>
    return (
        <div>
            <h3>Task Managment Board</h3>
            <TaskFilter />
            <div>
                <button onClick={() => navigate('/task/edit')}>Add Task</button>
                <TaskList deleteTask={handleDeleteTask} tasks={tasksData.tasks} />
                {tasksData.totalPages > 1 && (
                    <Pagination
                        tasksData={tasksData}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    />
                )} </div>
        </div>
    );
}
