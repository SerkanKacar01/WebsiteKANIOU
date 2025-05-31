import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Image, AlertCircle, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface RoomImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

export const RoomImageUploader = ({ onImageUpload }: RoomImageUploaderProps) => {
  const { t } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    // Create preview URL
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);

    // Simulate upload process with progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsUploading(false);
          // Use the preview URL as the "uploaded" image for demo
          onImageUpload(preview);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, [onImageUpload, t]);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const fakeEvent = { target: { files: [file] } } as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(fakeEvent);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!previewUrl && (
        <Card 
          className="p-8 border-2 border-dashed border-gray-300 hover:border-yellow-400 hover:bg-gray-50 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <label className="cursor-pointer block">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileSelect}
              className="hidden"
              disabled={isUploading}
            />
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('virtualRoom.uploadTitle', 'Upload Room Photo')}
              </h3>
              <p className="text-gray-500 mb-4">
                {t('virtualRoom.uploadDescription', 'Drag and drop your room photo here, or click to select')}
              </p>
              <div className="text-sm text-gray-400">
                {t('virtualRoom.supportedFormats', 'Supported: JPG, PNG, WebP (max 10MB)')}
              </div>
            </div>
          </label>
        </Card>
      )}

      {previewUrl && (
        <div className="space-y-4">
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Room preview" 
              className="w-full h-64 object-cover rounded-lg"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <div className="text-white text-center">
                  <div className="mb-2">
                    {uploadProgress < 100 ? (
                      <Upload className="animate-pulse mx-auto h-8 w-8" />
                    ) : (
                      <CheckCircle className="mx-auto h-8 w-8" />
                    )}
                  </div>
                  <div className="mb-2">
                    {uploadProgress < 100 
                      ? 'Uploading...'
                      : 'Upload Complete!'
                    }
                  </div>
                  <Progress value={uploadProgress} className="w-32" />
                </div>
              </div>
            )}
          </div>

          {!isUploading && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  if (previewUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(previewUrl);
                  }
                  setPreviewUrl(null);
                  setUploadProgress(0);
                  setError(null);
                }}
              >
                Choose Another
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Tips for better photos */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2 flex items-center">
          <Image className="mr-2 h-4 w-4" />
          Tips for Best Results
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Take photos in good lighting</li>
          <li>• Include the entire window area</li>
          <li>• Keep the camera level and straight</li>
          <li>• Avoid shadows and reflections</li>
        </ul>
      </div>
    </div>
  );
};