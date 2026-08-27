import envPaths from "env-paths";
import fs from "node:fs/promises";
import path from "node:path";

import { isTask, type Task } from "../domain/task.js";
import { type TaskRepository } from "./task-repositry.js";
import { StorageAccessError } from "../errors/storage-access.error.js";
import { StorageCorruptedError } from "../errors/storage-corrupted.error.js";
import { TaskNotFoundError } from "../errors/task-notFound.error.js";

export class JsonTaskRepository implements TaskRepository {
  private filePath: string;

  constructor() {
    const paths = envPaths("task-cli").data;
    this.filePath = path.join(paths, "tasks.json");
  }

  // save
  private async save(tasks: Task[]): Promise<void> {
    try {
      const directory = path.dirname(this.filePath);

      await fs.mkdir(directory, { recursive: true });

      const content = JSON.stringify(tasks, null, 2);

      await fs.writeFile(this.filePath, content, "utf-8");
    } catch (error) {
      throw new StorageAccessError(
        `Unable to write tasks file: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  // get all tasks from the json file;
  async getAll(): Promise<Task[]> {
    let content: string;

    try {
      content = await fs.readFile(this.filePath, "utf-8");
    } catch (error) {
      if (isFileNotFoundError(error)) {
        return [];
      }
      throw new StorageAccessError(
        `Unable to read tasks file: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    let data: Task[];
    try {
      data = JSON.parse(content);
    } catch (error) {
      throw new StorageCorruptedError(
        "Task storage contains invalid JSON :" +
          (error instanceof Error ? error.message : String(error)),
      );
    }

    if (!Array.isArray(data)) {
      throw new StorageCorruptedError("Task storage must be an array of tasks");
    }

    if (!data.every(isTask)) {
      throw new StorageCorruptedError(
        "Task storage contains invalid task objects",
      );
    }

    return data;
  }

  // get by id from the json file;
  async getById(id: number): Promise<Task | null> {
    const tasks = await this.getAll();
    const task = tasks.find((task) => task.id === id) ?? null;
    return task;
  }

  //create tasks in the json file;
  async create(task: Task): Promise<void> {
    const tasks = await this.getAll();

    tasks.push(task);

    await this.save(tasks);
  }

  // update a task in the json file;
  async update(task: Task): Promise<void> {
    const tasks = await this.getAll();
    const index = tasks.findIndex((t) => t.id === task.id);

    if (index === -1) {
      throw new TaskNotFoundError(task.id);
    }

    tasks[index] = task;
    await this.save(tasks);
  }

  // delete a task in the json file;
  async delete(id: number): Promise<void> {
    const tasks = await this.getAll();
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      throw new TaskNotFoundError(id);
    }
    tasks.splice(index, 1);
    await this.save(tasks);
  }

  // delete all tasks in the json file;
  async deleteAll(): Promise<void> {
    await this.save([]);
  }
}

function isFileNotFoundError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}
