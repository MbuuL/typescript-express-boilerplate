import { Request, Response } from 'express'
import * as _ from 'lodash'
import { Users } from '../Models'
import { hashing, verifyHash } from '../Helpers'

export const register = async (req: Request, res: Response) => {
  const { body: { email, name, password } } = req
  const response = res.locals.response
  try {
    await Users.create({
      email, name, password: hashing(password)
    })
    Object.assign(response, {
      code: 201,
      status: 'Created',
      data: 'Registeration Success'
    })
    return res.status(response.code).send(response)
  } catch (error) {
    console.error(error.code)
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
}

export const login = async (req: Request, res: Response) => {
  const { body: { email, password } } = req
  const response = res.locals.response
  try {
    const user = await Users.findOne({ email })
    if (!user) {
      Object.assign(response, {
        code: 400,
        status: 'Bad Request',
        error: 'Wrong email and password combination!'
      })
      return res.status(response.code).send(response)
    }
    const isVerified = verifyHash(password, user.password)
    if (!isVerified) {
      Object.assign(response, {
        code: 400,
        status: 'Bad Request',
        error: 'Wrong email and password combination!'
      })
      return res.status(response.code).send(response)
    }
    Object.assign(response, {
      code: 200,
      status: 'OK',
      data: {
        name: user.name,
        email: user.email
      }
    })
    return res.status(response.code).send(response)
  } catch (error) {
    console.error(error)
    Object.assign(response, {
      code: 500,
      status: 'Server Error',
      error: 'Something went wrong with our server!'
    })
    return res.status(response.code).send(response)
  }
}