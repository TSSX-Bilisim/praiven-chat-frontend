import { RegisterForm } from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Flex } from "@radix-ui/themes";
import { Link } from "react-router";

function RegisterPage() {
  return (
    <Flex direction={'column'} gap={'2'}>
    <Card>
      <CardHeader>
        <CardTitle>Create a new account</CardTitle>
        <CardDescription>
          Enter your email below to create a new account
        </CardDescription>

      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
    <Flex justify={'center'} align={'center'}>
      <small> Already have an account? </small>
      <Button variant="link" asChild>
        <Link to={"/login"}><small>Sign In</small></Link>
      </Button>
    </Flex>
    </Flex>
  );
}

export default RegisterPage;