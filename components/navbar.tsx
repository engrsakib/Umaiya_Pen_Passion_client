"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, FileText, BarChart3, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getStoredUser, clearAuthData } from "@/lib/auth"

interface NavbarProps {
  totalPosts?: number
  totalViews?: number
}

export function Navbar({ totalPosts = 0, totalViews = 0 }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const userData = getStoredUser()
    setUser(userData)
  }, [])

  const handleLogout = () => {
    clearAuthData()
    setUser(null)
    router.push("/")
    window.location.reload() // Refresh to update navbar
  }

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const authNavigation = user
    ? [
        { name: "Add Post", href: "/dashboard/add-post" },
        { name: "My Posts", href: "/dashboard/posts" },
        { name: "Messages", href: "/dashboard/inbox" },
      ]
    : [{ name: "Login", href: "/auth/login" }]

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container-width section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">UM</span>
            </div>
            <span className="font-semibold text-lg">Umaiya Pen and Passion</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Stats and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Blog Stats */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <FileText className="h-4 w-4" />
                <span>{totalPosts} posts</span>
              </div>
              <div className="flex items-center space-x-1">
                <BarChart3 className="h-4 w-4" />
                <span>{totalViews.toLocaleString()} views</span>
              </div>
            </div>

            {/* Auth Section */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/add-post">Add Post</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/posts">My Posts</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/inbox">Messages</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" size="sm">
                <Link href="/auth/login">Login</Link>
              </Button>
            )}

            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="h-9 w-9">
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="border-t border-border pt-3 mt-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 mb-3 p-2 bg-muted/50 rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                    {authNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                      className="w-full justify-start mt-2 text-muted-foreground hover:text-primary"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <Button asChild variant="default" size="sm" className="w-full">
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                  </Button>
                )}
              </div>

              {/* Mobile Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t border-border">
                <div className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>{totalPosts} posts</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BarChart3 className="h-4 w-4" />
                  <span>{totalViews.toLocaleString()} views</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
