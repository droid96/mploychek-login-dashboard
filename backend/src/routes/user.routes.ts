import express from 'express';

import {
fetchUsers,
createUser,
removeUser,
editUser
} from '../controllers/user.controller';

import {
verifyToken
} from '../middlewares/auth.middleware';

const router = express.Router();

router.get(
    '/',
    verifyToken,
    fetchUsers
    );

router.post(
    '/',
    verifyToken,
    createUser
    );

router.delete(
    '/:id',
    verifyToken,
    removeUser
    );

router.put(
    '/:id',
    verifyToken,
    editUser
    );

export default router;