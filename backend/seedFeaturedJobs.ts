import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const featuredJobsData = [
  { title: "Email Marketing", company: "Revolut", location: "Madrid, Spain", category: "Marketing", tags: ["Design"], description: "Join our marketing team to build engaging email campaigns.", type: "Full-Time" },
  { title: "Brand Designer", company: "Dropbox", location: "San Francisco, USA", category: "Design", tags: ["Business"], description: "Help shape the future of our brand identity.", type: "Full-Time" },
  { title: "Email Marketing", company: "Pitch", location: "Berlin, Germany", category: "Marketing", tags: ["Design"], description: "Create compelling marketing materials for our growing user base.", type: "Full-Time" },
  { title: "Visual Designer", company: "Blinkist", location: "Remote", category: "Design", tags: [], description: "Translate complex ideas into beautiful visual designs.", type: "Remote" },
  { title: "Product Designer", company: "ClassPass", location: "Remote", category: "Design", tags: ["Marketing"], description: "Design the fitness and wellness experiences of tomorrow.", type: "Remote" },
  { title: "Lead Designer", company: "Canva", location: "Sydney, Australia", category: "Design", tags: [], description: "Lead a talented design team to build intuitive products.", type: "Full-Time" },
  { title: "Brand Strategist", company: "GoDaddy", location: "USA", category: "Marketing", tags: [], description: "Develop and execute brand strategies.", type: "Full-Time" },
  { title: "Customer Care", company: "Twitter", location: "San Francisco, USA", category: "Marketing", tags: [], description: "Support our users directly and creatively.", type: "Full-Time" }
];

async function main() {
  console.log('Seeding Database...');
  // Optional: clear existing jobs matching our seed
  // for (const job of featuredJobsData) {
  //   await prisma.job.deleteMany({ where: { company: job.company, title: job.title } });
  // }
  
  for (const job of featuredJobsData) {
    const existing = await prisma.job.findFirst({
      where: { title: job.title, company: job.company }
    });
    if (!existing) {
      await prisma.job.create({
        data: job
      });
      console.log(`Created job: ${job.title} at ${job.company}`);
    } else {
      console.log(`Job already exists: ${job.title} at ${job.company}`);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
