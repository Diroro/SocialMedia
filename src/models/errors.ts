export interface IError {
  statusCode?: number;
  message?: string;
}

export class ApiError extends Error implements IError {
  public statusCode: number;

  constructor(message: string, code?: number) {
    super(message);
    this.statusCode = code || 500;
  }
}
