
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Simulating getDepartments logic...');
    
    const departments = await prisma.departments_department.findMany({
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

    console.log(`Found ${departments.length} published departments.`);

    const enhancedDepartments = departments.map(dept => {
      const projectsRelations = dept.projects_project_related_departments;
      const projects = projectsRelations.map(r => r.projects_project);
      
      const nullProjects = projectsRelations.filter(r => !r.projects_project);
      if (nullProjects.length > 0) {
        console.warn(`Department ${dept.title} has ${nullProjects.length} relations with NULL projects!`);
        nullProjects.forEach(r => console.warn(`  - Relation ID: ${r.id}, Project ID: ${r.project_id}`));
      }
      const total_projects = projects.length;
      const completed_projects = projects.filter(p => p.status === 'completed').length;
      const drafts = projects.filter(p => p.status === 'planned' || p.status === 'draft').length;
      const active_projects = projects.filter(p => ['active', 'in-progress', 'building'].includes(p.status)).length;
      
      const team_size = Array.isArray(dept.team) ? (dept.team as any[]).length : 0;

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

    console.log('Successfully enhanced departments.');
    console.log('Sample enhanced department:', enhancedDepartments[0]);
    
  } catch (error) {
    console.error('Logic failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
