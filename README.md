# CLI Task Manager

A lightweight command-line task manager built with **TypeScript** and **Node.js**.

It allows you to create, update, delete, list, and manage the progress of tasks directly from the terminal.

## Features

* Add new tasks
* List all tasks
* Update existing tasks
* Delete individual tasks
* Delete all tasks
* Mark tasks as **in progress**
* Mark tasks as **done**
* Command aliases for faster terminal usage
* Built-in help command
* TypeScript-based implementation

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

Install dependencies:

```bash
pnpm install
```

Build the project:

```bash
pnpm run build
```

Run the CLI:

```bash
node dist/index.js <command>
```

If your project exposes a CLI executable through `package.json`, you can alternatively use:

```bash
npm link
```

Then run:

```bash
tsk <command>
```

---

# Commands

## 1. Add a Task

Creates a new task.

```bash
tsk add "Learn TypeScript"
```

### Arguments

| Argument | Description                  |
| -------- | ---------------------------- |
| `task`   | Description/name of the task |

Example:

```bash
tsk add "Build authentication system"
```

---

## 2. List Tasks

Displays all tasks.

```bash
tsk list
```

### Aliases

```bash
tsk ls
tsk -l
```

---

## 3. Update a Task

Updates an existing task.

```bash
tsk update <task-id> "<new-description>"
```

### Aliases

```bash
tsk updt <task-id> "<new-description>"
tsk -u <task-id> "<new-description>"
```

Example:

```bash
tsk update 3 "Learn advanced TypeScript"
```

---

## 4. Delete a Task

Deletes a specific task.

```bash
tsk delete <task-id>
```

### Aliases

```bash
tsk del <task-id>
tsk -d <task-id>
```

Example:

```bash
tsk delete 3
```

---

## 5. Mark Task as In Progress

Changes the status of a task to **in progress**.

```bash
tsk mark-in-progress <task-id>
```

### Aliases

```bash
tsk mark-ip <task-id>
tsk -ip <task-id>
```

Example:

```bash
tsk mark-ip 3
```

---

## 6. Mark Task as Done

Changes the status of a task to **done**.

```bash
tsk mark-done <task-id>
```

### Aliases

```bash
tsk mark-d <task-id>
tsk done <task-id>
```

Example:

```bash
tsk done 3
```

---

## 7. Delete All Tasks

Deletes all tasks.

```bash
tsk delete-all
```

### Aliases

```bash
tsk del-all
tsk -da
```

> **Warning:** This operation removes all tasks.

---

## 8. Help

Displays available commands and usage information.

```bash
tsk --help
```

### Alias

```bash
tsk -h
```

---

# Command Reference

| Command            | Aliases          | Purpose                  |
| ------------------ | ---------------- | ------------------------ |
| `add`              | —                | Add a task               |
| `list`             | `ls`, `-l`       | List tasks               |
| `update`           | `updt`, `-u`     | Update a task            |
| `delete`           | `del`, `-d`      | Delete a task            |
| `mark-in-progress` | `mark-ip`, `-ip` | Mark task as in progress |
| `mark-done`        | `mark-d`, `done` | Mark task as done        |
| `delete-all`       | `del-all`, `-da` | Delete all tasks         |
| `--help`           | `-h`             | Show help                |

---

# Typical Workflow

A typical workflow might look like this:

```bash
# Create a task
tsk add "Learn Redis"

# View tasks
tsk list

# Start working on it
tsk mark-ip 1

# Update the task
tsk update 1 "Learn Redis fundamentals"

# Finish the task
tsk done 1

# Check the final state
tsk list
```

---

# Architecture

The command dispatcher acts as the entry point for command routing.

```text
CLI Arguments
     │
     ▼
┌───────────────┐
│   Dispatcher  │
└───────┬───────┘
        │
        ├── add ───────────────► addCommand()
        │
        ├── list / ls / -l ───► listCommand()
        │
        ├── update / updt / -u ► updateCommand()
        │
        ├── delete / del / -d ─► deleteCommand()
        │
        ├── mark-ip / -ip ────► markInProgressCommand()
        │
        ├── done / mark-d ────► doneCommand()
        │
        ├── delete-all / -da ─► deleteAllCommand()
        │
        └── help / -h ────────► renderHelp()
```

The dispatcher is responsible only for **routing commands**. The actual business logic remains inside individual command modules.

---

# Project Structure

A possible project structure is:

```text
src/
├── commands/
│   ├── add.ts
│   ├── list.ts
│   ├── delete.ts
│   ├── update.ts
│   ├── mark-in-progress.ts
│   └── done.ts
│
├── ui/
│   └── help.ts
│
├── dispatcher.ts
└── index.ts
```

### `dispatcher.ts`

Responsible for:

* Reading CLI arguments
* Identifying the requested command
* Handling aliases
* Passing arguments to the appropriate command handler
* Handling unknown or missing commands

### `commands/`

Contains the individual command implementations.

Keeping commands separated makes the project easier to maintain and extend.

### `ui/`

Contains terminal-related presentation logic such as help output.

---

# Error Handling

If no command is provided:

```bash
tsk
```

The CLI reports:

```text
Command not provided. Use --help or -h for usage information.
```

The process exits with status code `1`.

For an unknown command:

```bash
tsk hello
```

The CLI reports:

```text
Unknown command: hello.
Use --help or -h for usage information.
```

The process also exits with status code `1`.

---

# Design Decisions

## Command Dispatcher

Instead of putting all CLI logic into the entry point, commands are routed through a dedicated dispatcher.

This provides a clean separation:

```text
CLI Layer
   ↓
Dispatcher
   ↓
Command Handler
   ↓
Application/Data Layer
```

This makes it easier to add commands without turning the entry point into a large conditional block.

## Command Aliases

Frequently used commands have aliases:

```text
list      → ls      → -l
update    → updt    → -u
delete    → del     → -d
done      → mark-d
```

This provides both readable commands and fast terminal shortcuts.

## Exit Codes

The CLI uses:

```text
0 → successful execution
1 → invalid/missing command
```

This is important because shell scripts and automation systems can use exit codes to determine whether a command succeeded.

---

# Future Improvements

Potential improvements include:

* [ ] Command argument validation
* [ ] Better error messages
* [ ] Task filtering
* [ ] Task priorities
* [ ] Due dates
* [ ] Search functionality
* [ ] Interactive task selection
* [ ] Persistent database storage
* [ ] JSON output mode
* [ ] Colored terminal output
* [ ] Configuration file
* [ ] Unit tests
* [ ] Integration tests
* [ ] Shell autocomplete
* [ ] Global installation through npm
* [ ] `--version` command
* [ ] More structured command parsing

---

# Development

Run the TypeScript project during development using the project's development script, if configured:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run the compiled CLI:

```bash
node dist/index.js <command>
```

---

# Contributing

Contributions are welcome.

A typical contribution workflow:

```bash
git checkout -b feature/my-feature

# Make changes

npm test

git add .
git commit -m "feat: add my feature"

git push origin feature/my-feature
```

Then open a pull request.

---

# License

Add your project's license information here.

For example:

```text
MIT License
```

---

## Summary

This project follows a simple but extensible CLI architecture:

```text
User
 │
 │ CLI command
 ▼
Argument Parser / Entry Point
 │
 ▼
Dispatcher
 │
 ├── Add
 ├── List
 ├── Update
 ├── Delete
 ├── Mark In Progress
 ├── Mark Done
 └── Delete All
 │
 ▼
Task Management Logic
 │
 ▼
Storage
```

The main architectural principle is **separation of command routing from command implementation**. This keeps the dispatcher small and allows new functionality to be added as independent command modules.
