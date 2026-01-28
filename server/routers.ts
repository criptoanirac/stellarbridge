import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Talent routes
  talent: router({
    // Get or create talent profile
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      const talent = await db.getTalentByUserId(ctx.user.id);
      if (!talent) return null;
      
      const skills = await db.getTalentSkills(talent.id);
      const education = await db.getTalentEducation(talent.id);
      const certifications = await db.getTalentCertifications(talent.id);
      
      return {
        ...talent,
        skills,
        education,
        certifications,
      };
    }),
    
    // Create talent profile
    createProfile: protectedProcedure
      .input(z.object({
        pseudonym: z.string().min(3),
        bio: z.string().optional(),
        currentRole: z.string().optional(),
        yearsExperience: z.string().optional(),
        industry: z.string().optional(),
        location: z.string().optional(),
        portfolioUrl: z.string().url().optional(),
        githubUrl: z.string().url().optional(),
        linkedinUrl: z.string().url().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const talent = await db.createTalent({
          userId: ctx.user.id,
          ...input,
        });
        return talent;
      }),
    
    // Add skill
    addSkill: protectedProcedure
      .input(z.object({
        talentId: z.number(),
        skill: z.string().min(1),
        proficiency: z.enum(["beginner", "intermediate", "advanced", "expert"]).optional(),
      }))
      .mutation(async ({ input }) => {
        return db.addTalentSkill({
          talentId: input.talentId,
          skill: input.skill,
          proficiency: (input.proficiency || "intermediate") as any,
        });
      }),
    
    // Add education
    addEducation: protectedProcedure
      .input(z.object({
        talentId: z.number(),
        institution: z.string().min(1),
        course: z.string().min(1),
        completionYear: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return db.addTalentEducation(input);
      }),
    
    // Add certification
    addCertification: protectedProcedure
      .input(z.object({
        talentId: z.number(),
        certification: z.string().min(1),
        issuer: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return db.addTalentCertification(input);
      }),
  }),
  
  // Company routes
  company: router({
    // Get company profile
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      return db.getCompanyByUserId(ctx.user.id);
    }),
    
    // Create company profile
    createProfile: protectedProcedure
      .input(z.object({
        companyName: z.string().min(1),
        industry: z.string().optional(),
        description: z.string().optional(),
        website: z.string().url().optional(),
        location: z.string().optional(),
        employeeCount: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return db.createCompany({
          userId: ctx.user.id,
          ...input,
        });
      }),
    
    // Get all job postings for company
    getJobPostings: protectedProcedure.query(async ({ ctx }) => {
      const company = await db.getCompanyByUserId(ctx.user.id);
      if (!company) return [];
      return db.getJobPostingsByCompanyId(company.id);
    }),
  }),
  
  // Job routes
  job: router({
    // Create job posting
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        sector: z.string().min(1),
        experienceLevel: z.enum(["junior", "mid", "senior", "lead"]),
        salaryMin: z.number().optional(),
        salaryMax: z.number().optional(),
        location: z.string().optional(),
        requiredSkills: z.array(z.string()),
      }))
      .mutation(async ({ ctx, input }) => {
        const company = await db.getCompanyByUserId(ctx.user.id);
        if (!company) throw new Error("Company profile not found");
        
        const { salaryMin, salaryMax, ...rest } = input;
        return db.createJobPosting({
          companyId: company.id,
          ...rest,
          salaryMin: salaryMin ? String(salaryMin) : null,
          salaryMax: salaryMax ? String(salaryMax) : null,
        } as any);
      }),
    
    // Get job posting
    getById: publicProcedure
      .input(z.object({ jobId: z.number() }))
      .query(async ({ input }) => {
        return db.getJobPostingById(input.jobId);
      }),
    
    // Update job posting
    update: protectedProcedure
      .input(z.object({
        jobId: z.number(),
        updates: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          status: z.enum(["active", "paused", "archived", "closed"]).optional(),
        }),
      }))
      .mutation(async ({ input }) => {
        return db.updateJobPosting(input.jobId, input.updates as any);
      }),
  }),
});

export type AppRouter = typeof appRouter;
