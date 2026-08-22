import { taskService } from "../application/task.service.js";
import { type TaskStatus } from "../domain/task.js";

export async function markCommand(idArg: string | undefined, status: TaskStatus): Promise<void> {
  const id = Number(idArg);
  if (!idArg || isNaN(id)) {
    console.error("Error: Please provide a valid numeric task ID.");
    process.exitCode = 1;
    return;
  }

  try {
    await taskService.updateTask(id, { status });
    console.log(`Task ${id} marked as ${status}.`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}