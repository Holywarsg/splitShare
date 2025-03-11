"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/dashboard/Header";
import BalanceSummary from "@/components/dashboard/BalanceSummary";
import ActionButtons from "@/components/dashboard/ActionButtons";
import RecentExpenses from "@/components/dashboard/RecentExpenses";
import ScanReceiptDialog from "@/components/receipt/ScanReceiptDialog";
import ManualEntryDialog from "@/components/expense/ManualEntryDialog";
import AuthDialog from "@/components/auth/AuthDialog";

export default function Home() {
  const { user, profile, signOut } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showScanReceiptDialog, setShowScanReceiptDialog] = useState(false);
  const [showManualEntryDialog, setShowManualEntryDialog] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!user);
    setShowAuthDialog(!user);
  }, [user]);

  // User data from profile or fallback to mock data
  const userData = {
    name: profile?.name || "Guest User",
    avatar:
      profile?.avatar_url ||
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest",
    balance: 125.5,
    youOwe: 45.75,
    owedToYou: 171.25,
  };

  // Mock expenses data
  const expensesData = [
    {
      id: "exp-1",
      title: "Dinner at Italian Restaurant",
      date: "2023-05-15",
      amount: 78.5,
      participants: [
        {
          id: "1",
          name: "Alex",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        },
        {
          id: "2",
          name: "Jamie",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
        },
        {
          id: "3",
          name: "Taylor",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
        },
      ],
      status: "pending",
    },
    {
      id: "exp-2",
      title: "Movie Night",
      date: "2023-05-10",
      amount: 42.75,
      participants: [
        {
          id: "1",
          name: "Alex",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        },
        {
          id: "4",
          name: "Jordan",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
        },
      ],
      status: "settled",
    },
    {
      id: "exp-3",
      title: "Grocery Shopping",
      date: "2023-05-05",
      amount: 125.3,
      participants: [
        {
          id: "1",
          name: "Alex",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        },
        {
          id: "2",
          name: "Jamie",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
        },
        {
          id: "3",
          name: "Taylor",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
        },
        {
          id: "4",
          name: "Jordan",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
        },
      ],
      status: "partial",
    },
    {
      id: "exp-4",
      title: "Concert Tickets",
      date: "2023-04-28",
      amount: 210.0,
      participants: [
        {
          id: "2",
          name: "Jamie",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
        },
        {
          id: "3",
          name: "Taylor",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
        },
      ],
      status: "pending",
    },
  ];

  // Handle login
  const handleLogin = (data: any) => {
    console.log("Login successful");
    // Auth state is managed by the AuthContext
  };

  // Handle signup
  const handleSignup = (data: any) => {
    console.log("Signup successful");
    // Auth state is managed by the AuthContext
  };

  // Handle scan receipt
  const handleScanReceipt = () => {
    setShowScanReceiptDialog(true);
  };

  // Handle manual entry
  const handleManualEntry = () => {
    setShowManualEntryDialog(true);
  };

  // Handle view balances
  const handleViewBalances = () => {
    console.log("View balances clicked");
    // Navigate to balances page or show balances modal
  };

  // Handle expense click
  const handleExpenseClick = (expenseId: string) => {
    console.log(`Expense clicked: ${expenseId}`);
    // Navigate to expense details or show expense details modal
  };

  // Handle receipt upload complete
  const handleReceiptUploadComplete = (imageData: string) => {
    console.log("Receipt uploaded:", imageData);
    // Process receipt data
  };

  // Handle manual expense submission
  const handleExpenseSubmit = (data: any) => {
    console.log("Expense submitted:", data);
    // Process expense data
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <Header
        userName={userData.name}
        userAvatar={userData.avatar}
        onLogout={signOut}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Balance Summary */}
        <section className="mb-8">
          <BalanceSummary
            totalBalance={userData.balance}
            youOwe={userData.youOwe}
            owedToYou={userData.owedToYou}
          />
        </section>

        {/* Action Buttons */}
        <section className="mb-8">
          <ActionButtons
            onScanReceipt={handleScanReceipt}
            onManualEntry={handleManualEntry}
            onViewBalances={handleViewBalances}
          />
        </section>

        {/* Recent Expenses */}
        <section>
          <RecentExpenses
            expenses={expensesData}
            onExpenseClick={handleExpenseClick}
          />
        </section>
      </div>

      {/* Dialogs */}
      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />

      <ScanReceiptDialog
        open={showScanReceiptDialog}
        onOpenChange={setShowScanReceiptDialog}
        onUploadComplete={handleReceiptUploadComplete}
      />

      <ManualEntryDialog
        open={showManualEntryDialog}
        onOpenChange={setShowManualEntryDialog}
        onSubmit={handleExpenseSubmit}
      />
    </main>
  );
}
