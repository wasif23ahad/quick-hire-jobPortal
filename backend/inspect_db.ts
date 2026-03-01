import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const employers = await prisma.user.findMany({ where: { role: 'EMPLOYER' } });
  console.log('--- Employers ---');
  employers.forEach(e => console.log(`ID: ${e.id}, Name: ${e.name}`));

  const jobs = await prisma.job.findMany({ include: { postedBy: true } });
  console.log('\n--- Jobs ---');
  jobs.forEach(j => console.log(`Job: ${j.title}, PostedBy: ${j.postedBy?.name} (${j.postedById})`));

  const apps = await prisma.application.findMany({ include: { job: { include: { postedBy: true } } } });
  console.log('\n--- Applications ---');
  apps.forEach(a => console.log(`App: ${a.name}, Job: ${a.job.title}, JobPostedBy: ${a.job.postedBy?.name} (${a.job.postedById})`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
