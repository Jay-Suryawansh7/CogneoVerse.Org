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
      include: {
        projects_project_related_departments: {
          include: {
            projects_project: {
              select: {
                status: true
              }
            }
          }
        }
      }
    });

    const enhancedDepartments = departments.map(dept => {
      const projects = dept.projects_project_related_departments.map(r => r.projects_project);
      const total_projects = projects.length;
      const completed_projects = projects.filter(p => p.status === 'completed').length;
      const drafts = projects.filter(p => p.status === 'planned' || p.status === 'draft').length;
      // Active = everything else? Or specifically 'active' + 'building'?
      // Let's assume active is total - completed - drafts for simplicity or count specifically.
      // Usually active is explicitly 'active' or 'in-progress'.
      const active_projects = projects.filter(p => ['active', 'in-progress', 'building'].includes(p.status)).length;
      
      const team_size = Array.isArray(dept.team) ? dept.team.length : 0;

      // Remove the heavy relation object before sending, but keep the IDs? 
      // Actually we just want the stats.
      const { projects_project_related_departments, ...rest } = dept;

      return {
        ...rest,
        total_projects,
        completed_projects,
        drafts,
        active_projects,
        team_size
      };
    });

    res.json(toJSON(enhancedDepartments));
  } catch (err) {
    console.error('Error in getDepartments:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err instanceof Error ? err.message : String(err) });
  }
};

// Retrieve
export const getDepartment = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const department = await prisma.departments_department.findFirst({
    where: { slug },
    include: {
        projects_project_related_departments: {
            include: {
                projects_project: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        summary: true,
                        status: true,
                        tags: true
                    }
                }
            }
        }
    }
  });
  if (!department) {
    return res.status(404).json({ error: 'Department not found' });
  }

  const projects = department.projects_project_related_departments.map(r => r.projects_project);

  const enhancedDepartment = {
      ...department,
      projects, // Include full projects list for details page
      total_projects: projects.length,
      completed_projects: projects.filter(p => p.status === 'completed').length,
      drafts: projects.filter(p => p.status === 'planned' || p.status === 'draft').length,
      active_projects: projects.filter(p => ['active', 'in-progress', 'building'].includes(p.status)).length,
      team_size: Array.isArray(department.team) ? department.team.length : 0
  };

  // Remove the join table
  // @ts-ignore
  delete enhancedDepartment.projects_project_related_departments;

  res.json(toJSON(enhancedDepartment));
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
