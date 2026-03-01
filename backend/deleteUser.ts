import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const email = 'abstractgoodies@gmail.com';

async function main() {
  console.log('Script started');
  console.log(`Searching for user with email: ${email}`);
  
  const user = await prisma.user.findUnique({
    where: { email },
    include: { 
      applications: true, 
      postedJobs: true 
    }
  });

  if (!user) {
    console.log('User not found.');
    return;
  }

  console.log(`Found user: ${user.name} (${user.role})`);
  
  // Delete user's applications
  if (user.applications.length > 0) {
    await prisma.application.deleteMany({
      where: { userId: user.id }
    });
    console.log(`Deleted ${user.applications.length} applications.`);
  }

  // Delete jobs posted by this user
  if (user.postedJobs.length > 0) {
    await prisma.job.deleteMany({
      where: { postedById: user.id }
    });
    console.log(`Deleted ${user.postedJobs.length} jobs.`);
  }

  // Finally delete the user
  await prisma.user.delete({
    where: { id: user.id }
  });

  console.log('User deleted successfully.');
}

main()
  .catch((e) => {
    console.error('Error occurred:');
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Database disconnected.');
  });
