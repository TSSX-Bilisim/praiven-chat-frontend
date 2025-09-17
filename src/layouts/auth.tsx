import { Outlet } from "react-router";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Flex } from "@radix-ui/themes";
import LogoBadge from "@/components/logo";

export default function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <Flex direction={'column'} gap={'4'} p={'6'} align={'center'}>
        <div className="flex w-full justify-center lg:justify-start">
          <LogoBadge size={'12'}/>

        </div>
        <div className="flex flex-1 items-center justify-center w-full">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </Flex>
      <div className="relative hidden lg:block h-full">
        <BackgroundBeams />
      </div>
    </div>
  )
}