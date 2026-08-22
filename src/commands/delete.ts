import * as p from "@clack/prompts";
import chalk from "chalk";
import { taskService } from "../application/task.service.js";

export async function deleteCommand(idArg?: string): Promise<void> {
  let id = Number(idArg);

  // If no ID was passed via CLI flags, open an interactive selector
  if (!idArg || isNaN(id)) {
    const tasks = await taskService.listTasks();

    if (tasks.length === 0) {
      p.log.warn(chalk.yellow("No tasks available to delete."));
      return;
    }

    const selectedId = await p.select({
      message: "Select a task to delete:",
      options: tasks.map((t) => ({
        value: t.id,
        label: `#${t.id} - ${t.description} (${t.status})`,
      })),
    });

    if (p.isCancel(selectedId)) {
      p.cancel("Operation cancelled.");
      return;
    }

    id = selectedId as number;
  }

  const spinner = p.spinner();
  spinner.start("Deleting task...");

  try {
    await taskService.deleteTask(id);
    spinner.stop(chalk.green(`Task #${id} deleted successfully!`));
  } catch (error) {
    spinner.stop(chalk.red("Failed to delete task."));
    p.log.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
