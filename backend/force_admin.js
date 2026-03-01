require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- ADMIN SEED SCRIPT ---');
  try {
    const admin = await prisma.user.findUnique({ where: { email: 'admin@quickhire.com' } });
    if (admin) {
      console.log('Admin exists, updating password and role to ensure access...');
      const adminPassword = await bcrypt.hash('admin12345', 10);
      await prisma.user.update({
        where: { email: 'admin@quickhire.com' },
        data: { password: adminPassword, role: 'ADMIN' }
      });
      console.log('Admin updated successfully. Credentials: admin@quickhire.com / admin12345');
    } else {
      console.log('Admin not found, creating...');
      const adminPassword = await bcrypt.hash('admin12345', 10);
      await prisma.user.create({
        data: {
          name: 'System Administrator',
          email: 'admin@quickhire.com',
          password: adminPassword,
          role: 'ADMIN',
        }
      });
      console.log('Admin created successfully. Credentials: admin@quickhire.com / admin12345');
    }
  } catch (err) {
    console.error('Error during admin seeding:', err);
  } finally {
    await prisma.$disconnect();
    console.log('--- END SCRIPT ---');
  }
}

main();
