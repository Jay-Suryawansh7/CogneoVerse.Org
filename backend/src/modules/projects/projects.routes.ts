import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from './projects.controller';
import { requireAuth } from '../../middleware/auth';

const router = Router();

router.get('/', getProjects);
router.get('/:slug', getProject);

router.post('/', requireAuth, createProject);
router.put('/:slug', requireAuth, updateProject);
router.patch('/:slug', requireAuth, updateProject);
router.delete('/:slug', requireAuth, deleteProject);

export default router;
