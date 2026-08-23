import { taskService } from "../applcation/task.service.js";

export async function markInProgressCommand(
  id: string | undefined,
): Promise<void> {
  if (!id) {
    console.error("Error: Task ID is required.");
    process.exitCode = 1;
    return;
  }

  const taskId = Number(id);

  if (!Number.isInteger(taskId)) {
    console.error("Error: Task ID must be a number.");
    process.exitCode = 1;
    return;
  }

  await taskService.markInProgress(taskId);

  console.log(`Task ${taskId} marked as in-progress.`);
}
