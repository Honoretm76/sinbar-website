/**
 * Stripe product and price definitions for Sinbar Consultants.
 * These are used to create Stripe Checkout Sessions.
 * Prices are in cents (USD).
 */

export interface PlanProduct {
  id: string;
  name: string;
  description: string;
  pricePerUnit: number; // cents per user per month
  type: "recurring";
  interval: "month";
}

export interface ServiceProduct {
  id: string;
  name: string;
  description: string;
  price: number; // cents, one-time
  type: "one_time";
}

// Monthly recurring plans (per user per month)
export const PLANS: PlanProduct[] = [
  {
    id: "essentials",
    name: "Sinbar Essentials Plan",
    description: "Managed wireless internet for small businesses with 5-15 users. Includes 100 Mbps dedicated internet, up to 3 APs, business-hours help desk, 24/7 monitoring, firewall & antivirus, and 99.5% uptime SLA.",
    pricePerUnit: 17500, // $175/user/mo
    type: "recurring",
    interval: "month",
  },
  {
    id: "business",
    name: "Sinbar Business Plan",
    description: "Managed wireless internet for growing businesses with 10-50 users. Includes 250 Mbps dedicated internet, up to 8 APs + guest WiFi, 24/7 priority support (4hr response), EDR, backup & DR, VoIP, and 99.9% uptime SLA.",
    pricePerUnit: 29900, // $299/user/mo
    type: "recurring",
    interval: "month",
  },
  {
    id: "enterprise",
    name: "Sinbar Enterprise Plan",
    description: "Managed wireless internet for 25-75+ users & multi-site operations. Includes 1 Gbps + failover, unlimited APs, 24/7/365 white-glove support (1hr response), full SIEM/SOC, unified communications, Virtual CIO, and 99.99% uptime SLA.",
    pricePerUnit: 44900, // $449/user/mo
    type: "recurring",
    interval: "month",
  },
];

// One-time professional services
export const SERVICES: ServiceProduct[] = [
  {
    id: "site-survey",
    name: "Professional Site Survey",
    description: "Comprehensive on-site wireless assessment with coverage mapping, interference analysis, and custom deployment plan.",
    price: 150000, // $1,500
    type: "one_time",
  },
  {
    id: "network-audit",
    name: "Network Security Audit",
    description: "Full security audit of your existing wireless and wired network infrastructure with vulnerability report.",
    price: 250000, // $2,500
    type: "one_time",
  },
  {
    id: "wifi-installation",
    name: "WiFi Installation Package",
    description: "Professional installation of up to 5 enterprise-grade access points with configuration and testing.",
    price: 450000, // $4,500
    type: "one_time",
  },
];

export function getPlanById(id: string): PlanProduct | undefined {
  return PLANS.find((p) => p.id === id);
}

export function getServiceById(id: string): ServiceProduct | undefined {
  return SERVICES.find((s) => s.id === id);
}
