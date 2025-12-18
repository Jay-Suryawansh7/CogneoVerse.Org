import { Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { toJSON } from '../../utils/bigint';
import slugify from 'slugify';

export const getProjects = async (req: Request, res: Response) => {
  const projects = await prisma.projects_project.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      summary: true,
      status: true,
      tags: true,
      images: true,
      created_at: true,
      updated_at: true,
      projects_project_related_departments: {
        select: {
          departments_department: {
            select: {
              id: true,
              title: true,
              slug: true
            }
          }
        }
      }
    },
    orderBy: { created_at: 'desc' }
  });
  
  const refinedProjects = projects.map(p => ({
    ...p,
    related_departments: p.projects_project_related_departments
      .map(r => r.departments_department)
      .filter(d => d !== null)
  }));

  res.json(toJSON(refinedProjects));
};

export const getProject = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const project = await prisma.projects_project.findFirst({
    where: { slug },
    include: {
        projects_project_related_departments: {
          include: {
            departments_department: true
          }
        }
      }
  });

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const refinedProject = {
    ...project,
    related_departments: project.projects_project_related_departments
      .map(r => r.departments_department)
      .filter(d => d !== null)
  };

  res.json(toJSON(refinedProject));
};

export const createProject = async (req: Request, res: Response) => {
  const data = req.body;
  
  if (!data.slug && data.title) {
    data.slug = slugify(data.title, { lower: true });
    // Add logic to ensure unique slug if needed
  }

  // Handle departments connection
  const relatedDepartments = data.related_departments || [];
  // Ensure we don't pass this to the create call directly as it expects a diff structure

  // Remove relation fields from data before passing to create
  const { related_departments, ...projectData } = data;

  try {
    const project = await prisma.projects_project.create({
      data: {
        title: projectData.title,
        slug: projectData.slug,
        summary: projectData.summary || '',
        status: projectData.status || 'planned',
        tags: projectData.tags || [],
        blocks: projectData.blocks || [],
        images: projectData.images || [],
        
        // Rich content fields
        tagline: projectData.tagline || '',
        primary_cta: projectData.primary_cta || {},
        secondary_cta: projectData.secondary_cta || {},
        about: projectData.about || {},
        features: projectData.features || [],
        previews: projectData.previews || [],
        technical_specs: projectData.technical_specs || [],
        use_cases: projectData.use_cases || [],
        team: projectData.team || [],
        roadmap: projectData.roadmap || [],
        related_projects_data: projectData.related_projects_data || [],
        platform_metadata: projectData.platform_metadata || {},

        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    // Handle M2M relations
    if (relatedDepartments.length > 0) {
        // Assume relatedDepartments is array of IDs
        for (const depId of relatedDepartments) {
            await prisma.projects_project_related_departments.create({
                data: {
                    project_id: project.id,
                    department_id: BigInt(depId)
                }
            });
        }
    }

    // Refetch to return full object
    const createdProject = await prisma.projects_project.findUnique({
        where: { id: project.id },
        include: {
            projects_project_related_departments: {
                include: { departments_department: true }
            }
        }
    });

    res.status(201).json(toJSON(createdProject));
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create project', details: error instanceof Error ? error.message : String(error) });
  }
};

export const updateProject = async (req: Request, res: Response) => {
    const { slug } = req.params;
    const data = req.body;
    
    try {
        const project = await prisma.projects_project.findFirst({ where: { slug }});
        if (!project) return res.status(404).json({error: "Not found"});

        const { related_departments, ...projectData } = data;

        const updated = await prisma.projects_project.update({
            where: { id: project.id },
            data: {
                ...projectData,
                updated_at: new Date()
            }
        });

        if (related_departments) {
            // Wipe and recreate relations usually simplest, or sync. 
            // Simple approach: delete all for this project and re-add.
            await prisma.projects_project_related_departments.deleteMany({
                where: { project_id: project.id }
            });
            for (const depId of related_departments) {
                await prisma.projects_project_related_departments.create({
                    data: {
                        project_id: project.id,
                        department_id: BigInt(depId)
                    }
                });
            }
        }

        res.json(toJSON(updated));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update project' });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    const { slug } = req.params;
    try {
        const project = await prisma.projects_project.findFirst({ where: { slug }});
        if (!project) return res.status(404).json({error: "Not found"});
        
        // Delete relations first (cascade usually handles this in DB, but Prisma might need help if no cascade)
        await prisma.projects_project_related_departments.deleteMany({
            where: { project_id: project.id }
        });

        await prisma.projects_project.delete({
            where: { id: project.id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
}
