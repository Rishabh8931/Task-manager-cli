import * as p from "@clack/prompts";
import Table from "cli-table3";
import chalk from "chalk";
import { taskService } from "../application/task.service.js";
import type { TaskStatus, Task } from "../domain/task.js";

export async function listCommand(statusArg?: string): Promise<void> {
  let filter = statusArg as TaskStatus | undefined;

  // Render nicely formatted CLI Table
  const tasks = await taskService.listTasks(filter);

  if (tasks.length === 0) {
    p.log.warn(chalk.yellow("No tasks found matching your request."));
    return;
  }

  const table = new Table({
    head: [chalk.cyan("ID"), chalk.cyan("Status"), chalk.cyan("Description"), chalk.cyan("Created At")],
    colWidths: [6, 15, 35, 22],
  });

  tasks.forEach((task: Task) => {
    let statusFormatted = chalk.yellow("● Todo");
    if (task.status === "in-progress") statusFormatted = chalk.blue("In Progress");
    if (task.status === "done") statusFormatted = chalk.green("✔ Done");

    const dateFormatted = new Date(task.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    table.push([chalk.bold(task.id), statusFormatted, task.description, chalk.gray(dateFormatted)]);
  });

  console.log(table.toString());
}