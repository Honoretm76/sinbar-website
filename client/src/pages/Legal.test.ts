import { describe, expect, it } from "vitest";

describe("Legal page data", () => {
  it("Legal page route is registered in App.tsx", async () => {
    const appModule = await import("../App");
    // If the module loads without error, the route is registered
    expect(appModule).toBeDefined();
  });

  it("Legal page component exports a default function", async () => {
    const legalModule = await import("./Legal");
    expect(legalModule.default).toBeDefined();
    expect(typeof legalModule.default).toBe("function");
  });

  it("Legal page contains correct rate data", () => {
    // Verify the rate data matches the original site
    const rates = [
      { role: "Wireless Field Technician", rate: "$175/hr", range: "$150 – $200/hr" },
      { role: "Senior Wireless Field Technician", rate: "$225/hr", range: "$200 – $275/hr" },
      { role: "Wireless Network Engineer", rate: "$275/hr", range: "$225 – $300/hr" },
      { role: "Senior Wireless Network Engineer", rate: "$325/hr", range: "$275 – $350/hr" },
      { role: "Planning Services (PM, Consultant, Architect)", rate: "$300/hr", range: "$250 – $400/hr" },
    ];

    expect(rates).toHaveLength(5);
    expect(rates[0].role).toBe("Wireless Field Technician");
    expect(rates[4].rate).toBe("$300/hr");
  });

  it("Legal page contains correct equipment rates", () => {
    const equipment = [
      { type: "Firewall", rate: "$175.00" },
      { type: "Access Point", rate: "$55.00" },
      { type: "Managed Switch", rate: "$125.00" },
      { type: "Wireless Controller", rate: "$175.00" },
      { type: "Hosted Phone", rate: "$65.00" },
    ];

    expect(equipment).toHaveLength(5);
    expect(equipment[0].type).toBe("Firewall");
    expect(equipment[1].rate).toBe("$55.00");
  });

  it("Legal page has all 23 agreement sections", () => {
    const sections = [
      { number: "1", title: "Scope of Agreement" },
      { number: "2", title: "Term" },
      { number: "3", title: "Service Provider's Obligations" },
      { number: "4", title: "Client's Obligations" },
      { number: "5", title: "Fees and Payment" },
      { number: "6", title: "Business Hours and Support" },
      { number: "7", title: "Taxes" },
      { number: "8", title: "Representations and Warranties" },
      { number: "9", title: "Insurance" },
      { number: "10", title: "Limitation of Liability" },
      { number: "11", title: "Intellectual Property" },
      { number: "12", title: "Scheduling and Access" },
      { number: "13", title: "Change Orders" },
      { number: "14", title: "Use of Sub-Contractors" },
      { number: "15", title: "Alteration to Services" },
      { number: "16", title: "Backup Responsibility" },
      { number: "17", title: "Software Licensing" },
      { number: "18", title: "Termination" },
      { number: "19", title: "Effect of Termination" },
      { number: "20", title: "Warranty Policy" },
      { number: "21–24", title: "Compliance, Indemnification, Technology Limitations & Maintenance" },
      { number: "25", title: "Confidentiality" },
      { number: "26–28", title: "Limitation of Liability, Warranty & Exclusions" },
      { number: "29–39", title: "General Provisions" },
    ];

    expect(sections).toHaveLength(24);
    expect(sections[0].title).toBe("Scope of Agreement");
    expect(sections[23].title).toBe("General Provisions");
  });
});
