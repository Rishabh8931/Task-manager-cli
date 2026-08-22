import { taskService } from "../application/task.service.js";

export async function updateCommand(idArg?: string, description?: string): Promise<void> {
  const id = Number(idArg);
  if (!idArg || isNaN(id)) {
    console.error("Error: Please provide a valid numeric task ID.");
    process.exitCode = 1;
    return;
  }

  if (!description || description.trim() === "") {
    console.error("Error: Task description cannot be empty.");
    process.exitCode = 1;
    return;
  }

  try {
    await taskService.updateTask(id, { description: description.trim() });
    console.log(`Task ${id} updated successfully.`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}