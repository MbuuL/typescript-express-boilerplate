import { Response } from 'express'

export const handleError = (error: any, response: any, res: Response) => {
  console.error(error)
  switch (error.code) {
    case 11000:
      Object.assign(response, {
        code: 400,
        status: 'Bad Request',
        error: 'Email is already taken!'
      })
      break;
    default:
      Object.assign(response, {
        code: 500,
        status: 'Server Error',
        error: 'Something went wrong with our server!'
      })
      break;
  }
  return res.status(response.code).send(response)
}