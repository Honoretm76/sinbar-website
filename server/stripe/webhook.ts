import type { Express, Request, Response } from "express";
import express from "express";
import { getStripe } from "./client";
import { saveOrder } from "../db";

export function registerStripeWebhook(app: Express) {
  // IMPORTANT: Must use express.raw() for webhook signature verification
  // This route must be registered BEFORE express.json() middleware
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req: Request, res: Response) => {
      const stripe = getStripe();
      const sig = req.headers["stripe-signature"];
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!sig || !webhookSecret) {
        console.error("[Webhook] Missing signature or webhook secret");
        return res.status(400).json({ error: "Missing signature or webhook secret" });
      }

      let event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err: any) {
        console.error("[Webhook] Signature verification failed:", err.message);
        return res.status(400).json({ error: `Webhook Error: ${err.message}` });
      }

      // Handle test events for webhook verification
      if (event.id.startsWith("evt_test_")) {
        console.log("[Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      console.log(`[Webhook] Received event: ${event.type} (${event.id})`);

      try {
        switch (event.type) {
          case "checkout.session.completed": {
            const session = event.data.object as any;
            console.log(`[Webhook] Checkout completed: ${session.id}`);

            const metadata = session.metadata || {};
            const isSubscription = session.mode === "subscription";

            await saveOrder({
              stripeSessionId: session.id,
              stripeCustomerId: session.customer as string || null,
              stripeSubscriptionId: isSubscription ? (session.subscription as string || null) : null,
              stripePaymentIntentId: !isSubscription ? (session.payment_intent as string || null) : null,
              userId: metadata.user_id || null,
              customerEmail: session.customer_email || metadata.customer_email || null,
              customerName: metadata.customer_name || null,
              planId: metadata.plan_id || null,
              serviceId: metadata.service_id || null,
              quantity: metadata.quantity ? parseInt(metadata.quantity) : 1,
              amountTotal: session.amount_total || 0,
              currency: session.currency || "usd",
              status: "completed",
              mode: session.mode || "payment",
            });
            break;
          }

          case "customer.subscription.updated": {
            const subscription = event.data.object as any;
            console.log(`[Webhook] Subscription updated: ${subscription.id}, status: ${subscription.status}`);
            break;
          }

          case "customer.subscription.deleted": {
            const subscription = event.data.object as any;
            console.log(`[Webhook] Subscription cancelled: ${subscription.id}`);
            break;
          }

          case "invoice.paid": {
            const invoice = event.data.object as any;
            console.log(`[Webhook] Invoice paid: ${invoice.id}`);
            break;
          }

          default:
            console.log(`[Webhook] Unhandled event type: ${event.type}`);
        }
      } catch (err: any) {
        console.error(`[Webhook] Error processing ${event.type}:`, err.message);
      }

      return res.json({ received: true });
    }
  );
}
