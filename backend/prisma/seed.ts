import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ----- DATA POOLS FOR RANDOM JOB GENERATION -----

const companies = [
  "Google", "Microsoft", "Apple", "Amazon", "Meta", "Netflix", "Spotify",
  "Stripe", "Airbnb", "Uber", "Slack", "Shopify", "Adobe", "Salesforce",
  "Zoom", "LinkedIn", "GitHub", "Figma", "Notion", "Vercel", "Canva",
  "Dropbox", "Twitter", "Revolut", "Webflow", "Square", "PayPal",
  "Twilio", "Atlassian", "HubSpot", "Zendesk", "Datadog", "Cloudflare",
  "MongoDB", "Elastic", "GitLab", "HashiCorp", "Docker", "Confluent",
  "Snowflake", "Databricks", "Okta", "CrowdStrike", "Palantir", "Asana",
  "Monday.com", "Miro", "Loom", "Calendly", "Grammarly", "Duolingo",
  "Coursera", "Udemy", "Khan Academy", "Brex", "Plaid", "Chime",
  "Robinhood", "Coinbase", "Binance", "OpenAI", "Anthropic", "Mistral",
  "Tesla", "SpaceX", "Boeing", "Samsung", "Sony", "Intel", "AMD", "NVIDIA",
  "Oracle", "IBM", "Cisco", "VMware", "Palo Alto Networks", "Fortinet",
  "ServiceNow", "Workday", "SAP", "Intuit", "Block", "Toast",
  "DoorDash", "Instacart", "Lyft", "Pinterest", "Snap", "Reddit",
  "Discord", "Roblox", "Epic Games", "Unity", "Valve", "Riot Games",
  "Electronic Arts", "Activision", "Ubisoft", "Warner Bros", "Disney",
  "Pixar", "DreamWorks", "NBCUniversal", "ViacomCBS", "BBC", "Reuters",
  "Bloomberg", "The New York Times", "The Guardian", "CNN",
];

const locations = [
  "San Francisco, USA", "New York, USA", "Los Angeles, USA", "Seattle, USA",
  "Austin, USA", "Chicago, USA", "Boston, USA", "Denver, USA", "Miami, USA",
  "Portland, USA", "San Diego, USA", "Washington DC, USA", "Atlanta, USA",
  "Dallas, USA", "Houston, USA", "Phoenix, USA", "Minneapolis, USA",
  "London, UK", "Manchester, UK", "Edinburgh, UK", "Birmingham, UK",
  "Berlin, Germany", "Munich, Germany", "Hamburg, Germany", "Frankfurt, Germany",
  "Paris, France", "Lyon, France", "Marseille, France", "Toulouse, France",
  "Amsterdam, Netherlands", "Rotterdam, Netherlands", "The Hague, Netherlands",
  "Stockholm, Sweden", "Gothenburg, Sweden", "Malmö, Sweden",
  "Copenhagen, Denmark", "Oslo, Norway", "Helsinki, Finland",
  "Dublin, Ireland", "Zürich, Switzerland", "Geneva, Switzerland",
  "Barcelona, Spain", "Madrid, Spain", "Valencia, Spain", "Lisbon, Portugal",
  "Milan, Italy", "Rome, Italy", "Vienna, Austria", "Prague, Czech Republic",
  "Warsaw, Poland", "Budapest, Hungary", "Bucharest, Romania",
  "Toronto, Canada", "Vancouver, Canada", "Montreal, Canada",
  "Sydney, Australia", "Melbourne, Australia", "Brisbane, Australia",
  "Singapore", "Hong Kong", "Tokyo, Japan", "Seoul, South Korea",
  "Taipei, Taiwan", "Bangalore, India", "Mumbai, India", "Delhi, India",
  "Hyderabad, India", "Tel Aviv, Israel", "Dubai, UAE", "Riyadh, Saudi Arabia",
  "Cape Town, South Africa", "Nairobi, Kenya", "Lagos, Nigeria",
  "São Paulo, Brazil", "Mexico City, Mexico", "Buenos Aires, Argentina",
  "Dhaka, Bangladesh", "Chittagong, Bangladesh", "Sylhet, Bangladesh",
  "Remote", "Hybrid - Remote",
];

const categories = [
  "Technology", "Design", "Marketing", "Sales", "Finance",
  "Engineering", "Human Resources", "Business", "Data Science",
  "Product Management", "Operations", "Customer Success",
  "Legal", "Healthcare", "Education",
];

const types = ["Full-Time", "Part-Time", "Remote", "Contract", "Internship"];

const tagSets: Record<string, string[]> = {
  Technology: ["React", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "TypeScript", "GraphQL", "REST API", "Microservices", "CI/CD", "DevOps", "Cloud", "System Design", "Agile"],
  Design: ["Figma", "UI/UX", "Sketch", "Adobe XD", "Prototyping", "User Research", "Design Systems", "Motion Design", "Brand Design", "Illustration", "Typography", "Wireframing"],
  Marketing: ["SEO", "SEM", "Content", "Social Media", "Email Marketing", "Growth", "Analytics", "Branding", "PPC", "Influencer", "Copywriting", "Campaign Management"],
  Sales: ["B2B", "SaaS", "Enterprise", "Account Management", "Lead Generation", "CRM", "Negotiation", "Pipeline", "Prospecting", "Cold Outreach"],
  Finance: ["Financial Analysis", "Accounting", "FP&A", "Treasury", "Risk Management", "Investment", "Budgeting", "Compliance", "Audit", "Tax"],
  Engineering: ["Mechanical", "Civil", "Electrical", "Chemical", "Aerospace", "Robotics", "IoT", "Embedded", "CAD", "Simulation"],
  "Human Resources": ["Recruiting", "Talent Acquisition", "Employee Relations", "Compensation", "Benefits", "HRIS", "Training", "Culture", "Diversity", "Onboarding"],
  Business: ["Strategy", "Operations", "Consulting", "Project Management", "Agile", "Scrum", "Business Development", "Partnerships", "Analytics", "Stakeholder Management"],
  "Data Science": ["Machine Learning", "AI", "Deep Learning", "NLP", "Computer Vision", "Statistics", "R", "Python", "TensorFlow", "PyTorch", "Big Data", "SQL"],
  "Product Management": ["Product Strategy", "Roadmap", "User Stories", "A/B Testing", "Market Research", "Go-to-Market", "OKRs", "Stakeholders", "Prioritization"],
  Operations: ["Supply Chain", "Logistics", "Process Improvement", "Lean", "Six Sigma", "Inventory", "Vendor Management", "Quality Assurance"],
  "Customer Success": ["Customer Support", "Onboarding", "Retention", "NPS", "Churn Prevention", "Account Health", "Success Metrics"],
  Legal: ["Corporate Law", "IP", "Compliance", "Contracts", "Regulatory", "Privacy", "GDPR", "Litigation"],
  Healthcare: ["Clinical", "Medical Devices", "Biotech", "Pharma", "Patient Care", "Health IT", "Nursing", "Telemedicine"],
  Education: ["Curriculum", "EdTech", "Teaching", "E-Learning", "Assessment", "Training", "LMS", "Instruction Design"],
};

// Job title templates per category
const jobTitles: Record<string, string[]> = {
  Technology: [
    "Software Engineer", "Senior Software Engineer", "Staff Engineer",
    "Frontend Developer", "Backend Developer", "Full Stack Developer",
    "DevOps Engineer", "Site Reliability Engineer", "Cloud Architect",
    "Mobile Developer", "iOS Developer", "Android Developer",
    "Security Engineer", "Platform Engineer", "Infrastructure Engineer",
    "QA Engineer", "Test Automation Engineer", "Systems Engineer",
    "API Developer", "Embedded Software Engineer", "Blockchain Developer",
    "Machine Learning Engineer", "AI Engineer", "Data Engineer",
  ],
  Design: [
    "UI/UX Designer", "Senior Product Designer", "Visual Designer",
    "Brand Designer", "Interaction Designer", "Motion Designer",
    "Design Lead", "UX Researcher", "Design Systems Engineer",
    "Creative Director", "Art Director", "Graphic Designer",
    "Illustration Designer", "Design Manager", "Principal Designer",
  ],
  Marketing: [
    "Marketing Manager", "Content Marketing Specialist", "SEO Specialist",
    "Social Media Manager", "Growth Marketing Manager", "Email Marketing Specialist",
    "Digital Marketing Manager", "Brand Manager", "Marketing Analyst",
    "Content Strategist", "Copywriter", "Performance Marketing Manager",
    "Marketing Coordinator", "Campaign Manager", "Community Manager",
  ],
  Sales: [
    "Sales Development Representative", "Account Executive", "Enterprise Account Manager",
    "Sales Manager", "Business Development Manager", "Sales Engineer",
    "Strategic Account Director", "Inside Sales Representative", "Channel Sales Manager",
    "VP of Sales", "Regional Sales Manager", "Solutions Consultant",
  ],
  Finance: [
    "Financial Analyst", "Senior Accountant", "FP&A Manager",
    "Controller", "Treasurer", "Risk Analyst", "Tax Specialist",
    "Compliance Officer", "Internal Auditor", "Finance Manager",
    "Payroll Specialist", "Revenue Analyst", "Investment Analyst",
  ],
  Engineering: [
    "Mechanical Engineer", "Electrical Engineer", "Civil Engineer",
    "Chemical Engineer", "Aerospace Engineer", "Robotics Engineer",
    "Manufacturing Engineer", "Process Engineer", "Systems Architect",
    "Hardware Engineer", "Embedded Systems Engineer", "Controls Engineer",
  ],
  "Human Resources": [
    "HR Manager", "Recruiter", "Talent Acquisition Specialist",
    "HR Business Partner", "Compensation Analyst", "Benefits Administrator",
    "People Operations Manager", "HR Coordinator", "Training Manager",
    "Diversity & Inclusion Lead", "Employee Experience Manager",
  ],
  Business: [
    "Business Analyst", "Strategy Consultant", "Project Manager",
    "Program Manager", "Business Operations Manager", "Management Consultant",
    "Chief of Staff", "Operations Analyst", "Scrum Master",
    "Business Development Associate", "Partnerships Manager",
  ],
  "Data Science": [
    "Data Scientist", "Senior Data Scientist", "Machine Learning Scientist",
    "Research Scientist", "AI Researcher", "NLP Engineer",
    "Computer Vision Engineer", "Data Analyst", "Applied Scientist",
    "Quantitative Analyst", "MLOps Engineer", "Deep Learning Engineer",
  ],
  "Product Management": [
    "Product Manager", "Senior Product Manager", "Director of Product",
    "Technical Product Manager", "Growth Product Manager", "Product Analyst",
    "Product Owner", "VP of Product", "Associate Product Manager",
  ],
  Operations: [
    "Operations Manager", "Supply Chain Manager", "Logistics Coordinator",
    "Process Improvement Manager", "Facilities Manager", "Procurement Specialist",
    "Operations Analyst", "Quality Manager", "Inventory Planner",
  ],
  "Customer Success": [
    "Customer Success Manager", "Implementation Manager", "Support Engineer",
    "Technical Support Specialist", "Customer Experience Manager",
    "Solutions Architect", "Onboarding Specialist", "Client Success Director",
  ],
  Legal: [
    "Legal Counsel", "Paralegal", "Corporate Attorney",
    "Compliance Manager", "Privacy Officer", "IP Attorney",
    "Contract Manager", "Legal Operations Manager", "General Counsel",
  ],
  Healthcare: [
    "Clinical Research Associate", "Biomedical Engineer", "Health Data Analyst",
    "Medical Science Liaison", "Nurse Practitioner", "Healthcare Consultant",
    "Patient Care Coordinator", "Health IT Specialist", "Regulatory Affairs Manager",
  ],
  Education: [
    "Curriculum Designer", "Instructional Designer", "EdTech Product Manager",
    "Learning Experience Designer", "Training Specialist", "Education Coordinator",
    "Academic Advisor", "Online Course Developer", "Assessment Specialist",
  ],
};

const seniority = ["", "Junior ", "Mid-Level ", "Senior ", "Staff ", "Lead ", "Principal "];

const descriptionTemplates = [
  (company: string, title: string, category: string) =>
    `${company} is looking for a talented ${title} to join our ${category} team. You'll work on challenging problems and collaborate with world-class professionals to deliver exceptional results.\n\nResponsibilities:\n- Drive key initiatives within the ${category} department\n- Collaborate cross-functionally with engineering, design, and product teams\n- Mentor junior team members and contribute to team growth\n- Stay current with industry trends and best practices\n- Participate in code/design reviews and technical discussions\n\nRequirements:\n- 2+ years of relevant experience\n- Strong problem-solving and analytical skills\n- Excellent communication and teamwork abilities\n- Bachelor's degree or equivalent practical experience\n- Passion for building great products`,

  (company: string, title: string, category: string) =>
    `Join ${company} as a ${title} and help us shape the future of ${category.toLowerCase()}. We're a rapidly growing team that values innovation, collaboration, and personal growth.\n\nWhat you'll do:\n- Design and implement solutions for complex ${category.toLowerCase()} challenges\n- Partner with stakeholders to define requirements and deliver high-impact projects\n- Contribute to our ${category.toLowerCase()} strategy and roadmap\n- Build scalable, maintainable solutions\n- Participate in team planning and retrospectives\n\nWhat we're looking for:\n- 3+ years of professional experience in ${category.toLowerCase()}\n- Track record of delivering impactful projects\n- Strong analytical and communication skills\n- Growth mindset and eagerness to learn\n- Experience working in fast-paced environments`,

  (company: string, title: string, category: string) =>
    `${company} is on a mission to transform the ${category.toLowerCase()} landscape, and we need a ${title} to help us get there. This is an opportunity to make a real impact at a company that's changing the way people work.\n\nThe role:\n- Take ownership of key ${category.toLowerCase()} initiatives from concept to delivery\n- Work closely with cross-functional teams to ship high-quality products\n- Use data-driven approaches to inform decisions and measure impact\n- Contribute to our culture of continuous improvement\n- Help scale our ${category.toLowerCase()} processes as the company grows\n\nAbout you:\n- You have 1-5 years of experience in a similar role\n- You're results-oriented and thrive in ambiguity\n- You communicate clearly and build strong relationships\n- You're passionate about ${category.toLowerCase()} and staying ahead of trends\n- You value diversity, inclusion, and collaboration`,
];

// Salary ranges by seniority
const salaryRanges = [
  "$40,000 - $60,000", "$50,000 - $75,000", "$60,000 - $90,000",
  "$70,000 - $100,000", "$80,000 - $120,000", "$90,000 - $130,000",
  "$100,000 - $150,000", "$120,000 - $180,000", "$140,000 - $200,000",
  "$160,000 - $220,000", "$180,000 - $250,000", "$200,000 - $300,000",
];

// ----- HELPERS -----

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function generateJob(index: number) {
  const company = pick(companies);
  const category = pick(categories);
  const titleBase = pick(jobTitles[category] || jobTitles["Technology"]);
  const sen = index < 100 ? "" : pick(seniority);
  const title = `${sen}${titleBase}`.trim();
  const location = pick(locations);
  const type = pick(types);
  const descFn = pick(descriptionTemplates);
  const description = descFn(company, title, category);
  const tags = pickN(tagSets[category] || tagSets["Technology"], Math.floor(Math.random() * 3) + 1);
  const salary = pick(salaryRanges);

  // Generate a company logo using ui-avatars.com (always works, free)
  const brandColors: Record<string, string> = {
    Google: "4285F4", Microsoft: "00A4EF", Apple: "000000", Amazon: "FF9900",
    Meta: "0668E1", Netflix: "E50914", Spotify: "1DB954", Stripe: "635BFF",
    Airbnb: "FF385C", Uber: "000000", Slack: "4A154B", Shopify: "96BF48",
    Adobe: "FF0000", Salesforce: "00A1E0", Zoom: "2D8CFF", LinkedIn: "0077B5",
    GitHub: "181717", Figma: "F24E1E", Notion: "000000", Vercel: "000000",
    Canva: "00C4CC", Dropbox: "0062FF", Twitter: "1DA1F2", Revolut: "0075EB",
    Webflow: "4353FF", Square: "3E4348", PayPal: "003087", Twilio: "F22F46",
    Atlassian: "0052CC", HubSpot: "FF7A59", Zendesk: "03363D",
    Datadog: "632CA6", Cloudflare: "F38020", MongoDB: "47A248",
    Tesla: "CC0000", SpaceX: "005288", Samsung: "1428A0", NVIDIA: "76B900",
    Oracle: "F80000", IBM: "054ADA", OpenAI: "10A37F", Anthropic: "D97757",
  };
  const bgColor = brandColors[company] || "4640DE";
  const companyLogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=${bgColor}&color=fff&size=128&font-size=0.35&bold=true&format=svg`;

  return {
    title,
    company,
    location,
    category,
    type,
    description,
    salary,
    companyLogo,
    tags,
  };
}

// ----- MAIN SEED -----

async function main() {
  console.log("🌱 Seeding database with 1000+ jobs...");

  // Clear existing data
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();

  const TOTAL_JOBS = 1000;
  const BATCH_SIZE = 50;

  let created = 0;
  for (let i = 0; i < TOTAL_JOBS; i += BATCH_SIZE) {
    const batch = [];
    for (let j = 0; j < BATCH_SIZE && i + j < TOTAL_JOBS; j++) {
      batch.push(generateJob(i + j));
    }

    await prisma.job.createMany({ data: batch });
    created += batch.length;
    console.log(`  ✅ Created ${created}/${TOTAL_JOBS} jobs...`);
  }

  console.log(`\n🎉 Successfully seeded ${TOTAL_JOBS} jobs!`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
