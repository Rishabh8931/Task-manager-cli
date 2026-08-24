import boxen from "boxen";
import chalk from "chalk";
import Table from "cli-table3";

import type { Task, TaskStatus } from "../domain/task.js";
import { formatStatus, getStatistics, type Statistics } from "./formatter.js";
import { theme } from "./themes.js";

const tasks: Task[] = [
  {
    id: 1,
    description: "Learn TypeScript",
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    description: "Build a simple CLI app",
    status: "in-progress",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    description: "Deploy the app",
    status: "done",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    description: "Write documentation",
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    description: "Fix bugs",
    status: "in-progress",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // {
  //   id: 6,
  //   description: "Refactor code",
  //   status: "done",
  //   createdAt: new Date().toISOString(),
  //   updatedAt: new Date().toISOString(),
  // },
  // {
  //   id: 7,
  //   description: "Add new features",
  //   status: "todo",
  //   createdAt: new Date().toISOString(),
  //   updatedAt: new Date().toISOString(),
  // },
];

// ================================================
// render header
// ================================================

function renderHeader(stats: Statistics): void {
  const statistics = [
    `${chalk.bold.cyanBright("Total:")} ${chalk.bold(stats.total)}`,
    `${chalk.bold.red("Todo:")} ${chalk.bold(stats.todo)}`,
    `${chalk.bold.yellowBright("In Progress:")} ${chalk.bold(stats.inProgress)}`,
    `${chalk.bold.greenBright("Done:")} ${chalk.bold(stats.done)}`,
  ].join("  ");

  console.log(
    boxen(`${statistics}`, {
      padding: {
        top: 1,
        bottom: 1,
        left: 1,
        right: 1,
      },
      height: 5,
      title: chalk.bold.underlineBlueBright.redBright("TASKS"),
      titleAlignment: "center",
      borderStyle: "round",
      borderColor: "greenBright",
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
// render spacious tasks
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

function renderSpaciousTasks(tasks: Task[]): void {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    const [symbol, ...status] = formatStatus(task!.status).split(" ");

    const coloredStatus = colorStatus(task!.status, status.join("-"));
    const coloredSymbol = colorStatus(task!.status, symbol!);

    const id = theme.colors.muted(`#${task!.id}`);
    const description = theme.colors.primary(task!.description);

    console.log(`  ${coloredSymbol}  ${id}  ${description}  ${coloredStatus}`);

    if (i < tasks.length - 1) {
      console.log(theme.colors.muted(`  ${theme.symbols.connector}`));
    }
  }
}

// ===============================================
// render compact table
// ===============================================

function renderCompactTable(tasks: Task[]): void {
  // creating table with cli-table3
  const table = new Table({
    head: [chalk.gray("ID"), chalk.gray("TASK"), chalk.gray("STATUS")],

    style: {
      head: [],
      border: [],
    },

    chars: {
      top: "─",
      "top-mid": "┬",
      "top-left": "╭",
      "top-right": "╮",

      bottom: "─",
      "bottom-mid": "┴",
      "bottom-left": "╰",
      "bottom-right": "╯",

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
    table.push([
      `#${task.id}`,
      task.description,
      `${formatStatus(task.status)}`,
    ]);
  }
  console.log(table.toString());
}

// ================================================
// render tasks
// ================================================
export function renderTasks(tasks: Task[], flag?: string): void {
  const stats = getStatistics(tasks);

  console.log();
  if (!flag) {
    renderHeader(stats);
    console.log();
  }

  if (tasks.length === 0) {
    renderEmptyState();
  }

  if (tasks.length <= 5) {
    renderSpaciousTasks(tasks);
  } else {
    renderCompactTable(tasks);
  }

  console.log();
}
