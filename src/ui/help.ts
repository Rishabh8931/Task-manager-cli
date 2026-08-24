import boxen from "boxen";
import { colors } from "./colors.js";
import chalk from "chalk";

export function renderHelp(): void {
  const content = [
    chalk.yellowBright("A fast developer-focused task manager."),

    "",

    colors.header("COMMANDS"),

    "",

    command("add <description>", "Add a new task"),
    command("list", "List all tasks"),
    command("update <id> <text>", "Update a task"),
    command("mark-in-progress <id>", "Start a task"),
    command("done <id>", "Complete a task"),
    command("delete <id>", "Delete a task"),

    "",

    colors.header("EXAMPLES"),

    "",

    `  ${colors.accent('$ task add "Build REST API"')}`,
    `  ${colors.accent("$ task list")}`,
    `  ${colors.accent("$ task mark-in-progress 1")}`,
    `  ${colors.accent("$ task done 1")}`,
  ].join("\n");

  console.log(
    boxen(content, {
      padding: {
        top: 1,
        bottom: 1,
        left: 2,
        right: 2,
      },

      title: chalk.bold.redBright("TASK CLI"),

      borderStyle: "round",
      borderColor: "greenBright",

      titleAlignment: "center",
    }),
  );
}

function command(syntax: string, description: string): string {
  return `  ${colors.primary(syntax.padEnd(25))}${colors.muted(description)}`;
}
