import type Stripe from "stripe";
import { getStripe } from "./client";
import { getPlanById, getServiceById } from "./products";

interface CreatePlanCheckoutParams {
  planId: string;
  quantity: number;
  customerEmail?: string;
  customerName?: string;
  userId?: string;
  origin: string;
}

interface CreateServiceCheckoutParams {
  serviceId: string;
  customerEmail?: string;
  customerName?: string;
  userId?: string;
  origin: string;
}

export async function createPlanCheckout(params: CreatePlanCheckoutParams): Promise<string> {
  const stripe = getStripe();
  const plan = getPlanById(params.planId);
  if (!plan) {
    throw new Error(`Plan not found: ${params.planId}`);
  }

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: "subscription",
    payment_method_types: ["card"],
    allow_promotion_codes: true,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: plan.name,
            description: plan.description,
          },
          unit_amount: plan.pricePerUnit,
          recurring: {
            interval: plan.interval,
          },
        },
        quantity: params.quantity,
      },
    ],
    success_url: `${params.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${params.origin}/checkout/cancel`,
    metadata: {
      plan_id: params.planId,
      quantity: params.quantity.toString(),
      user_id: params.userId || "",
      customer_name: params.customerName || "",
      customer_email: params.customerEmail || "",
    },
  };

  if (params.customerEmail) {
    sessionParams.customer_email = params.customerEmail;
  }
  if (params.userId) {
    sessionParams.client_reference_id = params.userId;
  }

  const session = await stripe.checkout.sessions.create(sessionParams);
  if (!session.url) {
    throw new Error("Failed to create checkout session URL");
  }
  return session.url;
}

export async function createServiceCheckout(params: CreateServiceCheckoutParams): Promise<string> {
  const stripe = getStripe();
  const service = getServiceById(params.serviceId);
  if (!service) {
    throw new Error(`Service not found: ${params.serviceId}`);
  }

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: "payment",
    payment_method_types: ["card"],
    allow_promotion_codes: true,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: service.name,
            description: service.description,
          },
          unit_amount: service.price,
        },
        quantity: 1,
      },
    ],
    success_url: `${params.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${params.origin}/checkout/cancel`,
    metadata: {
      service_id: params.serviceId,
      user_id: params.userId || "",
      customer_name: params.customerName || "",
      customer_email: params.customerEmail || "",
    },
  };

  if (params.customerEmail) {
    sessionParams.customer_email = params.customerEmail;
  }
  if (params.userId) {
    sessionParams.client_reference_id = params.userId;
  }

  const session = await stripe.checkout.sessions.create(sessionParams);
  if (!session.url) {
    throw new Error("Failed to create checkout session URL");
  }
  return session.url;
}
