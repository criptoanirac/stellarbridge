import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, json } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Talent (Candidata) Profile
 * Stores detailed information about job candidates
 */
export const talents = mysqlTable("talents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  pseudonym: varchar("pseudonym", { length: 64 }).notNull().unique(),
  bio: text("bio"),
  currentRole: varchar("currentRole", { length: 255 }),
  yearsExperience: varchar("yearsExperience", { length: 50 }),
  industry: varchar("industry", { length: 255 }),
  location: varchar("location", { length: 255 }),
  portfolioUrl: varchar("portfolioUrl", { length: 500 }),
  githubUrl: varchar("githubUrl", { length: 500 }),
  linkedinUrl: varchar("linkedinUrl", { length: 500 }),
  identityVerified: boolean("identityVerified").default(false).notNull(),
  verificationMethod: varchar("verificationMethod", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Talent = typeof talents.$inferSelect;
export type InsertTalent = typeof talents.$inferInsert;

/**
 * Talent Skills
 * Stores verified skills for each talent
 */
export const talentSkills = mysqlTable("talentSkills", {
  id: int("id").autoincrement().primaryKey(),
  talentId: int("talentId").notNull(),
  skill: varchar("skill", { length: 255 }).notNull(),
  proficiency: mysqlEnum("proficiency", ["beginner", "intermediate", "advanced", "expert"]).default("intermediate").notNull(),
  verified: boolean("verified").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TalentSkill = typeof talentSkills.$inferSelect;
export type InsertTalentSkill = typeof talentSkills.$inferInsert;

/**
 * Talent Education
 * Stores education history for talents
 */
export const talentEducation = mysqlTable("talentEducation", {
  id: int("id").autoincrement().primaryKey(),
  talentId: int("talentId").notNull(),
  institution: varchar("institution", { length: 255 }).notNull(),
  course: varchar("course", { length: 255 }).notNull(),
  completionYear: int("completionYear"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TalentEducation = typeof talentEducation.$inferSelect;
export type InsertTalentEducation = typeof talentEducation.$inferInsert;

/**
 * Talent Certifications
 * Stores certifications for talents
 */
export const talentCertifications = mysqlTable("talentCertifications", {
  id: int("id").autoincrement().primaryKey(),
  talentId: int("talentId").notNull(),
  certification: varchar("certification", { length: 255 }).notNull(),
  issuer: varchar("issuer", { length: 255 }),
  issueDate: timestamp("issueDate"),
  expiryDate: timestamp("expiryDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TalentCertification = typeof talentCertifications.$inferSelect;
export type InsertTalentCertification = typeof talentCertifications.$inferInsert;

/**
 * Company Profile
 * Stores information about hiring companies
 */
export const companies = mysqlTable("companies", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  industry: varchar("industry", { length: 255 }),
  description: text("description"),
  website: varchar("website", { length: 500 }),
  location: varchar("location", { length: 255 }),
  employeeCount: varchar("employeeCount", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Company = typeof companies.$inferSelect;
export type InsertCompany = typeof companies.$inferInsert;

/**
 * Job Postings
 * Stores job vacancies posted by companies
 */
export const jobPostings = mysqlTable("jobPostings", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  sector: varchar("sector", { length: 255 }).notNull(),
  experienceLevel: mysqlEnum("experienceLevel", ["junior", "mid", "senior", "lead"]).notNull(),
  salaryMin: decimal("salaryMin", { precision: 10, scale: 2 }),
  salaryMax: decimal("salaryMax", { precision: 10, scale: 2 }),
  location: varchar("location", { length: 255 }),
  status: mysqlEnum("status", ["active", "paused", "archived", "closed"]).default("active").notNull(),
  requiredSkills: json("requiredSkills").$type<string[]>().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type JobPosting = typeof jobPostings.$inferSelect;
export type InsertJobPosting = typeof jobPostings.$inferInsert;

/**
 * Matches
 * Stores compatibility matches between talents and job postings
 */
export const matches = mysqlTable("matches", {
  id: int("id").autoincrement().primaryKey(),
  talentId: int("talentId").notNull(),
  jobId: int("jobId").notNull(),
  compatibilityScore: decimal("compatibilityScore", { precision: 5, scale: 2 }).notNull(),
  matchedSkills: json("matchedSkills").$type<string[]>().notNull(),
  status: mysqlEnum("status", ["pending", "viewed", "interested", "rejected", "hired"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Match = typeof matches.$inferSelect;
export type InsertMatch = typeof matches.$inferInsert;

/**
 * Notifications
 * Stores notifications for users
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["match", "update", "success", "warning"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  relatedId: int("relatedId"),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Relations
 */
export const usersRelations = relations(users, ({ one, many }) => ({
  talent: one(talents, {
    fields: [users.id],
    references: [talents.userId],
  }),
  company: one(companies, {
    fields: [users.id],
    references: [companies.userId],
  }),
  notifications: many(notifications),
}));

export const talentsRelations = relations(talents, ({ one, many }) => ({
  user: one(users, {
    fields: [talents.userId],
    references: [users.id],
  }),
  skills: many(talentSkills),
  education: many(talentEducation),
  certifications: many(talentCertifications),
  matches: many(matches),
}));

export const companiesRelations = relations(companies, ({ one, many }) => ({
  user: one(users, {
    fields: [companies.userId],
    references: [users.id],
  }),
  jobPostings: many(jobPostings),
}));

export const jobPostingsRelations = relations(jobPostings, ({ one, many }) => ({
  company: one(companies, {
    fields: [jobPostings.companyId],
    references: [companies.id],
  }),
  matches: many(matches),
}));

export const matchesRelations = relations(matches, ({ one }) => ({
  talent: one(talents, {
    fields: [matches.talentId],
    references: [talents.id],
  }),
  job: one(jobPostings, {
    fields: [matches.jobId],
    references: [jobPostings.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

export const talentSkillsRelations = relations(talentSkills, ({ one }) => ({
  talent: one(talents, {
    fields: [talentSkills.talentId],
    references: [talents.id],
  }),
}));

export const talentEducationRelations = relations(talentEducation, ({ one }) => ({
  talent: one(talents, {
    fields: [talentEducation.talentId],
    references: [talents.id],
  }),
}));

export const talentCertificationsRelations = relations(talentCertifications, ({ one }) => ({
  talent: one(talents, {
    fields: [talentCertifications.talentId],
    references: [talents.id],
  }),
}));
