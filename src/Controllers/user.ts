import { Request, Response } from 'express'
import * as _ from 'lodash'
import { Users } from '../Models'
import { ResponseSuccess, ResponseError } from '../Interfaces'
import { hashing, verifyHash } from '../Helpers'

export const register = async (req: Request, res: Response) => {
  const { body } = req
  const { email, name, password } = body
  let response: (ResponseSuccess | ResponseError)
  if (_.isEmpty(email)) {
    response = {
      code: 400,
      status: 'Bad Request',
      error: 'Email is required'
    }
    return res.status(response.code).send(response)
  }
  if (_.isEmpty(password)) {
    response = {
      code: 400,
      status: 'Bad Request',
      error: 'Password is required'
    }
    return res.status(response.code).send(response)
  }
  try {
    await Users.create({
      email, name, password: hashing(password)
    })
    response = {
      code: 201,
      status: 'Created',
      data: 'Registeration Success'
    }
    return res.status(response.code).send(response)
  } catch (error) {
    console.error(error.code)
    switch (error.code) {
      case 11000:
        response = {
          code: 400,
          status: 'Bad Request',
          error: 'Email is already taken!'
        }
        break;
      default:
        response = {
          code: 500,
          status: 'Server Error',
          error: 'Something went wrong with our server!'
        }
        break;
    }
    return res.status(response.code).send(response)
  }
}

export const login = async (req: Request, res: Response) => {
  const { body } = req
  const { email, password } = body
  let response: (ResponseSuccess | ResponseError)
  if (_.isEmpty(email)) {
    response = {
      code: 400,
      status: 'Bad Request',
      error: 'Email is required'
    }
    return res.status(response.code).send(response)
  }
  if (_.isEmpty(password)) {
    response = {
      code: 400,
      status: 'Bad Request',
      error: 'Password is required'
    }
    return res.status(response.code).send(response)
  }
  const user = await Users.findOne({ email })
  if (!user) {
    response = {
      code: 400,
      status: 'Bad Request',
      error: 'Wrong email and password combination!'
    }
    return res.status(response.code).send(response)
  }
  const isVerified = verifyHash(password, user.password)
  if (!isVerified) {
    response = {
      code: 400,
      status: 'Bad Request',
      error: 'Wrong email and password combination!'
    }
    return res.status(response.code).send(response)
  }
  response = {
    code: 200,
    status: 'OK',
    data: {
      name: user.name,
      email: user.email
    }
  }
  return res.status(response.code).send(response)
}