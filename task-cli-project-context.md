# Task CLI — Project Context & Source of Truth

> **Purpose:** This document is the canonical context for the Task CLI project.  
> If the project discussion loses context, becomes inconsistent, or architectural decisions are forgotten, use this document to realign the work.

---

## 1. Project Vision

We are building a **production-quality, local-first task manager** as a **TypeScript CLI application**, eventually distributed through the **npm registry**.

This is intentionally more ambitious than a basic beginner Task Tracker exercise.

The project has two user interfaces:

1. **Command-based CLI**
2. **Interactive TUI (Terminal User Interface)**

Both interfaces must use the same underlying task/application/storage core.

The goal is not only to finish the application. The project is also a learning vehicle for understanding:

- How CLI applications work under the hood
- How terminals and processes work
- Node.js filesystem APIs
- TypeScript architecture
- Persistent data storage
- Clean separation of concerns
- Testing
- Linting and formatting
- Git practices
- CI
- Documentation
- npm packaging
- TUI development
- Production-quality software engineering

---

# 2. Explicit Scope Boundary

## AI / Agents

**AI agents, Claude agents, autonomous agents, LLM integrations, and agent functionality are OUT OF SCOPE for the current project.**

Do not introduce agent concepts into:

- Architecture
- Domain model
- Commands
- Storage
- Roadmap
- Dependencies
- APIs

The fact that the project may eventually be useful to an AI agent is irrelevant to the current implementation.

First build a solid task application.

Only consider agent-related functionality after the core product is complete and stable, and only as a deliberate future project decision.

---

# 3. Product Goals

The application should allow a user to:

- Add tasks
- Update tasks
- Delete tasks
- Mark tasks as in progress
- Mark tasks as done
- List all tasks
- List only todo tasks
- List only in-progress tasks
- List only completed tasks
- Eventually interact with tasks through a keyboard-driven TUI

The application should feel like a polished terminal product rather than a raw script.

---

# 4. Intended User Experience

## Command Mode

Examples:

```bash
task add "Learn TypeScript"

task update 1 "Learn TypeScript deeply"

task delete 1

task mark-in-progress 1

task mark-done 1

task list

task list todo

task list done

task list in-progress
```

The command interface should be suitable for:

- Human terminal usage
- Shell scripts
- Automation
- Unix-style workflows

---

## Interactive TUI Mode

Eventually:

```bash
task
```

should launch an interactive terminal interface.

Conceptual example:

```text
╭─────────────────────────────────────────────────────────╮
│                     TASK CLI                            │
│                                                         │
│  8 Tasks                       3 Completed              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  TODAY                                                  │
│                                                         │
│  > ○ Learn TypeScript                                   │
│    ◉ Build CLI                                          │
│    ○ Learn Rust                                         │
│    ✓ Finish DSA                                         │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ↑↓ Navigate   Enter View   a Add   d Delete   q Quit   │
╰─────────────────────────────────────────────────────────╯
```

The TUI is **not a GUI**.

It is a terminal interface built using:

- Terminal characters
- stdin
- stdout
- keyboard input
- ANSI escape sequences
- terminal dimensions
- cursor control

The TUI and command mode must share the same application logic.

---

# 5. Core Task Model

Every task contains:

```text
id
description
status
createdAt
updatedAt
```

Valid statuses:

```text
todo
in-progress
done
```

Conceptual JSON:

```json
[
  {
    "id": 1,
    "description": "Learn TypeScript",
    "status": "todo",
    "createdAt": "2026-08-13T16:40:12.000Z",
    "updatedAt": "2026-08-13T16:40:12.000Z"
  }
]
```

The exact TypeScript representation will be decided during implementation.

---

# 6. Persistence

The initial storage mechanism is:

**Local JSON file**

Requirements:

- Use the native Node.js filesystem APIs.
- The file must be created automatically if it does not exist.
- Data must persist between CLI executions.
- The application should handle malformed or inaccessible storage gracefully.
- The storage implementation should not leak into the application/business layer unnecessarily.

The JSON file is an **implementation detail**.

The normal user experience should never require the user to manually edit the JSON file.

However, local JSON is not genuinely secret. A user who owns the machine can ultimately inspect the file.

Correct concept:

> Hide implementation details, not security-sensitive data.

---

# 7. Target Architecture

The conceptual architecture is:

```text
                         USER
                          │
                          ▼
                 ┌─────────────────┐
                 │ Terminal / CLI  │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Command Parser  │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Command Handler │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │  Task Service   │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Task Domain     │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Task Repository │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ JSON Storage    │
                 └────────┬────────┘
                          │
                          ▼
                     tasks.json
```

The TUI is another presentation layer:

```text
                    ┌──────────────┐
                    │ Command CLI  │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ Application  │
                    │    Core      │
                    └──────┬───────┘
                           ▲
                           │
                    ┌──────┴───────┐
                    │              │
              ┌─────┴─────┐  ┌────┴─────┐
              │    TUI    │  │ Commands │
              └───────────┘  └──────────┘
```

The important architectural rule is:

> **Presentation code should not contain task business logic or directly manipulate the JSON file.**

---

# 8. Repository Abstraction

The application should eventually depend on a repository abstraction rather than directly depending on JSON.

Conceptually:

```ts
interface TaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: number): Promise<Task | null>;
  create(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  delete(id: number): Promise<void>;
}
```

This is conceptual, not a requirement to copy this exact interface.

The architecture should allow:

```text
TaskService
     │
     ▼
TaskRepository
     │
     ├── JsonTaskRepository
     │
     └── Future storage implementation
```

For example, a future SQLite implementation could replace JSON without forcing the task service to know about SQLite.

Do not implement additional storage backends until there is a real reason.

---

# 9. Engineering Philosophy

The project should follow:

```text
Understand
    ↓
Design
    ↓
Implement
    ↓
Test
    ↓
Review
    ↓
Refactor
    ↓
Document
```

Every meaningful feature should go through this process.

Do not rush directly from requirement → code.

The user specifically wants to understand **how things work under the hood**.

---

# 10. Do Not Over-Engineer

This project should be production-quality, but it should not become fake enterprise architecture.

Avoid creating huge structures such as:

```text
src/
├── application/
│   ├── use-cases/
│   ├── ports/
│   └── ...
├── domain/
│   ├── entities/
│   ├── value-objects/
│   └── ...
├── infrastructure/
│   ├── adapters/
│   └── ...
└── presentation/
```

before the project needs them.

Instead:

> **Start simple. Observe complexity. Introduce abstractions when they solve an actual problem.**

Architecture should evolve with the application.

---

# 11. TypeScript Standards

The project uses **TypeScript**.

TypeScript should be used seriously, not simply as JavaScript with type annotations.

Learning goals include:

- Strict TypeScript configuration
- Interfaces
- Type aliases
- Union types
- Type narrowing
- Generics where justified
- `unknown`
- Error modeling
- Module boundaries
- Explicit public APIs
- Safe handling of external/input data

Avoid unnecessary `any`.

The type system should help enforce architectural boundaries.

---

# 12. CLI Fundamentals to Learn

Before implementing the actual task features, understand what happens when the user types:

```bash
task add "Learn TypeScript"
```

and presses Enter.

The conceptual pipeline is:

```text
User
  │
  ▼
Shell
  │
  ▼
Executable lookup
  │
  ▼
Operating system process creation
  │
  ▼
Node.js process
  │
  ▼
process.argv
  │
  ▼
TypeScript application
  │
  ├── stdout
  ├── stderr
  └── exit code
  │
  ▼
Terminal
```

This is the immediate learning topic before coding task functionality.

Topics to understand:

- Shell
- Process
- Executable lookup
- Process creation
- `process.argv`
- `stdin`
- `stdout`
- `stderr`
- Exit codes
- Signals
- TTY
- ANSI escape sequences

---

# 13. Filesystem Learning Goals

Learn how Node.js interacts with the filesystem.

Important concepts:

- File paths
- Directory paths
- Current working directory
- User data directory
- File existence
- Reading files
- Writing files
- Creating directories
- JSON serialization
- JSON parsing
- File errors
- Permissions
- Corrupted data
- Atomic/safe writes where appropriate

Use Node.js native filesystem APIs initially.

---

# 14. Error Handling

Expected errors and unexpected errors must be treated differently.

Expected user errors include:

```text
Unknown command
Missing argument
Empty description
Invalid task ID
Task does not exist
Invalid status
```

Infrastructure errors include:

```text
Cannot read storage
Cannot write storage
Permission denied
Malformed JSON
Storage directory unavailable
```

Programming/unexpected errors should not be silently swallowed.

Do not use a giant:

```ts
try {
  // everything
} catch {
  console.log("Something went wrong");
}
```

Instead, errors should be handled at appropriate boundaries.

The CLI should provide clean, useful messages for normal user errors.

---

# 15. Testing Strategy

Testing is a first-class part of the project.

The project should eventually contain multiple test levels.

## Unit tests

Focus on business logic:

```text
Create task
Update task
Delete task
Mark done
Mark in-progress
Filter tasks
Validation
```

Unit tests should avoid unnecessary filesystem dependencies.

---

## Repository / Integration tests

Test real persistence behavior:

```text
Storage file does not exist
Storage file is created
Valid JSON is loaded
Data is saved
Malformed JSON is handled
Missing task is handled
Filesystem errors are handled
```

Use isolated temporary test data rather than corrupting the user's real task data.

---

## CLI / End-to-End tests

Test user-facing behavior where valuable.

Example:

```bash
task add "Learn Rust"
```

should result in:

```text
exit code = 0
```

and appropriate output plus persisted data.

Test invalid commands and failures too.

Do not test implementation details unnecessarily.

---

# 16. Linting

Use proper linting.

The goal is not merely:

> Make ESLint happy.

The goal is:

> Catch bugs and enforce consistent engineering decisions.

Eventually the project should have commands similar to:

```bash
pnpm lint
pnpm lint:fix
```

The exact package manager and tooling will be decided during setup.

TypeScript-aware linting should be used where useful.

---

# 17. Formatting

Formatting is separate from linting.

Eventually:

```bash
pnpm format
pnpm format:check
```

Formatting should be automated.

Do not waste development time manually debating whitespace or semicolon preferences.

---

# 18. Git Standards

Use meaningful commits.

Examples:

```text
feat: add task creation
fix: handle missing task file
test: add task service tests
refactor: extract task repository
docs: update CLI usage
```

Learn and practice:

- Commits
- Branches
- Clean history
- Feature-oriented changes
- Pull-request-style thinking
- Changelog management

---

# 19. Documentation

The project should have a strong README.

Eventually it should cover:

```text
What the project is
Installation
Quick start
Command reference
Interactive mode
Storage behavior
Configuration
Development
Testing
Architecture
Contributing
License
```

Useful documentation can include:

```text
docs/
├── architecture.md
├── cli-design.md
├── storage.md
└── testing.md
```

Do not create documentation files just for the sake of having files. Add them when they provide meaningful value.

Document important **decisions and reasons**, not obvious code.

---

# 20. CI

Eventually GitHub CI should perform something similar to:

```text
Push / Pull Request
        │
        ▼
Install dependencies
        │
        ▼
Typecheck
        │
        ▼
Lint
        │
        ▼
Tests
        │
        ▼
Build
        │
        ▼
Success / Failure
```

CI is part of the definition of a healthy project.

---

# 21. npm Packaging

The final application should be distributable as an npm package.

A user should eventually be able to do something like:

```bash
npm install -g <package-name>
```

and then:

```bash
task --help
task --version
task list
```

The package should expose the CLI executable through the npm `bin` mechanism.

The user should understand:

```text
npm package
    │
    ▼
package.json
    │
    └── bin
          │
          ▼
        task
          │
          ▼
      Node.js entry point
```

Publishing and release management are part of the later project phases.

---

# 22. Semantic Versioning

The project should eventually follow semantic versioning:

```text
MAJOR.MINOR.PATCH
```

For example:

```text
1.0.0
│ │ │
│ │ └── Patch: backward-compatible bug fix
│ └──── Minor: backward-compatible feature
└────── Major: breaking change
```

Maintain:

```text
CHANGELOG.md
```

when releases become relevant.

---

# 23. Suggested Project Structure

The final structure should evolve naturally.

A possible target:

```text
task-cli/
│
├── src/
│   ├── cli/
│   ├── commands/
│   ├── application/
│   ├── domain/
│   ├── infrastructure/
│   └── ui/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/
│
├── scripts/
│
├── package.json
├── tsconfig.json
├── eslint.config.ts
├── prettier.config.ts
├── vitest.config.ts
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
└── .gitignore
```

This is a **possible destination**, not a requirement to create every directory immediately.

---

# 24. Development Roadmap

## Phase 1 — Terminal and OS Fundamentals

Understand:

```text
Terminal
Shell
Process
Executable lookup
Process creation
Node.js process
process.argv
stdin
stdout
stderr
exit codes
TTY
ANSI escape sequences
```

Immediate lesson:

```bash
task add "Learn TypeScript"
```

→ understand exactly how the program receives the command and arguments.

**No task implementation yet.**

---

## Phase 2 — TypeScript CLI Foundation

Build the smallest possible TypeScript executable.

Learn:

- Project setup
- TypeScript compilation
- Node.js execution
- Entry points
- `process.argv`
- Basic argument handling
- Exit codes

---

## Phase 3 — Command Parsing

Design and implement:

```text
add
update
delete
list
mark-in-progress
mark-done
```

Learn:

- Positional arguments
- Validation
- Command dispatch
- Help output
- Unknown command handling

---

## Phase 4 — Task Domain

Define the task model and business rules.

Learn:

- Domain types
- Status modeling
- Validation
- IDs
- Timestamps
- Business logic

---

## Phase 5 — Filesystem + JSON Storage

Implement local persistence.

Learn:

- Node filesystem APIs
- Paths
- JSON serialization
- JSON parsing
- Missing files
- Corrupt files
- Write errors
- Data integrity

---

## Phase 6 — Repository Architecture

Introduce the repository abstraction once the need is clear.

Learn:

- Dependency inversion
- Interfaces
- Separation of concerns
- Testability

---

## Phase 7 — Command Application Layer

Connect commands to the task service.

Learn:

```text
CLI
 ↓
Command
 ↓
Application service
 ↓
Repository
 ↓
Storage
```

---

## Phase 8 — Terminal UI

Make the output polished.

Learn:

- ANSI colors
- Cursor movement
- Terminal dimensions
- Tables
- Icons
- Formatting
- Loading states where useful
- Clean errors
- Terminal redraw

Do not add visual complexity merely for decoration.

---

## Phase 9 — Interactive TUI

Running:

```bash
task
```

can launch the interactive terminal interface.

Learn:

- Raw keyboard input
- Navigation
- Selection
- Rendering loops
- Terminal state
- Cleanup
- Ctrl+C / signals
- Resize handling

---

## Phase 10 — npm Package

Learn:

- `package.json`
- `bin`
- Package metadata
- Build output
- npm publishing
- Versioning
- Release workflow

---

## Phase 11 — CI and Production Polish

Add:

- CI
- Full automated test suite
- Linting
- Formatting
- Type checking
- Build checks
- Documentation
- Changelog
- Release process

---

# 25. Non-Goals

For the current project, do NOT add:

```text
AI
AI agents
Claude integration
LLM APIs
Cloud synchronization
Authentication
User accounts
Remote API
Web application
Mobile application
PostgreSQL
SQLite
Real-time collaboration
Multi-user support
```

These are separate future ideas.

Keep the core project focused.

---

# 26. Definition of Done

The project is considered complete when:

- [ ] CLI is implemented in TypeScript
- [ ] Commands work correctly
- [ ] Task data persists locally
- [ ] JSON file is created automatically
- [ ] Task statuses work
- [ ] Errors are handled cleanly
- [ ] Command mode is polished
- [ ] TUI is implemented
- [ ] Unit tests exist
- [ ] Integration tests exist
- [ ] Useful CLI/e2e tests exist
- [ ] TypeScript strict checking passes
- [ ] ESLint passes
- [ ] Formatting checks pass
- [ ] Build succeeds
- [ ] CI passes
- [ ] README is complete
- [ ] Architecture is documented
- [ ] npm package works
- [ ] `task --help` works
- [ ] `task --version` works
- [ ] Release/versioning process is documented

---

# 27. Rules for Future Development Sessions

When continuing this project:

1. **Do not hallucinate previous decisions.**
2. **Use this document as the source of truth.**
3. **Do not introduce AI/agent functionality unless explicitly brought back into scope later.**
4. **Do not jump to code when the user asks to understand a concept first.**
5. **Explain the underlying mechanism before hiding it behind a library.**
6. **Prefer native Node.js APIs while learning fundamentals.**
7. **Do not introduce external dependencies without explaining what problem they solve.**
8. **Do not over-engineer.**
9. **Keep architecture proportional to project complexity.**
10. **Every meaningful feature should be tested.**
11. **Production-quality standards apply: linting, formatting, type checking, tests, CI, documentation, and clean Git practices.**
12. **Keep the command CLI and TUI as presentation layers over the same application core.**
13. **Storage should remain behind a repository boundary once that abstraction is justified.**
14. **Do not expose internal storage details as part of normal CLI UX.**
15. **When uncertain, stop and reason from this document instead of inventing a new architectural direction.**

---

# 28. Current State

**Current phase:** Phase 1 — Terminal and OS Fundamentals

**Current task:** Learn exactly what happens when a user enters:

```bash
task add "Learn TypeScript"
```

into a terminal.

The next conceptual pipeline to study is:

```text
User
  ↓
Terminal
  ↓
Shell
  ↓
Executable lookup
  ↓
Operating system process creation
  ↓
Node.js
  ↓
process.argv
  ↓
TypeScript CLI
  ↓
stdout / stderr
  ↓
Exit code
  ↓
Terminal
```

**No task feature implementation should begin until this foundation is understood.**

---

# 29. Core Mental Model

The most important model for the entire project:

```text
                  USER
                    │
                    ▼
              Terminal Input
                    │
                    ▼
                 CLI/TUI
                    │
                    ▼
             Application Core
                    │
                    ▼
              Task Domain
                    │
                    ▼
             Task Repository
                    │
                    ▼
             Local JSON Storage
                    │
                    ▼
               File System
```

The application should hide unnecessary implementation details from the user while remaining transparent and understandable to the developer.

The project is both:

> **a useful task manager**

and:

> **a structured learning project for real-world TypeScript/Node.js software engineering.**
