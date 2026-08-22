# CLI Design

## Command Pipeline

A command follows this general flow:

```text
User
 ↓
Shell
 ↓
Node.js process
 ↓
process.argv
 ↓
CLI entry point
 ↓
Dispatcher
 ↓
Command handler
 ↓
Application service