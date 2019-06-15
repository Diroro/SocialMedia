enum ResponseType {
  'SUCCESS',
  'ERROR'
}

interface IResponse {
  type: ResponseType;
  data?: string;
  message?: string;
}

class BaseResponse implements IResponse {
  public type: ResponseType;

  constructor(type: ResponseType = ResponseType.SUCCESS) {
    this.type = type;
  }
}

export class SuccessResponse extends BaseResponse {
  constructor() {
    super(ResponseType.SUCCESS);
  }
}

export class SuccessAddResponse extends SuccessResponse {

}

export class SuccessModifyResponse extends SuccessResponse {

}

export class SuccessDeleteResponse extends SuccessResponse {

}

export interface IPaginationResponse<T> {
  items: T[];
  limit: number;
  offset: number;
  count: number;
}

export class PaginationResponse<T> extends BaseResponse implements IPaginationResponse<T> {
  public items: T[];
  public limit: number;
  public offset: number;
  public count: number;

  constructor(items: T[] = [], limit = 0, offset = 0, count = 0) {
    super();
    this.items = items;
    this.limit = limit;
    this.offset = offset;
    this.count = count;
  }
}

export class ErrorResponse implements IResponse {
  public type: ResponseType;

  constructor() {
    this.type = ResponseType.ERROR;
  }
}

// sign-in  message "You are successfully logged in"
// logout 'You are successfully logged out'
// sign-up 'You have been signed up! data: your

// add media record
// edit
// get
// delete

// like
// unlike
