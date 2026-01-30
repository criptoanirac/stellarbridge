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
  birthDate: timestamp("birthDate"),
  portfolioUrl: varchar("portfolioUrl", { length: 500 }),
  githubUrl: varchar("githubUrl", { length: 500 }),
  linkedinUrl: varchar("linkedinUrl", { length: 500 }),
  identityVerified: boolean("identityVerified").default(false).notNull(),
  verificationMethod: varchar("verificationMethod", { length: 100 }),
  // Gamification fields
  xp: int("xp").default(0).notNull(),
  level: int("level").default(1).notNull(),
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
 * Success Stories
 * Stores testimonials from hired talents
 */
export const successStories = mysqlTable("successStories", {
  id: int("id").autoincrement().primaryKey(),
  talentId: int("talentId").notNull(),
  companyId: int("companyId").notNull(),
  testimonial: text("testimonial").notNull(),
  beforeRole: varchar("beforeRole", { length: 255 }),
  afterRole: varchar("afterRole", { length: 255 }),
  salaryIncrease: decimal("salaryIncrease", { precision: 5, scale: 2 }),
  imageUrl: varchar("imageUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SuccessStory = typeof successStories.$inferSelect;
export type InsertSuccessStory = typeof successStories.$inferInsert;

/**
 * Career Plans
 * Stores talent career goals and desired positions
 */
export const careerPlans = mysqlTable("careerPlans", {
  id: int("id").autoincrement().primaryKey(),
  talentId: int("talentId").notNull(),
  targetRole: varchar("targetRole", { length: 255 }).notNull(),
  targetIndustry: varchar("targetIndustry", { length: 255 }),
  targetSalary: decimal("targetSalary", { precision: 10, scale: 2 }),
  deadline: timestamp("deadline"),
  status: mysqlEnum("status", ["active", "completed", "abandoned"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CareerPlan = typeof careerPlans.$inferSelect;
export type InsertCareerPlan = typeof careerPlans.$inferInsert;

/**
 * Achievements/Badges
 * Tracks unlocked achievements for gamification
 */
export const achievements = mysqlTable("achievements", {
  id: int("id").autoincrement().primaryKey(),
  talentId: int("talentId").notNull(),
  badgeType: varchar("badgeType", { length: 100 }).notNull(), // e.g., "first_cert", "python_master", "networking_pro"
  badgeName: varchar("badgeName", { length: 255 }).notNull(),
  badgeDescription: text("badgeDescription"),
  badgeIcon: varchar("badgeIcon", { length: 100 }), // emoji or icon name
  xpAwarded: int("xpAwarded").default(0).notNull(),
  unlockedAt: timestamp("unlockedAt").defaultNow().notNull(),
});

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = typeof achievements.$inferInsert;

/**
 * Talent Progress History
 * Tracks XP gains and level ups over time
 */
export const talentProgress = mysqlTable("talentProgress", {
  id: int("id").autoincrement().primaryKey(),
  talentId: int("talentId").notNull(),
  eventType: varchar("eventType", { length: 100 }).notNull(), // e.g., "course_completed", "cert_added", "level_up"
  xpGained: int("xpGained").default(0).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TalentProgress = typeof talentProgress.$inferSelect;
export type InsertTalentProgress = typeof talentProgress.$inferInsert;

/**
 * Course Recommendations
 * AI-generated course suggestions based on skills gap
 */
export const courseRecommendations = mysqlTable("courseRecommendations", {
  id: int("id").autoincrement().primaryKey(),
  talentId: int("talentId").notNull(),
  courseName: varchar("courseName", { length: 255 }).notNull(),
  provider: varchar("provider", { length: 255 }), // e.g., "Coursera", "Udemy", "Sebrae"
  category: varchar("category", { length: 100 }), // e.g., "Programming", "Design", "Business"
  skillsToGain: text("skillsToGain"), // JSON array of skills
  priority: int("priority").default(0).notNull(), // Higher = more important
  reason: text("reason"), // Why this course is recommended
  courseUrl: varchar("courseUrl", { length: 500 }),
  estimatedDuration: varchar("estimatedDuration", { length: 100 }), // e.g., "4 weeks", "20 hours"
  status: mysqlEnum("status", ["recommended", "in_progress", "completed", "dismissed"]).default("recommended").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CourseRecommendation = typeof courseRecommendations.$inferSelect;
export type InsertCourseRecommendation = typeof courseRecommendations.$inferInsert;

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
  careerPlans: many(careerPlans),
  achievements: many(achievements),
  progress: many(talentProgress),
  courseRecommendations: many(courseRecommendations),
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

export const successStoriesRelations = relations(successStories, ({ one }) => ({
  talent: one(talents, {
    fields: [successStories.talentId],
    references: [talents.id],
  }),
  company: one(companies, {
    fields: [successStories.companyId],
    references: [companies.id],
  }),
}));

export const careerPlansRelations = relations(careerPlans, ({ one }) => ({
  talent: one(talents, {
    fields: [careerPlans.talentId],
    references: [talents.id],
  }),
}));

export const achievementsRelations = relations(achievements, ({ one }) => ({
  talent: one(talents, {
    fields: [achievements.talentId],
    references: [talents.id],
  }),
}));

export const talentProgressRelations = relations(talentProgress, ({ one }) => ({
  talent: one(talents, {
    fields: [talentProgress.talentId],
    references: [talents.id],
  }),
}));

export const courseRecommendationsRelations = relations(courseRecommendations, ({ one }) => ({
  talent: one(talents, {
    fields: [courseRecommendations.talentId],
    references: [talents.id],
  }),
}));

/**
 * Courses (Learn-to-Earn)
 * Stores available courses with XLM rewards
 */
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: mysqlEnum("category", ["web3", "ia", "vendas", "design", "programacao"]).notNull(),
  difficulty: mysqlEnum("difficulty", ["basico", "intermediario", "avancado"]).notNull(),
  totalRewardXlm: decimal("totalRewardXlm", { precision: 10, scale: 2 }).notNull(),
  durationHours: int("durationHours").notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }),
  provider: varchar("provider", { length: 255 }), // e.g., "Mulheres que Codam", "Sebrae"
  status: mysqlEnum("status", ["active", "archived"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

/**
 * Course Modules
 * Individual modules within courses
 */
export const courseModules = mysqlTable("courseModules", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  order: int("order").notNull(), // Order within the course
  rewardXlm: decimal("rewardXlm", { precision: 10, scale: 2 }).notNull(),
  contentUrl: varchar("contentUrl", { length: 500 }), // Link to course content
  estimatedMinutes: int("estimatedMinutes"), // Estimated time to complete
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CourseModule = typeof courseModules.$inferSelect;
export type InsertCourseModule = typeof courseModules.$inferInsert;

/**
 * User Course Progress
 * Tracks which courses users are enrolled in
 */
export const userCourseProgress = mysqlTable("userCourseProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  status: mysqlEnum("status", ["not_started", "in_progress", "completed"]).default("not_started").notNull(),
  startedAt: timestamp("startedAt"),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserCourseProgress = typeof userCourseProgress.$inferSelect;
export type InsertUserCourseProgress = typeof userCourseProgress.$inferInsert;

/**
 * User Module Completion
 * Tracks completed modules and XLM earned
 */
export const userModuleCompletion = mysqlTable("userModuleCompletion", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
  xlmEarned: decimal("xlmEarned", { precision: 10, scale: 2 }).notNull(),
  transactionHash: varchar("transactionHash", { length: 255 }), // For future blockchain integration
});

export type UserModuleCompletion = typeof userModuleCompletion.$inferSelect;
export type InsertUserModuleCompletion = typeof userModuleCompletion.$inferInsert;

/**
 * User Wallet
 * Stores XLM balance and Stellar address
 */
export const userWallet = mysqlTable("userWallet", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  stellarAddress: varchar("stellarAddress", { length: 56 }), // Stellar public key
  totalEarnedXlm: decimal("totalEarnedXlm", { precision: 10, scale: 2 }).default("0.00").notNull(),
  availableXlm: decimal("availableXlm", { precision: 10, scale: 2 }).default("0.00").notNull(),
  lockedXlm: decimal("lockedXlm", { precision: 10, scale: 2 }).default("0.00").notNull(),
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserWallet = typeof userWallet.$inferSelect;
export type InsertUserWallet = typeof userWallet.$inferInsert;

/**
 * XLM Transactions
 * Tracks all XLM movements (earn, withdraw, bonus)
 */
export const xlmTransactions = mysqlTable("xlmTransactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["earn", "withdraw", "bonus", "refund"]).notNull(),
  amountXlm: decimal("amountXlm", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  moduleId: int("moduleId"), // Reference to module if type is 'earn'
  transactionHash: varchar("transactionHash", { length: 255 }), // Stellar transaction hash
  status: mysqlEnum("status", ["pending", "completed", "failed"]).default("completed").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type XlmTransaction = typeof xlmTransactions.$inferSelect;
export type InsertXlmTransaction = typeof xlmTransactions.$inferInsert;

/**
 * Relations for gamification tables
 */
export const coursesRelations = relations(courses, ({ many }) => ({
  modules: many(courseModules),
  userProgress: many(userCourseProgress),
}));

export const courseModulesRelations = relations(courseModules, ({ one, many }) => ({
  course: one(courses, {
    fields: [courseModules.courseId],
    references: [courses.id],
  }),
  completions: many(userModuleCompletion),
}));

export const userCourseProgressRelations = relations(userCourseProgress, ({ one }) => ({
  user: one(users, {
    fields: [userCourseProgress.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [userCourseProgress.courseId],
    references: [courses.id],
  }),
}));

export const userModuleCompletionRelations = relations(userModuleCompletion, ({ one }) => ({
  user: one(users, {
    fields: [userModuleCompletion.userId],
    references: [users.id],
  }),
  module: one(courseModules, {
    fields: [userModuleCompletion.moduleId],
    references: [courseModules.id],
  }),
}));

export const userWalletRelations = relations(userWallet, ({ one, many }) => ({
  user: one(users, {
    fields: [userWallet.userId],
    references: [users.id],
  }),
  transactions: many(xlmTransactions),
}));

export const xlmTransactionsRelations = relations(xlmTransactions, ({ one }) => ({
  user: one(users, {
    fields: [xlmTransactions.userId],
    references: [users.id],
  }),
  wallet: one(userWallet, {
    fields: [xlmTransactions.userId],
    references: [userWallet.userId],
  }),
  module: one(courseModules, {
    fields: [xlmTransactions.moduleId],
    references: [courseModules.id],
  }),
}));
