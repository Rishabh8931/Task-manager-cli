import * as p from "@clack/prompts";
import chalk from "chalk";
import { taskService } from "../application/task.service.js";

export async function updateCommand(idArg?: string, descArg?: string): Promise<void> {
  let id = Number(idArg);
  let description = descArg;

  // 1. If no ID was passed, prompt user to select a task from a list
  if (!idArg || isNaN(id)) {
    const tasks = await taskService.listTasks();

    if (tasks.length === 0) {
      p.log.warn(chalk.yellow("No tasks available to update."));
      return;
    }

    const selectedId = await p.select({
      message: "Select a task to update:",
      options: tasks.map((t) => ({
        value: t.id,
        label: `#${t.id} - ${t.description}`,
      })),
    });

    if (p.isCancel(selectedId)) {
      p.cancel("Operation cancelled.");
      return;
    }

    id = selectedId as number;
  }

  // 2. If no new description was passed, prompt user for input
  if (!description) {
    const input = await p.text({
      message: "Enter the new task description:",
      validate(value) {
        if (!value || value.trim().length === 0) {
          return "Description cannot be empty!";
        }
      },
    });

    if (p.isCancel(input)) {
      p.cancel("Operation cancelled.");
      return;
    }

    description = input;
  }

  const spinner = p.spinner();
  spinner.start("Updating task...");

  try {
    await taskService.updateTask(id, { description: description.trim() });
    spinner.stop(chalk.green(`Task #${id} updated successfully!`));
  } catch (error) {
    spinner.stop(chalk.red("Failed to update task."));
    p.log.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}