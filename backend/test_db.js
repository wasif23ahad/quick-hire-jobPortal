require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

console.log('--- DIAGNOSTIC START ---');
console.log('PORT:', process.env.PORT);
console.log('DATABASE_URL starts with:', process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 20) + '...' : 'UNDEFINED');

const prisma = new PrismaClient();

async function test() {
  try {
    console.log('Attempting to connect to DB...');
    await prisma.$connect();
    console.log('Connected successfully!');
    
    console.log('Fetching job count...');
    const count = await prisma.job.count();
    console.log('Job count:', count);
    
    console.log('Fetching approved job count...');
    const approved = await prisma.job.count({ where: { status: 'APPROVED' } });
    console.log('Approved job count:', approved);
    
  } catch (err) {
    console.error('--- DB TEST FAILED ---');
    console.error(err);
  } finally {
    await prisma.$disconnect();
    console.log('--- DIAGNOSTIC END ---');
  }
}

test();
