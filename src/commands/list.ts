import { taskService } from "../applcation/task.service.js";

export async function listCommand(): Promise<void> {
  const tasks = await taskService.getAll();

  if (tasks.length === 0) {
    console.log("No tasks found.");
    return;
  }

  tasks.forEach((task) => {
    console.log(`
        ${task.id} - ${task.description} [${task.status}]
        `);
  });
}
