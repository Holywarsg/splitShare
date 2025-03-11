import React from "react";
import { useForm } from "react-hook-form";
import { CalendarIcon, DollarSign, Plus, Users } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Participant {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface ManualEntryDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: ExpenseFormData) => void;
  participants?: Participant[];
}

interface ExpenseFormData {
  title: string;
  date: string;
  amount: string;
  description?: string;
  splitMethod: "equal" | "custom" | "individual";
  participants: string[];
}

const ManualEntryDialog = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
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
  ],
}: ManualEntryDialogProps) => {
  const form = useForm<ExpenseFormData>({
    defaultValues: {
      title: "",
      date: new Date().toISOString().split("T")[0],
      amount: "",
      description: "",
      splitMethod: "equal",
      participants: participants.map((p) => p.id),
    },
  });

  const handleSubmit = (data: ExpenseFormData) => {
    // Convert amount to number before submitting
    const processedData = {
      ...data,
      amount: parseFloat(data.amount),
    };
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            Enter the details of your expense to split with friends.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Dinner at Restaurant" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="date" className="pl-9" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          className="pl-9"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add details about this expense"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="splitMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Split Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select how to split the expense" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="equal">Split Equally</SelectItem>
                      <SelectItem value="custom">Custom Amounts</SelectItem>
                      <SelectItem value="individual">
                        Individual Items
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose how you want to split this expense.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Participants</FormLabel>
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {field.value.length} people selected
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {participants.map((participant) => (
                      <div
                        key={participant.id}
                        className={cn(
                          "flex items-center p-2 border rounded-md cursor-pointer transition-colors",
                          field.value.includes(participant.id)
                            ? "border-primary bg-primary/10"
                            : "border-input",
                        )}
                        onClick={() => {
                          const newValue = field.value.includes(participant.id)
                            ? field.value.filter((id) => id !== participant.id)
                            : [...field.value, participant.id];
                          field.onChange(newValue);
                        }}
                      >
                        <div className="flex-1">{participant.name}</div>
                        {field.value.includes(participant.id) && (
                          <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                            ✓
                          </div>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center justify-center h-10"
                      onClick={() => {}}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Person
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Expense</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ManualEntryDialog;
