import { addCommand } from "./commands/add.js";
import { listCommand } from "./commands/list.js";
import { deleteCommand } from "./commands/delete.js";
import { updateCommand } from "./commands/update.js";

export async function dispatch(args: string[]): Promise<void> {
  const command = args[0];

  function showHelp() {
    console.log(`
Task CLI

Usage:
  task <command>

Commands:
  add
  update
  delete
  list
  mark-in-progress
  mark-done

Options:
  --help, -h
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
      console.log("Marking item as in progress...");
      break;
    case "mark-done":
      console.log("Marking item as done...");
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
