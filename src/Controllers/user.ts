import { Request, Response } from 'express'
import * as _ from 'lodash'

export const me = async (req: Request, res: Response) => {
  console.log('masuk controllers')
  const { response, user } = res.locals
  if (user) {
    Object.assign(response, {
      code: 200,
      status: 'OK',
      data: {
        name: user.name,
        email: user.email
      }
    })
    return res.status(response.code).send(response)
  }
  Object.assign(response, {
    code: 500,
    status: 'SERVER ERROR',
    error: 'Something went horribly wrong'
  })
  return res.status(response.code).send(response)
}