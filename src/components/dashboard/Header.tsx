"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeSwitcher } from "@/components/theme-switcher";
import UserMenu from "./UserMenu";
import { Bell, Menu, Receipt } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
}

const Header = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  onLogout = () => console.log("Logout clicked"),
  onProfileClick = () => console.log("Profile clicked"),
  onSettingsClick = () => console.log("Settings clicked"),
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo and App Name */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Receipt className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Split & Share</span>
          </Link>
        </div>

        {/* Navigation Links - Hidden on Mobile */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/expenses"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Expenses
          </Link>
          <Link
            href="/balances"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Balances
          </Link>
          <Link
            href="/friends"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Friends
          </Link>
        </nav>

        {/* Right Side - User Menu, Theme Switcher, etc. */}
        <div className="flex items-center gap-4">
          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
          </Button>

          {/* User Menu */}
          <UserMenu
            userName={userName}
            userAvatar={userAvatar}
            onLogout={onLogout}
            onProfileClick={onProfileClick}
            onSettingsClick={onSettingsClick}
          />

          {/* Mobile Menu Button - Only visible on mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/expenses">Expenses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/balances">Balances</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/friends">Friends</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
