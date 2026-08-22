export class StorageCorruptedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StorageCorruptedError";
    Object.setPrototypeOf(this, StorageCorruptedError.prototype);
  }
}