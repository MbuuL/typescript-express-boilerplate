import { Request, Response, NextFunction } from 'express';
import { ResponseSuccess, ResponseError } from '../Interfaces'

export const baseResponse = (req: Request, res: Response, next: NextFunction) => {
  const response: (ResponseSuccess | ResponseError) = {
    code: 0,
    status: '',
  }
  res.locals.response = response
  return next()
}