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
import { SpaceSvg } from "../assets/svg/SpaceSvg";
import { useTranslation } from 'react-i18next'


export function TaskBoardIndex() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const filterBy = useSelector((state) => state.appModule.filterBy);
    const [currentPage, setCurrentPage] = useState(1);
    const { t } = useTranslation()

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
    if(!tasksData.tasks) return <SpaceSvg isNoResults={true}/>
    return (
        <div className="task-board-index">
            <TaskFilter />
            <div>
                <button className="add-button" onClick={() => navigate('/task/edit')}>{t("addTask")}</button>
                {tasksData.totalPages > 1 && (
                    <Pagination
                        tasksData={tasksData}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    />
                )} </div>
                <TaskList deleteTask={handleDeleteTask} tasks={tasksData.tasks} />
        </div>
    );
}
