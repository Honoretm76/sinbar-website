import SEOHead from "@/components/SEOHead";
import {
  type BlogPost as BlogPostType,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blogPosts";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Calendar,
  Clock,
  Lightbulb,
  Phone,
  Tag,
  User,
  MessageCircle,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";

const BRAND_GOLD = "#C9A84C";
const BRAND_GOLD_RGB = "201,168,76";

/* ------------------------------------------------------------------ */
/* Shared tiny components                                              */
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

function SinbarLogo() {
  return (
    <img
      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663427955080/ZxXCJe99gzkbKiEMDdcDKE/sinbar-3d-logo-black-bg_270317ec.png"
      alt="Sinbar Consultants LLC"
      className="h-8 w-8 object-contain"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Navigation bar (matches existing site)                              */
/* ------------------------------------------------------------------ */

function BlogNavbar() {
  const navItems = [
    { label: "Services", href: "/#services" },
    { label: "Why Sinbar", href: "/#why-sinbar" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Case Studies", href: "/#case-studies" },
    { label: "Coverage", href: "/#coverage" },
    { label: "Blog", href: "/#blog" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <SinbarLogo />
            <div className="font-['Sora'] font-bold text-white text-sm leading-tight">
              <div>Sinbar</div>
              <div className="text-[10px] font-normal text-gray-400">
                Consultants LLC
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-gray-300 hover:text-white transition-colors font-['Source_Sans_3']"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://www.facebook.com/profile.php?id=100093758477588"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Follow Sinbar on Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/sinbarconsultantsllc/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Follow Sinbar on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/sinbarconsultants-llc-6603672a9/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Follow Sinbar on LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>
            <a
              href="tel:+13477200367"
              className="hidden sm:flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              (347) 720-0367
            </a>
            <a
              href="/#contact"
              className="px-4 py-2 text-sm font-semibold rounded-lg transition-all"
              style={{
                backgroundColor: BRAND_GOLD,
                color: "#000",
              }}
            >
              Free Site Survey
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Callout box                                                         */
/* ------------------------------------------------------------------ */

function CalloutBox({
  type,
  text,
}: {
  type: "stat" | "tip" | "warning";
  text: string;
}) {
  const config = {
    stat: {
      icon: BarChart3,
      bg: `rgba(${BRAND_GOLD_RGB}, 0.08)`,
      border: `rgba(${BRAND_GOLD_RGB}, 0.25)`,
      iconColor: BRAND_GOLD,
      label: "Key Statistic",
    },
    tip: {
      icon: Lightbulb,
      bg: "rgba(34, 197, 94, 0.08)",
      border: "rgba(34, 197, 94, 0.25)",
      iconColor: "#22c55e",
      label: "Pro Tip",
    },
    warning: {
      icon: AlertTriangle,
      bg: "rgba(239, 68, 68, 0.08)",
      border: "rgba(239, 68, 68, 0.25)",
      iconColor: "#ef4444",
      label: "Important",
    },
  };

  const c = config[type];
  const Icon = c.icon;

  return (
    <div
      className="rounded-xl p-5 my-6"
      style={{
        backgroundColor: c.bg,
        border: `1px solid ${c.border}`,
      }}
    >
      <div className="flex items-start gap-3">
        <Icon
          className="w-5 h-5 mt-0.5 shrink-0"
          style={{ color: c.iconColor }}
        />
        <div>
          <span
            className="text-xs font-semibold uppercase tracking-wider block mb-1"
            style={{ color: c.iconColor }}
          >
            {c.label}
          </span>
          <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Related post card                                                   */
/* ------------------------------------------------------------------ */

function RelatedPostCard({ post }: { post: BlogPostType }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl overflow-hidden transition-all"
      style={{
        backgroundColor: "#0d0d0d",
        border: `1px solid rgba(${BRAND_GOLD_RGB}, 0.1)`,
      }}
    >
      <div
        className="h-20 flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, rgba(${BRAND_GOLD_RGB}, 0.2), rgba(184,134,11,0.1))`,
        }}
      >
        <BarChart3 className="w-8 h-8 opacity-60" style={{ color: BRAND_GOLD }} />
      </div>
      <div className="p-4">
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold inline-block mb-2"
          style={{
            backgroundColor: `rgba(${BRAND_GOLD_RGB}, 0.1)`,
            color: BRAND_GOLD,
          }}
        >
          {post.category}
        </span>
        <h4 className="font-bold text-white font-['Sora'] text-sm leading-snug group-hover:opacity-80 transition-colors">
          {post.title}
        </h4>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Footer (matches existing site)                                      */
/* ------------------------------------------------------------------ */

function BlogFooter() {
  return (
    <footer
      className="py-12 border-t"
      style={{
        backgroundColor: "#000",
        borderColor: `rgba(${BRAND_GOLD_RGB}, 0.1)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <SinbarLogo />
            <div className="font-['Sora'] font-bold text-white text-sm leading-tight">
              <div>Sinbar</div>
              <div className="text-[10px] font-normal text-gray-400">
                Consultants LLC
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=100093758477588"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/sinbarconsultantsllc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/sinbarconsultants-llc-6603672a9/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-gray-600">
            &copy; 2026 Sinbar Consultants LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Main BlogPost page                                                  */
/* ------------------------------------------------------------------ */

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const post = getBlogPostBySlug(params.slug ?? "");
  const relatedPosts = post ? getRelatedPosts(post) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  useEffect(() => {
    if (!post) {
      setLocation("/404");
    }
  }, [post, setLocation]);

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white font-['Source_Sans_3',sans-serif]">
      <SEOHead
        title={post.title}
        description={post.desc}
        url={`https://sinbarconsultants.com/blog/${post.slug}`}
        type="article"
        author={post.author}
        publishedDate={post.date}
        category={post.category}
      />

      <BlogNavbar />

      {/* Hero / Article Header */}
      <header
        className="pt-28 pb-12 relative"
        style={{
          background:
            "linear-gradient(180deg, rgba(201,168,76,0.06) 0%, transparent 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/#blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium mb-8 transition-colors hover:opacity-80"
            style={{ color: BRAND_GOLD }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Wireless IT Insights
          </Link>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{
                backgroundColor: `rgba(${BRAND_GOLD_RGB}, 0.12)`,
                color: BRAND_GOLD,
              }}
            >
              <Tag className="w-3 h-3 inline mr-1 -mt-0.5" />
              {post.category}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-['Sora'] leading-tight mb-6">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-400 leading-relaxed mb-6">
            {post.desc}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: `rgba(${BRAND_GOLD_RGB}, 0.15)`,
              }}
            >
              <User className="w-5 h-5" style={{ color: BRAND_GOLD }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{post.author}</p>
              <p className="text-xs text-gray-500">{post.authorRole}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <article className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.sections.map((section, idx) => (
            <div key={idx} className={section.heading ? "mt-10" : "mt-4"}>
              {section.heading && (
                <h2
                  className="text-xl sm:text-2xl font-bold font-['Sora'] mb-4"
                  style={{ color: "#fff" }}
                >
                  {section.heading}
                </h2>
              )}

              {section.content && (
                <p className="text-base text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              )}

              {section.listItems && (
                <ul className="mt-4 space-y-3">
                  {section.listItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: BRAND_GOLD }}
                      />
                      <span className="text-sm text-gray-400 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {section.callout && (
                <CalloutBox
                  type={section.callout.type}
                  text={section.callout.text}
                />
              )}
            </div>
          ))}
        </div>
      </article>

      {/* CTA Section */}
      <section
        className="py-16"
        style={{
          background: `linear-gradient(135deg, rgba(${BRAND_GOLD_RGB}, 0.08), transparent)`,
          borderTop: `1px solid rgba(${BRAND_GOLD_RGB}, 0.15)`,
          borderBottom: `1px solid rgba(${BRAND_GOLD_RGB}, 0.15)`,
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold font-['Sora'] mb-4">
            Ready for Wireless That Just Works?
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Get a free, no-obligation site survey from a Sinbar wireless
            engineer. We'll assess your current setup, identify gaps, and give
            you a clear plan and pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: BRAND_GOLD, color: "#000" }}
            >
              Get Free Site Survey
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+13477200367"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border transition-all hover:bg-white/5"
              style={{ borderColor: `rgba(${BRAND_GOLD_RGB}, 0.3)`, color: BRAND_GOLD }}
            >
              <Phone className="w-4 h-4" />
              (347) 720-0367
            </a>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16" style={{ backgroundColor: "#0a0a0a" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-bold font-['Sora'] mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rp) => (
                <RelatedPostCard key={rp.slug} post={rp} />
              ))}
            </div>
          </div>
        </section>
      )}

      <BlogFooter />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/13472017076"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
        style={{
          backgroundColor: "#25D366",
          color: "white",
          boxShadow: "0 10px 25px -5px rgba(37, 211, 102, 0.4)"
        }}
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="font-bold text-sm">Chat with us</span>
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500" />
      </a>
    </div>
  );
}
