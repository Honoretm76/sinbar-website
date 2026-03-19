import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "wouter";
import {
  Wifi, Shield, Building2, Phone, Mail, MapPin, Check,
  ChevronRight, ArrowRight, Star, Clock, Users, Zap,
  Headphones, BarChart3, Globe, Server, Lock, Radio,
  Minus, Plus, Menu, X,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { blogPosts } from "@/data/blogPosts";
import { MapView } from "@/components/Map";

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */
const GOLD = "#C9A84C";
const GOLD_RGB = "201,168,76";
const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427955080/ZxXCJe99gzkbKiEMDdcDKE";
const LOGO = `${CDN}/sinbar-3d-logo-black-bg_270317ec.png`;
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427955080/j7TLVPMFE5nxAehtvQAsZ2/nyc-wireless-hero-KtPuFaassPaFh6UN5eLSxY.webp";
const STATS_GOLD = "#D4AF37";
const SERVICES_BG = `${CDN}/sinbar-services-bg-RE9rhxdkVCh5YjtDMs4XMQ.webp`;
const ABOUT_BG = `${CDN}/sinbar-about-bg-VCHLf2Jbd837RpfmQjmMdy.webp`;

const SOCIAL = {
  facebook: "https://www.facebook.com/profile.php?id=100093758477588",
  instagram: "https://www.instagram.com/sinbarconsultantsllc/",
  linkedin: "https://www.linkedin.com/in/sinbarconsultants-llc-6603672a9/",
};

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
const services = [
  { name: "Managed WiFi as a Service", icon: Wifi, desc: "End-to-end wireless network management with 24/7 monitoring and guaranteed uptime SLAs.", priority: "primary" },
  { name: "Dedicated Wireless Internet", icon: Radio, desc: "Business-grade dedicated internet access via fixed wireless — faster deployment than fiber.", priority: "primary" },
  { name: "Network Security & Monitoring", icon: Shield, desc: "Continuous threat monitoring, intrusion detection, and wireless security hardening.", priority: "primary" },
  { name: "Multi-Site Wireless Management", icon: Building2, desc: "Centralized management for businesses with multiple locations across NYC boroughs.", priority: "secondary" },
  { name: "VoIP over Wireless", icon: Phone, desc: "Crystal-clear business phone systems running over your managed wireless infrastructure.", priority: "secondary" },
  { name: "Backup & Failover Connectivity", icon: Server, desc: "Automatic failover to secondary wireless connection if primary goes down.", priority: "secondary" },
  { name: "IT Help Desk & Support", icon: Headphones, desc: "24/7 remote and on-site technical support for all your wireless and IT needs.", priority: "secondary" },
  { name: "Smart Building Connectivity", icon: Building2, desc: "IoT-ready wireless infrastructure for modern commercial and multi-tenant buildings.", priority: "tertiary" },
  { name: "Cybersecurity for Wireless", icon: Shield, desc: "Specialized security protocols for wireless networks including WPA3, zero-trust, and SIEM.", priority: "tertiary" },
  { name: "Cloud & Hybrid Networking", icon: Globe, desc: "Seamlessly connect your wireless network to cloud platforms like Azure and AWS.", priority: "tertiary" },
];

const plans = [
  {
    name: "Essentials", price: "$175", period: "/user/mo",
    tagline: "For small businesses with 5–15 users",
    features: ["Dedicated wireless internet (100 Mbps)", "Managed WiFi (up to 3 APs)", "Business-hours help desk", "24/7 network monitoring", "Firewall & antivirus", "Monthly reports", "99.5% uptime SLA", "Free site survey"],
    cta: "Get Started", highlight: false,
  },
  {
    name: "Business", price: "$299", period: "/user/mo",
    tagline: "For growing businesses with 10–50 users",
    features: ["Dedicated wireless internet (250 Mbps)", "Managed WiFi (up to 8 APs) + guest", "24/7 priority support (4hr response)", "EDR, email security, dark web monitoring", "Backup & disaster recovery", "VoIP (up to 25 extensions)", "Vendor management & strategy calls", "99.9% uptime SLA"],
    cta: "Most Popular", highlight: true,
  },
  {
    name: "Enterprise", price: "$449", period: "/user/mo",
    tagline: "For 25–75+ users & multi-site operations",
    features: ["Dedicated wireless internet (1 Gbps) + failover", "Unlimited APs — enterprise mesh & IoT", "24/7/365 white-glove — 1hr response", "Full SIEM, SOC, zero-trust, pen testing", "Unified communications (voice/video)", "Multi-site centralized management", "Virtual CIO — roadmap & quarterly reviews", "99.99% uptime SLA w/ financial guarantee"],
    cta: "Contact Us", highlight: false,
  },
];

const oneTimeServices = [
  {
    id: "site-survey", name: "Professional Site Survey", price: "$1,500",
    desc: "Comprehensive on-site wireless assessment with coverage mapping, interference analysis, and custom deployment plan.",
    features: ["On-site wireless assessment", "Coverage heat map analysis", "Interference & capacity report", "Custom deployment plan", "Written recommendations"],
  },
  {
    id: "network-audit", name: "Network Security Audit", price: "$2,500",
    desc: "Full security audit of your existing wireless and wired network infrastructure with vulnerability report.",
    features: ["Vulnerability scanning", "Penetration testing", "Compliance gap analysis", "Risk assessment report", "Remediation roadmap"],
  },
  {
    id: "wifi-installation", name: "WiFi Installation Package", price: "$4,500",
    desc: "Professional installation of up to 5 enterprise-grade access points with configuration and testing.",
    features: ["Up to 5 access points installed", "Enterprise-grade hardware", "Network configuration & optimization", "Coverage testing & validation", "30-day post-install support"],
  },
];

const reviews = [
  { name: "Marcus Rivera", title: "Owner, Rivera's Auto Group", location: "Bronx, NY", quote: "Sinbar set up managed WiFi across our 3 service bays and showroom. We went from constant dropouts to zero downtime in 8 months. Our team's productivity is up and customers love the guest WiFi.", result: "Zero downtime in 8 months", rating: 5 },
  { name: "Dr. Yolanda Chen", title: "Practice Manager, Fordham Family Health", location: "Bronx, NY", quote: "HIPAA-compliant wireless was a nightmare to manage ourselves. Sinbar took over completely — they monitor it 24/7 and we haven't had a single compliance issue. Worth every penny.", result: "100% HIPAA compliance maintained", rating: 5 },
  { name: "James Okafor", title: "Operations Director, BX Community Center", location: "South Bronx, NY", quote: "We serve 200+ community members daily and needed reliable WiFi for our programs. Sinbar installed and now manages everything. The flat monthly rate fits our nonprofit budget perfectly.", result: "200+ daily users served reliably", rating: 5 },
];

const caseStudies = [
  {
    client: "Multi-Location Restaurant Group", industry: "Food & Beverage",
    challenge: "5 locations across the Bronx with unreliable internet causing POS failures and customer complaints",
    solution: "Deployed managed wireless with automatic failover at all 5 locations, centralized monitoring dashboard",
    results: ["99.97% uptime achieved", "POS failures reduced by 100%", "Saved $2,400/yr vs. prior ISP"],
    icon: Building2,
  },
  {
    client: "Healthcare Clinic Network", industry: "Healthcare",
    challenge: "HIPAA-compliant wireless needed for 3 clinics with EMR systems and patient check-in kiosks",
    solution: "Segmented wireless network with WPA3 Enterprise, VLAN isolation, and continuous security monitoring",
    results: ["HIPAA audit passed first try", "EMR load time cut by 40%", "Zero security incidents in 12 months"],
    icon: Shield,
  },
  {
    client: "Commercial Real Estate Developer", industry: "Real Estate",
    challenge: "New 80-unit mixed-use building needed building-wide WiFi as a tenant amenity",
    solution: "Building-wide managed WiFi infrastructure with per-unit billing capability and 24/7 NOC monitoring",
    results: ["100% tenant WiFi coverage", "Became top amenity in leasing surveys", "Recurring revenue stream created"],
    icon: Radio,
  },
];

const whySinbar = [
  { title: "Bronx & Outer Borough Focus", desc: "We serve the neighborhoods that Manhattan-focused MSPs ignore. Local presence means faster response times.", icon: MapPin },
  { title: "Wireless-First Specialization", desc: "No generalist IT shop. Every engineer on our team specializes exclusively in managed wireless.", icon: Wifi },
  { title: "Transparent Flat-Rate Pricing", desc: "Predictable monthly costs with no surprise bills. Know exactly what you're paying before you sign.", icon: BarChart3 },
  { title: "Proactive 24/7 Monitoring", desc: "We fix problems before you notice them. Our monitoring catches 94% of issues before they cause downtime.", icon: Zap },
  { title: "SLA-Backed Uptime Guarantee", desc: "99.9% uptime or we credit your account. We put our money where our mouth is.", icon: Shield },
  { title: "Community-Rooted Partnership", desc: "Bronx-based, Bronx-focused. We're invested in the success of our community's businesses.", icon: Users },
];

const certifications = [
  { name: "Microsoft Partner", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663427955080/j7TLVPMFE5nxAehtvQAsZ2/logo-microsoft_5ec99364.png", invert: true },
  { name: "Cisco Certified", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663427955080/j7TLVPMFE5nxAehtvQAsZ2/logo-cisco_31ceec82.png", invert: false },
  { name: "Ubiquiti Certified", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663427955080/j7TLVPMFE5nxAehtvQAsZ2/logo-ubiquiti_c934847a.png", invert: true },
  { name: "CompTIA Partner", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663427955080/j7TLVPMFE5nxAehtvQAsZ2/logo-comptia_5f97fe6b.png", invert: false },
  { name: "Fortinet NSE", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663427955080/j7TLVPMFE5nxAehtvQAsZ2/logo-fortinet_7dabf92f.png", invert: true },
  { name: "AWS Partner", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663427955080/j7TLVPMFE5nxAehtvQAsZ2/logo-aws-white_d5662536.png", invert: false },
  { name: "Ruckus Partner", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663427955080/j7TLVPMFE5nxAehtvQAsZ2/logo-ruckus_a0d99d64.png", invert: true, highlight: true },
];

const team = [
  {
    name: "Sinbar Team",
    title: "Wireless Network Engineers",
    credentials: "Ubiquiti Certified, CompTIA Network+",
    focus: "Our certified engineers design, deploy, and manage wireless networks across NYC. From site surveys to ongoing optimization, we handle every detail.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663427955080/j7TLVPMFE5nxAehtvQAsZ2/team-engineers-Y67qhDQsB9QsXBUdUJstbu.webp",
  },
  {
    name: "Support Team",
    title: "24/7 Help Desk & Field Technicians",
    credentials: "CompTIA A+, Microsoft Certified",
    focus: "Bronx-based technicians who know the borough. When you call, you reach a real person who can be on-site within hours \u2014 not days.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663427955080/j7TLVPMFE5nxAehtvQAsZ2/team-support-akKjFWtqeBqSMTwU4jYZ2K.webp",
  },
  {
    name: "Security Team",
    title: "Cybersecurity Specialists",
    credentials: "CompTIA Security+, Fortinet NSE",
    focus: "Dedicated wireless security experts who monitor your network around the clock, respond to threats in real time, and keep your business data safe.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663427955080/j7TLVPMFE5nxAehtvQAsZ2/team-security-94jbyCqrLHRbMUM3usbVpm.webp",
  },
];

/* Blog posts data mapped to slugs for linking */
const blogPostCards = blogPosts.map((post) => ({
  title: post.title,
  category: post.category,
  readTime: post.readTime,
  desc: post.desc,
  slug: post.slug,
}));

/* ------------------------------------------------------------------ */
/* Scroll-reveal hook                                                  */
/* ------------------------------------------------------------------ */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("sr-visible");
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".sr-hidden").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

/* ------------------------------------------------------------------ */
/* Social icons                                                        */
/* ------------------------------------------------------------------ */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Contact Form                                                        */
/* ------------------------------------------------------------------ */
const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
const SERVICE_OPTIONS = ["Managed WiFi","Dedicated Wireless Internet","Network Security","VoIP","IT Support","Other"];

function ContactForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", company: "", state: "", serviceInterest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    // Simple form submission - show success
    setSubmitted(true);
    toast.success("We'll be in touch within 24 hours!");
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `rgba(${GOLD_RGB},0.15)` }}>
          <Check className="w-8 h-8" style={{ color: GOLD }} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Request Received!</h3>
        <p className="text-gray-400">A Sinbar specialist will contact you within 24 hours to schedule your free site survey.</p>
      </div>
    );
  }

  const inputCls = "w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent";
  const labelCls = "block text-sm font-medium text-gray-300 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        <div>
          <label className={labelCls}>First Name *</label>
          <input type="text" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={inputCls} style={{ "--tw-ring-color": GOLD } as React.CSSProperties} placeholder="Marcus" />
        </div>
        <div>
          <label className={labelCls}>Last Name *</label>
          <input type="text" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={inputCls} style={{ "--tw-ring-color": GOLD } as React.CSSProperties} placeholder="Rivera" />
        </div>
      </div>
      <div className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        <div>
          <label className={labelCls}>Email Address *</label>
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} style={{ "--tw-ring-color": GOLD } as React.CSSProperties} placeholder="marcus@yourbusiness.com" />
        </div>
        <div>
          <label className={labelCls}>Phone Number <span className="text-gray-500 font-normal">(xxx) xxx-xxxx</span></label>
          <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} style={{ "--tw-ring-color": GOLD } as React.CSSProperties} placeholder="(347) 720-0367" />
        </div>
      </div>
      <div className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        <div>
          <label className={labelCls}>Business Name</label>
          <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputCls} style={{ "--tw-ring-color": GOLD } as React.CSSProperties} placeholder="Your Business LLC" />
        </div>
        <div>
          <label className={labelCls}>State</label>
          <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className={`${inputCls} bg-gray-900`} style={{ "--tw-ring-color": GOLD } as React.CSSProperties}>
            <option value="">Select state...</option>
            {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={labelCls}>Service Interest</label>
        <select value={form.serviceInterest} onChange={(e) => setForm({ ...form, serviceInterest: e.target.value })} className={`${inputCls} bg-gray-900`} style={{ "--tw-ring-color": GOLD } as React.CSSProperties}>
          <option value="">What are you looking for?</option>
          {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className={labelCls}>Message</label>
        <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputCls} h-24 resize-none`} style={{ "--tw-ring-color": GOLD } as React.CSSProperties} placeholder="Tell us about your business and what you need..." />
      </div>
      <button type="submit" className="w-full py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90" style={{ backgroundColor: GOLD, color: "#000" }}>
        Request Free Site Survey
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Coverage Map                                                        */
/* ------------------------------------------------------------------ */
const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2a2a3e" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

const boroughPolygons = [
  {
    name: "Bronx", color: GOLD, opacity: 0.35, strokeColor: GOLD,
    coords: [
      { lat: 40.917, lng: -73.907 }, { lat: 40.903, lng: -73.856 }, { lat: 40.882, lng: -73.826 },
      { lat: 40.868, lng: -73.825 }, { lat: 40.849, lng: -73.834 }, { lat: 40.827, lng: -73.85 },
      { lat: 40.816, lng: -73.862 }, { lat: 40.805, lng: -73.91 }, { lat: 40.797, lng: -73.933 },
      { lat: 40.828, lng: -73.934 }, { lat: 40.855, lng: -73.922 }, { lat: 40.878, lng: -73.912 },
      { lat: 40.895, lng: -73.908 },
    ],
  },
  {
    name: "Manhattan", color: "#888", opacity: 0.2, strokeColor: "#888",
    coords: [
      { lat: 40.879, lng: -73.927 }, { lat: 40.855, lng: -73.922 }, { lat: 40.828, lng: -73.934 },
      { lat: 40.796, lng: -73.958 }, { lat: 40.775, lng: -73.997 }, { lat: 40.751, lng: -74.008 },
      { lat: 40.728, lng: -74.013 }, { lat: 40.709, lng: -74.019 }, { lat: 40.7, lng: -74.02 },
      { lat: 40.719, lng: -73.971 }, { lat: 40.739, lng: -73.972 },
    ],
  },
  {
    name: "Queens", color: "#888", opacity: 0.2, strokeColor: "#888",
    coords: [
      { lat: 40.801, lng: -73.903 }, { lat: 40.792, lng: -73.868 }, { lat: 40.775, lng: -73.833 },
      { lat: 40.756, lng: -73.794 }, { lat: 40.739, lng: -73.763 }, { lat: 40.72, lng: -73.743 },
      { lat: 40.693, lng: -73.736 }, { lat: 40.668, lng: -73.739 }, { lat: 40.643, lng: -73.756 },
      { lat: 40.635, lng: -73.785 }, { lat: 40.643, lng: -73.835 }, { lat: 40.658, lng: -73.86 },
      { lat: 40.683, lng: -73.881 }, { lat: 40.71, lng: -73.896 }, { lat: 40.739, lng: -73.915 },
      { lat: 40.763, lng: -73.926 }, { lat: 40.783, lng: -73.92 },
    ],
  },
  {
    name: "Brooklyn", color: "#888", opacity: 0.2, strokeColor: "#888",
    coords: [
      { lat: 40.739, lng: -73.972 }, { lat: 40.71, lng: -73.972 }, { lat: 40.694, lng: -73.99 },
      { lat: 40.673, lng: -74.006 }, { lat: 40.644, lng: -74.038 }, { lat: 40.573, lng: -74.042 },
      { lat: 40.573, lng: -73.96 }, { lat: 40.583, lng: -73.883 }, { lat: 40.61, lng: -73.855 },
      { lat: 40.643, lng: -73.835 }, { lat: 40.658, lng: -73.86 }, { lat: 40.683, lng: -73.881 },
      { lat: 40.71, lng: -73.896 }, { lat: 40.739, lng: -73.915 }, { lat: 40.739, lng: -73.95 },
    ],
  },
  {
    name: "Staten Island", color: "#555", opacity: 0.15, strokeColor: "#555",
    coords: [
      { lat: 40.649, lng: -74.056 }, { lat: 40.64, lng: -74.077 }, { lat: 40.62, lng: -74.12 },
      { lat: 40.596, lng: -74.145 }, { lat: 40.566, lng: -74.198 }, { lat: 40.512, lng: -74.248 },
      { lat: 40.499, lng: -74.252 }, { lat: 40.496, lng: -74.228 }, { lat: 40.502, lng: -74.198 },
      { lat: 40.52, lng: -74.14 }, { lat: 40.55, lng: -74.07 }, { lat: 40.583, lng: -74.05 },
      { lat: 40.61, lng: -74.045 }, { lat: 40.635, lng: -74.043 },
    ],
  },
];

function CoverageMap() {
  const onMapReady = useCallback((map: google.maps.Map) => {
    map.setOptions({ styles: mapStyles, disableDefaultUI: true, zoomControl: true, gestureHandling: "cooperative" });
    boroughPolygons.forEach((borough) => {
      const polygon = new google.maps.Polygon({
        paths: borough.coords,
        strokeColor: borough.strokeColor,
        strokeOpacity: 0.9,
        strokeWeight: 2.5,
        fillColor: borough.color,
        fillOpacity: borough.opacity,
        map,
      });
      const infoWindow = new google.maps.InfoWindow();
      polygon.addListener("click", (e: google.maps.MapMouseEvent) => {
        const status = borough.name === "Bronx" ? "Primary Coverage" : borough.name === "Staten Island" ? "Available" : "Full Coverage";
        infoWindow.setContent(`<div style="background:#111;color:#fff;padding:12px 16px;border-radius:8px;font-family:Sora,sans-serif;min-width:160px;">
          <div style="font-weight:700;font-size:15px;margin-bottom:4px;">${borough.name}</div>
          <div style="color:${GOLD};font-size:12px;font-weight:600;">${status}</div>
          <div style="color:#888;font-size:11px;margin-top:4px;">Managed Wireless Internet</div>
        </div>`);
        infoWindow.setPosition(e.latLng);
        infoWindow.open(map);
      });
    });
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: 40.8554, lng: -73.8671 },
      title: "Sinbar Consultants HQ — 2040 White Plains Rd, Bronx",
    });
    const hqInfo = new google.maps.InfoWindow({
      content: `<div style="background:#111;color:#fff;padding:12px 16px;border-radius:8px;font-family:Sora,sans-serif;">
        <div style="font-weight:700;font-size:14px;color:${GOLD};margin-bottom:4px;">Sinbar Consultants HQ</div>
        <div style="color:#ccc;font-size:12px;">2040 White Plains Rd #1036</div>
        <div style="color:#ccc;font-size:12px;">Bronx, NY 10462</div>
        <div style="color:${GOLD};font-size:11px;margin-top:6px;font-weight:600;">(347) 720-0367</div>
      </div>`,
    });
    marker.addListener("click", () => hqInfo.open(map, marker));
  }, []);

  return <MapView className="w-full h-full rounded-xl" initialCenter={{ lat: 40.738, lng: -73.94 }} initialZoom={10} onMapReady={onMapReady} />;
}

/* ------------------------------------------------------------------ */
/* Main Component                                                      */
/* ------------------------------------------------------------------ */
export default function SinbarWebsite() {
  useScrollReveal();

  // SEO: Set document title (30-60 characters)
  useEffect(() => {
    document.title = "Sinbar Consultants | Managed WiFi & Wireless NYC";
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const [userCounts, setUserCounts] = useState({ essentials: 5, business: 10, enterprise: 25 });

  const adjustCount = (plan: string, delta: number) => {
    setUserCounts((prev) => {
      const min = plan === "enterprise" ? 25 : plan === "business" ? 10 : 5;
      const current = prev[plan as keyof typeof prev] || min;
      return { ...prev, [plan]: Math.max(min, current + delta) };
    });
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "Why Sinbar", href: "#why-sinbar" },
    { label: "Pricing", href: "#pricing" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Coverage", href: "#coverage" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-['Source_Sans_3',sans-serif]">
      {/* Scroll-reveal CSS */}
      <style>{`
        .sr-hidden { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .sr-visible { opacity: 1; transform: translateY(0); }
        .sr-delay-1 { transition-delay: 0.1s; }
        .sr-delay-2 { transition-delay: 0.2s; }
        .sr-delay-3 { transition-delay: 0.3s; }
        .sr-delay-4 { transition-delay: 0.4s; }
        .sr-delay-5 { transition-delay: 0.5s; }
        .sr-delay-6 { transition-delay: 0.6s; }
      `}</style>

      {/* ============ NAVBAR ============ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? "bg-black/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`} style={{ borderBottom: scrolled ? `1px solid rgba(${GOLD_RGB},0.08)` : "none" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#hero" className="flex items-center gap-2">
              <img src={LOGO} alt="Sinbar" className="h-8 w-8 object-contain" />
              <div className="font-['Sora'] font-bold text-white text-sm leading-tight">
                <div>Sinbar</div>
                <div className="text-[10px] font-normal text-gray-400">Consultants LLC</div>
              </div>
            </a>
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="text-sm text-gray-300 hover:text-white transition-colors font-['Source_Sans_3']">{item.label}</a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2">
                <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="Facebook"><FacebookIcon className="w-4 h-4" /></a>
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="Instagram"><InstagramIcon className="w-4 h-4" /></a>
                <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="LinkedIn"><LinkedInIcon className="w-4 h-4" /></a>
              </div>
              <a href="tel:+13477200367" className="hidden sm:flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" />(347) 720-0367
              </a>
              <button onClick={scrollToContact} className="px-4 py-2 text-sm font-semibold rounded-lg transition-all hover:opacity-90" style={{ backgroundColor: GOLD, color: "#000" }}>Free Site Survey</button>
              <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/5 py-4">
            <div className="max-w-7xl mx-auto px-4 space-y-2">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-300 hover:text-white">{item.label}</a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ============ HERO ============ */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={HERO_BG} alt="NYC Wireless Network" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.3) 100%)" }} />
        <div className="absolute inset-0 z-[2]" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.6) 100%)" }} />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
          <div className="max-w-3xl">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ color: GOLD, backgroundColor: `rgba(${GOLD_RGB},0.1)`, border: `1px solid rgba(${GOLD_RGB},0.2)` }}>
              NYC's Managed Wireless Internet Specialists
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-['Sora'] mt-6 mb-4 leading-[1.1]">
              Fast. Reliable.<br />
              <span style={{ color: GOLD }}>Wireless.</span><br />
              Managed for You.
            </h1>
            <p className="text-lg text-gray-400 mb-2">99.9% uptime guaranteed.</p>
            <p className="text-xl text-gray-300 mb-8 max-w-xl">
              Sinbar Consultants delivers enterprise-grade managed WiFi and wireless internet for Bronx and NYC businesses.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <button onClick={scrollToContact} className="px-8 py-3.5 rounded-lg font-bold text-sm transition-all hover:opacity-90 flex items-center gap-2" style={{ backgroundColor: GOLD, color: "#000" }}>
                Get Free Site Survey <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#pricing" className="px-8 py-3.5 rounded-lg font-bold text-sm border transition-all hover:bg-white/5 flex items-center gap-2" style={{ borderColor: `rgba(${GOLD_RGB},0.3)`, color: GOLD }}>
                View Plans <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-gray-500 mb-3">Certified & Partnered With:</p>
            <div className="flex flex-wrap items-center gap-2">
              {certifications.map((cert) => (
                <div key={cert.name} className="rounded-md px-2 py-1 flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.08)", ...(cert.highlight ? { border: `1px solid rgba(${GOLD_RGB},0.3)` } : {}) }} title={cert.name}>
                  <img src={cert.logo} alt={cert.name} className={`h-7 max-w-[80px] object-contain ${cert.invert ? "brightness-0 invert" : ""}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm" style={{ borderTop: `1px solid rgba(${GOLD_RGB},0.2)` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-800">
              {[
                { value: "99.9%", label: "Uptime SLA Guaranteed" },
                { value: "24/7", label: "Network Monitoring" },
                { value: "< 4hr", label: "Response Time" },
                { value: "50+", label: "NYC Businesses Served" },
              ].map((stat, i) => (
                <div key={i} className="py-4 px-6 text-center">
                  <div className="font-extrabold text-2xl font-['Sora']" style={{ color: STATS_GOLD, textShadow: `0 0 12px rgba(212,175,55,0.5)` }}>{stat.value}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section id="services" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img src={SERVICES_BG} alt="Sinbar Consultants wireless network services" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sr-hidden">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ color: GOLD, backgroundColor: `rgba(${GOLD_RGB},0.1)`, border: `1px solid rgba(${GOLD_RGB},0.2)` }}>WHAT WE DO</span>
            <h2 className="text-4xl font-extrabold font-['Sora'] text-white mt-4 mb-2">Managed Wireless Services</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Everything your business needs for reliable, secure wireless connectivity — managed end-to-end.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.filter((s) => s.priority === "primary").map((s, i) => (
              <div key={s.name} className={`sr-hidden sr-delay-${i + 1} rounded-2xl p-6 transition-all hover:scale-[1.02]`} style={{ backgroundColor: "#0d0d0d", border: `1px solid rgba(${GOLD_RGB},0.15)` }}>
                <s.icon className="w-8 h-8 mb-4" style={{ color: GOLD }} />
                <h3 className="text-lg font-bold text-white font-['Sora'] mb-2">{s.name}</h3>
                <p className="text-sm text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {services.filter((s) => s.priority !== "primary").map((s, i) => (
              <div key={s.name} className={`sr-hidden sr-delay-${i + 1} rounded-xl p-5 transition-all`} style={{ backgroundColor: "#0a0a0a", border: "1px solid rgba(255,255,255,0.05)" }}>
                <s.icon className="w-6 h-6 mb-3 text-gray-500" />
                <h4 className="text-sm font-bold text-white font-['Sora'] mb-1">{s.name}</h4>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY SINBAR ============ */}
      <section id="why-sinbar" className="py-24" style={{ background: `linear-gradient(180deg, rgba(${GOLD_RGB},0.03), transparent)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sr-hidden">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ color: GOLD, backgroundColor: `rgba(${GOLD_RGB},0.1)`, border: `1px solid rgba(${GOLD_RGB},0.2)` }}>WHY SINBAR</span>
            <h2 className="text-4xl font-extrabold font-['Sora'] text-white mt-4 mb-2">Why Bronx Businesses Choose Sinbar</h2>
            <p className="text-gray-500">Six reasons we're the right managed wireless partner for your business.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whySinbar.map((item, i) => (
              <div key={item.title} className={`sr-hidden sr-delay-${i + 1} rounded-2xl p-6`} style={{ backgroundColor: "#0d0d0d", border: `1px solid rgba(${GOLD_RGB},0.1)` }}>
                <item.icon className="w-8 h-8 mb-4" style={{ color: GOLD }} />
                <h3 className="text-lg font-bold text-white font-['Sora'] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="py-24" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sr-hidden">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ color: GOLD, backgroundColor: `rgba(${GOLD_RGB},0.1)`, border: `1px solid rgba(${GOLD_RGB},0.2)` }}>PRICING</span>
            <h2 className="text-4xl font-extrabold font-['Sora'] text-white mt-4 mb-2">Transparent Flat-Rate Plans</h2>
            <p className="text-gray-500">No hidden fees. No surprise bills. Just reliable managed wireless.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {plans.map((plan, i) => {
              const planKey = plan.name.toLowerCase() as keyof typeof userCounts;
              const count = userCounts[planKey] || 5;
              return (
                <div key={plan.name} className={`sr-hidden sr-delay-${i + 1} rounded-2xl p-6 flex flex-col relative`} style={{ backgroundColor: plan.highlight ? "#111" : "#0d0d0d", border: plan.highlight ? `2px solid ${GOLD}` : `1px solid rgba(${GOLD_RGB},0.15)` }}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: GOLD, color: "#000" }}>MOST POPULAR</div>
                  )}
                  <h3 className="text-xl font-bold text-white font-['Sora'] mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-extrabold text-white font-['Sora']">{plan.price}</span>
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">{plan.tagline}</p>
                  <div className="flex items-center gap-3 mb-4 p-2 rounded-lg bg-white/5">
                    <button onClick={() => adjustCount(planKey, -1)} className="w-7 h-7 rounded-md flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"><Minus className="w-3 h-3" /></button>
                    <span className="text-sm font-bold text-white flex-1 text-center">{count} users</span>
                    <button onClick={() => adjustCount(planKey, 1)} className="w-7 h-7 rounded-md flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"><Plus className="w-3 h-3" /></button>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />{f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={scrollToContact} className="w-full py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90" style={plan.highlight ? { backgroundColor: GOLD, color: "#000" } : { backgroundColor: "transparent", border: `1px solid rgba(${GOLD_RGB},0.3)`, color: GOLD }}>
                    {plan.cta}
                  </button>
                </div>
              );
            })}
          </div>

          {/* One-time services */}
          <div className="sr-hidden">
            <h3 className="text-2xl font-bold font-['Sora'] text-white text-center mb-8">Professional Services</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {oneTimeServices.map((svc, i) => (
              <div key={svc.id} className={`sr-hidden sr-delay-${i + 1} rounded-2xl p-6 flex flex-col`} style={{ backgroundColor: "#0d0d0d", border: `1px solid rgba(${GOLD_RGB},0.15)` }}>
                <h4 className="text-lg font-bold text-white font-['Sora'] mb-1">{svc.name}</h4>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-extrabold text-white font-['Sora']">{svc.price}</span>
                  <span className="text-sm text-gray-500">one-time</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{svc.desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />{f}
                    </li>
                  ))}
                </ul>
                <button onClick={scrollToContact} className="w-full py-3 rounded-lg font-bold text-sm transition-all border hover:bg-white/5" style={{ borderColor: `rgba(${GOLD_RGB},0.3)`, color: GOLD }}>
                  Request Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sr-hidden">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ color: GOLD, backgroundColor: `rgba(${GOLD_RGB},0.1)`, border: `1px solid rgba(${GOLD_RGB},0.2)` }}>TESTIMONIALS</span>
            <h2 className="text-4xl font-extrabold font-['Sora'] text-white mt-4 mb-2">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={review.name} className={`sr-hidden sr-delay-${i + 1} rounded-2xl p-6`} style={{ backgroundColor: "#0d0d0d", border: `1px solid rgba(${GOLD_RGB},0.1)` }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" style={{ color: GOLD }} />
                  ))}
                </div>
                <p className="text-sm text-gray-300 mb-4 leading-relaxed italic">"{review.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: `rgba(${GOLD_RGB},0.15)`, color: GOLD }}>
                    {review.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.title}</p>
                    <p className="text-xs text-gray-600">{review.location}</p>
                  </div>
                </div>
                <div className="mt-4 px-3 py-2 rounded-lg text-xs font-semibold" style={{ backgroundColor: `rgba(${GOLD_RGB},0.08)`, color: GOLD }}>
                  Result: {review.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CASE STUDIES ============ */}
      <section id="case-studies" className="py-24" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sr-hidden">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ color: GOLD, backgroundColor: `rgba(${GOLD_RGB},0.1)`, border: `1px solid rgba(${GOLD_RGB},0.2)` }}>CASE STUDIES</span>
            <h2 className="text-4xl font-extrabold font-['Sora'] text-white mt-4 mb-2">Real Results for Real Businesses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <div key={cs.client} className={`sr-hidden sr-delay-${i + 1} rounded-2xl p-6`} style={{ backgroundColor: "#0d0d0d", border: `1px solid rgba(${GOLD_RGB},0.1)` }}>
                <cs.icon className="w-8 h-8 mb-4" style={{ color: GOLD }} />
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: `rgba(${GOLD_RGB},0.1)`, color: GOLD }}>{cs.industry}</span>
                <h3 className="text-lg font-bold text-white font-['Sora'] mt-3 mb-2">{cs.client}</h3>
                <div className="mb-3">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Challenge</p>
                  <p className="text-sm text-gray-400">{cs.challenge}</p>
                </div>
                <div className="mb-3">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Solution</p>
                  <p className="text-sm text-gray-400">{cs.solution}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Results</p>
                  <ul className="space-y-1">
                    {cs.results.map((r) => (
                      <li key={r} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-3.5 h-3.5" style={{ color: GOLD }} />{r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TEAM ============ */}
      <section id="team" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sr-hidden">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ color: GOLD, backgroundColor: `rgba(${GOLD_RGB},0.1)`, border: `1px solid rgba(${GOLD_RGB},0.2)` }}>OUR TEAM</span>
            <h2 className="text-4xl font-extrabold font-['Sora'] text-white mt-4 mb-2">Bronx-Based Wireless Experts</h2>
            <p className="text-gray-500">Certified engineers and technicians who know NYC infrastructure inside and out.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div key={member.name} className={`sr-hidden sr-delay-${i + 1} rounded-2xl overflow-hidden`} style={{ backgroundColor: "#0d0d0d", border: `1px solid rgba(${GOLD_RGB},0.1)` }}>
                <div className="w-full h-56 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white font-['Sora'] mb-1">{member.name}</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: GOLD }}>{member.title}</p>
                  <p className="text-xs text-gray-500 mb-2">{member.credentials}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{member.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COVERAGE ============ */}
      <section id="coverage" className="py-24" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sr-hidden">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ color: GOLD, backgroundColor: `rgba(${GOLD_RGB},0.1)`, border: `1px solid rgba(${GOLD_RGB},0.2)` }}>SERVICE AREA</span>
            <h2 className="text-4xl font-extrabold font-['Sora'] text-white mt-4 mb-2">We Cover All 5 Boroughs</h2>
            <p className="text-gray-500">Bronx and outer boroughs</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-[400px] rounded-xl overflow-hidden sr-hidden">
              <CoverageMap />
            </div>
            <div className="space-y-4 sr-hidden sr-delay-1">
              {[
                { name: "Bronx", status: "Primary Coverage", statusColor: GOLD },
                { name: "Manhattan", status: "Full Coverage", statusColor: "#888" },
                { name: "Brooklyn", status: "Full Coverage", statusColor: "#888" },
                { name: "Queens", status: "Full Coverage", statusColor: "#888" },
                { name: "Staten Island", status: "Available", statusColor: "#555" },
              ].map((borough) => (
                <div key={borough.name} className="rounded-xl p-4 flex items-center justify-between" style={{ backgroundColor: "#0d0d0d", border: `1px solid rgba(${GOLD_RGB},0.1)` }}>
                  <span className="text-sm font-bold text-white">{borough.name}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: borough.statusColor, backgroundColor: `${borough.statusColor}15` }}>{borough.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ BLOG ============ */}
      <section id="blog" className="py-24" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12 sr-hidden">
            <div>
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ color: GOLD, backgroundColor: `rgba(${GOLD_RGB},0.1)`, border: `1px solid rgba(${GOLD_RGB},0.2)` }}>RESOURCES</span>
              <h2 className="text-4xl font-extrabold font-['Sora'] text-white mt-4 mb-2">Wireless IT Insights</h2>
              <p className="text-gray-500">Expert guidance for NYC business owners navigating managed wireless.</p>
            </div>
            <a href="#blog" className="hidden md:flex items-center gap-1 text-sm font-semibold hover:underline" style={{ color: GOLD }}>
              View All Articles <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPostCards.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={`sr-hidden sr-delay-${i + 1} group rounded-2xl overflow-hidden transition-all block`} style={{ backgroundColor: "#0d0d0d", border: `1px solid rgba(${GOLD_RGB},0.1)` }}>
                <div className="h-28 flex items-center justify-center p-4" style={{ background: `linear-gradient(135deg, rgba(${GOLD_RGB},0.2), rgba(184,134,11,0.1))` }}>
                  <BarChart3 className="w-10 h-10 opacity-60" style={{ color: GOLD }} />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: `rgba(${GOLD_RGB},0.1)`, color: GOLD }}>{post.category}</span>
                    <span className="text-xs text-gray-600">{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-white font-['Sora'] text-sm leading-snug mb-2 group-hover:opacity-80 transition-colors">{post.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{post.desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: GOLD }}>
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="py-24 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #000000, #0d0d0d, #000000)" }}>
        <div className="absolute inset-0 opacity-5">
          <img src={ABOUT_BG} alt="Sinbar Consultants team and office" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="sr-hidden">
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ color: GOLD, backgroundColor: `rgba(${GOLD_RGB},0.1)`, border: `1px solid rgba(${GOLD_RGB},0.2)` }}>FREE SITE SURVEY</span>
              <h2 className="text-4xl font-extrabold font-['Sora'] text-white mt-4 mb-4">
                Ready for Wireless<br /><span style={{ color: GOLD }}>That Just Works?</span>
              </h2>
              <p className="text-gray-400 mb-8">
                Get a free, no-obligation site survey from a Sinbar wireless engineer. We'll assess your current setup, identify gaps, and give you a clear plan and pricing — with no pressure.
              </p>
              <p className="text-sm text-gray-500 mb-4">Or reach us directly:</p>
              <div className="space-y-3">
                <a href="tel:+13477200367" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" style={{ color: GOLD }} />(347) 720-0367
                </a>
                <a href="mailto:info@sinbarconsultants.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" style={{ color: GOLD }} />info@sinbarconsultants.com
                </a>
              </div>
            </div>
            <div ref={contactRef} className="sr-hidden sr-delay-1 rounded-2xl p-8" style={{ backgroundColor: "rgba(13,13,13,0.9)", border: `1px solid rgba(${GOLD_RGB},0.15)` }}>
              <h3 className="text-xl font-bold font-['Sora'] text-white mb-2">Request Your Free Site Survey</h3>
              <p className="text-sm text-gray-500 mb-6">Fill out the form and we'll be in touch within 24 hours.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="py-12 border-t" style={{ backgroundColor: "#000", borderColor: `rgba(${GOLD_RGB},0.1)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src={LOGO} alt="Sinbar" className="h-8 w-8 object-contain" />
                <div className="font-['Sora'] font-bold text-white text-sm leading-tight">
                  <div>Sinbar</div>
                  <div className="text-[10px] font-normal text-gray-400">Consultants LLC</div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4 max-w-sm">NYC's managed wireless internet specialists. Bronx Born. Business Proven.</p>
              <div className="flex items-center gap-3">
                <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="Facebook"><FacebookIcon className="w-4 h-4" /></a>
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="Instagram"><InstagramIcon className="w-4 h-4" /></a>
                <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="LinkedIn"><LinkedInIcon className="w-4 h-4" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-gray-500">
                <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />2040 White Plains Rd #1036, Bronx, NY 10462</p>
                <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" />(347) 720-0367</p>
                <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" />info@sinbarconsultants.com</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm">
                {navItems.map((item) => (
                  <a key={item.label} href={item.href} className="block text-gray-500 hover:text-white transition-colors">{item.label}</a>
                ))}
                <Link href="/legal" className="block text-gray-500 hover:text-white transition-colors">Legal</Link>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">&copy; 2026 Sinbar Consultants LLC. All rights reserved. | Bronx, New York</p>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <Link href="/legal" className="hover:text-gray-400 transition-colors">Legal</Link>
              <Link href="/legal" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
              <Link href="/legal" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
