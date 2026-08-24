import { taskService } from "../applcation/task.service.js";
import { TaskNotFoundError } from "../errors/task-notFound.error.js";
import { error, success } from "../ui/message.js";
import { renderTasks } from "../ui/renderer.js";

export async function updateCommand(
  id: string,
  description: string,
): Promise<void> {
  if (!id || isNaN(Number(id)) || id == "") {
    error("Invalid task ID. Please provide a valid number.");
    process.exitCode = 1;
    return;
  }

  if (!description || description.trim() === "") {
    error("Invalid description. Please provide a non-empty description.");
    process.exitCode = 1;
    return;
  }

  const taskId = Number(id);

  if (!Number.isInteger(taskId) || taskId < 0) {
    error("Error: Task ID must be a positive number");
    process.exitCode = 1;
    return;
  }

  const task = await taskService.getTaskById(taskId);

  if (!task) {
    throw new TaskNotFoundError(taskId);
  }

  task.description = description.trim();

  await taskService.updateTask(task);
  success(`Task  ${taskId}  updated.`);
  renderTasks(task ? [task] : [], "single");
  return;
}
