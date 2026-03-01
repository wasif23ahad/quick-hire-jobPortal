import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const latestJobsData = [
  { title: "Social Media Assistant", company: "Nomad", location: "Paris, France", category: "Marketing", tags: ["Design"], description: "Help manage our growing online communities.", type: "Full-Time" },
  { title: "Social Media Assistant", company: "Netlify", location: "Paris, France", category: "Marketing", tags: ["Design"], description: "Engage with developers around the globe.", type: "Full-Time" },
  { title: "Brand Designer", company: "Dropbox", location: "San Francisco, USA", category: "Design", tags: ["Marketing"], description: "Shape file-sharing into a beautiful experience.", type: "Full-Time" },
  { title: "Brand Designer", company: "Maze", location: "San Francisco, USA", category: "Design", tags: ["Marketing"], description: "Make user testing look great.", type: "Full-Time" },
  { title: "Interactive Developer", company: "Terraform", location: "Hamburg, Germany", category: "Engineering", tags: ["Design"], description: "Build interactive tools for modern infrastructure.", type: "Full-Time" },
  { title: "Interactive Developer", company: "Udacity", location: "Hamburg, Germany", category: "Engineering", tags: ["Design"], description: "Create compelling educational interfaces.", type: "Full-Time" },
  { title: "HR Manager", company: "Packer", location: "Lucern, Switzerland", category: "Human Resources", tags: ["Marketing"], description: "Manage our growing engineering teams.", type: "Full-Time" },
  { title: "HR Manager", company: "Webflow", location: "Lucern, Switzerland", category: "Human Resources", tags: ["Marketing"], description: "Help scale our no-code platform talent.", type: "Full-Time" }
];

async function main() {
  console.log('Seeding Latest Jobs...');
  
  for (const job of latestJobsData) {
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
