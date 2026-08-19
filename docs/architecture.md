# Architecture

Task CLI follows a layered architecture where the terminal interface,
application logic, domain model, and persistence are separated.

## Current Architecture

```text
                    User
                     │
                     ▼
                Terminal / CLI
                     │
                     ▼
                 index.ts
                     │
                     ▼
                Dispatcher
                     │
                     ▼
              Command Handler
                     │
                     ▼
                TaskService
                     │
                     ▼
              TaskRepository
                     │
              ┌──────┴──────┐
              ▼             ▼
      MemoryTaskRepository  JsonTaskRepository
              │             │
              ▼             ▼
             RAM        Local JSON file

```
---

# Layers

- CLI / Presentation Layer:<br>
    The CLI is responsible for interacting with the user.<br>
    Responsibilities include:
    - Reading command-line arguments
    - Dispatching commands
    - Validating command-specific input
    - Displaying results and errors
    The CLI should not directly manage persistent task data.

