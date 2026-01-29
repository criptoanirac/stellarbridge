import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import * as db from "./db";

describe("Professional Development System", () => {
  let talentId: number;
  const mockUser = { id: 1, openId: "test-user", name: "Test User" };
  const mockContext = { 
    user: mockUser, 
    req: {} as any, 
    res: {} as any 
  };

  beforeAll(async () => {
    // Use existing talent from seed data
    talentId = 120001; // Real ID from database
  });

  describe("Dashboard Metrics", () => {
    it("should return dashboard metrics for a talent", async () => {
      const caller = appRouter.createCaller(mockContext);
      
      const metrics = await caller.professionalDevelopment.getDashboardMetrics({ talentId });
      
      expect(metrics).toBeDefined();
      expect(metrics.xp).toBeGreaterThanOrEqual(0);
      expect(metrics.level).toBeGreaterThanOrEqual(1);
      expect(metrics.skillsCount).toBeGreaterThanOrEqual(0);
      expect(metrics.certificationsCount).toBeGreaterThanOrEqual(0);
      expect(metrics.achievementsCount).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Career Plan", () => {
    it("should retrieve career plan for a talent", async () => {
      const caller = appRouter.createCaller(mockContext);
      
      const careerPlan = await caller.professionalDevelopment.getCareerPlan({ talentId });
      
      expect(careerPlan).toBeDefined();
      if (careerPlan) {
        expect(careerPlan.targetRole).toBeDefined();
        expect(careerPlan.talentId).toBe(talentId);
      }
    });

    it("should create a new career plan", async () => {
      const caller = appRouter.createCaller(mockContext);
      
      const result = await caller.professionalDevelopment.saveCareerPlan({
        talentId: 120003, // Use talent without career plan
        targetRole: "Senior Developer",
        targetIndustry: "Technology",
        targetSalary: "10000",
        deadline: "2027-12-31",
      });
      
      expect(result.success).toBe(true);
    });
  });

  describe("Achievements", () => {
    it("should return achievements for a talent", async () => {
      const caller = appRouter.createCaller(mockContext);
      
      const achievements = await caller.professionalDevelopment.getAchievements({ talentId });
      
      expect(Array.isArray(achievements)).toBe(true);
      if (achievements.length > 0) {
        expect(achievements[0]).toHaveProperty("badgeName");
        expect(achievements[0]).toHaveProperty("badgeIcon");
        expect(achievements[0]).toHaveProperty("badgeDescription");
      }
    });
  });

  describe("Progress History", () => {
    it("should return progress history for a talent", async () => {
      const caller = appRouter.createCaller(mockContext);
      
      const progress = await caller.professionalDevelopment.getProgressHistory({ 
        talentId, 
        limit: 5 
      });
      
      expect(Array.isArray(progress)).toBe(true);
      if (progress.length > 0) {
        expect(progress[0]).toHaveProperty("eventType");
        expect(progress[0]).toHaveProperty("xpGained");
        expect(progress[0]).toHaveProperty("description");
      }
    });
  });

  describe("XP System", () => {
    it("should add XP to a talent", async () => {
      const caller = appRouter.createCaller(mockContext);
      
      const result = await caller.professionalDevelopment.addXP({
        talentId,
        xp: 25,
        eventType: "test_event",
        description: "Test XP gain",
      });
      
      expect(result).toBeDefined();
      expect(result.newXP).toBeGreaterThan(0);
      expect(result.newLevel).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Course Recommendations", () => {
    it("should return course recommendations for a talent", async () => {
      const caller = appRouter.createCaller(mockContext);
      
      const recommendations = await caller.professionalDevelopment.getCourseRecommendations({ talentId });
      
      expect(Array.isArray(recommendations)).toBe(true);
      if (recommendations.length > 0) {
        expect(recommendations[0]).toHaveProperty("courseName");
        expect(recommendations[0]).toHaveProperty("provider");
        expect(recommendations[0]).toHaveProperty("status");
      }
    });

    it("should generate course recommendations", async () => {
      const caller = appRouter.createCaller(mockContext);
      
      const recommendations = await caller.professionalDevelopment.generateRecommendations({ 
        talentId: 120003 
      });
      
      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations.length).toBeGreaterThan(0);
    });

    it("should update course recommendation status", async () => {
      const caller = appRouter.createCaller(mockContext);
      
      // Get first recommendation
      const recommendations = await caller.professionalDevelopment.getCourseRecommendations({ talentId });
      
      if (recommendations.length > 0) {
        const result = await caller.professionalDevelopment.updateCourseStatus({
          recommendationId: recommendations[0].id,
          status: "in_progress",
        });
        
        expect(result.success).toBe(true);
      }
    });
  });

  describe("Database Functions", () => {
    it("should calculate talent dashboard metrics correctly", async () => {
      const metrics = await db.getTalentDashboardMetrics(talentId);
      
      expect(metrics).toBeDefined();
      expect(typeof metrics.xp).toBe("number");
      expect(typeof metrics.level).toBe("number");
      expect(typeof metrics.skillsCount).toBe("number");
      expect(typeof metrics.certificationsCount).toBe("number");
      expect(typeof metrics.achievementsCount).toBe("number");
    });

    it("should update talent XP and level correctly", async () => {
      const result = await db.updateTalentXP(talentId, 50);
      
      expect(result).toBeDefined();
      expect(result.newXP).toBeGreaterThan(0);
      expect(result.newLevel).toBeGreaterThanOrEqual(1);
      expect(typeof result.leveledUp).toBe("boolean");
    });
  });
});
