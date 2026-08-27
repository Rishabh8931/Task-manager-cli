import { taskService } from "../applcation/task.service.js";
import { error, success } from "../ui/message.js";

export async function deleteCommand(id: string): Promise<void> {
  if (!id || isNaN(Number(id))) {
    error("Invalid task ID. Please provide a valid numeric ID.");
    process.exitCode = 1;
    return;
  }

  const taskId = Number(id);

  if (!Number.isInteger(taskId) || taskId < 0) {
    error("Error: Task ID must be a number");
    process.exitCode = 1;
    return;
  }

  await taskService.deleteTask(taskId);
  success(`Task  ${taskId}  deleted.`);
}

export async function deleteAllCommand(): Promise<void> {
  await taskService.deleteAllTask();
  success("All tasks deleted.");
}
