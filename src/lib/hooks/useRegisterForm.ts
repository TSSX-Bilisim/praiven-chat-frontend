import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validation/auth";
import { register as registerApi } from "@/lib/api/auth";
import { useNavigate } from "react-router";
import { z } from "zod";

export function useRegisterForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async (data) => {
    setIsLoading(true);
    try {
      const res = await registerApi(data);

      if (!res.success) {
        form.setError("password", { message: res.message });
        return;
      }

      // TODO: Success dialog veya toast ekleyebilirsin
      navigate("/chat"); // veya login sayfasına yönlendir
    } catch (error) {
      form.setError("password", {
        message: "An unexpected error occurred. Please try again.",
      });
      console.error("Register error:", error);
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
