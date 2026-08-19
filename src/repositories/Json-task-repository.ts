import envPaths from "env-paths";
import fs from "node:fs/promises";
import path from "node:path";

import { type Task } from "../domain/task.js";
import { type TaskRepository } from "./task-repositry.js";

export class JsonTaskRepository implements TaskRepository {
  private filePath: string;

  constructor() {
    const paths = envPaths("task-cli").data;
    this.filePath = path.join(paths, "tasks.json");
    console.log(`JsonTaskRepository file path: ${this.filePath}`);
  }

  // save
  private async save(tasks: Task[]): Promise<void> {
    const directory = path.dirname(this.filePath);

    await fs.mkdir(directory, { recursive: true });

    const content = JSON.stringify(tasks, null, 2);

    await fs.writeFile(this.filePath, content, "utf-8");
  }

  // get all tasks from the json file;
  async getAll(): Promise<Task[]> {
    try {
      const content = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(content) as Task[];
    } catch (error) {
      if (isFileNotFoundError(error)) {
        return [];
      }
      throw error;
    }
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
      throw new Error(`Task with id ${task.id} not found`);
    }

    tasks[index] = task;
    await this.save(tasks);
  }

  // delete a task in the json file;
  async delete(id: number): Promise<void> {
    const tasks = await this.getAll();
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      throw new Error(`Task with id ${id} not found`);
    }
    tasks.splice(index, 1);
    await this.save(tasks);
  }
}

function isFileNotFoundError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}
