import Router from 'express';

const router = Router();

import { createUser, deleteUserById, getAllUsers, getUserById } from '../controllers/userControllers.js';

router.get('/users', getAllUsers);
router.post('/user', createUser);


// router.get('/users/:id', getUserById);
// router.delete('/users/:id',deleteUserById )

router.route('/users/:id')
    .get(getUserById)
    .delete(deleteUserById);

export default router;