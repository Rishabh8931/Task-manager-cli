import { theme } from "./themes.js";
import { type Task, type TaskStatus } from "../domain/task.js";

export interface Statistics {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
}

export function formatStatus(status: TaskStatus): string {
  switch (status) {
    case "todo":
      return `${theme.colors.muted(theme.symbols.todo)} TODO`;
    case "in-progress":
      return `${theme.colors.warning(theme.symbols.inProgress)} IN PROGRESS`;
    case "done":
      return `${theme.colors.success(theme.symbols.done)} DONE`;
    default:
      return status;
  }
}

export function getStatistics(tasks: Task[]): Statistics {
  return {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === "todo").length,
    inProgress: tasks.filter((task) => task.status === "in-progress").length,
    done: tasks.filter((task) => task.status === "done").length,
  };
}
