// routes/userRoutes.js

import express from 'express';
import { createUser, getUsers, getUserByID, updateUser, deleteUser } from '../controllers/userControllers.mjs';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserByID);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
