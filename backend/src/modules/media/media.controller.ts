import { Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { toJSON } from '../../utils/bigint';

export const getMedia = async (req: Request, res: Response) => {
    const media = await prisma.media_mediaitem.findMany({
        orderBy: { created_at: 'desc' }
    });
    res.json(toJSON(media));
};

export const createMedia = async (req: Request, res: Response) => {
    const file = req.file;
    const body = req.body;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const media = await prisma.media_mediaitem.create({
            data: {
                title: body.title || file.originalname,
                type: body.type || 'image',
                file: file.filename, // Store public_id or filename
                url: file.path,      // Store full Cloudinary URL
                body: body.body || '',
                author: 'anonymous', // Auth disabled
                published_at: new Date(),
                hero: body.hero === 'true',
                created_at: new Date(),
                updated_at: new Date(),
            }
        });
        res.status(201).json(toJSON(media));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload media' });
    }
};

export const deleteMedia = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.media_mediaitem.delete({
            where: { id: BigInt(id) }
        });
        // Ideally also delete from Cloudinary using API, skipping for parity MVP
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete media' });
    }
};
