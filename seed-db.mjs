import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./drizzle/schema.js";
import dotenv from "dotenv";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    // Clear existing data (except users table)
    console.log("🗑️  Clearing existing data...");
    await db.delete(schema.notifications);
    await db.delete(schema.matches);
    await db.delete(schema.jobPostings);
    await db.delete(schema.talentCertifications);
    await db.delete(schema.talentEducation);
    await db.delete(schema.talentSkills);
    await db.delete(schema.companies);
    await db.delete(schema.talents);

    // Insert talents
    console.log("👩‍💻 Inserting talents...");
    const talents = await db.insert(schema.talents).values([
      {
        userId: 1,
        pseudonym: "Talent-X-001",
        bio: "Desenvolvedora Full Stack apaixonada por criar soluções inovadoras e acessíveis.",
        currentRole: "Desenvolvedora Full Stack Senior",
        yearsExperience: 8,
        industry: "Tecnologia",
        location: "São Paulo, SP",
        identityVerified: true,
      },
      {
        userId: 2,
        pseudonym: "Talent-X-002",
        bio: "Designer UI/UX focada em criar experiências memoráveis e inclusivas.",
        currentRole: "Designer UI/UX",
        yearsExperience: 5,
        industry: "Design",
        location: "Rio de Janeiro, RJ",
        identityVerified: true,
      },
      {
        userId: 3,
        pseudonym: "Talent-X-003",
        bio: "Analista de Dados com expertise em Python e Machine Learning.",
        currentRole: "Analista de Dados Senior",
        yearsExperience: 6,
        industry: "Tecnologia",
        location: "Belo Horizonte, MG",
        identityVerified: true,
      },
      {
        userId: 4,
        pseudonym: "Talent-X-004",
        bio: "Gerente de Projetos certificada PMP com foco em metodologias ágeis.",
        currentRole: "Gerente de Projetos",
        yearsExperience: 10,
        industry: "Gestão",
        location: "Curitiba, PR",
        identityVerified: true,
      },
      {
        userId: 5,
        pseudonym: "Talent-X-005",
        bio: "Desenvolvedora Mobile especializada em React Native e Flutter.",
        currentRole: "Desenvolvedora Mobile",
        yearsExperience: 4,
        industry: "Tecnologia",
        location: "Porto Alegre, RS",
        identityVerified: true,
      },
      {
        userId: 6,
        pseudonym: "Talent-X-006",
        bio: "Engenheira de Software com foco em arquitetura de sistemas distribuídos.",
        currentRole: "Engenheira de Software",
        yearsExperience: 7,
        industry: "Tecnologia",
        location: "Brasília, DF",
        identityVerified: true,
      },
      {
        userId: 7,
        pseudonym: "Talent-X-007",
        bio: "Product Manager com experiência em produtos digitais e SaaS.",
        currentRole: "Product Manager",
        yearsExperience: 6,
        industry: "Produto",
        location: "São Paulo, SP",
        identityVerified: true,
      },
    ]);

    // Insert talent skills
    console.log("💡 Inserting talent skills...");
    await db.insert(schema.talentSkills).values([
      { talentId: 1, skill: "React" },
      { talentId: 1, skill: "Node.js" },
      { talentId: 1, skill: "TypeScript" },
      { talentId: 1, skill: "PostgreSQL" },
      { talentId: 2, skill: "Figma" },
      { talentId: 2, skill: "Adobe XD" },
      { talentId: 2, skill: "UI Design" },
      { talentId: 2, skill: "UX Research" },
      { talentId: 3, skill: "Python" },
      { talentId: 3, skill: "Pandas" },
      { talentId: 3, skill: "Machine Learning" },
      { talentId: 3, skill: "SQL" },
      { talentId: 4, skill: "Scrum" },
      { talentId: 4, skill: "Kanban" },
      { talentId: 4, skill: "Jira" },
      { talentId: 4, skill: "Gestão de Equipes" },
      { talentId: 5, skill: "React Native" },
      { talentId: 5, skill: "Flutter" },
      { talentId: 5, skill: "iOS" },
      { talentId: 5, skill: "Android" },
      { talentId: 6, skill: "Java" },
      { talentId: 6, skill: "Kubernetes" },
      { talentId: 6, skill: "Microservices" },
      { talentId: 6, skill: "AWS" },
      { talentId: 7, skill: "Product Strategy" },
      { talentId: 7, skill: "User Stories" },
      { talentId: 7, skill: "Analytics" },
      { talentId: 7, skill: "A/B Testing" },
    ]);

    // Insert talent education
    console.log("🎓 Inserting talent education...");
    await db.insert(schema.talentEducation).values([
      {
        talentId: 1,
        institution: "Universidade de São Paulo",
        course: "Bacharelado em Ciência da Computação",
        completionYear: 2016,
      },
      {
        talentId: 2,
        institution: "PUC-Rio",
        course: "Bacharelado em Design",
        completionYear: 2019,
      },
      {
        talentId: 3,
        institution: "UFMG",
        course: "Bacharelado em Estatística",
        completionYear: 2018,
      },
      {
        talentId: 4,
        institution: "FGV",
        course: "MBA em Gestão de Projetos",
        completionYear: 2015,
      },
      {
        talentId: 5,
        institution: "UFRGS",
        course: "Bacharelado em Sistemas de Informação",
        completionYear: 2020,
      },
      {
        talentId: 6,
        institution: "UnB",
        course: "Bacharelado em Engenharia de Software",
        completionYear: 2017,
      },
      {
        talentId: 7,
        institution: "Insper",
        course: "Bacharelado em Administração",
        completionYear: 2018,
      },
    ]);

    // Insert talent certifications
    console.log("🏆 Inserting talent certifications...");
    await db.insert(schema.talentCertifications).values([
      {
        talentId: 1,
        certification: "AWS Certified Solutions Architect",
      },
      {
        talentId: 2,
        certification: "Google UX Design Professional Certificate",
      },
      {
        talentId: 3,
        certification: "Google Data Analytics Professional Certificate",
      },
      {
        talentId: 4,
        certification: "PMP - Project Management Professional",
      },
      {
        talentId: 5,
        certification: "Google Associate Android Developer",
      },
      {
        talentId: 6,
        certification: "Certified Kubernetes Administrator (CKA)",
      },
      {
        talentId: 7,
        certification: "Certified Scrum Product Owner (CSPO)",
      },
    ]);

    // Insert companies
    console.log("🏢 Inserting companies...");
    await db.insert(schema.companies).values([
      {
        userId: 10,
        companyName: "TechCorp Brasil",
        industry: "Tecnologia",
        size: "Grande (500+ funcionários)",
        location: "São Paulo, SP",
        website: "https://techcorp.com.br",
        description: "Líder em soluções de software empresarial no Brasil.",
      },
      {
        userId: 11,
        companyName: "InovaSoft",
        industry: "Tecnologia",
        size: "Média (50-500 funcionários)",
        location: "Rio de Janeiro, RJ",
        website: "https://inovasoft.com.br",
        description: "Startup de tecnologia focada em inovação e transformação digital.",
      },
      {
        userId: 12,
        companyName: "DesignHub",
        industry: "Design",
        size: "Pequena (10-50 funcionários)",
        location: "Belo Horizonte, MG",
        website: "https://designhub.com.br",
        description: "Agência de design e branding com foco em experiência do usuário.",
      },
      {
        userId: 13,
        companyName: "DataInsights",
        industry: "Tecnologia",
        size: "Média (50-500 funcionários)",
        location: "Curitiba, PR",
        website: "https://datainsights.com.br",
        description: "Consultoria especializada em análise de dados e BI.",
      },
    ]);

    // Insert job postings
    console.log("💼 Inserting job postings...");
    await db.insert(schema.jobPostings).values([
      {
        companyId: 1,
        title: "Desenvolvedora Full Stack Senior",
        description: "Buscamos desenvolvedora full stack com experiência em React e Node.js para liderar projetos inovadores.",
        sector: "Tecnologia",
        level: "Senior",
        requiredSkills: JSON.stringify(["React", "Node.js", "TypeScript", "PostgreSQL"]),
        salaryRange: "R$ 12.000 - R$ 18.000",
        location: "São Paulo, SP / Remoto",
        status: "active",
      },
      {
        companyId: 1,
        title: "Engenheira de Software",
        description: "Procuramos engenheira de software para trabalhar com arquitetura de microservices e cloud.",
        sector: "Tecnologia",
        level: "Senior",
        requiredSkills: JSON.stringify(["Java", "Kubernetes", "AWS", "Microservices"]),
        salaryRange: "R$ 15.000 - R$ 22.000",
        location: "São Paulo, SP / Remoto",
        status: "active",
      },
      {
        companyId: 2,
        title: "Desenvolvedora Mobile",
        description: "Desenvolvedora mobile para criar aplicativos incríveis com React Native.",
        sector: "Tecnologia",
        level: "Pleno",
        requiredSkills: JSON.stringify(["React Native", "JavaScript", "iOS", "Android"]),
        salaryRange: "R$ 8.000 - R$ 12.000",
        location: "Rio de Janeiro, RJ / Remoto",
        status: "active",
      },
      {
        companyId: 3,
        title: "Designer UI/UX",
        description: "Designer UI/UX para criar experiências digitais memoráveis e inclusivas.",
        sector: "Design",
        level: "Pleno",
        requiredSkills: JSON.stringify(["Figma", "UI Design", "UX Research", "Prototipagem"]),
        salaryRange: "R$ 7.000 - R$ 11.000",
        location: "Belo Horizonte, MG / Remoto",
        status: "active",
      },
      {
        companyId: 4,
        title: "Analista de Dados Senior",
        description: "Analista de dados para trabalhar com grandes volumes de dados e machine learning.",
        sector: "Tecnologia",
        level: "Senior",
        requiredSkills: JSON.stringify(["Python", "Pandas", "Machine Learning", "SQL"]),
        salaryRange: "R$ 10.000 - R$ 16.000",
        location: "Curitiba, PR / Remoto",
        status: "active",
      },
      {
        companyId: 2,
        title: "Product Manager",
        description: "Product Manager para liderar o desenvolvimento de produtos digitais inovadores.",
        sector: "Produto",
        level: "Senior",
        requiredSkills: JSON.stringify(["Product Strategy", "User Stories", "Analytics", "A/B Testing"]),
        salaryRange: "R$ 12.000 - R$ 18.000",
        location: "Rio de Janeiro, RJ / Remoto",
        status: "active",
      },
      {
        companyId: 1,
        title: "Gerente de Projetos",
        description: "Gerente de projetos certificada PMP para liderar equipes ágeis.",
        sector: "Gestão",
        level: "Senior",
        requiredSkills: JSON.stringify(["Scrum", "Kanban", "Jira", "Gestão de Equipes"]),
        salaryRange: "R$ 11.000 - R$ 17.000",
        location: "São Paulo, SP / Híbrido",
        status: "active",
      },
    ]);

    // Insert matches
    console.log("🤝 Inserting matches...");
    await db.insert(schema.matches).values([
      {
        talentId: 1,
        jobId: 1,
        compatibilityScore: 95,
        matchedSkills: JSON.stringify(["React", "Node.js", "TypeScript"]),
        status: "pending",
      },
      {
        talentId: 1,
        jobId: 2,
        compatibilityScore: 78,
        matchedSkills: JSON.stringify(["React", "Node.js"]),
        status: "pending",
      },
      {
        talentId: 2,
        jobId: 4,
        compatibilityScore: 92,
        matchedSkills: JSON.stringify(["Figma", "UI Design", "UX Research"]),
        status: "interested",
      },
      {
        talentId: 3,
        jobId: 5,
        compatibilityScore: 88,
        matchedSkills: JSON.stringify(["Python", "Pandas", "SQL"]),
        status: "pending",
      },
      {
        talentId: 4,
        jobId: 7,
        compatibilityScore: 85,
        matchedSkills: JSON.stringify(["Scrum", "Kanban", "Jira"]),
        status: "pending",
      },
      {
        talentId: 5,
        jobId: 3,
        compatibilityScore: 90,
        matchedSkills: JSON.stringify(["React Native", "iOS", "Android"]),
        status: "pending",
      },
      {
        talentId: 6,
        jobId: 2,
        compatibilityScore: 93,
        matchedSkills: JSON.stringify(["Java", "Kubernetes", "AWS"]),
        status: "pending",
      },
      {
        talentId: 7,
        jobId: 6,
        compatibilityScore: 87,
        matchedSkills: JSON.stringify(["Product Strategy", "Analytics"]),
        status: "pending",
      },
    ]);

    console.log("✅ Database seeded successfully!");
    console.log("\n📊 Summary:");
    console.log("- 7 talents created");
    console.log("- 28 skills added");
    console.log("- 7 education records added");
    console.log("- 7 certifications added");
    console.log("- 4 companies created");
    console.log("- 7 job postings created");
    console.log("- 8 matches created");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
