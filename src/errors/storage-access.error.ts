export class StorageAccessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StorageAccessError";
    Object.setPrototypeOf(this, StorageAccessError.prototype);
  }
}