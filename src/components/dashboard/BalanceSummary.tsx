import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowDownIcon, ArrowUpIcon, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface BalanceSummaryProps {
  totalBalance?: number;
  youOwe?: number;
  owedToYou?: number;
  currency?: string;
}

const BalanceSummary = ({
  totalBalance = 125.5,
  youOwe = 45.75,
  owedToYou = 171.25,
  currency = "$",
}: BalanceSummaryProps) => {
  // Determine if the total balance is positive, negative, or zero
  const balanceStatus =
    totalBalance > 0 ? "positive" : totalBalance < 0 ? "negative" : "neutral";

  return (
    <div className="w-full bg-background p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Balance Card */}
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Total Balance</span>
              {balanceStatus === "positive" && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Positive
                </Badge>
              )}
              {balanceStatus === "negative" && (
                <Badge
                  variant="destructive"
                  className="bg-red-100 text-red-800"
                >
                  Negative
                </Badge>
              )}
              {balanceStatus === "neutral" && (
                <Badge variant="outline">Neutral</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign
                className={cn(
                  "h-6 w-6 mr-2",
                  balanceStatus === "positive"
                    ? "text-green-500"
                    : balanceStatus === "negative"
                      ? "text-red-500"
                      : "text-gray-500",
                )}
              />
              <span
                className={cn(
                  "text-3xl font-bold",
                  balanceStatus === "positive"
                    ? "text-green-500"
                    : balanceStatus === "negative"
                      ? "text-red-500"
                      : "text-gray-500",
                )}
              >
                {balanceStatus === "negative" ? "-" : ""}
                {currency}
                {Math.abs(totalBalance).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* You Owe Card */}
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">You Owe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ArrowUpIcon className="h-6 w-6 mr-2 text-red-500" />
              <span className="text-3xl font-bold text-red-500">
                {currency}
                {youOwe.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Total amount you need to pay others
            </p>
          </CardContent>
        </Card>

        {/* Owed to You Card */}
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Owed to You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ArrowDownIcon className="h-6 w-6 mr-2 text-green-500" />
              <span className="text-3xl font-bold text-green-500">
                {currency}
                {owedToYou.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Total amount others need to pay you
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BalanceSummary;
