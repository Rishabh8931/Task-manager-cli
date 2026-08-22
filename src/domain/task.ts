export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (!("id" in value) || typeof value.id !== "number") {
    return false;
  }

  if (!("description" in value) || typeof value.description !== "string") {
    return false;
  }

  if (!("status" in value) || !isTaskStatus(value.status)) {
    return false;
  }

  if (!("createdAt" in value) || typeof value.createdAt !== "string") {
    return false;
  }

  if (!("updatedAt" in value) || typeof value.updatedAt !== "string") {
    return false;
  }

  return true;
}

function isTaskStatus(value: unknown): value is TaskStatus {
  return value === "todo" || value === "in-progress" || value === "done";
}