import { AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Flex } from "@radix-ui/themes";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLoginForm } from "@/lib/hooks/useLoginForm";
import { Loader } from "@/components/ai-elements/loader";

const fields = [
  {
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "current-password",
  },
];

export const LoginForm = () => {
    const { form, isLoading, onSubmit } = useLoginForm();
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full" noValidate>
                <Flex direction={"column"} gap="4">
                    <Flex direction={"column"} gap="4">
                        {fields.map((fieldDef) => (
                        <FormField
                            key={fieldDef.name}
                            control={form.control}
                            name={fieldDef.name as "email" | "password"}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fieldDef.label}</FormLabel>
                                <FormControl>
                                <Input {...field} type={fieldDef.type} autoComplete={fieldDef.autoComplete} />
                                </FormControl>
                            </FormItem>
                            )}
                        />
                        ))}
                    </Flex>
                    {(form.formState.errors.email || form.formState.errors.password) && (
                        <Alert variant="destructive">
                            <AlertCircleIcon />
                            <AlertTitle className="line-clamp-none">Please verify your email and password</AlertTitle>
                            <AlertDescription>
                                <ul className="list-inside list-disc text-sm">
                                    {form.formState.errors.email?.message && (
                                        <li>{form.formState.errors.email.message}</li>
                                    )}
                                    {form.formState.errors.password?.message && (
                                        <li>{form.formState.errors.password.message}</li>
                                    )}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader /> : "Sign in"}
                    </Button>
                </Flex>
            </form>
        </Form>
    )
}