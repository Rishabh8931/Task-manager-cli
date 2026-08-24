import boxen from "boxen";

import { colors } from "./colors.js";
import chalk from "chalk";

export function renderHelp(): void {
  const header = boxen(
    chalk.yellowBright("A fast developer-focused task manager."),
    {
      padding: {
        top: 1,
        bottom: 1,
        left: 1,
        right: 1,
      },
      title: chalk.bold.redBright("TASK CLI"),
      borderStyle: "round",
      borderColor: "greenBright",
      titleAlignment: "center",
    },
  );

  console.log(header);
  console.log();

  console.log(colors.header("COMMANDS"));
  console.log();

  command("add <description>", "Add a new task");
  command("list", "List all tasks");
  command("update <id> <text>", "Update a task");
  command("mark-in-progress <id>", "Start a task");
  command("done <id>", "Complete a task");
  command("delete <id>", "Delete a task");

  console.log();

  console.log(colors.header("EXAMPLES"));
  console.log();

  console.log(`  ${colors.accent('$ task add "Build REST API"')}`);

  console.log(`  ${colors.accent("$ task list")}`);

  console.log(`  ${colors.accent("$ task mark-in-progress 1")}`);

  console.log(`  ${colors.accent("$ task done 1")}`);

  console.log();
}

function command(syntax: string, description: string): void {
  console.log(
    `  ${colors.primary(syntax.padEnd(25))}` + `${colors.muted(description)}`,
  );
}
