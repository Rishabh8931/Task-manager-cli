task add "Learn TypeScript"<br>
│
▼
process.argv<br>
│
▼
index.ts<br>
│
▼
dispatcher<br>
│
▼
addCommand()<br>
│
▼
validation<br>
---

## flow
CLI Entry Point
      ↓
Command Dispatcher
      ↓
Command Handler
      ↓
Task Domain
---


      Task Domain

The task domain represents the core concept of the application.
It is independent of the CLI and storage implementation.

Task:

- id
- description
- status
- createdAt
- updatedAt

Valid statuses:

- todo
- in-progress
- done
