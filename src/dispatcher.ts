import { addCommand } from "./commands/add.js";
import { listCommand } from "./commands/list.js";
import { deleteCommand } from "./commands/delete.js";
import { updateCommand } from "./commands/update.js";
import { markInProgressCommand } from "./commands/mark-in-progress.js";
import { doneCommand } from "./commands/done.js";

export async function dispatch(args: string[]): Promise<void> {
  const command = args[0];

  function showHelp(): void {
    console.log(`
Usage:
  task <command> [options]

Commands:

  add <description>
      Add a new task

  list
      List all tasks

  update <id> <description>
      Update a task description

  mark-in-progress <id>
      Mark a task as in-progress

  done <id>
      Mark a task as done

  delete <id>
      Delete a task

  help
      Show this help message

Examples:

  task add "Learn Node.js"
  task list
  task update 1 "Learn Node.js streams"
  task mark-in-progress 1
  task done 1
  task delete 1
`);
  }

  switch (command) {
    case "add":
      await addCommand(args[1]);
      break;
    case "update":
      await updateCommand(args[1]!, args[2]!);
      break;
    case "delete":
      await deleteCommand(args[1]!);
      break;
    case "list":
      await listCommand();
      break;
    case "mark-in-progress":
      await markInProgressCommand(args[1]);
      break;
    case "mark-done":
      await doneCommand(args[1]);
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
        `Unknown command: ${command}. \nUse --help or -h for usage information.`,
      );
      process.exitCode = 1;
  }
}
