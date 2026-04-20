import express from 'express';
import * as userController from '../controllers/userController.js';
import * as gameController from '../controllers/gameController.js';
import * as registerController from '../controllers/registerController.js';
import * as loginController from '../controllers/loginController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
//Public
router.post('/register', registerController.createUser);
router.post('/login', loginController.logIn);
router.get('/scores', gameController.getScores);

//Private
router.get('/users', authenticateToken, userController.getUsers);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken, userController.deleteUser);

router.post('/scores', authenticateToken, gameController.createScore);

export default router;