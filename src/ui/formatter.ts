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

// ================================================
// text truncation
// ================================================

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  if (maxLength <= 3) {
    return text.substring(0, maxLength);
  }
  return text.substring(0, maxLength - 3) + "...";
}

// ================================================
// text wrapping
// ================================================

export function wrapText(text: string, maxWidth: number): string[] {
  if (maxWidth <= 0) {
    return [text];
  }

  const words = text.split(/\s+/);
  const lines: string[] = [];

  let currentLine = "";

  for (const word of words) {
    if (!currentLine) {
      currentLine = word;
      continue;
    }

    const candidate = `${currentLine} ${word}`;

    if (candidate.length <= maxWidth) {
      currentLine = candidate;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.length > 0 ? lines : [""];
}
