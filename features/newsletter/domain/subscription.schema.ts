import { z } from "zod";

export const ACQUISITION_CHANNELS = [
  "Discord",
  "Instagram",
  "Convention",
  "Amis",
  "Forum BBE",
  "GameOn",
  "Recherche Google",
  "Vidéo",
  "Autre",
] as const;

export type AcquisitionChannel = (typeof ACQUISITION_CHANNELS)[number];

export const SubscriptionSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  acquisitionChannel: z.enum(ACQUISITION_CHANNELS, {
    error: "Veuillez sélectionner une option",
  }),
  acquisitionChannelOther: z.string().optional(),
}).refine(
  (data) => data.acquisitionChannel !== "Autre" || (data.acquisitionChannelOther && data.acquisitionChannelOther.trim().length > 0),
  { message: "Veuillez préciser comment tu nous as trouvés", path: ["acquisitionChannelOther"] }
);

export type SubscriptionData = z.infer<typeof SubscriptionSchema>;

export type SubscriptionStatus = "idle" | "loading" | "success" | "error";
