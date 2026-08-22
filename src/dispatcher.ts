import chalk from "chalk";
import { addCommand } from "./commands/add.js";
import { listCommand } from "./commands/list.js";
import { updateCommand } from "./commands/update.js";
import { deleteCommand } from "./commands/delete.js";
import { markCommand } from "./commands/mark.js";
import { interactiveMenu } from "./commands/interactive.js";

export async function dispatch(args: string[]): Promise<void> {
  const command = args[0];

  function showHelp() {
    console.log(`
${chalk.bgCyan.black.bold(" TASK CLI ")} ${chalk.gray("v1.0.0")}

${chalk.bold("USAGE:")}
  ${chalk.cyan("task")} ${chalk.yellow("<command>")} ${chalk.gray("[arguments]")}
  ${chalk.cyan("task")}                       ${chalk.gray("(Launches interactive dashboard)")}

${chalk.bold("COMMANDS:")}
  ${chalk.yellow("add")} ${chalk.gray("<description>")}                 Add a new task
  ${chalk.yellow("update")} ${chalk.gray("<id> [description]")}         Update task description
  ${chalk.yellow("delete")} ${chalk.gray("<id>")}                       Delete a task
  ${chalk.yellow("list")} ${chalk.gray("[todo|in-progress|done]")}      List tasks (optionally filtered by status)
  ${chalk.yellow("mark-in-progress")} ${chalk.gray("<id>")}             Mark a task as in-progress
  ${chalk.yellow("mark-done")} ${chalk.gray("<id>")}                    Mark a task as done

${chalk.bold("OPTIONS:")}
  ${chalk.yellow("--help")}, ${chalk.yellow("-h")}                        Show help documentation
`);
  }

  switch (command) {
    case "add":
      await addCommand(args[1]);
      break;
    case "update":
      await updateCommand(args[1], args[2]);
      break;
    case "delete":
      await deleteCommand(args[1]);
      break;
    case "list":
      await listCommand(args[1]);
      break;
    case "mark-in-progress":
      await markCommand(args[1], "in-progress");
      break;
    case "mark-done":
      await markCommand(args[1], "done");
      break;
    case "--help":
    case "-h":
      showHelp();
      break;
    case undefined:
      await interactiveMenu();
      break;
    default:
      console.error(
        chalk.red(
          `Unknown command: ${command}.\nUse --help or -h for usage information.`,
        ),
      );
      process.exitCode = 1;
  }
}
