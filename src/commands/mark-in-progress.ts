import { taskService } from "../applcation/task.service.js";
import { error, success } from "../ui/message.js";
import { renderTasks } from "../ui/renderer.js";

export async function markInProgressCommand(
  id: string | undefined,
): Promise<void> {
  if (!id) {
    error("Task ID is required.");
    process.exitCode = 1;
    return;
  }

  const taskId = Number(id);

  if (!Number.isInteger(taskId)) {
    error("Task ID must be a number.");
    process.exitCode = 1;
    return;
  }

  await taskService.markInProgress(taskId);

  success(`Task ${taskId} marked as in-progress.`);
  renderTasks(
    [{ id: taskId, description: "", status: "in-progress" }],
    "single",
  );
}
