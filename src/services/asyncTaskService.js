// taskService.js
import { mockTasks} from '../mockData'

let tasks = [...mockTasks]; // Clone the mock tasks for simulation

export const getTasks = async () => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasks);
    }, 500);
  });
};

export const getTaskById = (taskId) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          const task = mockTasks.find((task) => task.id === taskId);
          if (task) {
              resolve(task);
          } else {
              reject(new Error(`Task with ID ${taskId} not found`));
          }
      }, 500); // Simulate a network delay of 500ms
  });
};


export const createTask = async (newTask) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const taskWithId = { id: tasks.length + 1+'', ...newTask }; // Generate a new ID
      tasks.push(taskWithId);
      resolve(taskWithId);
    }, 500);
  });
};



export const updateTask = async (updatedTask) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      resolve(updatedTask);
    }, 500);
  });
};

export const deleteTask = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks = tasks.filter((task) => task.id !== id);
      resolve(id);
    }, 500);
  });
};
