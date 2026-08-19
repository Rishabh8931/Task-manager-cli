import type { Task } from "../domain/task.js";
import type { TaskRepository } from "../repositories/task-repositry.js";
import { MemoryTaskRepository } from "../repositories/Memory-repository.js";

class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async createTask(description: string): Promise<Task> {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID for demonstration purposes
      description,
      status: "todo",
      createdAt: now,
      updatedAt: now,
    };
    await this.taskRepository.create(newTask);
    return newTask;
  }
}

const taskRepository = new MemoryTaskRepository();

export const taskService = new TaskService(taskRepository);
