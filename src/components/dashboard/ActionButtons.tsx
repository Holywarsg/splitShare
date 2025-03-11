import React from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { cn } from "@/lib/utils";
import {
  CameraIcon,
  FileTextIcon,
  PlusIcon,
  ReceiptIcon,
  UsersIcon,
} from "lucide-react";

interface ActionButtonsProps {
  onScanReceipt?: () => void;
  onManualEntry?: () => void;
  onViewBalances?: () => void;
}

const ActionButtons = ({
  onScanReceipt = () => {},
  onManualEntry = () => {},
  onViewBalances = () => {},
}: ActionButtonsProps) => {
  return (
    <div className="w-full bg-background p-4 rounded-lg shadow-sm">
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {/* Scan Receipt Button with Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className={cn(
                "flex-1 min-w-[150px] max-w-[200px] h-auto py-6 flex flex-col items-center gap-2",
              )}
              onClick={onScanReceipt}
            >
              <ReceiptIcon className="h-6 w-6 mb-1" />
              <span>Scan Receipt</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <div className="flex flex-col items-center justify-center p-6 space-y-6">
              <h3 className="text-xl font-semibold">Scan Receipt</h3>
              <p className="text-center text-muted-foreground">
                Upload a receipt image or take a photo to automatically extract
                items and prices.
              </p>
              <div className="flex flex-col space-y-4 w-full">
                <Button className="w-full" variant="outline">
                  <CameraIcon className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
                <Button className="w-full" variant="outline">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  Upload File
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Manual Entry Button with Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="lg"
              variant="outline"
              className={cn(
                "flex-1 min-w-[150px] max-w-[200px] h-auto py-6 flex flex-col items-center gap-2",
              )}
              onClick={onManualEntry}
            >
              <PlusIcon className="h-6 w-6 mb-1" />
              <span>Manual Entry</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <div className="flex flex-col items-center justify-center p-6 space-y-6">
              <h3 className="text-xl font-semibold">Add Expense Manually</h3>
              <p className="text-center text-muted-foreground">
                Enter expense details manually to track and split with friends.
              </p>
              {/* Placeholder for manual entry form */}
              <div className="w-full h-48 border-2 border-dashed border-muted rounded-md flex items-center justify-center">
                <span className="text-muted-foreground">
                  Manual entry form placeholder
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Balances Button */}
        <Button
          size="lg"
          variant="secondary"
          className={cn(
            "flex-1 min-w-[150px] max-w-[200px] h-auto py-6 flex flex-col items-center gap-2",
          )}
          onClick={onViewBalances}
        >
          <UsersIcon className="h-6 w-6 mb-1" />
          <span>View Balances</span>
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
