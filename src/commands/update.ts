import * as p from "@clack/prompts";
import chalk from "chalk";
import { taskService } from "../application/task.service.js";

export async function updateCommand(
  idArg?: string,
  descArg?: string,
): Promise<void> {
  let id = Number(idArg);
  let description = descArg;

  if (!idArg || isNaN(id)) {
    const tasks = await taskService.listTasks();
    if (tasks.length === 0) {
      p.log.warn("No tasks available to update.");
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

  try {
    await taskService.updateTask(id, { description: description.trim() });
    p.log.success(chalk.green(`Task #${id} updated successfully!`));
  } catch (error) {
    p.log.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
