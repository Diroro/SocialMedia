interface IResponse {
  message: string;
  data?: string;
}

export class SuccessResponse implements IResponse {
  public message: string;

  constructor() {
    this.message = 'SUCCESS';
  }
}

export class ErrorResponse implements IResponse {
  public message: string;

  constructor() {
    this.message = 'ERROR';
  }
}
