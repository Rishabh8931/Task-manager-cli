import { addCommand } from "./commands/add.js";
import { listCommand } from "./commands/list.js";
import { updateCommand } from "./commands/update.js";
import { deleteCommand } from "./commands/delete.js";
import { markCommand } from "./commands/mark.js";

export async function dispatch(args: string[]): Promise<void> {
  const command = args[0];

  function showHelp() {
    console.log(`
Task CLI

Usage:
  task <command> [arguments]

Commands:
  add <description>                 Add a new task
  update <id> <description>         Update task description
  delete <id>                       Delete a task
  list [todo|in-progress|done]      List tasks (optionally filtered by status)
  mark-in-progress <id>             Mark a task as in-progress
  mark-done <id>                    Mark a task as done

Options:
  --help, -h                        Show help documentation
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
      console.log(
        "Command not provided. Use --help or -h for usage information.",
      );
      process.exitCode = 1;
      break;
    default:
      console.error(
        `Unknown command: ${command}.\nUse --help or -h for usage information.`,
      );
      process.exitCode = 1;
  }
}
