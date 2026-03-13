"use client";

import { useState } from "react";
import {
  ContactSchema,
  ContactFormData,
  ContactStatus,
} from "../domain/contact.schema";

export function useContactForm() {
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});

  const submit = async (data: unknown) => {
    setStatus("loading");
    setErrors({});

    const result = ContactSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setErrors({});
  };

  return {
    submit,
    status,
    errors,
    reset,
    isSuccess: status === "success",
    isLoading: status === "loading",
    isError: status === "error",
  };
}
