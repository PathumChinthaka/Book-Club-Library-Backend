export class ThrowError extends Error {
  statusCode: number;
  data: any;

  constructor(
    message = "Something went wrong",
    statusCode = 400,
    data: any = {}
  ) {
    super(message);
    this.name = "ThrowError";
    this.statusCode = statusCode;
    this.data = data;

    Object.setPrototypeOf(this, ThrowError.prototype);
  }
}
