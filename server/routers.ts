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
    
    // Update profile
    updateProfile: protectedProcedure
      .input(z.object({
        bio: z.string().optional(),
        currentRole: z.string().optional(),
        yearsExperience: z.string().optional(),
        industry: z.string().optional(),
        location: z.string().optional(),
        portfolioUrl: z.string().optional(),
        githubUrl: z.string().optional(),
        linkedinUrl: z.string().optional(),
        skills: z.array(z.string()).optional(),
        education: z.array(z.object({
          institution: z.string(),
          course: z.string(),
          completionYear: z.string().optional(),
        })).optional(),
        certifications: z.array(z.string()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const talent = await db.getTalentByUserId(ctx.user.id);
        if (!talent) throw new Error("Talent profile not found");
        
        // Update basic info
        const { skills, education, certifications, ...basicInfo } = input;
        await db.updateTalent(talent.id, basicInfo);
        
        // Update skills if provided
        if (skills) {
          await db.deleteTalentSkills(talent.id);
          for (const skill of skills) {
            await db.addTalentSkill({
              talentId: talent.id,
              skill,
              proficiency: "intermediate" as any,
            });
          }
        }
        
        // Update education if provided
        if (education) {
          await db.deleteTalentEducation(talent.id);
          for (const edu of education) {
            await db.addTalentEducation({
              talentId: talent.id,
              institution: edu.institution,
              course: edu.course,
              completionYear: edu.completionYear ? parseInt(edu.completionYear) : undefined,
            });
          }
        }
        
        // Update certifications if provided
        if (certifications) {
          await db.deleteTalentCertifications(talent.id);
          for (const cert of certifications) {
            await db.addTalentCertification({
              talentId: talent.id,
              certification: cert,
            });
          }
        }
        
        return { success: true };
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
  
  // Social Impact routes
  socialImpact: router({
    // Get main metrics
    getMetrics: publicProcedure
      .input(z.object({
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.getSocialImpactMetrics(input?.dateFrom, input?.dateTo);
      }),
    
    // Get geographic distribution
    getGeographicDistribution: publicProcedure
      .input(z.object({
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.getGeographicDistribution(input?.dateFrom, input?.dateTo);
      }),
    
    // Get growth trend
    getGrowthTrend: publicProcedure
      .input(z.object({
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.getGrowthTrend(input?.dateFrom, input?.dateTo);
      }),
    
    // Get success stories
    getSuccessStories: publicProcedure
      .input(z.object({
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.getSuccessStories(input?.dateFrom, input?.dateTo);
      }),
    
    // Get top certifications
    getTopCertifications: publicProcedure
      .input(z.object({
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.getTopCertifications(input?.dateFrom, input?.dateTo);
      }),
    
    // Get active companies count
    getActiveCompaniesCount: publicProcedure
      .input(z.object({
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.getActiveCompaniesCount(input?.dateFrom, input?.dateTo);
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

  // Professional Development (Career Plan & Gamification)
  professionalDevelopment: router({
    // Get dashboard metrics
    getDashboardMetrics: protectedProcedure
      .input(z.object({ talentId: z.number() }))
      .query(async ({ input }) => {
        return db.getTalentDashboardMetrics(input.talentId);
      }),
    
    // Get career plan
    getCareerPlan: protectedProcedure
      .input(z.object({ talentId: z.number() }))
      .query(async ({ input }) => {
        return db.getCareerPlanByTalentId(input.talentId);
      }),
    
    // Create or update career plan
    saveCareerPlan: protectedProcedure
      .input(z.object({
        talentId: z.number(),
        targetRole: z.string().min(1),
        targetIndustry: z.string().optional(),
        targetSalary: z.string().optional(),
        deadline: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const existingPlan = await db.getCareerPlanByTalentId(input.talentId);
        
        if (existingPlan) {
          await db.updateCareerPlan(existingPlan.id, {
            targetRole: input.targetRole,
            targetIndustry: input.targetIndustry,
            targetSalary: input.targetSalary,
            deadline: input.deadline ? new Date(input.deadline) : undefined,
          });
          return { success: true, planId: existingPlan.id };
        } else {
          await db.createCareerPlan({
            talentId: input.talentId,
            targetRole: input.targetRole,
            targetIndustry: input.targetIndustry,
            targetSalary: input.targetSalary,
            deadline: input.deadline ? new Date(input.deadline) : undefined,
          });
          return { success: true };
        }
      }),
    
    // Get achievements
    getAchievements: protectedProcedure
      .input(z.object({ talentId: z.number() }))
      .query(async ({ input }) => {
        return db.getAchievementsByTalentId(input.talentId);
      }),
    
    // Get progress history
    getProgressHistory: protectedProcedure
      .input(z.object({ talentId: z.number(), limit: z.number().optional() }))
      .query(async ({ input }) => {
        return db.getTalentProgressHistory(input.talentId, input.limit);
      }),
    
    // Add XP and check for achievements
    addXP: protectedProcedure
      .input(z.object({
        talentId: z.number(),
        xp: z.number(),
        eventType: z.string(),
        description: z.string(),
      }))
      .mutation(async ({ input }) => {
        // Add XP and update level
        const result = await db.updateTalentXP(input.talentId, input.xp);
        
        // Record progress
        await db.addTalentProgress({
          talentId: input.talentId,
          eventType: input.eventType,
          xpGained: input.xp,
          description: input.description,
        });
        
        // Check for level-up achievement
        if (result.leveledUp) {
          await db.createAchievement({
            talentId: input.talentId,
            badgeType: `level_${result.newLevel}`,
            badgeName: `Nível ${result.newLevel} Alcançado`,
            badgeDescription: `Parabéns! Você alcançou o nível ${result.newLevel}!`,
            badgeIcon: "🎖️",
            xpAwarded: 0,
          });
        }
        
        return result;
      }),
    
    // Get course recommendations
    getCourseRecommendations: protectedProcedure
      .input(z.object({ talentId: z.number() }))
      .query(async ({ input }) => {
        return db.getCourseRecommendationsByTalentId(input.talentId);
      }),
    
    // Update course recommendation status
    updateCourseStatus: protectedProcedure
      .input(z.object({
        recommendationId: z.number(),
        status: z.enum(["recommended", "in_progress", "completed", "dismissed"]),
      }))
      .mutation(async ({ input }) => {
        await db.updateCourseRecommendationStatus(input.recommendationId, input.status);
        
        // Award XP for completing a course
        if (input.status === "completed") {
          const recommendation = await db.getCourseRecommendationsByTalentId(0); // Will need to get talentId from recommendation
          // Award 50 XP for completing a course
          // This will be handled by the frontend calling addXP
        }
        
        return { success: true };
      }),
    
    // Generate course recommendations
    generateRecommendations: protectedProcedure
      .input(z.object({ talentId: z.number() }))
      .mutation(async ({ input }) => {
        return db.generateCourseRecommendations(input.talentId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
