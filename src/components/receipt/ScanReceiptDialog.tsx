import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Camera, Upload, FileText, Image, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScanReceiptDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onUploadComplete?: (imageData: string) => void;
}

const ScanReceiptDialog = ({
  open = true,
  onOpenChange = () => {},
  onUploadComplete = () => {},
}: ScanReceiptDialogProps) => {
  const [activeTab, setActiveTab] = useState<string>("camera");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate file processing delay
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setPreviewImage(event.target.result as string);
            setIsUploading(false);
          }
        };
        reader.readAsDataURL(file);
      }, 1500);
    }
  };

  const handleCameraCapture = () => {
    // In a real implementation, this would access the device camera
    setIsUploading(true);
    // Simulate camera capture delay
    setTimeout(() => {
      setPreviewImage(
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
      );
      setIsUploading(false);
    }, 2000);
  };

  const handleGallerySelect = () => {
    // In a real implementation, this would open the device gallery
    setIsUploading(true);
    // Simulate gallery selection delay
    setTimeout(() => {
      setPreviewImage(
        "https://images.unsplash.com/photo-1563302111-ecc7f6f8c7e4?w=800&q=80",
      );
      setIsUploading(false);
    }, 1500);
  };

  const handleProcessReceipt = () => {
    if (previewImage) {
      onUploadComplete(previewImage);
      onOpenChange(false);
    }
  };

  const resetUpload = () => {
    setPreviewImage(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-background">
        <DialogHeader>
          <DialogTitle>Scan Receipt</DialogTitle>
          <DialogDescription>
            Upload a receipt image to automatically extract items and prices.
          </DialogDescription>
        </DialogHeader>

        {!previewImage ? (
          <Tabs
            defaultValue="camera"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="camera">
                <Camera className="h-4 w-4 mr-2" /> Camera
              </TabsTrigger>
              <TabsTrigger value="gallery">
                <Image className="h-4 w-4 mr-2" /> Gallery
              </TabsTrigger>
              <TabsTrigger value="file">
                <FileText className="h-4 w-4 mr-2" /> File
              </TabsTrigger>
            </TabsList>

            <TabsContent value="camera" className="mt-6">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 h-[300px]">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      Accessing camera...
                    </p>
                  </div>
                ) : (
                  <>
                    <Camera className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-center text-sm text-muted-foreground mb-4">
                      Take a photo of your receipt
                    </p>
                    <Button onClick={handleCameraCapture}>
                      <Camera className="h-4 w-4 mr-2" /> Take Photo
                    </Button>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="mt-6">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 h-[300px]">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      Selecting from gallery...
                    </p>
                  </div>
                ) : (
                  <>
                    <Image className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-center text-sm text-muted-foreground mb-4">
                      Select a receipt image from your gallery
                    </p>
                    <Button onClick={handleGallerySelect}>
                      <Image className="h-4 w-4 mr-2" /> Select Image
                    </Button>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="file" className="mt-6">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 h-[300px]">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      Processing file...
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-center text-sm text-muted-foreground mb-4">
                      Drag and drop a file or click to browse
                    </p>
                    <div className="relative">
                      <Button
                        variant="outline"
                        className="relative z-10"
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                      >
                        <Upload className="h-4 w-4 mr-2" /> Upload File
                      </Button>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileUpload}
                      />
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="mt-4">
            <div className="relative border rounded-lg overflow-hidden">
              <img
                src={previewImage}
                alt="Receipt preview"
                className="w-full h-auto max-h-[400px] object-contain"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={resetUpload}
              >
                Change
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Receipt image ready for processing
            </p>
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleProcessReceipt}
            disabled={!previewImage || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Process Receipt"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScanReceiptDialog;
