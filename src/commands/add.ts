import { type Task } from "../domain/task.js";
import { taskService } from "../applcation/task.service.js";

export function addCommand(task: string | undefined): void {
  if (!task || task.trim() === "") {
    console.error("Error: Task description cannot be empty.");
    process.exitCode = 1;
    return;
  }

  const newTask: Task = taskService.createTask(task.trim());

  console.log(newTask);
}
