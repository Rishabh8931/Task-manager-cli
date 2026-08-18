import { addCommand } from "./commands/add.js";

export function dispatch(args: string[]): void {
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
      addCommand(args[1]);
      break;
    case "update":
      console.log("Updating item...");
      break;
    case "delete":
      console.log("Deleting item...");
      break;
    case "list":
      console.log("Listing items...");
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
