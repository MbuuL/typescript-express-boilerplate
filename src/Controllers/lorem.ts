import { Request, Response } from 'express';
import { ResponseSuccess, ResponseError } from '../Interfaces';

export const getLorem = (req: Request, res: Response) => {
  const response: ResponseSuccess | ResponseError = {
    code: 200,
    status: 'OK',
    data: 'Lorem Iposum',
  };
  res.status(response.code).send(response);
};
