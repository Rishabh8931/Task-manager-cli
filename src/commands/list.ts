import { taskService } from "../applcation/task.service.js";
import { renderTasks } from "../ui/renderer.js";
import { error } from "../ui/message.js";

export async function listCommand(): Promise<void> {
  const tasks = await taskService.getAll();

  if (tasks.length === 0) {
    error("No tasks found.");
    return;
  }

  renderTasks(tasks);
}
