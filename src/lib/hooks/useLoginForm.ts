import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation/auth";
import { login } from "@/lib/api/auth";
import { useNavigate } from "react-router";
import { z } from "zod";

export function useLoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (data) => {
    setIsLoading(true);
    try {
      const res = await login(data);

      if (!res.success) {
        form.setError("password", { message: res.message });
        return;
      }
      navigate("/chat");
    } catch (error) {
      form.setError("password", {
        message: "An unexpected error occurred. Please try again.",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
}
