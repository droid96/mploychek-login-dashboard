import fs from 'fs';

import path from 'path';

const usersPath = path.join(
  __dirname,
  '../database/users.json'
);

export const getUsers = () => {

  return JSON.parse(
    fs.readFileSync(
      usersPath,
      'utf-8'
    )
  );
};

export const saveUsers = (
  users: any
) => {

  fs.writeFileSync(
    usersPath,
    JSON.stringify(users, null, 2)
  );
};

// export const addUser = (
//   userData: any
// ) => {

//   const users = getUsers();

//   const newUser = {

//     id: Date.now(),

//     username: userData.username,

//     password: userData.password,

//     role: userData.role
//   };

//   users.push(newUser);

//   saveUsers(users);

//   return newUser;
// };
export const addUser = (
  userData: any
) => {

  const users = getUsers();

  // CHECK EMPTY VALUES
  if (
    !userData.username ||
    !userData.password ||
    !userData.role
  ) {

    throw new Error(
      'All fields are required'
    );
  }

  // CHECK VALID ROLE
  const validRoles = [
    'Admin',
    'General User'
  ];

  if (
    !validRoles.includes(
      userData.role
    )
  ) {

    throw new Error(
      'Invalid role'
    );
  }

  // CHECK DUPLICATE USERNAME
  const existingUser = users.find(
    (user: any) =>

      user.username
        .toLowerCase()
        ===
      userData.username
        .toLowerCase()
  );

  if (existingUser) {

    throw new Error(
      'Username already exists'
    );
  }

  // CREATE NEW USER
  const newUser = {

    id: Date.now(),

    username: userData.username,

    password: userData.password,

    role: userData.role
  };

  users.push(newUser);

  saveUsers(users);

  return newUser;
};

export const deleteUser = (
  id: number
) => {

  let users = getUsers();

  users = users.filter(
    (user: any) => user.id !== id
  );

  saveUsers(users);
};
export const updateUserService = (
  id: number,
  updatedData: any
) => {

  const users = getUsers();

  const updatedUsers = users.map(
    (user: any) => {

      if (user.id === id) {

        return {

          ...user,

          username:
            updatedData.username,

          password:
            updatedData.password,

          role:
            updatedData.role
        };
      }

      return user;
    }
  );

  saveUsers(updatedUsers);
};