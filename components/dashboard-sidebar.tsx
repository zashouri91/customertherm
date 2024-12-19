"use client"

import { Users, MapPin, BarChart3, ClipboardList, Mail, Layers } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'

const menuItems = [
  { name: 'Groups', icon: Layers, href: '/groups' },
  { name: 'Locations', icon: MapPin, href: '/locations' },
  { name: 'Users', icon: Users, href: '/users' },
  { name: 'Analytics', icon: BarChart3, href: '/analytics' },
  { name: 'Survey Management', icon: ClipboardList, href: '/survey-management' },
  { name: 'Signature Generator', icon: Mail, href: '/signature-generator' },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Mail className="h-6 w-6" />
          <span className="text-lg font-bold">FeedbackPro</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href} className="flex items-center space-x-3 rounded-lg px-3 py-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarTrigger className="absolute right-4 top-4 lg:hidden" />
    </Sidebar>
  )
}


