import { eq, sql, desc, asc, and, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, talents, InsertTalent, companies, InsertCompany, jobPostings, InsertJobPosting, talentSkills, InsertTalentSkill, talentEducation, InsertTalentEducation, talentCertifications, InsertTalentCertification, matches, InsertMatch, successStories, careerPlans, InsertCareerPlan, achievements, InsertAchievement, talentProgress, InsertTalentProgress, courseRecommendations, InsertCourseRecommendation } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Talent queries
export async function createTalent(talent: InsertTalent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(talents).values(talent);
  return result;
}

export async function getTalentByUserId(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(talents).where(eq(talents.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateTalent(talentId: number, updates: Partial<InsertTalent>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(talents).set(updates).where(eq(talents.id, talentId));
}

// Talent Skills queries
export async function addTalentSkill(skill: InsertTalentSkill) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(talentSkills).values(skill);
}

export async function getTalentSkills(talentId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(talentSkills).where(eq(talentSkills.talentId, talentId));
}

// Talent Education queries
export async function addTalentEducation(education: InsertTalentEducation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(talentEducation).values(education);
}

export async function getTalentEducation(talentId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(talentEducation).where(eq(talentEducation.talentId, talentId));
}

// Talent Certifications queries
export async function addTalentCertification(certification: InsertTalentCertification) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(talentCertifications).values(certification);
}

export async function deleteTalentSkills(talentId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(talentSkills).where(eq(talentSkills.talentId, talentId));
}

export async function deleteTalentEducation(talentId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(talentEducation).where(eq(talentEducation.talentId, talentId));
}

export async function deleteTalentCertifications(talentId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(talentCertifications).where(eq(talentCertifications.talentId, talentId));
}

export async function getTalentCertifications(talentId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(talentCertifications).where(eq(talentCertifications.talentId, talentId));
}

// Company queries
export async function createCompany(company: InsertCompany) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(companies).values(company);
}

export async function getCompanyByUserId(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(companies).where(eq(companies.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateCompany(companyId: number, updates: Partial<InsertCompany>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(companies).set(updates).where(eq(companies.id, companyId));
}

// Job Postings queries
export async function createJobPosting(job: InsertJobPosting) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(jobPostings).values(job);
}

export async function getJobPostingsByCompanyId(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(jobPostings).where(eq(jobPostings.companyId, companyId));
}

export async function getJobPostingById(jobId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(jobPostings).where(eq(jobPostings.id, jobId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateJobPosting(jobId: number, updates: Partial<InsertJobPosting>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(jobPostings).set(updates).where(eq(jobPostings.id, jobId));
}

// Matches queries
export async function createMatch(match: InsertMatch) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(matches).values(match);
}

export async function getMatchesByTalentId(talentId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(matches).where(eq(matches.talentId, talentId));
}

export async function getMatchesByJobId(jobId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(matches).where(eq(matches.jobId, jobId));
}

export async function updateMatch(matchId: number, updates: Partial<InsertMatch>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(matches).set(updates).where(eq(matches.id, matchId));
}

// Social Impact queries
export async function getSocialImpactMetrics(dateFrom?: string, dateTo?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Build date filter conditions
  const dateConditions = [];
  if (dateFrom) {
    dateConditions.push(sql`${talents.createdAt} >= ${dateFrom}`);
  }
  if (dateTo) {
    dateConditions.push(sql`${talents.createdAt} <= ${dateTo}`);
  }
  
  // Total de candidatas capacitadas (com pelo menos 1 certificação)
  let talentsWithCertsQuery = db
    .selectDistinct({ talentId: talentCertifications.talentId })
    .from(talentCertifications)
    .innerJoin(talents, eq(talentCertifications.talentId, talents.id));
  
  if (dateConditions.length > 0) {
    talentsWithCertsQuery = talentsWithCertsQuery.where(sql`${sql.join(dateConditions, sql` AND `)}`) as any;
  }
  const talentsWithCerts = await talentsWithCertsQuery;
  
  // Total de vagas preenchidas (matches com status 'hired')
  const hiredMatchesConditions = [eq(matches.status, "hired")];
  if (dateFrom) {
    hiredMatchesConditions.push(sql`${matches.createdAt} >= ${dateFrom}`);
  }
  if (dateTo) {
    hiredMatchesConditions.push(sql`${matches.createdAt} <= ${dateTo}`);
  }
  const hiredMatches = await db
    .select()
    .from(matches)
    .where(and(...hiredMatchesConditions));
  
  // Total de candidatas
  let allTalentsQuery = db.select().from(talents);
  if (dateConditions.length > 0) {
    allTalentsQuery = allTalentsQuery.where(sql`${sql.join(dateConditions, sql` AND `)}`) as any;
  }
  const allTalents = await allTalentsQuery;
  
  // Candidatas com pelo menos 1 match
  const matchesConditions = [];
  if (dateFrom) {
    matchesConditions.push(sql`${matches.createdAt} >= ${dateFrom}`);
  }
  if (dateTo) {
    matchesConditions.push(sql`${matches.createdAt} <= ${dateTo}`);
  }
  
  let talentsWithMatchesQuery = db
    .selectDistinct({ talentId: matches.talentId })
    .from(matches);
  
  if (matchesConditions.length > 0) {
    talentsWithMatchesQuery = talentsWithMatchesQuery.where(and(...matchesConditions)) as any;
  }
  const talentsWithMatches = await talentsWithMatchesQuery;
  
  // Salário médio das vagas com contratação
  const jobsWithHiresConditions = [eq(matches.status, "hired")];
  if (dateFrom) {
    jobsWithHiresConditions.push(sql`${matches.createdAt} >= ${dateFrom}`);
  }
  if (dateTo) {
    jobsWithHiresConditions.push(sql`${matches.createdAt} <= ${dateTo}`);
  }
  
  const jobsWithHires = await db
    .select({
      salaryMin: jobPostings.salaryMin,
      salaryMax: jobPostings.salaryMax,
    })
    .from(jobPostings)
    .innerJoin(matches, eq(matches.jobId, jobPostings.id))
    .where(and(...jobsWithHiresConditions));
  
  let avgSalary = 0;
  if (jobsWithHires.length > 0) {
    const totalSalary = jobsWithHires.reduce((sum, job) => {
      // Convert decimal strings to numbers
      const min = typeof job.salaryMin === 'string' ? parseFloat(job.salaryMin) : Number(job.salaryMin || 0);
      const max = typeof job.salaryMax === 'string' ? parseFloat(job.salaryMax) : Number(job.salaryMax || 0);
      return sum + (min + max) / 2;
    }, 0);
    avgSalary = totalSalary / jobsWithHires.length;
  }
  
  return {
    trainedTalents: talentsWithCerts.length,
    jobsFilled: hiredMatches.length,
    employabilityRate: allTalents.length > 0 
      ? (talentsWithMatches.length / allTalents.length) * 100 
      : 0,
    avgSalary: Math.round(avgSalary),
  };
}

export async function getGeographicDistribution(dateFrom?: string, dateTo?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Distribuição geográfica de talentos
  let talentsByLocationQuery = db
    .select({
      location: talents.location,
      count: sql<number>`count(*)`,
    })
    .from(talents);
  
  if (dateFrom) {
    talentsByLocationQuery = talentsByLocationQuery.where(sql`${talents.createdAt} >= ${dateFrom}`) as any;
  }
  if (dateTo) {
    talentsByLocationQuery = talentsByLocationQuery.where(sql`${talents.createdAt} <= ${dateTo}`) as any;
  }
  const talentsByLocation = await talentsByLocationQuery.groupBy(talents.location);
  
  // Distribuição geográfica de vagas
  let jobsByLocationQuery = db
    .select({
      location: jobPostings.location,
      count: sql<number>`count(*)`,
    })
    .from(jobPostings);
  
  if (dateFrom) {
    jobsByLocationQuery = jobsByLocationQuery.where(sql`${jobPostings.createdAt} >= ${dateFrom}`) as any;
  }
  if (dateTo) {
    jobsByLocationQuery = jobsByLocationQuery.where(sql`${jobPostings.createdAt} <= ${dateTo}`) as any;
  }
  const jobsByLocation = await jobsByLocationQuery.groupBy(jobPostings.location);
  
  return {
    talents: talentsByLocation,
    jobs: jobsByLocation,
  };
}

export async function getGrowthTrend(dateFrom?: string, dateTo?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Crescimento mensal de talentos, vagas e matches
  let talentGrowthQuery = db
    .select({
      month: sql<string>`DATE_FORMAT(${talents.createdAt}, '%Y-%m') as month`,
      count: sql<number>`count(*) as count`,
    })
    .from(talents);
  
  if (dateFrom) {
    talentGrowthQuery = talentGrowthQuery.where(sql`${talents.createdAt} >= ${dateFrom}`) as any;
  }
  if (dateTo) {
    talentGrowthQuery = talentGrowthQuery.where(sql`${talents.createdAt} <= ${dateTo}`) as any;
  }
  const talentGrowth = await talentGrowthQuery.groupBy(sql`month`);
  
  let jobGrowthQuery = db
    .select({
      month: sql<string>`DATE_FORMAT(${jobPostings.createdAt}, '%Y-%m') as month`,
      count: sql<number>`count(*) as count`,
    })
    .from(jobPostings);
  
  if (dateFrom) {
    jobGrowthQuery = jobGrowthQuery.where(sql`${jobPostings.createdAt} >= ${dateFrom}`) as any;
  }
  if (dateTo) {
    jobGrowthQuery = jobGrowthQuery.where(sql`${jobPostings.createdAt} <= ${dateTo}`) as any;
  }
  const jobGrowth = await jobGrowthQuery.groupBy(sql`month`);
  
  let matchGrowthQuery = db
    .select({
      month: sql<string>`DATE_FORMAT(${matches.createdAt}, '%Y-%m') as month`,
      count: sql<number>`count(*) as count`,
    })
    .from(matches);
  
  if (dateFrom) {
    matchGrowthQuery = matchGrowthQuery.where(sql`${matches.createdAt} >= ${dateFrom}`) as any;
  }
  if (dateTo) {
    matchGrowthQuery = matchGrowthQuery.where(sql`${matches.createdAt} <= ${dateTo}`) as any;
  }
  const matchGrowth = await matchGrowthQuery.groupBy(sql`month`);
  
  // Sort results in JavaScript
  talentGrowth.sort((a, b) => (a.month || '').localeCompare(b.month || ''));
  jobGrowth.sort((a, b) => (a.month || '').localeCompare(b.month || ''));
  matchGrowth.sort((a, b) => (a.month || '').localeCompare(b.month || ''));
  
  return {
    talents: talentGrowth,
    jobs: jobGrowth,
    matches: matchGrowth,
  };
}

export async function getSuccessStories(dateFrom?: string, dateTo?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  let storiesQuery = db
    .select({
      id: successStories.id,
      testimonial: successStories.testimonial,
      beforeRole: successStories.beforeRole,
      afterRole: successStories.afterRole,
      salaryIncrease: successStories.salaryIncrease,
      imageUrl: successStories.imageUrl,
      createdAt: successStories.createdAt,
      talentPseudonym: talents.pseudonym,
      companyName: companies.companyName,
    })
    .from(successStories)
    .innerJoin(talents, eq(successStories.talentId, talents.id))
    .innerJoin(companies, eq(successStories.companyId, companies.id));
  
  if (dateFrom) {
    storiesQuery = storiesQuery.where(sql`${successStories.createdAt} >= ${dateFrom}`) as any;
  }
  if (dateTo) {
    storiesQuery = storiesQuery.where(sql`${successStories.createdAt} <= ${dateTo}`) as any;
  }
  
  const stories = await storiesQuery
    .orderBy(desc(successStories.createdAt))
    .limit(10);
  
  return stories;
}

export async function getTopCertifications(dateFrom?: string, dateTo?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Certificações mais populares entre candidatas contratadas
  const topCertsConditions = [eq(matches.status, "hired")];
  if (dateFrom) {
    topCertsConditions.push(sql`${matches.createdAt} >= ${dateFrom}`);
  }
  if (dateTo) {
    topCertsConditions.push(sql`${matches.createdAt} <= ${dateTo}`);
  }
  
  const topCerts = await db
    .select({
      certification: talentCertifications.certification,
      count: sql<number>`count(*)`,
    })
    .from(talentCertifications)
    .innerJoin(matches, eq(talentCertifications.talentId, matches.talentId))
    .where(and(...topCertsConditions))
    .groupBy(talentCertifications.certification)
    .orderBy(desc(sql`count(*)`))
    .limit(10);
  
  return topCerts;
}

export async function getActiveCompaniesCount(dateFrom?: string, dateTo?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const activeCompaniesConditions = [eq(jobPostings.status, "active")];
  if (dateFrom) {
    activeCompaniesConditions.push(sql`${jobPostings.createdAt} >= ${dateFrom}`);
  }
  if (dateTo) {
    activeCompaniesConditions.push(sql`${jobPostings.createdAt} <= ${dateTo}`);
  }
  
  const activeCompanies = await db
    .selectDistinct({ companyId: jobPostings.companyId })
    .from(jobPostings)
    .where(and(...activeCompaniesConditions));
  
  return activeCompanies.length;
}

export async function createSuccessStory(story: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(successStories).values(story);
  return result;
}

// Career Plan functions
export async function getCareerPlanByTalentId(talentId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const plans = await db
    .select()
    .from(careerPlans)
    .where(eq(careerPlans.talentId, talentId))
    .orderBy(desc(careerPlans.createdAt));
  
  return plans[0] || null;
}

export async function createCareerPlan(plan: InsertCareerPlan) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(careerPlans).values(plan);
}

export async function updateCareerPlan(planId: number, updates: Partial<InsertCareerPlan>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(careerPlans).set(updates).where(eq(careerPlans.id, planId));
}

// Achievement functions
export async function getAchievementsByTalentId(talentId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(achievements)
    .where(eq(achievements.talentId, talentId))
    .orderBy(desc(achievements.unlockedAt));
}

export async function createAchievement(achievement: InsertAchievement) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(achievements).values(achievement);
}

// Talent Progress functions
export async function getTalentProgressHistory(talentId: number, limit: number = 20) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(talentProgress)
    .where(eq(talentProgress.talentId, talentId))
    .orderBy(desc(talentProgress.createdAt))
    .limit(limit);
}

export async function addTalentProgress(progress: InsertTalentProgress) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(talentProgress).values(progress);
}

// Update talent XP and level
export async function updateTalentXP(talentId: number, xpToAdd: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const talent = await db.select().from(talents).where(eq(talents.id, talentId)).limit(1);
  if (!talent[0]) throw new Error("Talent not found");
  
  const currentXP = talent[0].xp || 0;
  const currentLevel = talent[0].level || 1;
  const newXP = currentXP + xpToAdd;
  
  // Level up logic: 100 XP per level
  const newLevel = Math.floor(newXP / 100) + 1;
  
  await db.update(talents).set({ xp: newXP, level: newLevel }).where(eq(talents.id, talentId));
  
  return { newXP, newLevel, leveledUp: newLevel > currentLevel };
}

// Course Recommendations functions
export async function getCourseRecommendationsByTalentId(talentId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(courseRecommendations)
    .where(eq(courseRecommendations.talentId, talentId))
    .orderBy(desc(courseRecommendations.priority));
}

export async function createCourseRecommendation(recommendation: InsertCourseRecommendation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(courseRecommendations).values(recommendation);
}

export async function updateCourseRecommendationStatus(
  recommendationId: number,
  status: "recommended" | "in_progress" | "completed" | "dismissed"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .update(courseRecommendations)
    .set({ status })
    .where(eq(courseRecommendations.id, recommendationId));
}

// Get talent dashboard metrics
export async function getTalentDashboardMetrics(talentId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const talent = await db.select().from(talents).where(eq(talents.id, talentId)).limit(1);
  if (!talent[0]) throw new Error("Talent not found");
  
  const skillsCount = await db.select({ count: sql<number>`count(*)` }).from(talentSkills).where(eq(talentSkills.talentId, talentId));
  const certsCount = await db.select({ count: sql<number>`count(*)` }).from(talentCertifications).where(eq(talentCertifications.talentId, talentId));
  const matchesCount = await db.select({ count: sql<number>`count(*)` }).from(matches).where(eq(matches.talentId, talentId));
  const achievementsCount = await db.select({ count: sql<number>`count(*)` }).from(achievements).where(eq(achievements.talentId, talentId));
  
  return {
    xp: talent[0].xp || 0,
    level: talent[0].level || 1,
    skillsCount: skillsCount[0]?.count || 0,
    certificationsCount: certsCount[0]?.count || 0,
    matchesCount: matchesCount[0]?.count || 0,
    achievementsCount: achievementsCount[0]?.count || 0,
  };
}

// Generate course recommendations based on skills gap
export async function generateCourseRecommendations(talentId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Get talent's current skills
  const currentSkills = await db.select().from(talentSkills).where(eq(talentSkills.talentId, talentId));
  const skillNames = currentSkills.map(s => s.skill.toLowerCase());
  
  // Get talent's career plan
  const careerPlan = await db.select().from(careerPlans).where(eq(careerPlans.talentId, talentId)).limit(1);
  
  // Course recommendations based on common career paths
  const recommendations = [];
  
  // If no career plan, recommend foundational courses
  if (!careerPlan[0]) {
    recommendations.push(
      {
        talentId,
        courseName: "Fundamentos de Programação",
        provider: "Coursera",
        category: "Programming",
        skillsToGain: JSON.stringify(["Python", "JavaScript", "Lógica de Programação"]),
        priority: 10,
        reason: "Curso fundamental para iniciar carreira em tecnologia",
        courseUrl: "https://www.coursera.org/learn/python",
        estimatedDuration: "6 semanas",
      },
      {
        talentId,
        courseName: "Introdução ao Design UX",
        provider: "Google",
        category: "Design",
        skillsToGain: JSON.stringify(["UX Design", "Figma", "Pesquisa de Usuário"]),
        priority: 8,
        reason: "Habilidade valorizada no mercado de tecnologia",
        courseUrl: "https://www.coursera.org/professional-certificates/google-ux-design",
        estimatedDuration: "6 meses",
      }
    );
  } else {
    // Recommend based on target role
    const targetRole = careerPlan[0].targetRole.toLowerCase();
    
    if (targetRole.includes("desenvolvedor") || targetRole.includes("developer") || targetRole.includes("programador")) {
      if (!skillNames.includes("javascript") && !skillNames.includes("python")) {
        recommendations.push({
          talentId,
          courseName: "JavaScript Completo",
          provider: "Udemy",
          category: "Programming",
          skillsToGain: JSON.stringify(["JavaScript", "ES6+", "DOM", "Async/Await"]),
          priority: 10,
          reason: `Essencial para alcançar seu objetivo: ${careerPlan[0].targetRole}`,
          courseUrl: "https://www.udemy.com/course/javascript-completo/",
          estimatedDuration: "8 semanas",
        });
      }
      
      if (!skillNames.includes("react") && !skillNames.includes("vue")) {
        recommendations.push({
          talentId,
          courseName: "React - The Complete Guide",
          provider: "Udemy",
          category: "Programming",
          skillsToGain: JSON.stringify(["React", "Hooks", "Redux", "Next.js"]),
          priority: 9,
          reason: "Framework mais demandado para desenvolvedores frontend",
          courseUrl: "https://www.udemy.com/course/react-the-complete-guide/",
          estimatedDuration: "10 semanas",
        });
      }
    }
    
    if (targetRole.includes("designer") || targetRole.includes("ux") || targetRole.includes("ui")) {
      if (!skillNames.includes("figma") && !skillNames.includes("sketch")) {
        recommendations.push({
          talentId,
          courseName: "Figma Master Course",
          provider: "Udemy",
          category: "Design",
          skillsToGain: JSON.stringify(["Figma", "Prototyping", "Design Systems"]),
          priority: 10,
          reason: `Ferramenta essencial para ${careerPlan[0].targetRole}`,
          courseUrl: "https://www.udemy.com/course/figma-ux-ui-design/",
          estimatedDuration: "4 semanas",
        });
      }
    }
    
    if (targetRole.includes("data") || targetRole.includes("dados") || targetRole.includes("analista")) {
      if (!skillNames.includes("python") && !skillNames.includes("r")) {
        recommendations.push({
          talentId,
          courseName: "Python para Data Science",
          provider: "Coursera",
          category: "Data Science",
          skillsToGain: JSON.stringify(["Python", "Pandas", "NumPy", "Matplotlib"]),
          priority: 10,
          reason: "Base fundamental para trabalhar com dados",
          courseUrl: "https://www.coursera.org/learn/python-data-analysis",
          estimatedDuration: "7 semanas",
        });
      }
    }
  }
  
  // Always recommend soft skills
  recommendations.push({
    talentId,
    courseName: "Comunicação Efetiva no Ambiente de Trabalho",
    provider: "Sebrae",
    category: "Soft Skills",
    skillsToGain: JSON.stringify(["Comunicação", "Apresentação", "Trabalho em Equipe"]),
    priority: 7,
    reason: "Soft skills são diferenciais em qualquer carreira",
    courseUrl: "https://www.sebrae.com.br/sites/PortalSebrae/cursosonline",
    estimatedDuration: "2 semanas",
  });
  
  // Insert recommendations
  for (const rec of recommendations) {
    // Check if recommendation already exists
    const existing = await db
      .select()
      .from(courseRecommendations)
      .where(
        and(
          eq(courseRecommendations.talentId, talentId),
          eq(courseRecommendations.courseName, rec.courseName)
        )
      )
      .limit(1);
    
    if (existing.length === 0) {
      await db.insert(courseRecommendations).values(rec);
    }
  }
  
  return recommendations;
}
