import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

// Company logo URLs using Clearbit Logo API
const companyLogos: Record<string, string> = {
  "Nomad": "https://logo.clearbit.com/nomadhealth.com",
  "Netlify": "https://logo.clearbit.com/netlify.com",
  "Dropbox": "https://logo.clearbit.com/dropbox.com",
  "Maze": "https://logo.clearbit.com/maze.co",
  "Terraform": "https://logo.clearbit.com/hashicorp.com",
  "Udacity": "https://logo.clearbit.com/udacity.com",
  "Packer": "https://logo.clearbit.com/hashicorp.com",
  "Webflow": "https://logo.clearbit.com/webflow.com",
  "Revolut": "https://logo.clearbit.com/revolut.com",
  "Pitch": "https://logo.clearbit.com/pitch.com",
  "Blinkist": "https://logo.clearbit.com/blinkist.com",
  "ClassPass": "https://logo.clearbit.com/classpass.com",
  "Canva": "https://logo.clearbit.com/canva.com",
  "GoDaddy": "https://logo.clearbit.com/godaddy.com",
  "Twitter": "https://logo.clearbit.com/x.com",
};

const jobs = [
  {
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    category: "Marketing",
    type: "Full-Time",
    companyLogo: companyLogos["Nomad"],
    description:
      "Nomad is looking for a Social Media Assistant to help build our brand and online presence. You will be responsible for creating engaging content, managing community interactions, and analyzing social media metrics to drive growth. The ideal candidate is creative, organized, and passionate about social media trends.\n\nResponsibilities:\n- Create and schedule daily social media posts\n- Engage with followers and respond to comments/messages\n- Monitor analytics and prepare monthly reports\n- Collaborate with the marketing team on campaigns\n- Stay up-to-date with social media trends and best practices\n\nRequirements:\n- 1+ years of social media management experience\n- Strong written communication skills\n- Experience with social media tools (Buffer, Hootsuite, etc.)\n- Basic knowledge of graphic design tools",
    tags: ["Marketing", "Design"],
  },
  {
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    category: "Marketing",
    type: "Full-Time",
    companyLogo: companyLogos["Netlify"],
    description:
      "Netlify is seeking a Social Media Assistant to join our growing marketing team. You'll help manage our social media channels, create compelling content, and engage with our developer community.\n\nResponsibilities:\n- Manage daily social media posting schedule\n- Create engaging content for developer audiences\n- Track and report on social media KPIs\n- Support influencer partnership programs\n\nRequirements:\n- Understanding of developer tools and communities\n- Strong writing and communication skills\n- Experience with social analytics platforms\n- Creative mindset with attention to detail",
    tags: ["Marketing", "Design"],
  },
  {
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    category: "Design",
    type: "Full-Time",
    companyLogo: companyLogos["Dropbox"],
    description:
      "Dropbox is looking for a Brand Designer to help the team maintain and evolve our visual identity. You'll create compelling designs across multiple touchpoints including digital, print, and experiential.\n\nResponsibilities:\n- Design brand assets across all platforms\n- Maintain and evolve the brand design system\n- Collaborate with marketing and product teams\n- Create presentations, social media graphics, and campaign materials\n- Ensure brand consistency across all touchpoints\n\nRequirements:\n- 3+ years of brand design experience\n- Expert in Figma, Adobe Creative Suite\n- Strong portfolio demonstrating brand work\n- Understanding of design systems\n- Excellent communication and collaboration skills",
    tags: ["Design", "Business"],
  },
  {
    title: "Brand Designer",
    company: "Maze",
    location: "San Francisco, USA",
    category: "Design",
    type: "Full-Time",
    companyLogo: companyLogos["Maze"],
    description:
      "Maze is looking for a Brand Designer to join our creative team. You'll help shape the visual identity of our product testing platform and create designs that resonate with our user base.\n\nResponsibilities:\n- Develop brand guidelines and assets\n- Design marketing materials and campaigns\n- Create illustrations and visual content\n- Collaborate with product and engineering teams\n\nRequirements:\n- Strong brand design portfolio\n- Proficiency in Figma and Adobe tools\n- Experience in SaaS or tech companies\n- Creative problem-solving skills",
    tags: ["Marketing", "Design"],
  },
  {
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    category: "Technology",
    type: "Full-Time",
    companyLogo: companyLogos["Terraform"],
    description:
      "Terraform is seeking an Interactive Developer to create engaging web experiences. You'll work at the intersection of design and development to build interactive prototypes, animations, and creative web applications.\n\nResponsibilities:\n- Build interactive web experiences using modern frameworks\n- Create animations and micro-interactions\n- Collaborate with designers to bring concepts to life\n- Optimize performance for smooth user experiences\n- Experiment with new web technologies (WebGL, Three.js, GSAP)\n\nRequirements:\n- 3+ years of frontend development experience\n- Strong JavaScript/TypeScript skills\n- Experience with animation libraries (GSAP, Framer Motion)\n- Understanding of WebGL/Three.js is a plus\n- Creative portfolio showcasing interactive work",
    tags: ["Marketing", "Design"],
  },
  {
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    category: "Technology",
    type: "Full-Time",
    companyLogo: companyLogos["Udacity"],
    description:
      "Udacity is looking for an Interactive Developer to create engaging educational experiences. You will develop interactive course content, build web-based learning tools, and push the boundaries of online education.\n\nResponsibilities:\n- Develop interactive learning modules\n- Build educational tools and simulations\n- Collaborate with instructional designers\n- Create accessible and engaging interfaces\n\nRequirements:\n- Strong frontend development skills\n- Experience with React or similar frameworks\n- Passion for education and learning\n- Strong problem-solving abilities",
    tags: ["Marketing", "Design"],
  },
  {
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    category: "Human Resources",
    type: "Full-Time",
    companyLogo: companyLogos["Packer"],
    description:
      "Packer is looking for an experienced HR Manager to lead our people operations. You will be responsible for talent acquisition, employee relations, performance management, and building a positive company culture.\n\nResponsibilities:\n- Lead the full recruitment lifecycle\n- Manage employee onboarding and offboarding\n- Develop and implement HR policies\n- Handle employee relations and conflict resolution\n- Oversee performance review processes\n- Manage compensation and benefits programs\n\nRequirements:\n- 5+ years of HR management experience\n- Strong knowledge of employment law\n- Excellent interpersonal and communication skills\n- Experience with HRIS systems\n- HR certification (SHRM, CIPD) preferred",
    tags: ["Marketing", "Design"],
  },
  {
    title: "HR Manager",
    company: "Webflow",
    location: "Lucern, Switzerland",
    category: "Human Resources",
    type: "Full-Time",
    companyLogo: companyLogos["Webflow"],
    description:
      "Webflow is hiring an HR Manager to help scale our People team. You'll play a key role in building our culture, improving our hiring processes, and supporting employee growth and development.\n\nResponsibilities:\n- Drive recruitment and hiring strategy\n- Build employee engagement programs\n- Manage performance management systems\n- Develop training and development initiatives\n\nRequirements:\n- Proven HR management experience\n- Experience in fast-growing tech companies\n- Strong organizational and leadership skills\n- Knowledge of modern HR tools and practices",
    tags: ["Marketing", "Design"],
  },
  {
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    category: "Marketing",
    type: "Full-Time",
    companyLogo: companyLogos["Revolut"],
    description:
      "Revolut is looking for an Email Marketing specialist to help drive customer engagement and retention. You will design, build, and optimize email campaigns that connect with millions of users worldwide.\n\nResponsibilities:\n- Design and execute email marketing campaigns\n- Build automated email workflows and drip sequences\n- A/B test subject lines, content, and send times\n- Analyze campaign performance and optimize for KPIs\n- Collaborate with design and content teams\n- Maintain email list hygiene and segmentation\n\nRequirements:\n- 2+ years of email marketing experience\n- Proficiency with email platforms (Mailchimp, Sendgrid, HubSpot)\n- Understanding of HTML/CSS for email templates\n- Strong analytical and data-driven mindset\n- Experience with marketing automation",
    tags: ["Marketing", "Design"],
  },
  {
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, US",
    category: "Design",
    type: "Full-Time",
    companyLogo: companyLogos["Dropbox"],
    description:
      "Dropbox is seeking a talented Brand Designer to expand our creative team. You'll help shape how Dropbox shows up in the world through thoughtful, impactful design work across all customer touchpoints.\n\nResponsibilities:\n- Create visual designs for brand campaigns\n- Work on brand guidelines and design systems\n- Design presentations and marketing collateral\n- Collaborate with cross-functional teams\n\nRequirements:\n- 3+ years brand or visual design experience\n- Expertise in Figma, Illustrator, Photoshop\n- Strong portfolio with brand projects\n- Excellent eye for typography and color",
    tags: ["Design", "Business"],
  },
  {
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    category: "Marketing",
    type: "Full-Time",
    companyLogo: companyLogos["Pitch"],
    description:
      "Pitch is looking for a Customer Email Marketing specialist who can create engaging email campaigns that drive user activation, retention, and growth for our presentation platform.\n\nResponsibilities:\n- Plan and execute lifecycle email campaigns\n- Manage automated onboarding sequences\n- Track and optimize email performance metrics\n- Work with content and product teams\n\nRequirements:\n- Experience in SaaS email marketing\n- Knowledge of email automation tools\n- Strong copywriting and design sensibility\n- Analytical mindset with attention to metrics",
    tags: ["Marketing"],
  },
  {
    title: "Visual Designer",
    company: "Blinkist",
    location: "Granada, Spain",
    category: "Design",
    type: "Full-Time",
    companyLogo: companyLogos["Blinkist"],
    description:
      "Blinkist is seeking a Visual Designer to join our creative team. You'll create stunning visual content for our platform, marketing materials, and brand experiences.\n\nResponsibilities:\n- Create visual designs for mobile and web platforms\n- Design marketing and social media graphics\n- Contribute to the overall visual direction of the brand\n- Prototype and iterate on design concepts\n\nRequirements:\n- Strong visual design portfolio\n- Proficiency in Figma, Sketch, or Adobe XD\n- Understanding of mobile design patterns\n- Eye for detail and typography",
    tags: ["Design"],
  },
  {
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    category: "Design",
    type: "Full-Time",
    companyLogo: companyLogos["ClassPass"],
    description:
      "ClassPass is looking for a Product Designer to help us create delightful fitness booking experiences. You'll work closely with engineering and product teams to design intuitive, beautiful interfaces.\n\nResponsibilities:\n- Design end-to-end product features\n- Conduct user research and usability testing\n- Create wireframes, prototypes, and high-fidelity designs\n- Maintain and extend the design system\n- Collaborate closely with engineers during implementation\n\nRequirements:\n- 3+ years of product design experience\n- Strong portfolio showing product design work\n- Proficiency in Figma\n- Experience with user research methods\n- Understanding of design systems",
    tags: ["Marketing", "Design"],
  },
  {
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    category: "Design",
    type: "Full-Time",
    companyLogo: companyLogos["Canva"],
    description:
      "Canva is looking for a Lead Designer to help develop next-generation design features. You'll lead a team of designers working on some of the most-used design tools in the world.\n\nResponsibilities:\n- Lead and mentor a team of designers\n- Set design direction for major product initiatives\n- Collaborate with product and engineering leadership\n- Drive design quality and innovation\n- Contribute to design system evolution\n\nRequirements:\n- 5+ years of design experience, 2+ in leadership\n- Expert-level Figma skills\n- Strong portfolio with complex product design\n- Experience leading and mentoring designers\n- Strategic thinking and communication skills",
    tags: ["Design", "Business"],
  },
  {
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    category: "Marketing",
    type: "Full-Time",
    companyLogo: companyLogos["GoDaddy"],
    description:
      "GoDaddy is seeking a Brand Strategist to help define and execute our brand positioning. You'll work with cross-functional teams to create compelling brand narratives that resonate with small business owners.\n\nResponsibilities:\n- Develop brand strategy and positioning\n- Create brand guidelines and messaging frameworks\n- Conduct market research and competitive analysis\n- Lead brand workshops and presentations\n\nRequirements:\n- 4+ years in brand strategy or related field\n- Strong analytical and research skills\n- Excellent presentation and storytelling abilities\n- Experience in tech or SaaS companies preferred",
    tags: ["Marketing"],
  },
  {
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    category: "Technology",
    type: "Full-Time",
    companyLogo: companyLogos["Twitter"],
    description:
      "Twitter is looking for a Data Analyst to help teams make data-driven decisions. You'll analyze product metrics, build dashboards, and provide actionable insights that shape product strategy.\n\nResponsibilities:\n- Analyze product usage data and user behavior\n- Build dashboards and reporting tools\n- Conduct A/B test analysis\n- Present findings to stakeholders\n- Identify trends and opportunities in data\n\nRequirements:\n- 2+ years of data analysis experience\n- Strong SQL and Python skills\n- Experience with visualization tools (Tableau, Looker)\n- Statistical analysis knowledge\n- Excellent communication skills",
    tags: ["Technology"],
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();

  // Insert jobs
  for (const job of jobs) {
    await prisma.job.create({ data: job });
  }

  console.log(`✅ Seeded ${jobs.length} jobs successfully!`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
