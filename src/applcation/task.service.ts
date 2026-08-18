import type { Task } from "../domain/task.js";

class TaskService {
  createTask(description: string): Task {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID for demonstration purposes
      description,
      status: "todo",
      createdAt: now,
      updatedAt: now,
    };
    return newTask;
  }
}

export const taskService = new TaskService();
