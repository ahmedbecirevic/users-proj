import { Router } from 'express';
import { create, getAll, getById, remove, update } from './userController';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/', update);
router.delete('/:id', remove);

export default router;
