import type { Task } from "../domain/task.js";

export interface TaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: number): Promise<Task | null>;
  create(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  delete(id: number): Promise<void>;
  deleteAll(): Promise<void>;
}
