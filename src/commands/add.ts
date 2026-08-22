import { type Task } from "../domain/task.js";
import { taskService } from "../application/task.service.js";

export async function addCommand(
  taskDescription: string | undefined,
): Promise<void> {
  if (!taskDescription || taskDescription.trim() === "") {
    console.error("Error: Task description cannot be empty.");
    process.exitCode = 1;
    return;
  }

  try {
    const newTask: Task = await taskService.createTask(taskDescription.trim());
    console.log(`Task added successfully (ID: ${newTask.id})`);
  } catch (error) {
    console.error(
      `Error adding task: ${error instanceof Error ? error.message : String(error)}`,
    );
    process.exitCode = 1;
  }
}
