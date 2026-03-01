import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial users...');

  // Seed Admin
  const adminPassword = await bcrypt.hash('admin12345', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@quickhire.com' },
    update: {},
    create: {
      name: 'System Administrator',
      email: 'admin@quickhire.com',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });
  console.log(`Admin user created: ${admin.email}`);

  // Seed test employer
  const employerPassword = await bcrypt.hash('employer12345', 10);
  const employer = await prisma.user.upsert({
    where: { email: 'employer@quickhire.com' },
    update: {},
    create: {
      name: 'Test Employer Co.',
      email: 'employer@quickhire.com',
      password: employerPassword,
      role: Role.EMPLOYER,
    },
  });
  console.log(`Employer user created: ${employer.email}`);
  
  // Seed test user
  const userPassword = await bcrypt.hash('user12345', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@quickhire.com' },
    update: {},
    create: {
      name: 'Test Job Seeker',
      email: 'user@quickhire.com',
      password: userPassword,
      role: Role.USER,
    },
  });
  console.log(`Job Seeker user created: ${user.email}`);
  

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
