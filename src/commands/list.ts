import { taskService } from "../application/task.service.js";
import { type TaskStatus } from "../domain/task.js";

export async function listCommand(statusArg?: string): Promise<void> {
  const validStatuses: TaskStatus[] = ["todo", "in-progress", "done"];
  
  if (statusArg && !validStatuses.includes(statusArg as TaskStatus)) {
    console.error(`Invalid status: "${statusArg}". Valid options: todo, in-progress, done`);
    process.exitCode = 1;
    return;
  }

  const tasks = await taskService.listTasks(statusArg as TaskStatus | undefined);

  if (tasks.length === 0) {
    console.log("No tasks found.");
    return;
  }

  tasks.forEach((task) => {
    console.log(`[${task.id}] ${task.description} (${task.status})`);
  });
}