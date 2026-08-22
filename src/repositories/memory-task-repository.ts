import type { Task } from "../domain/task.js";
import type { TaskRepository } from "./task-repository.js";

export class MemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  async getAll(): Promise<Task[]> {
    return this.tasks;
  }

  async getById(id: number): Promise<Task | null> {
    const task = this.tasks.find((task) => task.id === id);
    return task || null;
  }

  async create(task: Task): Promise<void> {
    this.tasks.push(task);
  }
  async update(task: Task): Promise<void> {
    const index = this.tasks.findIndex((t) => t.id === task.id);

    if (index === -1) {
      throw new Error(`Task with id ${task.id} not found`);
    }

    this.tasks[index] = task;
  }

  async delete(id: number): Promise<void> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`);
    }
    this.tasks.splice(index, 1);
  }
}
