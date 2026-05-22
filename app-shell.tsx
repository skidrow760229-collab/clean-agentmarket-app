"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  PlusCircle,
  Compass,
  LogOut,
  Menu,
  X,
  Settings
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AdminAuthModal } from "@/components/admin-auth-modal"
import { useRouter } from "next/navigation"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/posts/create", label: "Create Post", icon: PlusCircle },
  { href: "/chat", label: "Messages", icon: MessageSquare },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)

  const handleAdminSuccess = () => {
    setShowAdminModal(false)
    router.push("/admin")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Users className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">Clean</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Admin Button - Visible */}
            <button
              onClick={() => setShowAdminModal(true)}
              className="hidden md:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground/60 transition-colors hover:bg-secondary hover:text-muted-foreground"
              title="Admin"
            >
              <Settings className="h-3.5 w-3.5" />
              <span>Admin</span>
            </button>
            <Button variant="ghost" size="sm" className="hidden text-muted-foreground md:flex">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-border bg-background px-4 py-3 md:hidden">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                setShowAdminModal(true)
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground/60 transition-colors hover:bg-secondary hover:text-muted-foreground"
            >
              <Settings className="h-4 w-4" />
              Admin
            </button>
            <Button variant="ghost" size="sm" className="mt-2 w-full justify-start text-muted-foreground">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-8">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Clean - All Rights Reserved. Owned by cleanoffpeople@outlook.com
          </p>
        </div>
      </footer>

      {/* Admin Auth Modal */}
      <AdminAuthModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onSuccess={handleAdminSuccess}
      />
    </div>
  )
}
