import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const employers = await prisma.user.findMany({ where: { role: 'EMPLOYER', name: 'Abstract Goodies' } });
  if (employers.length === 0) {
    console.log("Abstract Goodies employer not found.");
    return;
  }
  const employer = employers[0];
  console.log(`Employer ID: ${employer.id}`);

  const jobs = await prisma.job.findMany({ 
    where: { postedById: employer.id },
    include: { _count: { select: { applications: true } } }
  });
  
  console.log('\n--- Abstract Goodies Jobs ---');
  jobs.forEach(j => {
    console.log(`Job [${j.id}]: ${j.title}, Applications Count: ${j._count.applications}`);
  });

  const apps = await prisma.application.findMany({ 
    where: { job: { postedById: employer.id } },
    include: { job: true }
  });
  
  console.log('\n--- Abstract Goodies Applications ---');
  apps.forEach(a => {
    console.log(`App ID [${a.id}]: ${a.name}, Applied to Job [${a.jobId}] (${a.job.title})`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
