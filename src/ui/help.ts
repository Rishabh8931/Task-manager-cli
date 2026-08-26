import boxen from "boxen";
import { colors } from "./colors.js";
import chalk from "chalk";
import { shouldUseColor } from "../utils/shouldUseColor.js";

export function renderHelp(): void {
  // ================================================
  // render help message in piped mode (no color)
  // ================================================

  if (!shouldUseColor()) {
    console.log();
    console.log("A fast developer-focused task manager.");
    console.log();

    console.log("COMMANDS");
    console.log();
    console.log(command("add <description>", "Add a new task"));
    console.log(command("list", "List all tasks"));
    console.log(command("update <id> <text>", "Update a task"));
    console.log(command("mark-in-progress <id>", "Start a task"));
    console.log(command("done <id>", "Complete a task"));
    console.log(command("delete <id>", "Delete a task"));
    console.log();

    return;
  }

  // ================================================
  // render help message in interactive mode (with color)
  // ================================================

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
