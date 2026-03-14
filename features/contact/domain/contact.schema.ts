import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "L'adresse email n'est pas valide." }),
  subject: z.string().min(3, { message: "L'objet doit contenir au moins 3 caractères." }),
  message: z
    .string()
    .min(10, { message: "Le message doit contenir au moins 10 caractères." })
    .max(2000, { message: "Le message ne peut pas dépasser 2000 caractères." }),
});

export type ContactFormData = z.infer<typeof ContactSchema>;

export type ContactStatus = "idle" | "loading" | "success" | "error";
