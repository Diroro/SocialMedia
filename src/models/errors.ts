export interface IError {
  statusCode?: number;
  message?: string;
}

export class ApiError extends Error implements IError {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(message?: string, code?: number) {
    const errorMessage = message || 'Something went wrong';
    super(errorMessage);
    this.statusCode = code || 500;
  }
}

export class AuthException extends ApiError {
  constructor(message?: string) {
    const status = 401;
    const errorMessage = message || 'Not authenticated';
    super(errorMessage, status);
  }
}

export class BadRequestException extends ApiError {
  constructor(message?: string) {
    const status = 400;
    const errorMessage = message || 'Incorrect Request';
    super(errorMessage, status);
  }
}

export class ForbiddenException extends ApiError {
  constructor(message?: string) {
    const status = 403;
    const errorMessage = message || 'Forbidden request';
    super(errorMessage, status);
  }
}
