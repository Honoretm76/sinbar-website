import { describe, expect, it } from "vitest";
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "./blogPosts";

describe("blogPosts data", () => {
  it("contains exactly 4 blog posts", () => {
    expect(blogPosts).toHaveLength(4);
  });

  it("each post has all required fields", () => {
    const requiredFields = [
      "slug",
      "title",
      "category",
      "date",
      "readTime",
      "desc",
      "author",
      "authorRole",
      "sections",
      "relatedSlugs",
    ];

    for (const post of blogPosts) {
      for (const field of requiredFields) {
        expect(post).toHaveProperty(field);
        expect((post as Record<string, unknown>)[field]).toBeDefined();
      }
    }
  });

  it("each post has a unique slug", () => {
    const slugs = blogPosts.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("each post has at least one section", () => {
    for (const post of blogPosts) {
      expect(post.sections.length).toBeGreaterThan(0);
    }
  });

  it("each section has content", () => {
    for (const post of blogPosts) {
      for (const section of post.sections) {
        expect(typeof section.content).toBe("string");
      }
    }
  });

  it("callout types are valid", () => {
    const validTypes = ["stat", "tip", "warning"];
    for (const post of blogPosts) {
      for (const section of post.sections) {
        if (section.callout) {
          expect(validTypes).toContain(section.callout.type);
          expect(section.callout.text).toBeTruthy();
        }
      }
    }
  });

  it("has the expected blog post slugs", () => {
    const slugs = blogPosts.map((p) => p.slug);
    expect(slugs).toContain("why-nyc-businesses-ditching-fiber-for-fixed-wireless");
    expect(slugs).toContain("true-cost-wifi-downtime-small-businesses");
    expect(slugs).toContain("hipaa-compliant-wireless-networks-nyc-healthcare");
    expect(slugs).toContain("managed-wifi-vs-diy-right-for-your-business");
  });
});

describe("getBlogPostBySlug", () => {
  it("returns the correct post for a valid slug", () => {
    const post = getBlogPostBySlug("why-nyc-businesses-ditching-fiber-for-fixed-wireless");
    expect(post).toBeDefined();
    expect(post!.title).toBe("Why NYC Businesses Are Ditching Fiber for Fixed Wireless");
  });

  it("returns undefined for an invalid slug", () => {
    const post = getBlogPostBySlug("nonexistent-slug");
    expect(post).toBeUndefined();
  });

  it("returns undefined for an empty string", () => {
    const post = getBlogPostBySlug("");
    expect(post).toBeUndefined();
  });

  it("returns the HIPAA post correctly", () => {
    const post = getBlogPostBySlug("hipaa-compliant-wireless-networks-nyc-healthcare");
    expect(post).toBeDefined();
    expect(post!.category).toBe("Healthcare IT");
    expect(post!.readTime).toBe("7 min read");
  });

  it("returns the managed wifi vs diy post correctly", () => {
    const post = getBlogPostBySlug("managed-wifi-vs-diy-right-for-your-business");
    expect(post).toBeDefined();
    expect(post!.category).toBe("Guides");
  });
});

describe("getRelatedPosts", () => {
  it("returns related posts based on relatedSlugs", () => {
    const post = getBlogPostBySlug("why-nyc-businesses-ditching-fiber-for-fixed-wireless")!;
    const related = getRelatedPosts(post);
    expect(related.length).toBeGreaterThan(0);
    expect(related.length).toBe(post.relatedSlugs.length);
  });

  it("returns posts that match the relatedSlugs", () => {
    const post = getBlogPostBySlug("why-nyc-businesses-ditching-fiber-for-fixed-wireless")!;
    const related = getRelatedPosts(post);
    const relatedSlugs = related.map((p) => p.slug);
    for (const slug of post.relatedSlugs) {
      expect(relatedSlugs).toContain(slug);
    }
  });

  it("does not include the original post in related posts", () => {
    for (const post of blogPosts) {
      const related = getRelatedPosts(post);
      const relatedSlugs = related.map((p) => p.slug);
      expect(relatedSlugs).not.toContain(post.slug);
    }
  });

  it("handles posts with no valid related slugs gracefully", () => {
    const fakePost = {
      ...blogPosts[0],
      relatedSlugs: ["nonexistent-1", "nonexistent-2"],
    };
    const related = getRelatedPosts(fakePost);
    expect(related).toHaveLength(0);
  });
});
