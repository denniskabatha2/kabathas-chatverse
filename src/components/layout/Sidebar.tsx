import { Home, Search, Heart, MessageCircle, PlusSquare, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: MessageCircle, label: "Messages", path: "/messages" },
  { icon: Heart, label: "Notifications", path: "/notifications" },
  { icon: PlusSquare, label: "Create", path: "/create" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <SidebarContent>
        <div className="p-4">
          <h1 className="text-xl font-bold">Kabatha's Chat</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-2 p-2 ${
                        location.pathname === item.path ? "bg-accent" : ""
                      }`}
                    >
                      <item.icon className="w-6 h-6" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
};