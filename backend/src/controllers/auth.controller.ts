
import { Request, Response } from 'express';
import { loginUser } from '../services/auth.service';
import { delay } from '../utils/delay';

export const login = async (req: Request, res: Response) => {

  const { username, password, role } = req.body;

  await delay(2000);

  const result = loginUser(username, password, role);

  if (!result) {
    return res.status(401).json({
      message: 'Invalid credentials'
    });
  }

  res.json(result);
};
