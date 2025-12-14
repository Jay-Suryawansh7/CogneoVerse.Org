import { Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { toJSON } from '../../utils/bigint';
import slugify from 'slugify';

// List
export const getDepartments = async (req: Request, res: Response) => {
  console.log('GET /departments hit');
  try {
  const departments = await prisma.departments_department.findMany({
    where: { published: true },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      hero_image: true,
      published: true,
      created_at: true,
      updated_at: true
      // Exclude heavy JSON fields: blocks, team, resources
    }
  });
  res.json(toJSON(departments));
  } catch (err) {
    console.error('Error in getDepartments:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Retrieve
export const getDepartment = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const department = await prisma.departments_department.findFirst({
    where: { slug },
  });
  if (!department) {
    return res.status(404).json({ error: 'Department not found' });
  }
  res.json(toJSON(department));
};

// Create
export const createDepartment = async (req: Request, res: Response) => {
  const data = req.body;
  
  if (!data.slug && data.title) {
    data.slug = slugify(data.title, { lower: true });
  }

  // Handle BigInt logic or let Prisma handle default autoincrement
  // Prisma types expect strict inputs.
  // We need to map optional fields.
  
  try {
    const department = await prisma.departments_department.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description || '',
        hero_image: data.hero_image || null,
        blocks: data.blocks || [],
        team: data.team || [],
        resources: data.resources || [],
        published: data.published || false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    res.status(201).json(toJSON(department));
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create department' });
  }
};

// Update
export const updateDepartment = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const data = req.body;

  try {
    const department = await prisma.departments_department.findFirst({
        where: { slug }
    });

    if (!department) return res.status(404).json({error: "Not found"});

    const updated = await prisma.departments_department.update({
      where: { id: department.id },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
    res.json(toJSON(updated));
  } catch (error) {
    res.status(500).json({ error: 'Failed to update department' });
  }
};

// Delete
export const deleteDepartment = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const department = await prisma.departments_department.findFirst({
        where: { slug }
    });

    if (!department) return res.status(404).json({error: "Not found"});

    await prisma.departments_department.delete({
      where: { id: department.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete department' });
  }
};
