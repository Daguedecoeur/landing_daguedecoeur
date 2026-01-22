import { useState } from "react";
import { SubscriptionData, SubscriptionSchema, SubscriptionStatus } from "../domain/subscription.schema";

export function useNewsletterSubscription() {
  const [status, setStatus] = useState<SubscriptionStatus>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof SubscriptionData, string>>>({});

  const subscribe = async (data: unknown) => {
    setStatus("loading");
    setErrors({});

    // 1. Validation Logic (Domain Layer)
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

    // 2. Business Logic (Simulation of API call)
    // In a real app, this would call a Repository interface (Adapter Layer)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network request
      setStatus("success");
    } catch (e) {
      setStatus("error");
      // Could set a global error here
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
