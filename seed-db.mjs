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
    await db.delete(schema.successStories);
    await db.delete(schema.courseRecommendations);
    await db.delete(schema.talentProgress);
    await db.delete(schema.achievements);
    await db.delete(schema.careerPlans);
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
        birthDate: new Date('1990-05-15'),
        identityVerified: true,
        xp: 250,
        level: 3,
      },
      {
        userId: 2,
        pseudonym: "Talent-X-002",
        bio: "Designer UI/UX focada em criar experiências memoráveis e inclusivas.",
        currentRole: "Designer UI/UX",
        yearsExperience: 5,
        industry: "Design",
        location: "Rio de Janeiro, RJ",
        birthDate: new Date('1993-08-22'),
        identityVerified: true,
        xp: 180,
        level: 2,
      },
      {
        userId: 3,
        pseudonym: "Talent-X-003",
        bio: "Analista de Dados com expertise em Python e Machine Learning.",
        currentRole: "Analista de Dados Senior",
        yearsExperience: 6,
        industry: "Tecnologia",
        location: "Belo Horizonte, MG",
        birthDate: new Date('1992-03-10'),
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
        experienceLevel: "senior",
        requiredSkills: JSON.stringify(["React", "Node.js", "TypeScript", "PostgreSQL"]),
        salaryMin: "12000",
        salaryMax: "18000",
        location: "São Paulo, SP",
        status: "active",
      },
      {
        companyId: 1,
        title: "Engenheira de Software",
        description: "Procuramos engenheira de software para trabalhar com arquitetura de microservices e cloud.",
        sector: "Tecnologia",
        experienceLevel: "senior",
        requiredSkills: JSON.stringify(["Java", "Kubernetes", "AWS", "Microservices"]),
        salaryMin: "15000",
        salaryMax: "22000",
        location: "São Paulo, SP",
        status: "active",
      },
      {
        companyId: 2,
        title: "Desenvolvedora Mobile",
        description: "Desenvolvedora mobile para criar aplicativos incríveis com React Native.",
        sector: "Tecnologia",
        experienceLevel: "mid",
        requiredSkills: JSON.stringify(["React Native", "JavaScript", "iOS", "Android"]),
        salaryMin: "8000",
        salaryMax: "12000",
        location: "Rio de Janeiro, RJ",
        status: "active",
      },
      {
        companyId: 3,
        title: "Designer UI/UX",
        description: "Designer UI/UX para criar experiências digitais memoráveis e inclusivas.",
        sector: "Design",
        experienceLevel: "mid",
        requiredSkills: JSON.stringify(["Figma", "UI Design", "UX Research", "Prototipagem"]),
        salaryMin: "7000",
        salaryMax: "11000",
        location: "Belo Horizonte, MG",
        status: "active",
      },
      {
        companyId: 4,
        title: "Analista de Dados Senior",
        description: "Analista de dados para trabalhar com grandes volumes de dados e machine learning.",
        sector: "Tecnologia",
        experienceLevel: "senior",
        requiredSkills: JSON.stringify(["Python", "Pandas", "Machine Learning", "SQL"]),
        salaryMin: "10000",
        salaryMax: "16000",
        location: "Curitiba, PR",
        status: "active",
      },
      {
        companyId: 2,
        title: "Product Manager",
        description: "Product Manager para liderar o desenvolvimento de produtos digitais inovadores.",
        sector: "Produto",
        experienceLevel: "senior",
        requiredSkills: JSON.stringify(["Product Strategy", "User Stories", "Analytics", "A/B Testing"]),
        salaryMin: "12000",
        salaryMax: "18000",
        location: "Rio de Janeiro, RJ",
        status: "active",
      },
      {
        companyId: 1,
        title: "Gerente de Projetos",
        description: "Gerente de projetos certificada PMP para liderar equipes ágeis.",
        sector: "Gestão",
        experienceLevel: "senior",
        requiredSkills: JSON.stringify(["Scrum", "Kanban", "Jira", "Gestão de Equipes"]),
        salaryMin: "11000",
        salaryMax: "17000",
        location: "São Paulo, SP",
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
        status: "hired",
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
        status: "hired",
      },
      {
        talentId: 6,
        jobId: 2,
        compatibilityScore: 93,
        matchedSkills: JSON.stringify(["Java", "Kubernetes", "AWS"]),
        status: "hired",
      },
      {
        talentId: 7,
        jobId: 6,
        compatibilityScore: 87,
        matchedSkills: JSON.stringify(["Product Strategy", "Analytics"]),
        status: "pending",
      },
    ]);

    // Insert success stories
    console.log("🌟 Inserting success stories...");
    await db.insert(schema.successStories).values([
      {
        talentId: 2,
        companyId: 3,
        testimonial: "O StellarBridge mudou minha vida profissional. Após anos tentando entrar no mercado de design, finalmente consegui uma oportunidade que valoriza minhas habilidades. Hoje trabalho em projetos incríveis e ganho 40% a mais do que no meu emprego anterior.",
        beforeRole: "Designer Freelancer",
        afterRole: "Designer UI/UX Pleno",
        salaryIncrease: "40.50",
      },
      {
        talentId: 5,
        companyId: 2,
        testimonial: "A plataforma me conectou com uma empresa que realmente acredita em diversidade. O processo foi transparente e justo. Hoje desenvolvo aplicativos que impactam milhões de pessoas e me sinto realizada profissionalmente.",
        beforeRole: "Desenvolvedora Júnior",
        afterRole: "Desenvolvedora Mobile Pleno",
        salaryIncrease: "65.00",
      },
      {
        talentId: 6,
        companyId: 1,
        testimonial: "Graças ao StellarBridge, consegui minha primeira oportunidade em uma grande empresa de tecnologia. O recrutamento blind eliminou os viéses e permitiu que minhas habilidades falassem por si. Hoje lidero projetos de arquitetura de sistemas.",
        beforeRole: "Engenheira de Software Júnior",
        afterRole: "Engenheira de Software Sênior",
        salaryIncrease: "85.00",
      },
    ]);

    // Insert career plans
    console.log("🎯 Inserting career plans...");
    await db.insert(schema.careerPlans).values([
      {
        talentId: 1,
        targetRole: "Tech Lead",
        targetIndustry: "Tecnologia",
        targetSalary: "15000",
        deadline: new Date('2026-12-31'),
      },
      {
        talentId: 2,
        targetRole: "Head of Design",
        targetIndustry: "Design",
        targetSalary: "12000",
        deadline: new Date('2027-06-30'),
      },
    ]);

    // Insert achievements
    console.log("🏆 Inserting achievements...");
    await db.insert(schema.achievements).values([
      {
        talentId: 1,
        badgeType: "first_certification",
        badgeName: "Primeira Certificação",
        badgeDescription: "Parabéns por completar sua primeira certificação!",
        badgeIcon: "🎓",
        xpAwarded: 50,
      },
      {
        talentId: 1,
        badgeType: "level_3",
        badgeName: "Nível 3 Alcançado",
        badgeDescription: "Você alcançou o nível 3!",
        badgeIcon: "🎯",
        xpAwarded: 0,
      },
      {
        talentId: 2,
        badgeType: "first_certification",
        badgeName: "Primeira Certificação",
        badgeDescription: "Parabéns por completar sua primeira certificação!",
        badgeIcon: "🎓",
        xpAwarded: 50,
      },
    ]);

    // Insert talent progress
    console.log("📈 Inserting talent progress...");
    await db.insert(schema.talentProgress).values([
      {
        talentId: 1,
        eventType: "profile_completed",
        xpGained: 50,
        description: "Perfil completo criado",
      },
      {
        talentId: 1,
        eventType: "certification_added",
        xpGained: 100,
        description: "Certificação adicionada",
      },
      {
        talentId: 1,
        eventType: "skill_verified",
        xpGained: 50,
        description: "Habilidade verificada",
      },
      {
        talentId: 1,
        eventType: "career_plan_created",
        xpGained: 50,
        description: "Plano de carreira definido",
      },
      {
        talentId: 2,
        eventType: "profile_completed",
        xpGained: 50,
        description: "Perfil completo criado",
      },
      {
        talentId: 2,
        eventType: "certification_added",
        xpGained: 100,
        description: "Certificação adicionada",
      },
      {
        talentId: 2,
        eventType: "career_plan_created",
        xpGained: 30,
        description: "Plano de carreira definido",
      },
    ]);

    // Insert course recommendations
    console.log("📚 Inserting course recommendations...");
    await db.insert(schema.courseRecommendations).values([
      {
        talentId: 1,
        courseName: "Liderança Técnica e Gestão de Times",
        provider: "Alura",
        category: "Leadership",
        skillsToGain: JSON.stringify(["Liderança", "Gestão de Pessoas", "Comunicação"]),
        priority: 10,
        reason: "Essencial para alcançar seu objetivo: Tech Lead",
        courseUrl: "https://www.alura.com.br/curso-online-lideranca-tecnica",
        estimatedDuration: "8 semanas",
        status: "recommended",
      },
      {
        talentId: 1,
        courseName: "Arquitetura de Microsserviços",
        provider: "Udemy",
        category: "Architecture",
        skillsToGain: JSON.stringify(["Microsserviços", "Docker", "Kubernetes"]),
        priority: 9,
        reason: "Habilidade técnica avançada para Tech Leads",
        courseUrl: "https://www.udemy.com/course/microservices-architecture/",
        estimatedDuration: "10 semanas",
        status: "in_progress",
      },
      {
        talentId: 2,
        courseName: "Design System Avançado",
        provider: "Interaction Design Foundation",
        category: "Design",
        skillsToGain: JSON.stringify(["Design Systems", "Component Library", "Design Tokens"]),
        priority: 10,
        reason: "Fundamental para Head of Design",
        courseUrl: "https://www.interaction-design.org/courses/design-systems",
        estimatedDuration: "6 semanas",
        status: "recommended",
      },
    ]);

    console.log("✅ Database seeded successfully!");
    console.log("\n📊 Summary:");
    console.log("- 7 talents created (with XP and levels)");
    console.log("- 28 skills added");
    console.log("- 7 education records added");
    console.log("- 7 certifications added");
    console.log("- 4 companies created");
    console.log("- 7 job postings created (with salary ranges)");
    console.log("- 8 matches created (3 hired)");
    console.log("- 3 success stories added");
    console.log("- 2 career plans created");
    console.log("- 3 achievements added");
    console.log("- 7 progress records added");
    console.log("- 3 course recommendations added");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
