export class TaskNotFoundError extends Error {
  constructor(taskId: number) {
    super(`Task with ID ${taskId} not found.`);
    this.name = "TaskNotFoundError";
  }
}
