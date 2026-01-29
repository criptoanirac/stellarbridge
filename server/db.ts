import { eq, sql, desc, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, talents, InsertTalent, companies, InsertCompany, jobPostings, InsertJobPosting, talentSkills, InsertTalentSkill, talentEducation, InsertTalentEducation, talentCertifications, InsertTalentCertification, matches, InsertMatch, successStories } from "../drizzle/schema";
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
export async function getSocialImpactMetrics() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Total de candidatas capacitadas (com pelo menos 1 certificação)
  const talentsWithCerts = await db
    .selectDistinct({ talentId: talentCertifications.talentId })
    .from(talentCertifications);
  
  // Total de vagas preenchidas (matches com status 'hired')
  const hiredMatches = await db
    .select()
    .from(matches)
    .where(eq(matches.status, "hired"));
  
  // Total de candidatas
  const allTalents = await db.select().from(talents);
  
  // Candidatas com pelo menos 1 match
  const talentsWithMatches = await db
    .selectDistinct({ talentId: matches.talentId })
    .from(matches);
  
  // Salário médio das vagas com contratação
  const jobsWithHires = await db
    .select({
      salaryMin: jobPostings.salaryMin,
      salaryMax: jobPostings.salaryMax,
    })
    .from(jobPostings)
    .innerJoin(matches, eq(matches.jobId, jobPostings.id))
    .where(eq(matches.status, "hired"));
  
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

export async function getGeographicDistribution() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Distribuição de talentos por localização
  const talentsByLocation = await db
    .select({
      location: talents.location,
      count: sql<number>`count(*)`,
    })
    .from(talents)
    .groupBy(talents.location);
  
  // Distribuição de vagas por localização
  const jobsByLocation = await db
    .select({
      location: jobPostings.location,
      count: sql<number>`count(*)`,
    })
    .from(jobPostings)
    .where(eq(jobPostings.status, "active"))
    .groupBy(jobPostings.location);
  
  return {
    talents: talentsByLocation,
    jobs: jobsByLocation,
  };
}

export async function getGrowthTrend() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Crescimento mensal de talentos, vagas e matches
  const talentGrowth = await db
    .select({
      month: sql<string>`DATE_FORMAT(${talents.createdAt}, '%Y-%m') as month`,
      count: sql<number>`count(*) as count`,
    })
    .from(talents)
    .groupBy(sql`month`);
  
  const jobGrowth = await db
    .select({
      month: sql<string>`DATE_FORMAT(${jobPostings.createdAt}, '%Y-%m') as month`,
      count: sql<number>`count(*) as count`,
    })
    .from(jobPostings)
    .groupBy(sql`month`);
  
  const matchGrowth = await db
    .select({
      month: sql<string>`DATE_FORMAT(${matches.createdAt}, '%Y-%m') as month`,
      count: sql<number>`count(*) as count`,
    })
    .from(matches)
    .groupBy(sql`month`);
  
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

export async function getSuccessStories() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const stories = await db
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
    .innerJoin(companies, eq(successStories.companyId, companies.id))
    .orderBy(desc(successStories.createdAt))
    .limit(10);
  
  return stories;
}

export async function getTopCertifications() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Certificações mais populares entre candidatas contratadas
  const topCerts = await db
    .select({
      certification: talentCertifications.certification,
      count: sql<number>`count(*)`,
    })
    .from(talentCertifications)
    .innerJoin(matches, eq(talentCertifications.talentId, matches.talentId))
    .where(eq(matches.status, "hired"))
    .groupBy(talentCertifications.certification)
    .orderBy(desc(sql`count(*)`))
    .limit(10);
  
  return topCerts;
}

export async function getActiveCompaniesCount() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const activeCompanies = await db
    .selectDistinct({ companyId: jobPostings.companyId })
    .from(jobPostings)
    .where(eq(jobPostings.status, "active"));
  
  return activeCompanies.length;
}

export async function createSuccessStory(story: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(successStories).values(story);
  return result;
}
