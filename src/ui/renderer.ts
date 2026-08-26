import boxen from "boxen";
import chalk from "chalk";
import Table from "cli-table3";

import type { Task, TaskStatus } from "../domain/task.js";
import {
  formatStatus,
  getStatistics,
  type Statistics,
  truncate,
  wrapText,
} from "./formatter.js";
import { getLayoutMode, type LayoutMode } from "./layout.js";
import { getTerminalWidth } from "./terminal.js";
import { theme } from "./themes.js";

// ================================================
// constants
// ================================================

const MIN_TABLE_WIDTH = 60;
const DEFAULT_TERMINAL_WIDTH = 80;

// ================================================
// utility
// ================================================

function getSafeTerminalWidth(): number {
  const width = getTerminalWidth();

  return Math.max(width, 20);
}

function stripAnsi(value: string): string {
  return value.replace(
    // eslint-disable-next-line no-control-regex
    /\u001B(?:[@-_][0-?]*[ -/]*[@-~]|\[[0-?]*[ -/]*[@-~])/g,
    "",
  );
}

function visibleLength(value: string): number {
  return stripAnsi(value).length;
}

// ================================================
// render header
// ================================================

function renderHeader(
  stats: Statistics,
  layout: LayoutMode,
  terminalWidth: number,
): void {
  const total = `${chalk.bold.cyanBright("Total:")} ${chalk.bold(stats.total)}`;
  const todo = `${chalk.bold.red("Todo:")} ${chalk.bold(stats.todo)}`;
  const inProgress = `${chalk.bold.yellowBright("In Progress:")} ${chalk.bold(stats.inProgress)}`;
  const done = `${chalk.bold.greenBright("Done:")} ${chalk.bold(stats.done)}`;

  let statistics: string;

  if (layout === "compact" || terminalWidth < 50) {
    statistics = [total, todo, inProgress, done].join("\n");
  } else {
    statistics = [total, todo, inProgress, done].join("  ");
  }

  console.log(
    boxen(statistics, {
      padding: {
        top: 1,
        bottom: 1,
        left: 1,
        right: 1,
      },

      title: chalk.bold("TASKS"),
      titleAlignment: "center",

      borderStyle: "round",
      borderColor: "greenBright",

      width:
        layout === "compact"
          ? Math.min(terminalWidth - 2, 40)
          : Math.min(terminalWidth - 2, 80),
    }),
  );
}

// ================================================
// render empty state
// ================================================

function renderEmptyState(): void {
  console.log();
  console.log(`  ${chalk.redBright("No tasks yet.")}`);
  console.log(
    `  ${chalk.redBright('Use "task add <description>" to create one.')}`,
  );
  console.log();
}

// ================================================
// status
// ================================================

function colorStatus(status: TaskStatus, value: string): string {
  switch (status) {
    case "todo":
      return theme.colors.secondary(value);

    case "in-progress":
      return theme.colors.accent(value);

    case "done":
      return theme.colors.success(value);
  }
}

// ================================================
// render normal / spacious tasks
// ================================================

function renderSpaciousTasks(tasks: Task[], terminalWidth: number): void {
  const narrow = terminalWidth < 60;

  const symbolWidth = 3;
  const idWidth = 6;
  const statusWidth = 14;

  const descriptionWidth = Math.max(
    15,
    terminalWidth - symbolWidth - idWidth - statusWidth - 10,
  );

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    if (!task) continue;

    const formattedStatus = formatStatus(task.status);
    const [symbol, ...statusParts] = formattedStatus.split(" ");

    const statusText = statusParts.join(" ");

    const coloredStatus = colorStatus(task.status, statusText);

    const coloredSymbol = colorStatus(task.status, symbol!);

    const id = theme.colors.muted(`#${task.id}`);

    // const descriptionLines = wrapText(task.description, descriptionWidth);
    const description = truncate(task.description, descriptionWidth - 5);

    /*

//  wrapping texts description to fit within the descriptionWidth

    if (narrow) {
      console.log(
        `  ${coloredSymbol}  ${id}  ${theme.colors.primary(descriptionLines[0]!)}`,
      );

      for (const line of descriptionLines.slice(1)) {
        console.log(`              ${theme.colors.primary(line)}`);
      }

      console.log(`            ${coloredStatus}`);
    } else {
      console.log(
        `  ${coloredSymbol}  ${id}  ${theme.colors.primary(descriptionLines[0]!)}  ${coloredStatus}`,
      );

      for (const line of descriptionLines.slice(1)) {
        console.log(`        ${theme.colors.primary(line)}`);
      }
    }

    */

    console.log(
      `  ${coloredSymbol}  ${id}  ${theme.colors.primary(description)}  ${coloredStatus}`,
    );

    if (i < tasks.length - 1) {
      console.log(theme.colors.muted(`  ${theme.symbols.connector}`));
    }
  }
}

// ================================================
// render compact table
// ================================================

function renderCompactTable(tasks: Task[], terminalWidth: number): void {
  const availableWidth = Math.max(MIN_TABLE_WIDTH, terminalWidth - 2);

  const idWidth = 6;
  const statusWidth = 16;

  const taskWidth = Math.max(20, availableWidth - idWidth - statusWidth - 6);

  const table = new Table({
    colWidths: [idWidth, taskWidth, statusWidth],

    head: [chalk.gray("ID"), chalk.gray("TASK"), chalk.gray("STATUS")],

    wordWrap: true,

    style: {
      head: [],
      border: [],
    },

    chars: {
      top: "─",
      "top-mid": "┬",
      "top-left": "┌",
      "top-right": "┐",

      bottom: "─",
      "bottom-mid": "┴",
      "bottom-left": "└",
      "bottom-right": "┘",

      left: "│",
      "left-mid": "├",

      mid: "─",
      "mid-mid": "┼",

      right: "│",
      "right-mid": "┤",

      middle: "│",
    },
  });

  for (const task of tasks) {
    const truncatedDescription = truncate(task.description, taskWidth - 5);
    table.push([
      `#${task.id}`,
      truncatedDescription,
      formatStatus(task.status),
    ]);
  }

  console.log(table.toString());
}

// ================================================
// render tasks
// ================================================

export function renderTasks(tasks: Task[], flag?: string): void {
  const stats = getStatistics(tasks);

  const terminalWidth = Math.max(
    getTerminalWidth() || DEFAULT_TERMINAL_WIDTH,
    20,
  );

  const layout = getLayoutMode(terminalWidth);

  console.log();

  if (!flag) {
    renderHeader(stats, layout, terminalWidth);

    console.log();
  }

  if (tasks.length === 0) {
    renderEmptyState();
    return;
  }

  switch (layout) {
    case "compact":
      renderSpaciousTasks(tasks, terminalWidth);
      break;

    case "normal":
      if (tasks.length <= 5) {
        renderSpaciousTasks(tasks, terminalWidth);
      } else {
        renderCompactTable(tasks, terminalWidth);
      }
      break;

    case "wide":
      if (tasks.length <= 5) {
        renderSpaciousTasks(tasks, terminalWidth);
      } else {
        renderCompactTable(tasks, terminalWidth);
      }
      break;
  }

  console.log();
}
