export class ThrowError extends Error {
  statusCode: number;

  constructor(
    message = "Something went wrong",
    statusCode = 400,
  ) {
    super(message);
    this.name = "ThrowError";
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, ThrowError.prototype);
  }
}
