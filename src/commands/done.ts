import { taskService } from "../applcation/task.service.js";
import { error, success } from "../ui/message.js";
import { renderTasks } from "../ui/renderer.js";

export async function doneCommand(id: string | undefined): Promise<void> {
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

  await taskService.markDone(taskId);

  success(`Task ${taskId} marked as done.`);
  renderTasks([{ id: taskId, description: "", status: "done" }], "single");
}
