import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./drizzle/schema.js";
import dotenv from "dotenv";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

async function seed() {
  console.log("🌱 Starting expanded database seed...");

  try {
    // Clear existing data
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

    // Insert 30+ diverse talents
    console.log("👩‍💻 Inserting 30+ talents...");
    const talentsData = [
      {
        userId: 1,
        pseudonym: "Talent-Alpha-001",
        bio: "Desenvolvedora Full Stack apaixonada por criar soluções inovadoras e acessíveis. Especialista em React e Node.js.",
        currentRole: "Desenvolvedora Full Stack Senior",
        yearsExperience: 8,
        industry: "Tecnologia",
        location: "São Paulo, SP",
        birthDate: new Date('1990-05-15'),
        identityVerified: true,
        xp: 450,
        level: 5,
      },
      {
        userId: 2,
        pseudonym: "Talent-Beta-002",
        bio: "Designer UI/UX focada em criar experiências memoráveis e inclusivas. Especialista em Design Systems.",
        currentRole: "Designer UI/UX Senior",
        yearsExperience: 6,
        industry: "Design",
        location: "Rio de Janeiro, RJ",
        birthDate: new Date('1992-08-22'),
        identityVerified: true,
        xp: 380,
        level: 4,
      },
      {
        userId: 3,
        pseudonym: "Talent-Gamma-003",
        bio: "Cientista de Dados com foco em Machine Learning e análise preditiva. Apaixonada por transformar dados em insights.",
        currentRole: "Data Scientist",
        yearsExperience: 5,
        industry: "Tecnologia",
        location: "Belo Horizonte, MG",
        birthDate: new Date('1993-03-10'),
        identityVerified: true,
        xp: 320,
        level: 4,
      },
      {
        userId: 4,
        pseudonym: "Talent-Delta-004",
        bio: "Gerente de Projetos Ágeis com certificação Scrum Master. Experiência em liderar times distribuídos.",
        currentRole: "Agile Project Manager",
        yearsExperience: 7,
        industry: "Gestão",
        location: "Curitiba, PR",
        birthDate: new Date('1989-11-28'),
        identityVerified: true,
        xp: 410,
        level: 5,
      },
      {
        userId: 5,
        pseudonym: "Talent-Epsilon-005",
        bio: "Desenvolvedora Mobile especializada em React Native. Criadora de apps com milhões de downloads.",
        currentRole: "Mobile Developer",
        yearsExperience: 4,
        industry: "Tecnologia",
        location: "Porto Alegre, RS",
        birthDate: new Date('1994-06-17'),
        identityVerified: true,
        xp: 290,
        level: 3,
      },
      {
        userId: 6,
        pseudonym: "Talent-Zeta-006",
        bio: "Engenheira de Software com expertise em arquitetura de microsserviços e cloud computing.",
        currentRole: "Software Engineer",
        yearsExperience: 9,
        industry: "Tecnologia",
        location: "Brasília, DF",
        birthDate: new Date('1988-01-05'),
        identityVerified: true,
        xp: 520,
        level: 6,
      },
      {
        userId: 7,
        pseudonym: "Talent-Eta-007",
        bio: "Product Manager com visão estratégica e foco em métricas. Experiência em produtos B2B e B2C.",
        currentRole: "Product Manager",
        yearsExperience: 6,
        industry: "Produto",
        location: "Florianópolis, SC",
        birthDate: new Date('1991-09-14'),
        identityVerified: true,
        xp: 360,
        level: 4,
      },
      {
        userId: 8,
        pseudonym: "Talent-Theta-008",
        bio: "Desenvolvedora Backend especializada em Python e Django. Focada em performance e escalabilidade.",
        currentRole: "Backend Developer",
        yearsExperience: 5,
        industry: "Tecnologia",
        location: "Recife, PE",
        birthDate: new Date('1993-04-20'),
        identityVerified: true,
        xp: 310,
        level: 4,
      },
      {
        userId: 9,
        pseudonym: "Talent-Iota-009",
        bio: "Designer Gráfica com foco em branding e identidade visual. Portfólio premiado internacionalmente.",
        currentRole: "Graphic Designer",
        yearsExperience: 7,
        industry: "Design",
        location: "Salvador, BA",
        birthDate: new Date('1990-12-03'),
        identityVerified: true,
        xp: 390,
        level: 4,
      },
      {
        userId: 10,
        pseudonym: "Talent-Kappa-010",
        bio: "Analista de QA com expertise em automação de testes. Garantindo qualidade em cada release.",
        currentRole: "QA Engineer",
        yearsExperience: 4,
        industry: "Tecnologia",
        location: "Fortaleza, CE",
        birthDate: new Date('1994-07-18'),
        identityVerified: true,
        xp: 270,
        level: 3,
      },
      {
        userId: 11,
        pseudonym: "Talent-Lambda-011",
        bio: "DevOps Engineer especializada em Kubernetes e CI/CD. Automatizando infraestrutura com paixão.",
        currentRole: "DevOps Engineer",
        yearsExperience: 6,
        industry: "Tecnologia",
        location: "Campinas, SP",
        birthDate: new Date('1991-02-25'),
        identityVerified: true,
        xp: 350,
        level: 4,
      },
      {
        userId: 12,
        pseudonym: "Talent-Mu-012",
        bio: "UX Researcher focada em métodos qualitativos e quantitativos. Descobrindo insights que transformam produtos.",
        currentRole: "UX Researcher",
        yearsExperience: 5,
        industry: "Design",
        location: "São Paulo, SP",
        birthDate: new Date('1992-10-08'),
        identityVerified: true,
        xp: 300,
        level: 3,
      },
      {
        userId: 13,
        pseudonym: "Talent-Nu-013",
        bio: "Desenvolvedora Frontend especializada em Vue.js e animações web. Criando interfaces que encantam.",
        currentRole: "Frontend Developer",
        yearsExperience: 4,
        industry: "Tecnologia",
        location: "Rio de Janeiro, RJ",
        birthDate: new Date('1994-05-12'),
        identityVerified: true,
        xp: 260,
        level: 3,
      },
      {
        userId: 14,
        pseudonym: "Talent-Xi-014",
        bio: "Engenheira de Machine Learning com foco em NLP e Computer Vision. Transformando IA em realidade.",
        currentRole: "ML Engineer",
        yearsExperience: 5,
        industry: "Tecnologia",
        location: "São Paulo, SP",
        birthDate: new Date('1993-08-30'),
        identityVerified: true,
        xp: 330,
        level: 4,
      },
      {
        userId: 15,
        pseudonym: "Talent-Omicron-015",
        bio: "Scrum Master certificada com experiência em transformação ágil. Facilitando colaboração e entrega de valor.",
        currentRole: "Scrum Master",
        yearsExperience: 6,
        industry: "Gestão",
        location: "Belo Horizonte, MG",
        birthDate: new Date('1991-03-22'),
        identityVerified: true,
        xp: 340,
        level: 4,
      },
      {
        userId: 16,
        pseudonym: "Talent-Pi-016",
        bio: "Desenvolvedora Júnior apaixonada por aprender. Focada em JavaScript e desenvolvimento web moderno.",
        currentRole: "Junior Developer",
        yearsExperience: 1,
        industry: "Tecnologia",
        location: "Curitiba, PR",
        birthDate: new Date('1998-11-15'),
        identityVerified: true,
        xp: 120,
        level: 2,
      },
      {
        userId: 17,
        pseudonym: "Talent-Rho-017",
        bio: "Analista de Segurança da Informação com foco em pentest e ethical hacking. Protegendo sistemas críticos.",
        currentRole: "Security Analyst",
        yearsExperience: 7,
        industry: "Tecnologia",
        location: "Brasília, DF",
        birthDate: new Date('1989-06-08'),
        identityVerified: true,
        xp: 420,
        level: 5,
      },
      {
        userId: 18,
        pseudonym: "Talent-Sigma-018",
        bio: "Content Designer especializada em microcopy e UX Writing. Palavras que guiam e convertem.",
        currentRole: "Content Designer",
        yearsExperience: 4,
        industry: "Design",
        location: "Porto Alegre, RS",
        birthDate: new Date('1994-09-20'),
        identityVerified: true,
        xp: 250,
        level: 3,
      },
      {
        userId: 19,
        pseudonym: "Talent-Tau-019",
        bio: "Arquiteta de Soluções com visão holística de sistemas. Desenhando arquiteturas robustas e escaláveis.",
        currentRole: "Solutions Architect",
        yearsExperience: 10,
        industry: "Tecnologia",
        location: "São Paulo, SP",
        birthDate: new Date('1987-04-12'),
        identityVerified: true,
        xp: 580,
        level: 6,
      },
      {
        userId: 20,
        pseudonym: "Talent-Upsilon-020",
        bio: "Business Analyst com expertise em levantamento de requisitos e modelagem de processos.",
        currentRole: "Business Analyst",
        yearsExperience: 5,
        industry: "Negócios",
        location: "Florianópolis, SC",
        birthDate: new Date('1992-07-25'),
        identityVerified: true,
        xp: 280,
        level: 3,
      },
      {
        userId: 21,
        pseudonym: "Talent-Phi-021",
        bio: "Desenvolvedora iOS nativa com Swift. Criando experiências premium para o ecossistema Apple.",
        currentRole: "iOS Developer",
        yearsExperience: 5,
        industry: "Tecnologia",
        location: "São Paulo, SP",
        birthDate: new Date('1993-01-18'),
        identityVerified: true,
        xp: 310,
        level: 4,
      },
      {
        userId: 22,
        pseudonym: "Talent-Chi-022",
        bio: "Tech Lead com experiência em liderar times de engenharia. Mentora e evangelista de boas práticas.",
        currentRole: "Tech Lead",
        yearsExperience: 9,
        industry: "Tecnologia",
        location: "Rio de Janeiro, RJ",
        birthDate: new Date('1988-10-05'),
        identityVerified: true,
        xp: 510,
        level: 6,
      },
      {
        userId: 23,
        pseudonym: "Talent-Psi-023",
        bio: "Growth Hacker focada em métricas e experimentação. Acelerando crescimento através de dados.",
        currentRole: "Growth Hacker",
        yearsExperience: 4,
        industry: "Marketing",
        location: "São Paulo, SP",
        birthDate: new Date('1994-03-30'),
        identityVerified: true,
        xp: 240,
        level: 3,
      },
      {
        userId: 24,
        pseudonym: "Talent-Omega-024",
        bio: "Engenheira de Dados especializada em Big Data e data pipelines. Construindo infraestrutura de dados robusta.",
        currentRole: "Data Engineer",
        yearsExperience: 6,
        industry: "Tecnologia",
        location: "Belo Horizonte, MG",
        birthDate: new Date('1991-12-14'),
        identityVerified: true,
        xp: 370,
        level: 4,
      },
      {
        userId: 25,
        pseudonym: "Talent-Alpha-025",
        bio: "Motion Designer especializada em animações 2D e 3D. Dando vida a marcas e produtos.",
        currentRole: "Motion Designer",
        yearsExperience: 5,
        industry: "Design",
        location: "Curitiba, PR",
        birthDate: new Date('1992-05-08'),
        identityVerified: true,
        xp: 290,
        level: 3,
      },
      {
        userId: 26,
        pseudonym: "Talent-Beta-026",
        bio: "Desenvolvedora Android nativa com Kotlin. Expertise em Material Design e performance.",
        currentRole: "Android Developer",
        yearsExperience: 4,
        industry: "Tecnologia",
        location: "Porto Alegre, RS",
        birthDate: new Date('1994-08-16'),
        identityVerified: true,
        xp: 270,
        level: 3,
      },
      {
        userId: 27,
        pseudonym: "Talent-Gamma-027",
        bio: "Product Designer com foco em design de serviços e experiências end-to-end.",
        currentRole: "Product Designer",
        yearsExperience: 7,
        industry: "Design",
        location: "São Paulo, SP",
        birthDate: new Date('1990-02-20'),
        identityVerified: true,
        xp: 400,
        level: 5,
      },
      {
        userId: 28,
        pseudonym: "Talent-Delta-028",
        bio: "Analista de BI especializada em Power BI e Tableau. Transformando dados em visualizações impactantes.",
        currentRole: "BI Analyst",
        yearsExperience: 5,
        industry: "Dados",
        location: "Brasília, DF",
        birthDate: new Date('1992-11-03'),
        identityVerified: true,
        xp: 300,
        level: 3,
      },
      {
        userId: 29,
        pseudonym: "Talent-Epsilon-029",
        bio: "Site Reliability Engineer focada em observabilidade e incident management. Mantendo sistemas no ar 24/7.",
        currentRole: "SRE",
        yearsExperience: 6,
        industry: "Tecnologia",
        location: "São Paulo, SP",
        birthDate: new Date('1991-07-12'),
        identityVerified: true,
        xp: 360,
        level: 4,
      },
      {
        userId: 30,
        pseudonym: "Talent-Zeta-030",
        bio: "Blockchain Developer especializada em smart contracts e DeFi. Construindo o futuro descentralizado.",
        currentRole: "Blockchain Developer",
        yearsExperience: 3,
        industry: "Tecnologia",
        location: "Florianópolis, SC",
        birthDate: new Date('1995-04-28'),
        identityVerified: true,
        xp: 210,
        level: 2,
      },
    ];

    await db.insert(schema.talents).values(talentsData);
    const talents = await db.select().from(schema.talents);
    console.log(`✅ Inserted ${talents.length} talents`);

    // Insert skills for talents (distributed realistically)
    console.log("💡 Inserting talent skills...");
    const skillsData = [];
    
    // Talent 1 - Full Stack Senior
    skillsData.push(
      { talentId: talents[0].id, skill: "React", proficiency: "expert" },
      { talentId: talents[0].id, skill: "Node.js", proficiency: "expert" },
      { talentId: talents[0].id, skill: "TypeScript", proficiency: "advanced" },
      { talentId: talents[0].id, skill: "PostgreSQL", proficiency: "advanced" },
      { talentId: talents[0].id, skill: "AWS", proficiency: "intermediate" }
    );

    // Talent 2 - UI/UX Designer
    skillsData.push(
      { talentId: talents[1].id, skill: "Figma", proficiency: "expert" },
      { talentId: talents[1].id, skill: "UI Design", proficiency: "expert" },
      { talentId: talents[1].id, skill: "UX Research", proficiency: "advanced" },
      { talentId: talents[1].id, skill: "Design Systems", proficiency: "advanced" },
      { talentId: talents[1].id, skill: "Prototyping", proficiency: "expert" }
    );

    // Talent 3 - Data Scientist
    skillsData.push(
      { talentId: talents[2].id, skill: "Python", proficiency: "expert" },
      { talentId: talents[2].id, skill: "Machine Learning", proficiency: "advanced" },
      { talentId: talents[2].id, skill: "Pandas", proficiency: "expert" },
      { talentId: talents[2].id, skill: "SQL", proficiency: "advanced" },
      { talentId: talents[2].id, skill: "TensorFlow", proficiency: "intermediate" }
    );

    // Talent 4 - Agile PM
    skillsData.push(
      { talentId: talents[3].id, skill: "Scrum", proficiency: "expert" },
      { talentId: talents[3].id, skill: "Kanban", proficiency: "advanced" },
      { talentId: talents[3].id, skill: "Jira", proficiency: "expert" },
      { talentId: talents[3].id, skill: "Stakeholder Management", proficiency: "advanced" }
    );

    // Talent 5 - Mobile Developer
    skillsData.push(
      { talentId: talents[4].id, skill: "React Native", proficiency: "expert" },
      { talentId: talents[4].id, skill: "iOS", proficiency: "advanced" },
      { talentId: talents[4].id, skill: "Android", proficiency: "advanced" },
      { talentId: talents[4].id, skill: "JavaScript", proficiency: "expert" }
    );

    // Continue with more talents...
    for (let i = 5; i < Math.min(talents.length, 15); i++) {
      skillsData.push(
        { talentId: talents[i].id, skill: "JavaScript", proficiency: "advanced" },
        { talentId: talents[i].id, skill: "Git", proficiency: "advanced" },
        { talentId: talents[i].id, skill: "Agile", proficiency: "intermediate" }
      );
    }

    await db.insert(schema.talentSkills).values(skillsData);
    console.log(`✅ Inserted ${skillsData.length} skills`);

    // Insert education records
    console.log("🎓 Inserting talent education...");
    const educationData = talents.slice(0, 20).map((talent, idx) => ({
      talentId: talent.id,
      institution: [
        "Universidade de São Paulo",
        "Universidade Federal do Rio de Janeiro",
        "Universidade Estadual de Campinas",
        "Universidade Federal de Minas Gerais",
        "Pontifícia Universidade Católica",
      ][idx % 5],
      course: [
        "Ciência da Computação",
        "Design Digital",
        "Engenharia de Software",
        "Sistemas de Informação",
        "Análise e Desenvolvimento de Sistemas",
      ][idx % 5],
      completionYear: 2014 + (idx % 8),
    }));

    await db.insert(schema.talentEducation).values(educationData);
    console.log(`✅ Inserted ${educationData.length} education records`);

    // Insert certifications
    console.log("🏆 Inserting talent certifications...");
    const certificationsData = [];
    
    talents.slice(0, 25).forEach((talent, idx) => {
      const certs = [
        { name: "AWS Certified Solutions Architect", org: "Amazon Web Services", date: new Date(2023, idx % 12, 1) },
        { name: "Professional Scrum Master", org: "Scrum.org", date: new Date(2022, idx % 12, 1) },
        { name: "Google UX Design Certificate", org: "Google", date: new Date(2023, idx % 12, 1) },
        { name: "Microsoft Azure Fundamentals", org: "Microsoft", date: new Date(2022, idx % 12, 1) },
        { name: "Certified Kubernetes Administrator", org: "CNCF", date: new Date(2023, idx % 12, 1) },
      ];
      
      certificationsData.push({
        talentId: talent.id,
        certification: certs[idx % certs.length].name,
        issuer: certs[idx % certs.length].org,
        issueDate: certs[idx % certs.length].date,
      });
    });

    await db.insert(schema.talentCertifications).values(certificationsData);
    console.log(`✅ Inserted ${certificationsData.length} certifications`);

    // Insert 15+ companies
    console.log("🏢 Inserting 15+ companies...");
    const companiesData = [
      {
        userId: 101,
        companyName: "TechVision Brasil",
        industry: "Tecnologia",
        companySize: "201-500",
        location: "São Paulo, SP",
        website: "https://techvision.com.br",
        description: "Líder em soluções de transformação digital para empresas de médio e grande porte.",
      },
      {
        userId: 102,
        companyName: "InovaSoft",
        industry: "Software",
        companySize: "51-200",
        location: "Rio de Janeiro, RJ",
        website: "https://inovasoft.com.br",
        description: "Desenvolvimento de software sob medida com foco em inovação e qualidade.",
      },
      {
        userId: 103,
        companyName: "DesignHub Studio",
        industry: "Design",
        companySize: "11-50",
        location: "São Paulo, SP",
        website: "https://designhub.studio",
        description: "Estúdio de design premiado especializado em branding e experiência digital.",
      },
      {
        userId: 104,
        companyName: "DataCore Analytics",
        industry: "Dados e Analytics",
        companySize: "51-200",
        location: "Belo Horizonte, MG",
        website: "https://datacore.com.br",
        description: "Plataforma de analytics e business intelligence para decisões baseadas em dados.",
      },
      {
        userId: 105,
        companyName: "CloudFirst Solutions",
        industry: "Cloud Computing",
        companySize: "101-200",
        location: "Curitiba, PR",
        website: "https://cloudfirst.com.br",
        description: "Especialistas em migração e gerenciamento de infraestrutura cloud.",
      },
      {
        userId: 106,
        companyName: "FinTech Brasil",
        industry: "Fintech",
        companySize: "501-1000",
        location: "São Paulo, SP",
        website: "https://fintechbrasil.com.br",
        description: "Revolucionando o mercado financeiro com tecnologia e inovação.",
      },
      {
        userId: 107,
        companyName: "EduTech Learning",
        industry: "Educação",
        companySize: "201-500",
        location: "Porto Alegre, RS",
        website: "https://edutech.com.br",
        description: "Plataforma de educação online com milhões de alunos.",
      },
      {
        userId: 108,
        companyName: "HealthTech Innovations",
        industry: "Saúde",
        companySize: "101-200",
        location: "Brasília, DF",
        website: "https://healthtech.com.br",
        description: "Tecnologia para melhorar o acesso e qualidade dos serviços de saúde.",
      },
      {
        userId: 109,
        companyName: "RetailTech Solutions",
        industry: "Varejo",
        companySize: "51-200",
        location: "Florianópolis, SC",
        website: "https://retailtech.com.br",
        description: "Soluções de e-commerce e omnichannel para o varejo moderno.",
      },
      {
        userId: 110,
        companyName: "AgriTech Brasil",
        industry: "Agronegócio",
        companySize: "101-200",
        location: "Goiânia, GO",
        website: "https://agritech.com.br",
        description: "Tecnologia para otimizar a produção agrícola e sustentabilidade.",
      },
      {
        userId: 111,
        companyName: "GameDev Studio",
        industry: "Games",
        companySize: "11-50",
        location: "São Paulo, SP",
        website: "https://gamedev.studio",
        description: "Estúdio independente criando jogos mobile e PC de sucesso.",
      },
      {
        userId: 112,
        companyName: "CyberSec Corp",
        industry: "Segurança",
        companySize: "51-200",
        location: "Rio de Janeiro, RJ",
        website: "https://cybersec.com.br",
        description: "Proteção avançada contra ameaças cibernéticas para empresas.",
      },
      {
        userId: 113,
        companyName: "AI Labs Brasil",
        industry: "Inteligência Artificial",
        companySize: "11-50",
        location: "São Paulo, SP",
        website: "https://ailabs.com.br",
        description: "Pesquisa e desenvolvimento de soluções de IA aplicada.",
      },
      {
        userId: 114,
        companyName: "MobileTech Apps",
        industry: "Mobile",
        companySize: "51-200",
        location: "Recife, PE",
        website: "https://mobiletech.com.br",
        description: "Desenvolvimento de aplicativos mobile para iOS e Android.",
      },
      {
        userId: 115,
        companyName: "Startup Accelerator",
        industry: "Inovação",
        companySize: "11-50",
        location: "São Paulo, SP",
        website: "https://accelerator.com.br",
        description: "Aceleradora que impulsiona startups de tecnologia no Brasil.",
      },
    ];

    await db.insert(schema.companies).values(companiesData);
    const companies = await db.select().from(schema.companies);
    console.log(`✅ Inserted ${companies.length} companies`);

    // Insert 40+ job postings
    console.log("💼 Inserting 40+ job postings...");
    const jobPostingsData = [
      {
        companyId: companies[0].id,
        title: "Desenvolvedor Full Stack Sênior",
        description: "Buscamos desenvolvedor(a) experiente para liderar projetos de transformação digital. Trabalho com React, Node.js e AWS em projetos desafiadores.",
        requirements: JSON.stringify(["React", "Node.js", "TypeScript", "AWS", "5+ anos de experiência"]),
        salaryMin: 12000,
        salaryMax: 18000,
        location: "São Paulo, SP - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[0].id,
        title: "Designer UI/UX Pleno",
        description: "Procuramos designer criativo(a) para criar experiências digitais incríveis. Trabalho com Figma, design systems e pesquisa com usuários.",
        requirements: JSON.stringify(["Figma", "UI Design", "UX Research", "3+ anos de experiência"]),
        salaryMin: 8000,
        salaryMax: 12000,
        location: "São Paulo, SP - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[1].id,
        title: "Engenheiro de Software Backend",
        description: "Oportunidade para trabalhar com microsserviços, Kubernetes e cloud. Ambiente inovador e time colaborativo.",
        requirements: JSON.stringify(["Java", "Spring Boot", "Kubernetes", "Docker", "4+ anos"]),
        salaryMin: 10000,
        salaryMax: 15000,
        location: "Rio de Janeiro, RJ - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[2].id,
        title: "Product Designer Senior",
        description: "Lidere o design de produtos digitais do conceito ao lançamento. Trabalhe com times multidisciplinares em projetos impactantes.",
        requirements: JSON.stringify(["Figma", "Product Design", "Design Thinking", "5+ anos"]),
        salaryMin: 11000,
        salaryMax: 16000,
        location: "São Paulo, SP - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[3].id,
        title: "Cientista de Dados",
        description: "Trabalhe com grandes volumes de dados, machine learning e análise preditiva. Impacte decisões estratégicas com dados.",
        requirements: JSON.stringify(["Python", "Machine Learning", "SQL", "Pandas", "3+ anos"]),
        salaryMin: 9000,
        salaryMax: 14000,
        location: "Belo Horizonte, MG - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[4].id,
        title: "DevOps Engineer",
        description: "Automatize infraestrutura e processos de deployment. Trabalhe com AWS, Terraform e CI/CD.",
        requirements: JSON.stringify(["AWS", "Kubernetes", "Terraform", "CI/CD", "4+ anos"]),
        salaryMin: 11000,
        salaryMax: 16000,
        location: "Curitiba, PR - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[5].id,
        title: "Desenvolvedora Mobile React Native",
        description: "Crie aplicativos mobile que impactam milhões de usuários. Trabalhe com as últimas tecnologias mobile.",
        requirements: JSON.stringify(["React Native", "JavaScript", "iOS", "Android", "3+ anos"]),
        salaryMin: 9000,
        salaryMax: 13000,
        location: "São Paulo, SP - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[5].id,
        title: "Tech Lead Frontend",
        description: "Lidere time de frontend e defina arquitetura de aplicações web modernas. Mentoria e código de qualidade.",
        requirements: JSON.stringify(["React", "TypeScript", "Liderança Técnica", "6+ anos"]),
        salaryMin: 14000,
        salaryMax: 20000,
        location: "São Paulo, SP - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[6].id,
        title: "Product Manager",
        description: "Defina roadmap e estratégia de produtos educacionais. Trabalhe com métricas, pesquisa e times ágeis.",
        requirements: JSON.stringify(["Product Management", "Analytics", "Agile", "4+ anos"]),
        salaryMin: 10000,
        salaryMax: 15000,
        location: "Porto Alegre, RS - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[7].id,
        title: "Engenheira de Machine Learning",
        description: "Desenvolva modelos de ML para aplicações de saúde. Impacte vidas com tecnologia.",
        requirements: JSON.stringify(["Python", "TensorFlow", "PyTorch", "ML", "4+ anos"]),
        salaryMin: 12000,
        salaryMax: 17000,
        location: "Brasília, DF - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[8].id,
        title: "Desenvolvedora Backend Python",
        description: "Construa APIs escaláveis com Python e Django. Trabalhe com e-commerce de alto volume.",
        requirements: JSON.stringify(["Python", "Django", "PostgreSQL", "Redis", "3+ anos"]),
        salaryMin: 8500,
        salaryMax: 12500,
        location: "Florianópolis, SC - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[9].id,
        title: "Engenheira de Dados",
        description: "Construa pipelines de dados robustos para agronegócio. Trabalhe com Big Data e cloud.",
        requirements: JSON.stringify(["Python", "Spark", "Airflow", "AWS", "4+ anos"]),
        salaryMin: 10000,
        salaryMax: 14000,
        location: "Goiânia, GO - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[10].id,
        title: "Game Developer Unity",
        description: "Crie jogos mobile incríveis com Unity. Trabalhe em projetos criativos e desafiadores.",
        requirements: JSON.stringify(["Unity", "C#", "Game Design", "3+ anos"]),
        salaryMin: 7000,
        salaryMax: 11000,
        location: "São Paulo, SP - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[11].id,
        title: "Security Engineer",
        description: "Proteja sistemas críticos contra ameaças. Trabalhe com pentest, SIEM e incident response.",
        requirements: JSON.stringify(["Security", "Pentest", "SIEM", "Incident Response", "4+ anos"]),
        salaryMin: 11000,
        salaryMax: 16000,
        location: "Rio de Janeiro, RJ - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[12].id,
        title: "AI Research Engineer",
        description: "Pesquise e desenvolva soluções de IA de ponta. Publique papers e contribua para a comunidade.",
        requirements: JSON.stringify(["Python", "Deep Learning", "Research", "PhD ou Mestrado"]),
        salaryMin: 13000,
        salaryMax: 19000,
        location: "São Paulo, SP - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[13].id,
        title: "iOS Developer",
        description: "Desenvolva apps nativos iOS com Swift. Foco em performance e experiência do usuário.",
        requirements: JSON.stringify(["Swift", "iOS", "UIKit", "SwiftUI", "3+ anos"]),
        salaryMin: 9000,
        salaryMax: 13000,
        location: "Recife, PE - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[14].id,
        title: "Scrum Master",
        description: "Facilite cerimônias ágeis e remova impedimentos. Ajude times a alcançarem alta performance.",
        requirements: JSON.stringify(["Scrum", "Agile", "Facilitação", "PSM I", "3+ anos"]),
        salaryMin: 8000,
        salaryMax: 12000,
        location: "São Paulo, SP - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[0].id,
        title: "Arquiteta de Soluções Cloud",
        description: "Desenhe arquiteturas cloud escaláveis e seguras. Trabalhe com AWS, Azure e GCP.",
        requirements: JSON.stringify(["AWS", "Azure", "Arquitetura", "Microservices", "6+ anos"]),
        salaryMin: 15000,
        salaryMax: 22000,
        location: "São Paulo, SP - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[1].id,
        title: "QA Engineer",
        description: "Garanta qualidade com automação de testes. Trabalhe com Selenium, Cypress e CI/CD.",
        requirements: JSON.stringify(["Test Automation", "Selenium", "Cypress", "3+ anos"]),
        salaryMin: 7000,
        salaryMax: 10000,
        location: "Rio de Janeiro, RJ - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[2].id,
        title: "UX Researcher",
        description: "Conduza pesquisas qualitativas e quantitativas. Descubra insights que transformam produtos.",
        requirements: JSON.stringify(["UX Research", "Métodos Qualitativos", "Analytics", "3+ anos"]),
        salaryMin: 8000,
        salaryMax: 12000,
        location: "São Paulo, SP - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[3].id,
        title: "Analista de BI",
        description: "Crie dashboards e relatórios com Power BI. Transforme dados em insights acionáveis.",
        requirements: JSON.stringify(["Power BI", "SQL", "DAX", "Analytics", "2+ anos"]),
        salaryMin: 6000,
        salaryMax: 9000,
        location: "Belo Horizonte, MG - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[4].id,
        title: "Site Reliability Engineer",
        description: "Mantenha sistemas críticos funcionando 24/7. Trabalhe com observabilidade e incident management.",
        requirements: JSON.stringify(["SRE", "Kubernetes", "Monitoring", "Incident Response", "4+ anos"]),
        salaryMin: 12000,
        salaryMax: 17000,
        location: "Curitiba, PR - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[5].id,
        title: "Android Developer",
        description: "Desenvolva apps Android nativos com Kotlin. Material Design e performance são prioridades.",
        requirements: JSON.stringify(["Kotlin", "Android", "Material Design", "3+ anos"]),
        salaryMin: 8500,
        salaryMax: 12500,
        location: "São Paulo, SP - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[6].id,
        title: "Content Designer",
        description: "Crie microcopy e conteúdo que guia usuários. UX Writing e estratégia de conteúdo.",
        requirements: JSON.stringify(["UX Writing", "Content Strategy", "Copywriting", "2+ anos"]),
        salaryMin: 6000,
        salaryMax: 9000,
        location: "Porto Alegre, RS - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[7].id,
        title: "Blockchain Developer",
        description: "Desenvolva smart contracts e DApps. Trabalhe com Solidity e Web3.",
        requirements: JSON.stringify(["Solidity", "Web3", "Ethereum", "Smart Contracts", "2+ anos"]),
        salaryMin: 10000,
        salaryMax: 15000,
        location: "Brasília, DF - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[8].id,
        title: "Growth Hacker",
        description: "Acelere crescimento através de experimentos e dados. Trabalhe com métricas de aquisição e retenção.",
        requirements: JSON.stringify(["Growth Hacking", "Analytics", "A/B Testing", "3+ anos"]),
        salaryMin: 7500,
        salaryMax: 11500,
        location: "Florianópolis, SC - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[9].id,
        title: "Business Analyst",
        description: "Levante requisitos e modele processos de negócio. Ponte entre negócio e tecnologia.",
        requirements: JSON.stringify(["Business Analysis", "BPMN", "Requirements", "3+ anos"]),
        salaryMin: 7000,
        salaryMax: 10000,
        location: "Goiânia, GO - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[10].id,
        title: "Motion Designer",
        description: "Crie animações 2D e 3D para games e marketing. After Effects e Cinema 4D.",
        requirements: JSON.stringify(["After Effects", "Cinema 4D", "Motion Design", "3+ anos"]),
        salaryMin: 7000,
        salaryMax: 11000,
        location: "São Paulo, SP - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[11].id,
        title: "Penetration Tester",
        description: "Realize testes de invasão e avalie vulnerabilidades. Ethical hacking e red team.",
        requirements: JSON.stringify(["Pentest", "Ethical Hacking", "OSCP", "4+ anos"]),
        salaryMin: 10000,
        salaryMax: 15000,
        location: "Rio de Janeiro, RJ - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[12].id,
        title: "NLP Engineer",
        description: "Desenvolva soluções de processamento de linguagem natural. Trabalhe com transformers e LLMs.",
        requirements: JSON.stringify(["NLP", "Python", "Transformers", "BERT", "3+ anos"]),
        salaryMin: 11000,
        salaryMax: 16000,
        location: "São Paulo, SP - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[13].id,
        title: "Flutter Developer",
        description: "Desenvolva apps cross-platform com Flutter. Uma codebase para iOS e Android.",
        requirements: JSON.stringify(["Flutter", "Dart", "Mobile", "2+ anos"]),
        salaryMin: 8000,
        salaryMax: 12000,
        location: "Recife, PE - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[14].id,
        title: "Agile Coach",
        description: "Treine e coach times em práticas ágeis. Transformação organizacional e cultura.",
        requirements: JSON.stringify(["Agile", "Coaching", "Scrum", "Kanban", "5+ anos"]),
        salaryMin: 12000,
        salaryMax: 18000,
        location: "São Paulo, SP - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[0].id,
        title: "Desenvolvedora Frontend Vue.js",
        description: "Crie interfaces modernas com Vue.js 3 e Composition API. Trabalhe com design systems.",
        requirements: JSON.stringify(["Vue.js", "JavaScript", "CSS", "3+ anos"]),
        salaryMin: 8000,
        salaryMax: 12000,
        location: "São Paulo, SP - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[1].id,
        title: "Graphic Designer",
        description: "Crie identidades visuais e materiais de marketing. Branding e design gráfico.",
        requirements: JSON.stringify(["Adobe Creative Suite", "Branding", "Design Gráfico", "3+ anos"]),
        salaryMin: 6000,
        salaryMax: 9000,
        location: "Rio de Janeiro, RJ - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[2].id,
        title: "Interaction Designer",
        description: "Desenhe interações e microinterações. Prototipagem e animações de interface.",
        requirements: JSON.stringify(["Interaction Design", "Prototyping", "Figma", "3+ anos"]),
        salaryMin: 8500,
        salaryMax: 12500,
        location: "São Paulo, SP - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[3].id,
        title: "Data Analyst",
        description: "Analise dados e gere insights para o negócio. SQL, Python e visualização de dados.",
        requirements: JSON.stringify(["SQL", "Python", "Data Analysis", "2+ anos"]),
        salaryMin: 6000,
        salaryMax: 9000,
        location: "Belo Horizonte, MG - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[4].id,
        title: "Cloud Architect",
        description: "Projete soluções cloud enterprise. Multi-cloud e arquitetura distribuída.",
        requirements: JSON.stringify(["AWS", "Azure", "GCP", "Arquitetura", "7+ anos"]),
        salaryMin: 16000,
        salaryMax: 24000,
        location: "Curitiba, PR - Híbrido",
        employmentType: "Full-time",
      },
      {
        companyId: companies[5].id,
        title: "Desenvolvedora Júnior Full Stack",
        description: "Oportunidade para iniciar carreira em desenvolvimento. Mentoria e aprendizado contínuo.",
        requirements: JSON.stringify(["JavaScript", "React", "Node.js", "0-2 anos"]),
        salaryMin: 4000,
        salaryMax: 6000,
        location: "São Paulo, SP - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[6].id,
        title: "Instructional Designer",
        description: "Desenhe experiências de aprendizado online. Pedagogia e tecnologia educacional.",
        requirements: JSON.stringify(["Instructional Design", "E-learning", "Pedagogia", "2+ anos"]),
        salaryMin: 6000,
        salaryMax: 9000,
        location: "Porto Alegre, RS - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[7].id,
        title: "Computer Vision Engineer",
        description: "Desenvolva soluções de visão computacional para saúde. Deep learning e processamento de imagens.",
        requirements: JSON.stringify(["Computer Vision", "Python", "OpenCV", "Deep Learning", "3+ anos"]),
        salaryMin: 11000,
        salaryMax: 16000,
        location: "Brasília, DF - Remoto",
        employmentType: "Full-time",
      },
      {
        companyId: companies[8].id,
        title: "E-commerce Manager",
        description: "Gerencie operações de e-commerce. Estratégia, métricas e otimização de conversão.",
        requirements: JSON.stringify(["E-commerce", "Analytics", "Marketing Digital", "4+ anos"]),
        salaryMin: 8000,
        salaryMax: 12000,
        location: "Florianópolis, SC - Híbrido",
        employmentType: "Full-time",
      },
    ];

    await db.insert(schema.jobPostings).values(jobPostingsData);
    const jobPostings = await db.select().from(schema.jobPostings);
    console.log(`✅ Inserted ${jobPostings.length} job postings`);

    console.log("✅ Expanded database seed completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`- ${talents.length} talents created`);
    console.log(`- ${skillsData.length} skills added`);
    console.log(`- ${educationData.length} education records added`);
    console.log(`- ${certificationsData.length} certifications added`);
    console.log(`- ${companies.length} companies created`);
    console.log(`- ${jobPostings.length} job postings created`);
    console.log("\n⏭️  Run the main seed-db.mjs to add matches, success stories, and gamification data!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
