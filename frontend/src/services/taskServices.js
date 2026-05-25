import API from "../api/axios";

export const getTasks = () => API.get("/api/v1/tasks")

export const createTask = (data) => API.post("/api/v1/tasks", data)

export const updateTask = (id, data) => API.put(`/api/v1/tasks/${id}`, data)

export const deleteTask = (id) => API.delete(`/api/v1/tasks/${id}`)