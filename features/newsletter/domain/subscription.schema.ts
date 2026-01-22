import { z } from "zod";

export const SubscriptionSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
});

export type SubscriptionData = z.infer<typeof SubscriptionSchema>;

export type SubscriptionStatus = "idle" | "loading" | "success" | "error";
