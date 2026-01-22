import { useState } from "react";
import { SubscriptionData, SubscriptionSchema, SubscriptionStatus } from "../domain/subscription.schema";

export function useNewsletterSubscription() {
  const [status, setStatus] = useState<SubscriptionStatus>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof SubscriptionData, string>>>({});

  const subscribe = async (data: unknown) => {
    setStatus("loading");
    setErrors({});

    const result = SubscriptionSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SubscriptionData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof SubscriptionData] = err.message;
        }
      });
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
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
    subscribe,
    status,
    errors,
    reset,
    isSuccess: status === "success",
    isLoading: status === "loading",
  };
}
