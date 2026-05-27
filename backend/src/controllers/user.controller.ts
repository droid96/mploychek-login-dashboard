import {
  Request,
  Response
} from 'express';

import {
  getUsers,
  addUser,
  deleteUser,
  updateUserService
} from '../services/user.service';

export const fetchUsers = async (
  req: Request,
  res: Response
) => {

  await new Promise(resolve =>
    setTimeout(resolve, 2000)
  );

  const users = getUsers();

  res.json(users);
};

export const createUser = (
  req: Request,
  res: Response
) => {

  try {

    const newUser = addUser(
      req.body
    );

    res.json({

      message: 'User added',

      user: newUser
    });

  } catch (error: any) {

    res.status(400).json({

      message: error.message
    });
  }
};

export const removeUser = (
  req: Request,
  res: Response
) => {

  deleteUser(
    Number(req.params.id)
  );

  res.json({
    message: 'User deleted'
  });
};

export const editUser = (
  req: Request,
  res: Response
) => {

  updateUserService(
    Number(req.params.id),
    req.body
  );

  res.json({
    message: 'User updated'
  });
};