import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { CalendarIcon, DollarSign, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Participant {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface ExpenseCardProps {
  id?: string;
  title?: string;
  date?: string;
  amount?: number;
  participants?: Participant[];
  status?: "settled" | "pending" | "partial";
  onClick?: () => void;
}

const ExpenseCard = ({
  id = "exp-123",
  title = "Dinner at Italian Restaurant",
  date = "2023-05-15",
  amount = 78.5,
  participants = [
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
  status = "pending",
  onClick = () => {},
}: ExpenseCardProps) => {
  // Format date to be more readable
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Determine status badge color
  const getStatusBadge = () => {
    switch (status) {
      case "settled":
        return <Badge variant="secondary">Settled</Badge>;
      case "partial":
        return <Badge variant="default">Partially Settled</Badge>;
      case "pending":
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <Card
      className="w-full bg-card hover:bg-accent/5 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <CalendarIcon className="mr-1 h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
        </div>
        {getStatusBadge()}
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="flex -space-x-2">
              {participants.slice(0, 3).map((participant) => (
                <Avatar
                  key={participant.id}
                  className="border-2 border-background h-8 w-8"
                >
                  <AvatarImage
                    src={participant.avatarUrl}
                    alt={participant.name}
                  />
                  <AvatarFallback className="text-xs">
                    {participant.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              {participants.length > 3 && (
                <Avatar className="border-2 border-background h-8 w-8">
                  <AvatarFallback className="text-xs bg-muted">
                    +{participants.length - 3}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <div className="flex items-center text-primary font-medium">
          <DollarSign className="h-4 w-4 mr-1" />
          <span>{amount.toFixed(2)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExpenseCard;
