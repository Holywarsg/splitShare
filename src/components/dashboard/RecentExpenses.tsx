import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import ExpenseCard from "./ExpenseCard";
import { cn } from "@/lib/utils";

interface Participant {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface Expense {
  id: string;
  title: string;
  date: string;
  amount: number;
  participants: Participant[];
  status: "settled" | "pending" | "partial";
}

interface RecentExpensesProps {
  expenses?: Expense[];
  onExpenseClick?: (expenseId: string) => void;
}

const RecentExpenses = ({
  expenses = [
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
  ],
  onExpenseClick = () => {},
}: RecentExpensesProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter expenses based on active tab and search query
  const filteredExpenses = expenses.filter((expense) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && expense.status === "pending") ||
      (activeTab === "settled" && expense.status === "settled") ||
      (activeTab === "partial" && expense.status === "partial");

    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Sort expenses by date
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  return (
    <Card className="w-full bg-background">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-2xl">Recent Expenses</CardTitle>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search expenses..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setSortOrder(sortOrder === "desc" ? "asc" : "desc")
              }
              title={sortOrder === "desc" ? "Newest first" : "Oldest first"}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" title="Filter options">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mt-4"
        >
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="partial">Partial</TabsTrigger>
            <TabsTrigger value="settled">Settled</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent>
        {sortedExpenses.length > 0 ? (
          <div className="grid gap-4">
            {sortedExpenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                id={expense.id}
                title={expense.title}
                date={expense.date}
                amount={expense.amount}
                participants={expense.participants}
                status={expense.status}
                onClick={() => onExpenseClick(expense.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No expenses found matching your criteria.</p>
          </div>
        )}

        {sortedExpenses.length > 0 && (
          <div className="flex justify-center mt-6">
            <Button variant="outline">Load More</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentExpenses;
