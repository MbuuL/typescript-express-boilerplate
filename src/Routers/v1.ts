import { Router, Response, Request } from 'express';
import { ResponseError, ResponseSuccess } from '../Interfaces';

const router = Router();

router.get('*', (req: Request, res: Response) => {
  const response: ResponseError | ResponseSuccess = {
    code: 404,
    status: 'Not Found',
    error: `${req.headers.host}${req.originalUrl} is not here`,
  };
  res.status(404).send(response);
});

export { router as v1 };
