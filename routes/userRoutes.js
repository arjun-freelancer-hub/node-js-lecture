import Router from 'express';

const router = Router();

import { createUser, deleteUserById, getAllUsers, getUserById, loginUser } from '../controllers/userControllers.js';
import { authenticate } from '../middleware/auth.js';

router.get('/users', authenticate, getAllUsers);
router.post('/user', createUser);


// router.get('/users/:id', getUserById);
// router.delete('/users/:id',deleteUserById )

router.route('/users/:id')
    .get(authenticate,getUserById)
    .delete(deleteUserById);

    router.route('/login').post(loginUser);

export default router;