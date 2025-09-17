import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Flex } from "@radix-ui/themes";
import { Link } from "react-router";

function LoginPage() {
  return (
    <Flex direction={'column'} gap={'2'}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>

          </CardAction>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <Flex justify={'center'} align={'center'}>
        <small> Need an account? </small>
        <Button variant="link" asChild>
          <Link to={"/auth/signup"}><small>Sign Up</small></Link>
        </Button>
      </Flex>
    </Flex>
  );
}

export default LoginPage;