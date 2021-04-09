export interface ResponseError {
  code: number;
  status: string;
  errors?: Array<any | ErrorConstructor> | ErrorConstructor;
  error?: string | ErrorConstructor;
}

export interface ResponseSuccess {
  code: number;
  status: string;
  data: {[key: string]: any} | Array<string | number | {[key: string]: any}> | string;
}
