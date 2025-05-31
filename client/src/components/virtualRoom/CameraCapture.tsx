import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, RotateCcw, Download, X, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CameraCaptureProps {
  onCapture: (imageUrl: string) => void;
  onCancel: () => void;
}

export const CameraCapture = ({ onCapture, onCancel }: CameraCaptureProps) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera on mobile
        }
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Camera access error:', error);
      setError(t('virtualRoom.cameraError', 'Unable to access camera. Please check permissions and try again.'));
      setIsLoading(false);
    }
  }, [t]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to data URL
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageDataUrl);
  }, []);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
  }, []);

  const usePhoto = useCallback(() => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  }, [capturedImage, onCapture]);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  if (error) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="flex space-x-2">
          <Button onClick={startCamera} variant="outline">
            {t('virtualRoom.tryAgain', 'Try Again')}
          </Button>
          <Button onClick={onCancel} variant="outline">
            {t('virtualRoom.cancel', 'Cancel')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="relative">
          {!capturedImage ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 object-cover bg-gray-900"
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {isLoading && (
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Camera className="animate-pulse mx-auto h-8 w-8 mb-2" />
                    <div>{t('virtualRoom.cameraLoading', 'Starting camera...')}</div>
                  </div>
                </div>
              )}

              {/* Camera overlay guidelines */}
              {!isLoading && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-4 border-2 border-white/50 rounded-lg">
                    <div className="absolute top-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
                      {t('virtualRoom.frameRoom', 'Frame your room')}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-64 object-cover"
            />
          )}
        </div>
      </Card>

      {/* Camera Controls */}
      <div className="flex justify-center space-x-2">
        {!capturedImage ? (
          <>
            <Button onClick={onCancel} variant="outline">
              <X className="mr-2 w-4 h-4" />
              {t('virtualRoom.cancel', 'Cancel')}
            </Button>
            <Button 
              onClick={capturePhoto} 
              disabled={isLoading}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              <Camera className="mr-2 w-4 h-4" />
              {t('virtualRoom.takePhoto', 'Take Photo')}
            </Button>
          </>
        ) : (
          <>
            <Button onClick={retakePhoto} variant="outline">
              <RotateCcw className="mr-2 w-4 h-4" />
              {t('virtualRoom.retake', 'Retake')}
            </Button>
            <Button onClick={usePhoto} className="bg-green-600 hover:bg-green-700">
              <Download className="mr-2 w-4 h-4" />
              {t('virtualRoom.usePhoto', 'Use Photo')}
            </Button>
          </>
        )}
      </div>

      {/* Camera Tips */}
      <div className="bg-blue-50 p-3 rounded-lg">
        <div className="text-sm text-blue-800">
          <div className="font-medium mb-1">{t('virtualRoom.cameraTips', 'Camera Tips:')}</div>
          <ul className="space-y-1">
            <li>• {t('virtualRoom.cameraTip1', 'Hold device steady')}</li>
            <li>• {t('virtualRoom.cameraTip2', 'Ensure good lighting')}</li>
            <li>• {t('virtualRoom.cameraTip3', 'Include entire window area')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};