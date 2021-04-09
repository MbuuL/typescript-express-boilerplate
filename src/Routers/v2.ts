import { Router } from 'express';
import { getLorem } from '../Controllers';

const v2 = Router();

v2.get('/lorem', getLorem);

export { v2 };
