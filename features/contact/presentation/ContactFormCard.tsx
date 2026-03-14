"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { ContactSidebar } from "./components/ContactSidebar";
import { ContactField } from "./components/ContactField";
import { ContactFormData } from "../domain/contact.schema";
import { useContactForm } from "../application/useContactForm";

export function ContactFormCard() {
  const { submit, status, errors, isLoading, isSuccess } = useContactForm();
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (field: keyof ContactFormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(form);
  };

  return (
    <div className="relative rounded-xl border border-gold/20 bg-cream shadow-[0_0_40px_rgba(212,175,55,0.08)] overflow-hidden">
      {/* Corner decorations */}
      <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold/60 rounded-tl-sm" />
      <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold/60 rounded-br-sm" />

      <div className="grid md:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="bg-cream/80 border-r border-deep-violet/10 p-8">
          <ContactSidebar />
        </aside>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4">
          {isSuccess ? (
            <SuccessMessage />
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <ContactField
                  id="contact-name"
                  label="Votre nom"
                  placeholder="Ex : Thalindra"
                  value={form.name}
                  onChange={handleChange("name")}
                  error={errors.name}
                />
                <ContactField
                  id="contact-email"
                  label="Adresse email"
                  placeholder="votre@email.fr"
                  value={form.email}
                  onChange={handleChange("email")}
                  error={errors.email}
                />
              </div>
              <ContactField
                id="contact-subject"
                label="Objet"
                placeholder="Ex : Proposition de partenariat"
                value={form.subject}
                onChange={handleChange("subject")}
                error={errors.subject}
              />
              <ContactField
                id="contact-message"
                label="Message"
                type="textarea"
                placeholder="Écrivez votre message ici..."
                value={form.message}
                onChange={handleChange("message")}
                error={errors.message}
                maxLength={2000}
              />
              {status === "error" && !Object.keys(errors).length && (
                <p className="text-red-500 text-sm text-center">
                  Une erreur est survenue. Veuillez réessayer.
                </p>
              )}
              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gold hover:bg-gold-hover text-deep-violet font-cinzel tracking-widest uppercase text-sm px-8 transition-all hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isLoading ? "Envoi…" : "Envoyer"}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

function SuccessMessage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <CheckCircle2 className="w-14 h-14 text-gold" />
      <h2 className="font-cinzel text-xl text-deep-violet font-bold uppercase tracking-wide">
        Message envoyé !
      </h2>
      <p className="text-deep-violet/70 text-sm max-w-xs leading-relaxed">
        Merci pour votre message. Nous vous répondrons dans les plus brefs
        délais.
      </p>
    </div>
  );
}
