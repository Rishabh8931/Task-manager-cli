import { taskService } from "../application/task.service.js";

export async function deleteCommand(idArg?: string): Promise<void> {
  const id = Number(idArg);
  if (!idArg || isNaN(id)) {
    console.error("Error: Please provide a valid numeric task ID.");
    process.exitCode = 1;
    return;
  }

  try {
    await taskService.deleteTask(id);
    console.log(`Task ${id} deleted successfully.`);
  } catch (error) {
    console.error(
      `Error: ${error instanceof Error ? error.message : String(error)}`,
    );
    process.exitCode = 1;
  }
}
