import { Router } from 'express';
import { upload } from '../../lib/cloudinary';
import { getMedia, createMedia, deleteMedia } from './media.controller';
import { requireAuth } from '../../middleware/auth';

const router = Router();

router.get('/', getMedia);
router.post('/', requireAuth, upload.single('file'), createMedia);
router.delete('/:id', requireAuth, deleteMedia);

export default router;
