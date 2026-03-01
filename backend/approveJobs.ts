import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Testing DB connection and approving jobs...');
  try {
    const totalJobs = await prisma.job.count();
    console.log(`Total jobs in DB: ${totalJobs}`);

    if (totalJobs === 0) {
      console.log('No jobs found to approve.');
      return;
    }

    const result = await prisma.job.updateMany({
      where: { status: 'PENDING' },
      data: { status: 'APPROVED' }
    });

    console.log(`Successfully approved ${result.count} jobs.`);
    
    const approvedCount = await prisma.job.count({ where: { status: 'APPROVED' } });
    console.log(`Current approved jobs: ${approvedCount}`);
  } catch (error) {
    console.error('DB Operation failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
