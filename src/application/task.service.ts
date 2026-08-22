import type { Task, TaskStatus } from "../domain/task.js";
import type { TaskRepository } from "../repositories/task-repository.js";
import { JsonTaskRepository } from "../repositories/json-task-repository.js";

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  /**
   * Creates a new task with an auto-incremented ID and timestamps.
   */
  async createTask(description: string): Promise<Task> {
    const tasks = await this.taskRepository.getAll();
    const maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
    const now = new Date().toISOString();

    const newTask: Task = {
      id: maxId + 1,
      description,
      status: "todo",
      createdAt: now,
      updatedAt: now,
    };

    await this.taskRepository.create(newTask);
    return newTask;
  }

  /**
   * Retrieves tasks, optionally filtered by status.
   */
  async listTasks(statusFilter?: TaskStatus): Promise<Task[]> {
    const tasks = await this.taskRepository.getAll();
    if (!statusFilter) return tasks;
    return tasks.filter((task) => task.status === statusFilter);
  }

  /**
   * Updates task description or status by ID.
   */
  async updateTask(
    id: number,
    updates: { description?: string; status?: TaskStatus }
  ): Promise<Task> {
    const task = await this.taskRepository.getById(id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found.`);
    }

    const updatedTask: Task = {
      ...task,
      ...(updates.description !== undefined && { description: updates.description }),
      ...(updates.status !== undefined && { status: updates.status }),
      updatedAt: new Date().toISOString(),
    };

    await this.taskRepository.update(updatedTask);
    return updatedTask;
  }

  /**
   * Deletes a task by ID.
   */
  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}

// Default instance using JSON persistence
const defaultRepository = new JsonTaskRepository();
export const taskService = new TaskService(defaultRepository);