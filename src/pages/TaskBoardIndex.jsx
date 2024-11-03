import { TaskList } from "../cmp/TaskList";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, deleteTask } from '../services/asyncTaskService';
import { useNavigate } from "react-router-dom";
import { Loader } from "../assets/svg/Loader";
import { TaskFilter } from "../cmp/TaskFilter";
import { useState } from "react";
import { useSelector } from 'react-redux';

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
            limit: filterBy.limit || 5, // Default to 5 if limit is not set
        }),
    });
    

    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
            // Toast on success
        },
        onError: (error) => {
            // Toast on error
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

    return (
        <div>
            TaskBoardIndex
            <TaskFilter />
            <div>
                <button onClick={() => navigate('/task/edit')}>Add Task</button>
                <TaskList deleteTask={handleDeleteTask} tasks={tasksData.tasks} />
                {/* Pagination controls */}
                <div>
                    {Array.from({ length: tasksData.totalPages }, (_, index) => (
                        <button 
                            key={index + 1} 
                            onClick={() => handlePageChange(index + 1)}
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
