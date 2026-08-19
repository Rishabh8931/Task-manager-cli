import { type Task } from "../domain/task.js";
import { taskService } from "../applcation/task.service.js";

export async function addCommand(task: string | undefined): Promise<void> {
  if (!task || task.trim() === "") {
    console.error("Error: Task description cannot be empty.");
    process.exitCode = 1;
    return;
  }

  const newTask: Task = await taskService.createTask(task.trim());
  console.log(`Task added: ${newTask.description} (ID: ${newTask.id})`);
}
