import * as p from "@clack/prompts";
import chalk from "chalk";
import { addCommand } from "./add.js";
import { listCommand } from "./list.js";
import { updateCommand } from "./update.js";
import { deleteCommand } from "./delete.js";
import { markCommand } from "./mark.js";

export async function interactiveMenu(): Promise<void> {
  p.intro(chalk.bgCyan.black(" TASK MANAGER CLI "));

  const action = await p.select({
    message: "What would you like to do?",
    options: [
      { value: "list", label: "📋 List all tasks" },
      { value: "add", label: "➕ Add a new task" },
      { value: "mark-in-progress", label: "⚡ Mark task as in-progress" },
      { value: "mark-done", label: "✔ Mark task as done" },
      { value: "update", label: "✏️  Update task description" },
      { value: "delete", label: "🗑️  Delete a task" },
      { value: "exit", label: "❌ Exit" },
    ],
  });

  if (p.isCancel(action) || action === "exit") {
    p.outro("Goodbye!");
    return;
  }

  switch (action) {
    case "list":
      await listCommand();
      break;
    case "add":
      await addCommand();
      break;
    case "mark-in-progress":
      await markCommand(undefined, "in-progress");
      break;
    case "mark-done":
      await markCommand(undefined, "done");
      break;
    case "update":
      await updateCommand();
      break;
    case "delete":
      await deleteCommand();
      break;
  }

  p.outro("Done!");
}