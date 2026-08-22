import * as p from "@clack/prompts";
import chalk from "chalk";
import { taskService } from "../application/task.service.js";
import type { TaskStatus } from "../domain/task.js";

export async function markCommand(idArg: string | undefined, status: TaskStatus): Promise<void> {
  let id = Number(idArg);

  // If no ID was passed via CLI flags, open an interactive selector
  if (!idArg || isNaN(id)) {
    const tasks = await taskService.listTasks();

    if (tasks.length === 0) {
      p.log.warn(chalk.yellow("No tasks available to update."));
      return;
    }

    const selectedId = await p.select({
      message: `Select a task to mark as ${status}:`,
      options: tasks.map((t) => ({
        value: t.id,
        label: `#${t.id} - ${t.description} [Current: ${t.status}]`,
      })),
    });

    if (p.isCancel(selectedId)) {
      p.cancel("Operation cancelled.");
      return;
    }

    id = selectedId as number;
  }

  const spinner = p.spinner();
  spinner.start(`Updating task status to ${status}...`);

  try {
    await taskService.updateTask(id, { status });
    spinner.stop(chalk.green(`Task #${id} marked as ${status}!`));
  } catch (error) {
    spinner.stop(chalk.red("Failed to update task status."));
    p.log.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}