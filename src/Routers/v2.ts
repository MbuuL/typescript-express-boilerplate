import { Router } from 'express';
import { JSONSchemaType } from 'ajv'
import { getLorem, register, login, me } from '../Controllers';
import { baseResponse, validator, validateAuth } from '../Middlewares'

const v2 = Router();
interface Auth {
  email: string,
  password: string,
  name?: string
}

const schema: JSONSchemaType<Auth> = {
  type: 'object',
  properties: {
    email: { type: 'string', minLength: 1 },
    password: { type: 'string', minLength: 1 },
    name: { type: 'string', nullable: true }
  },
  required: ['email', 'password']
}

v2.get('/lorem', getLorem);
v2.post('/register', baseResponse, validator(schema), register)
v2.post('/login', baseResponse, validator(schema), login)
v2.get('/me', baseResponse, validateAuth, me)

export { v2 };
