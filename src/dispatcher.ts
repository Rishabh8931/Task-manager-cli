import { addCommand } from "./commands/add.js";
import { listCommand } from "./commands/list.js";
import { deleteCommand, deleteAllCommand } from "./commands/delete.js";
import { updateCommand } from "./commands/update.js";
import { markInProgressCommand } from "./commands/mark-in-progress.js";
import { doneCommand } from "./commands/done.js";
import { renderHelp } from "./ui/help.js";

export async function dispatch(args: string[]): Promise<void> {
  const command = args[0];

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
    case "delete-all":
      await deleteAllCommand();
      break;

    case "--help":
    case "-h":
      renderHelp();
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
