import { Link} from "react-router"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { PencilLine, Search } from "lucide-react"
import { SearchDialog } from "@/components/app-sidebar/search"
import { useState } from "react"

const items = [
    { title: "New Chat", url: "/chat", icon: PencilLine },
]
export function NavMain() {
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<SidebarMenu>
			{items.map((item) => (
				<SidebarMenuItem key={item.title}>
					<SidebarMenuButton asChild>
						<Link to={item.url}>
							<item.icon/>
							<span>{item.title}</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>))
			}
			<SidebarMenuItem>
				<SidebarMenuButton onClick={() => setDialogOpen(true)}>
					<Search/>
					<span>Search Chats</span>
				</SidebarMenuButton>
				<SearchDialog open={dialogOpen} setOpen={setDialogOpen} />
			</SidebarMenuItem>
		</SidebarMenu>
	)
}