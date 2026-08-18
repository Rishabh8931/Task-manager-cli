export function addCommand(task: string | undefined): void {
  if (!task || task.trim() === "") {
    console.error("Error: Task description cannot be empty.");
    process.exitCode = 1;
    return;
  }

  console.log(`Task added: ${task}`);
}
