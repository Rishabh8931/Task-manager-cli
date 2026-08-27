import type { Task } from "../domain/task.js";
import type { TaskRepository } from "../repositories/task-repositry.js";
import { MemoryTaskRepository } from "../repositories/Memory-repository.js";
import { JsonTaskRepository } from "../repositories/Json-task-repository.js";
import { TaskNotFoundError } from "../errors/task-notFound.error.js";

class TaskService {
  constructor(private taskRepository: JsonTaskRepository) {}

  // ========================================
  // createTask method implementation
  // =========================================
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

  // ========================================
  // getAll method implementation
  // =========================================
  async getAll(): Promise<Task[]> {
    return await this.taskRepository.getAll();
  }

  // ========================================
  // deleteTask method implementation
  // =========================================
  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  // ========================================
  // updateTask method implementation
  // =========================================

  async updateTask(task: Task): Promise<void> {
    task.updatedAt = new Date().toISOString();
    await this.taskRepository.update(task);
  }

  // ========================================
  // getTaskById method implementation
  // =========================================

  async getTaskById(id: number): Promise<Task | null> {
    return await this.taskRepository.getById(id);
  }

  // ========================================
  // markInProgress method implementation
  // =========================================

  async markInProgress(id: number): Promise<void> {
    const task = await this.taskRepository.getById(id);
    if (!task) {
      throw new TaskNotFoundError(id);
    }
    task.status = "in-progress";
    task.updatedAt = new Date().toISOString();
    await this.taskRepository.update(task);
  }

  // ========================================
  // markDone method implementation
  // =========================================
  async markDone(id: number): Promise<void> {
    const task = await this.taskRepository.getById(id);

    if (!task) {
      throw new TaskNotFoundError(id);
    }

    task.status = "done";
    task.updatedAt = new Date().toISOString();

    await this.taskRepository.update(task);
  }

  // ========================================
  // deleteAllTask method implementation
  // =========================================
  async deleteAllTask(): Promise<void> {
    await this.taskRepository.deleteAll();
  }
}

const taskRepository = new JsonTaskRepository();

export const taskService = new TaskService(taskRepository);
