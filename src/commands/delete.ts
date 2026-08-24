import { taskService } from "../applcation/task.service.js";

export async function deleteCommand(id: string): Promise<void> {
  if (!id || isNaN(Number(id))) {
    console.error("Invalid task ID. Please provide a valid numeric ID.");
    process.exitCode = 1;
    return;
  }

  const taskId = Number(id);

  if (!Number.isInteger(taskId) || taskId < 0) {
    console.error("Error: Task ID must be a number");
    process.exitCode = 1;
    return;
  }

  await taskService.deleteTask(taskId);
  console.log(`Task with ID ${taskId} has been deleted.`);
}
