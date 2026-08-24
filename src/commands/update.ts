import { taskService } from "../applcation/task.service.js";
import { TaskNotFoundError } from "../errors/task-notFound.error.js";

export async function updateCommand(
  id: string,
  description: string,
): Promise<void> {
  if (!id || isNaN(Number(id)) || id == "") {
    console.error("Invalid task ID. Please provide a valid numeric ID.");
    process.exitCode = 1;
    return;
  }

  if (!description || description.trim() === "") {
    console.error(
      "Invalid description. Please provide a non-empty description.",
    );
    process.exitCode = 1;
    return;
  }

  const taskId = Number(id);

  if (!Number.isInteger(taskId) || taskId < 0) {
    console.error("Error: Task ID must be a number");
    process.exitCode = 1;
    return;
  }

  const task = await taskService.getTaskById(taskId);

  if (!task) {
    throw new TaskNotFoundError(taskId);
  }

  task.description = description.trim();

  await taskService.updateTask(task);
  console.log(`Task with ID ${taskId} has been updated.`);
  return;
}
