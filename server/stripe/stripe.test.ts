import { describe, expect, it } from "vitest";
import { PLANS, SERVICES, getPlanById, getServiceById } from "./products";

describe("Stripe Products", () => {
  describe("PLANS", () => {
    it("should have 3 plans defined", () => {
      expect(PLANS).toHaveLength(3);
    });

    it("should have correct plan IDs", () => {
      const ids = PLANS.map((p) => p.id);
      expect(ids).toContain("essentials");
      expect(ids).toContain("business");
      expect(ids).toContain("enterprise");
    });

    it("each plan should have required fields", () => {
      for (const plan of PLANS) {
        expect(plan.id).toBeTruthy();
        expect(plan.name).toBeTruthy();
        expect(plan.pricePerUnit).toBeGreaterThan(0);
        expect(plan.type).toBe("recurring");
        expect(plan.interval).toBe("month");
        expect(plan.description).toBeTruthy();
      }
    });

    it("essentials plan should be $175/user/mo (17500 cents)", () => {
      const essentials = getPlanById("essentials");
      expect(essentials).toBeDefined();
      expect(essentials!.pricePerUnit).toBe(17500);
    });

    it("business plan should be $299/user/mo (29900 cents)", () => {
      const business = getPlanById("business");
      expect(business).toBeDefined();
      expect(business!.pricePerUnit).toBe(29900);
    });

    it("enterprise plan should be $449/user/mo (44900 cents)", () => {
      const enterprise = getPlanById("enterprise");
      expect(enterprise).toBeDefined();
      expect(enterprise!.pricePerUnit).toBe(44900);
    });

    it("plans should be in ascending price order", () => {
      expect(PLANS[0].pricePerUnit).toBeLessThan(PLANS[1].pricePerUnit);
      expect(PLANS[1].pricePerUnit).toBeLessThan(PLANS[2].pricePerUnit);
    });
  });

  describe("SERVICES", () => {
    it("should have 3 services defined", () => {
      expect(SERVICES).toHaveLength(3);
    });

    it("should have correct service IDs", () => {
      const ids = SERVICES.map((s) => s.id);
      expect(ids).toContain("site-survey");
      expect(ids).toContain("network-audit");
      expect(ids).toContain("wifi-installation");
    });

    it("each service should have required fields", () => {
      for (const svc of SERVICES) {
        expect(svc.id).toBeTruthy();
        expect(svc.name).toBeTruthy();
        expect(svc.price).toBeGreaterThan(0);
        expect(svc.type).toBe("one_time");
        expect(svc.description).toBeTruthy();
      }
    });

    it("site survey should be $1,500 (150000 cents)", () => {
      const survey = getServiceById("site-survey");
      expect(survey).toBeDefined();
      expect(survey!.price).toBe(150000);
    });

    it("network audit should be $2,500 (250000 cents)", () => {
      const audit = getServiceById("network-audit");
      expect(audit).toBeDefined();
      expect(audit!.price).toBe(250000);
    });

    it("wifi installation should be $4,500 (450000 cents)", () => {
      const install = getServiceById("wifi-installation");
      expect(install).toBeDefined();
      expect(install!.price).toBe(450000);
    });
  });

  describe("getPlanById", () => {
    it("should return the correct plan", () => {
      const plan = getPlanById("business");
      expect(plan).toBeDefined();
      expect(plan!.name).toBe("Sinbar Business Plan");
    });

    it("should return undefined for invalid ID", () => {
      const plan = getPlanById("nonexistent");
      expect(plan).toBeUndefined();
    });
  });

  describe("getServiceById", () => {
    it("should return the correct service", () => {
      const svc = getServiceById("network-audit");
      expect(svc).toBeDefined();
      expect(svc!.name).toBe("Network Security Audit");
    });

    it("should return undefined for invalid ID", () => {
      const svc = getServiceById("nonexistent");
      expect(svc).toBeUndefined();
    });
  });
});
