// taskService.js
import { httpService } from './http.service' 

const API_ENDPOINT = 'task'

export const getTasks = async (filterBy) => {
  return await httpService.get(API_ENDPOINT, filterBy)
};

export const getTaskById = async (taskId) => {
  return await httpService.get(`${API_ENDPOINT}/${taskId}`)
};

export const createTask = async (newTask) => {
  return await httpService.post(API_ENDPOINT, newTask)
};

export const updateTask = async (updatedTask) => {
  return await httpService.put(`${API_ENDPOINT}/${updatedTask.id}`, updatedTask)
};

export const deleteTask = async (id) => {
  return await httpService.delete(`${API_ENDPOINT}/${id}`)
};
