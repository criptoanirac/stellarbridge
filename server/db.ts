import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, talents, InsertTalent, companies, InsertCompany, jobPostings, InsertJobPosting, talentSkills, InsertTalentSkill, talentEducation, InsertTalentEducation, talentCertifications, InsertTalentCertification, matches, InsertMatch } from "../drizzle/schema";
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
