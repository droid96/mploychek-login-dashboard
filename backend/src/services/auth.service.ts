
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const usersPath = path.join(__dirname, '../database/users.json');

export const loginUser = (
  username: string,
  password: string,
  role: string
) => {

  const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

  const user = users.find(
    (u: any) =>
      u.username === username &&
      u.password === password &&
      u.role === role
  );

  if (!user) {
    return null;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  return { token, user };
};
