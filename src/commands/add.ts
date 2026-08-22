import * as p from "@clack/prompts";
import chalk from "chalk";
import { taskService } from "../application/task.service.js";

export async function addCommand(descriptionArg?: string): Promise<void> {
  let description = descriptionArg;

  // Interactive prompt if argument wasn't provided
  if (!description) {
    const input = await p.text({
      message: "What task would you like to add?",
      placeholder: "e.g. Build an npm package",
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
  spinner.start("Creating task...");

  try {
    const newTask = await taskService.createTask(description.trim());
    spinner.stop(chalk.green(`Task created successfully!`));
    p.note(
      `ID: ${chalk.cyan(newTask.id)}\nDescription: ${newTask.description}`,
      "Task Details",
    );
  } catch (error) {
    spinner.stop(chalk.red("Failed to create task."));
    p.log.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
