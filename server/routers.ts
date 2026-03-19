import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createPlanCheckout, createServiceCheckout } from "./stripe/checkout";
import { PLANS, SERVICES } from "./stripe/products";

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

  checkout: router({
    /** Create a Stripe Checkout Session for a monthly plan */
    createPlanSession: publicProcedure
      .input(
        z.object({
          planId: z.enum(["essentials", "business", "enterprise"]),
          quantity: z.number().min(1).max(200),
          origin: z.string().url(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const url = await createPlanCheckout({
          planId: input.planId,
          quantity: input.quantity,
          customerEmail: ctx.user?.email || undefined,
          customerName: ctx.user?.name || undefined,
          userId: ctx.user?.id?.toString(),
          origin: input.origin,
        });
        return { url };
      }),

    /** Create a Stripe Checkout Session for a one-time professional service */
    createServiceSession: publicProcedure
      .input(
        z.object({
          serviceId: z.enum(["site-survey", "network-audit", "wifi-installation"]),
          origin: z.string().url(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const url = await createServiceCheckout({
          serviceId: input.serviceId,
          customerEmail: ctx.user?.email || undefined,
          customerName: ctx.user?.name || undefined,
          userId: ctx.user?.id?.toString(),
          origin: input.origin,
        });
        return { url };
      }),

    /** Get available plans (for frontend reference) */
    getPlans: publicProcedure.query(() => {
      return PLANS.map((p) => ({
        id: p.id,
        name: p.name,
        pricePerUnit: p.pricePerUnit,
      }));
    }),

    /** Get available services (for frontend reference) */
    getServices: publicProcedure.query(() => {
      return SERVICES.map((s) => ({
        id: s.id,
        name: s.name,
        price: s.price,
      }));
    }),
  }),
});

export type AppRouter = typeof appRouter;
