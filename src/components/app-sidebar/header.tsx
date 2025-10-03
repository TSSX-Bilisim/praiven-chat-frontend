import { Flex } from "@radix-ui/themes";
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { NavMain } from "@/components/app-sidebar/nav-main";

export function AppSidebarHeader () {
  const { state } = useSidebar();
  return (
    <SidebarHeader className="py-0 px-2">
      <SidebarMenu className="h-16 justify-center">
        <SidebarMenuItem className="flex justify-between">
          { state === "expanded" && (
              <Flex gap="2" direction={"row"} align="center">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg p-2">
                      <svg className="logo-default" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#007ACC" d="M32 2C20 2 10 8 10 8v16c0 18 14 32 22 36 8-4 22-18 22-36V8s-10-6-22-6zm0 4c10.5 0 18 5 18 5v14c0 14.5-10 25.5-18 30-8-4.5-18-15.5-18-30V11s7.5-5 18-5z"/>
                        <path fill="#FF6F00" d="M24 26c-2 0-4 2-4 4v6c0 2 2 4 4 4h16c2 0 4-2 4-4v-6c0-2-2-4-4-4H24zm0 4h16v6H24v-6z"/>
                        <circle cx="18" cy="44" r="2.5" fill="#FF6F00"/>
                        <circle cx="32" cy="44" r="2.5" fill="#007ACC"/>
                        <circle cx="46" cy="44" r="2.5" fill="#FF6F00"/>
                      </svg>
                  </div>
                  <span>SecurAI</span>
              </Flex>
          )}
          <SidebarMenuButton asChild className="w-fit">
              <SidebarTrigger/>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <NavMain />
    </SidebarHeader>
  )    
}