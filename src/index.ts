// console.log("Hello, TypeScript!\n\n");

// const input = process.argv.slice(2);

// let [command, ...taskLists] = input;

// switch (command) {
//   case "add":
//     console.log(`Adding task: ${taskLists.join(" ")}`);
//     break;

//   case "list":
//     console.log("Listing all tasks...");
//     break;

//   case "--help":
//     process.stdout.write("Usage: node index.js <command> [task]\n");
//     process.stdout.write("Commands:\n");
//     process.stdout.write("  add <task>      Add a new task\n");
//     process.stdout.write("  list            List all tasks\n");
//     process.stdout.write("  complete <task> Mark a task as complete\n");
//     process.stdout.write("  --help          Show this help message\n");
//     break;

//   case "complete":
//     console.log(`Completing task: ${taskLists.join(" ")}`);
//     break;
//   default:
//     console.log(`unknown command: ${command}`);
//     console.log("Available commands: add, list, complete");
// }

const args = process.argv.slice(2);

const command = args[0];

if (!command) {
  console.log("No command provided. Use --help for usage information.");
  process.exit(1);
}

if (command === "hello") {
  console.log("Hello, From Task Manager!");
  process.exit(0);
}

switch (command) {
  case "add":
    const taskToAdd = args.slice(1).join(" ");
    if (!taskToAdd) {
      console.log("No task provided to add.");
      process.exit(1);
    }
    console.log(`Adding task: ${taskToAdd}`);
    break;

  case "list":
    console.log("Listing all tasks...");
    break;
  case "--help":
    process.stdout.write("Usage: node index.js <command> [task]\n");
    process.stdout.write("Commands:\n");
    process.stdout.write("  add <task>      Add a new task\n");
    process.stdout.write("  list            List all tasks\n");
    process.stdout.write("  complete <task> Mark a task as complete\n");
    process.stdout.write("  --help          Show this help message\n");
    break;
  default:
    console.log(`Unknown command: ${command}`);
    console.log("Available commands: add, list, complete, --help");
    process.exit(1);
}
