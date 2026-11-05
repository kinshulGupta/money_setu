import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  full_name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{8,18}$/, "Enter a valid phone number"),
  persona: z.enum(["msme", "salaried", "startup", "professional", "nri"]),
  service: z.string().trim().min(2).max(120),
  amount: z.number().min(0).max(5000000000).nullable().optional(),
  message: z.string().trim().max(1200).optional().default(""),
  consent: z.literal(true),
  source: z.string().trim().max(40).optional().default("website"),
});

/**
 * Public intake endpoint. Bound and validated server-side; the visitor never
 * needs an account to raise an enquiry, and leads stay visible to the desk only.
 */
export const createLead = createServerFn({ method: "POST" })
  .validator(leadSchema)
  .handler(async ({ data, context }) => {
    const reference = `MS-${crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;
    const lead = await context.getBase44().asServiceRole.entities.Lead.create({
      ...data,
      reference,
      status: "new",
    });
    return { id: lead.id, reference: lead.reference };
  });