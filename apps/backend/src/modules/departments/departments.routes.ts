import { Router } from 'express';
import {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from './departments.controller';
import { requireAuth } from '../../middleware/auth';

const router = Router();

// Public read access
router.get('/', getDepartments);
router.get('/:slug', getDepartment);

// Protected write access
router.post('/', requireAuth, createDepartment);
router.put('/:slug', requireAuth, updateDepartment);
router.patch('/:slug', requireAuth, updateDepartment);
router.delete('/:slug', requireAuth, deleteDepartment);

export default router;
