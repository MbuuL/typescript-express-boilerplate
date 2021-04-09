import { Router } from 'express';
import { getLorem, register, login } from '../Controllers';

const v2 = Router();

v2.get('/lorem', getLorem);
v2.post('/register', register)
v2.post('/login', login)

export { v2 };
