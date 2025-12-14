
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- DIAGNOSTIC START ---');
  try {
    console.log('Connecting to database...');
    await prisma.$connect();
    console.log('Connected successfully.');

    console.log('Attempting to fetch departments...');
    const departments = await prisma.departments_department.findMany({
        take: 1
    });
    console.log('Departments fetched successfully:', departments);

  } catch (error) {
    console.error('--- ERROR DETECTED ---');
    console.error(error);
  } finally {
    await prisma.$disconnect();
    console.log('--- DIAGNOSTIC END ---');
  }
}

main();
