import { type Task } from "../domain/task.js";
import { taskService } from "../applcation/task.service.js";
import { error, success } from "../ui/message.js";

export async function addCommand(task: string | undefined): Promise<void> {
  if (!task || task.trim() === "") {
    error("Task description cannot be empty.");
    process.exitCode = 1;
    return;
  }

  const newTask: Task = await taskService.createTask(task.trim());
  success(`Task ${newTask.id} created`);
}
