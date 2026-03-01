import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const CATEGORIES = [
  "Marketing", 
  "Design", 
  "Sales", 
  "Finance", 
  "Technology", 
  "Engineering", 
  "Business", 
  "Human Resources"
];

const JOB_TYPES = [
  "Full-Time",
  "Part-Time",
  "Remote",
  "Internship",
  "Contract"
];

const COMPANIES = [
  "TechNova", "GlobalCorp", "InnovateX", "Apex Solutions", "NextGen Systems",
  "Pioneer Works", "Future Dynamics", "Quantum Ltd", "Synergy Tech", "Alpha Group",
  "Beta Industries", "Gamma Innovations", "Delta Software", "Epsilon Consulting",
  "Zeta Logistics", "Eta Marketing", "Theta Design", "Iota Finance", "Kappa Engineering",
  "Lambda Services", "Mu Manufacturing", "Nu Health", "Xi Education", "Omicron Ventures",
  "Pi Retail", "Rho Energy", "Sigma Media", "Tau Security", "Upsilon Logistics", "Phi Analytics"
];

const LOCATIONS = [
  "New York, USA", "San Francisco, USA", "London, UK", "Berlin, Germany",
  "Toronto, Canada", "Sydney, Australia", "Tokyo, Japan", "Singapore",
  "Remote", "Paris, France", "Amsterdam, Netherlands", "Dublin, Ireland",
  "Austin, USA", "Seattle, USA", "Chicago, USA", "Boston, USA", "Denver, USA"
];

const TITLES = [
  "Senior Analyst", "Project Manager", "Software Engineer", "Marketing Lead",
  "Sales Executive", "Product Designer", "Data Scientist", "HR Specialist",
  "Financial Controller", "Operations Manager", "Customer Success Manager",
  "UX/UI Designer", "Backend Developer", "Frontend Developer", "DevOps Engineer",
  "Product Owner", "Business Analyst", "Marketing Coordinator", "Sales Representative",
  "Recruitment Consultant", "Finance Assistant", "IT Support Specialist",
  "Systems Administrator", "Content Strategist", "Copywriter", "Graphic Designer"
];

const TAGS_POOL = [
  "Management", "Leadership", "Technical", "Creative", "Analytical", "Communication",
  "Problem Solving", "Teamwork", "Agile", "Scrum", "B2B", "B2C", "Enterprise",
  "Startup", "Innovation", "Research", "Strategy", "Planning", "Execution"
];

const DESCRIPTIONS = [
  "We are looking for a highly motivated individual to join our fast-paced team. You will be responsible for driving key initiatives and delivering outstanding results.",
  "Join our innovative company and help shape the future. We offer a collaborative environment where your ideas will be valued and implemented.",
  "An exciting opportunity to work with cutting-edge technologies and talented professionals. Excellent career growth prospects.",
  "We are seeking a creative and analytical problem-solver to tackle complex challenges and create elegant solutions for our diverse client base.",
  "This role is perfect for someone who is passionate about their field and wants to make a real impact in a dynamic and growing organization."
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomTags(): string[] {
  const numTags = Math.floor(Math.random() * 3) + 1; // 1 to 3 tags
  const tags: string[] = [];
  while (tags.length < numTags) {
    const tag = getRandomItem(TAGS_POOL);
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }
  return tags;
}

async function main() {
  console.log('Starting to seed 5000 jobs...');
  const totalJobs = 5000;
  const batchSize = 500;
  
  let jobsInserted = 0;

  for (let i = 0; i < totalJobs / batchSize; i++) {
    const batch = [];
    for (let j = 0; j < batchSize; j++) {
      batch.push({
        title: getRandomItem(TITLES),
        company: getRandomItem(COMPANIES),
        location: getRandomItem(LOCATIONS),
        category: getRandomItem(CATEGORIES),
        type: getRandomItem(JOB_TYPES),
        description: getRandomItem(DESCRIPTIONS),
        tags: getRandomTags(),
        // Add random dates within the last 30 days
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
      });
    }

    await prisma.job.createMany({
      data: batch
    });
    
    jobsInserted += batchSize;
    console.log(`Inserted ${jobsInserted}/${totalJobs} jobs...`);
  }
  
  console.log('Finished seeding 5000 jobs successfully.');
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
