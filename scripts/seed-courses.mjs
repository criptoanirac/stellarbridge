/**
 * Seed script to populate database with sample courses and modules
 * Run with: node scripts/seed-courses.mjs
 */

import { drizzle } from "drizzle-orm/mysql2";
import { courses, courseModules } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const sampleCourses = [
  {
    title: "Introdução ao Web3",
    description: "Aprenda os fundamentos da tecnologia blockchain e Web3. Perfeito para iniciantes que querem entender como funciona a descentralização e as criptomoedas.",
    category: "web3",
    difficulty: "basico",
    totalRewardXlm: "100.00",
    durationHours: 40,
    provider: "Mulheres que Codam",
    status: "active",
  },
  {
    title: "Desenvolvimento React Avançado",
    description: "Domine React 19 com hooks, context API, performance optimization e melhores práticas para aplicações modernas.",
    category: "programacao",
    difficulty: "intermediario",
    totalRewardXlm: "250.00",
    durationHours: 80,
    provider: "Mulheres que Codam",
    status: "active",
  },
  {
    title: "IA Generativa na Prática",
    description: "Aprenda a usar ferramentas de IA como ChatGPT, Midjourney e Stable Diffusion para aumentar sua produtividade e criatividade.",
    category: "ia",
    difficulty: "avancado",
    totalRewardXlm: "500.00",
    durationHours: 120,
    provider: "Let's Cocreate",
    status: "active",
  },
  {
    title: "Vendas Consultivas B2B",
    description: "Técnicas comprovadas de vendas consultivas para fechar negócios de alto valor com empresas.",
    category: "vendas",
    difficulty: "basico",
    totalRewardXlm: "75.00",
    durationHours: 30,
    provider: "Sebrae",
    status: "active",
  },
  {
    title: "UI/UX Design Moderno",
    description: "Crie interfaces bonitas e funcionais usando Figma, princípios de design e testes de usabilidade.",
    category: "design",
    difficulty: "intermediario",
    totalRewardXlm: "200.00",
    durationHours: 60,
    provider: "Let's Cocreate",
    status: "active",
  },
];

const modulesData = {
  "Introdução ao Web3": [
    { title: "O que é Blockchain", description: "Conceitos fundamentais de blockchain e criptomoedas", order: 1, rewardXlm: "20.00", estimatedMinutes: 120 },
    { title: "Rede Stellar", description: "Arquitetura e casos de uso da rede Stellar", order: 2, rewardXlm: "20.00", estimatedMinutes: 150 },
    { title: "Smart Contracts Básicos", description: "Introdução ao desenvolvimento de smart contracts", order: 3, rewardXlm: "30.00", estimatedMinutes: 180 },
    { title: "Projeto Final", description: "Crie sua primeira DApp simples", order: 4, rewardXlm: "30.00", estimatedMinutes: 240 },
  ],
  "Desenvolvimento React Avançado": [
    { title: "React Hooks Avançados", description: "useCallback, useMemo, useReducer e custom hooks", order: 1, rewardXlm: "50.00", estimatedMinutes: 240 },
    { title: "Context API e State Management", description: "Gerenciamento de estado global sem Redux", order: 2, rewardXlm: "50.00", estimatedMinutes: 240 },
    { title: "Performance Optimization", description: "Code splitting, lazy loading e memoization", order: 3, rewardXlm: "75.00", estimatedMinutes: 300 },
    { title: "Testing com Vitest", description: "Testes unitários e de integração", order: 4, rewardXlm: "75.00", estimatedMinutes: 300 },
  ],
  "IA Generativa na Prática": [
    { title: "Fundamentos de IA Generativa", description: "Como funcionam os modelos de linguagem", order: 1, rewardXlm: "100.00", estimatedMinutes: 360 },
    { title: "Prompt Engineering", description: "Técnicas avançadas para melhores resultados", order: 2, rewardXlm: "100.00", estimatedMinutes: 360 },
    { title: "Ferramentas de IA para Produtividade", description: "ChatGPT, Claude, Copilot e mais", order: 3, rewardXlm: "150.00", estimatedMinutes: 480 },
    { title: "Projeto: Automação com IA", description: "Crie um sistema automatizado com IA", order: 4, rewardXlm: "150.00", estimatedMinutes: 600 },
  ],
  "Vendas Consultivas B2B": [
    { title: "Fundamentos de Vendas B2B", description: "Diferenças entre B2B e B2C", order: 1, rewardXlm: "15.00", estimatedMinutes: 90 },
    { title: "Prospecção Efetiva", description: "Como encontrar e qualificar leads", order: 2, rewardXlm: "20.00", estimatedMinutes: 120 },
    { title: "Apresentação de Valor", description: "Técnicas de apresentação que convencem", order: 3, rewardXlm: "20.00", estimatedMinutes: 150 },
    { title: "Fechamento e Follow-up", description: "Como fechar negócios e manter relacionamento", order: 4, rewardXlm: "20.00", estimatedMinutes: 120 },
  ],
  "UI/UX Design Moderno": [
    { title: "Princípios de Design", description: "Cores, tipografia, espaçamento e hierarquia", order: 1, rewardXlm: "40.00", estimatedMinutes: 180 },
    { title: "Figma Avançado", description: "Components, variants e auto-layout", order: 2, rewardXlm: "50.00", estimatedMinutes: 240 },
    { title: "UX Research", description: "Testes de usabilidade e análise de dados", order: 3, rewardXlm: "60.00", estimatedMinutes: 300 },
    { title: "Projeto: Redesign Completo", description: "Redesenhe uma aplicação real", order: 4, rewardXlm: "50.00", estimatedMinutes: 360 },
  ],
};

async function seed() {
  console.log("🌱 Starting seed...");
  
  try {
    // Insert courses
    for (const course of sampleCourses) {
      console.log(`📚 Creating course: ${course.title}`);
      
      const [insertedCourse] = await db.insert(courses).values(course);
      const courseId = insertedCourse.insertId;
      
      // Insert modules for this course
      const modules = modulesData[course.title];
      if (modules) {
        for (const module of modules) {
          console.log(`  📖 Adding module: ${module.title}`);
          await db.insert(courseModules).values({
            courseId,
            ...module,
          });
        }
      }
    }
    
    console.log("✅ Seed completed successfully!");
    console.log(`Created ${sampleCourses.length} courses with modules`);
    
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
  
  process.exit(0);
}

seed();
