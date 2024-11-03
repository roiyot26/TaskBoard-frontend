import { TaskPreview } from "./TaskPreview"
export function TaskList({tasks,deleteTask}) {
  return (
    <div className="task-list">
        {tasks.map((task) => (
          <TaskPreview deleteTask={deleteTask} key={task._id} task={task} />
        ))}
    </div>
  )
}


