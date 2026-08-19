---






# Storage

Task CLI initially uses a local JSON file for persistent storage.

## Why JSON?

JSON was selected for the initial storage implementation because it is:

- Simple
- Human-readable
- Easy to inspect during development
- Supported directly by Node.js
- Suitable for the current scale of the application

The storage implementation can be replaced later without changing the
application layer because persistence is accessed through `TaskRepository`.

---

## Storage Architecture

```text
TaskService
     ↓
TaskRepository
     ↓
JsonTaskRepository
     ↓
Local JSON file

```

## JSON Representation

```JSON
[
  {
    "id": 1,
    "description": "Learn TypeScript",
    "status": "todo",
    "createdAt": "2026-08-19T10:00:00.000Z",
    "updatedAt": "2026-08-19T10:00:00.000Z"
  }
]
```

# Serialization

### When saving:

```md
Task[]
↓
JSON.stringify()
↓
JSON string
↓
File
```

### When loading:

```md
File
↓
JSON string
↓
JSON.parse()
↓
Task[]
```
