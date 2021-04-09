export interface ResponseError {
  code: number;
  status: string;
  errors?: Array<any | ErrorConstructor> | ErrorConstructor;
  error?: string | ErrorConstructor;
}

export interface ResponseSuccess {
  code: number;
  status: string;
  data: ObjectConstructor | Array<string | number | ObjectConstructor> | string;
}
