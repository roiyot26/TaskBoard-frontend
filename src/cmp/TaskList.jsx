import { TaskPreview } from "./TaskPreview"
export function TaskList({tasks,deleteTask}) {
  return (
    <div>
      TaskList
      <ul>
        {tasks.map((task) => (
          <TaskPreview deleteTask={deleteTask} key={task.id} task={task} />
        ))}
      </ul>
    </div>
  )
}


