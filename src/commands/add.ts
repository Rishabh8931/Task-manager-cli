import { type Task } from "../domain/task.js";

export function addCommand(task: string | undefined): void {
  if (!task || task.trim() === "") {
    console.error("Error: Task description cannot be empty.");
    process.exitCode = 1;
    return;
  }

  const now = new Date().toISOString();

  const newTask: Task = {
    id: 1,
    description: task,
    status: "todo",
    createdAt: now,
    updatedAt: now,
  };

  console.log(newTask);
}
