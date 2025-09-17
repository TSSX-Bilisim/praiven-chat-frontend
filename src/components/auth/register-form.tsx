import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Flex, Grid } from '@radix-ui/themes';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { useRegisterForm } from "@/lib/hooks/useRegisterForm";
import { Loader } from "@/components/ai-elements/loader";

const gridFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    autoComplete: "family-name",
  },
];

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
    autoComplete: "new-password",
  }
];


export const RegisterForm = () => {
  const { form, isLoading, onSubmit } = useRegisterForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Flex direction={"column"} gap="4">
            <Flex direction="column" gap="4">
              <Grid columns={'2'} gap={'4'}>
                {gridFields.map((field) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={field.name as "firstName" | "lastName"}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel>{field.label}</FormLabel>
                        <FormControl>
                          <Input {...f} type={field.type} autoComplete={field.autoComplete} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </Grid>
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name as "email" | "password"}
                  render={({ field: f }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        <Input {...f} type={field.type} autoComplete={field.autoComplete} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </Flex>
            {(form.formState.errors.email || form.formState.errors.password) && (
                <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Please verify your email and password</AlertTitle>
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
                {isLoading ? <Loader /> : "Sign up"}
            </Button>
        </Flex>

      </form>
    </Form>
  );
};