import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, Play, Pause, RotateCw, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product360ViewerProps {
  images: string[];
  productName: string;
  className?: string;
  autoRotate?: boolean;
  rotationSpeed?: number;
}

export function Product360Viewer({
  images,
  productName,
  className,
  autoRotate = false,
  rotationSpeed = 100
}: Product360ViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoRotate);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation logic
  useEffect(() => {
    if (isPlaying && !isDragging) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, rotationSpeed);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isDragging, images.length, rotationSpeed]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouseX(e.clientX);
    setIsPlaying(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMouseX;
    const sensitivity = 3;
    
    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1;
      setCurrentImageIndex((prev) => {
        const newIndex = prev + direction;
        if (newIndex < 0) return images.length - 1;
        if (newIndex >= images.length) return 0;
        return newIndex;
      });
      setLastMouseX(e.clientX);
    }
  }, [isDragging, lastMouseX, images.length]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers for mobile support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setLastMouseX(e.touches[0].clientX);
    setIsPlaying(false);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - lastMouseX;
    const sensitivity = 3;
    
    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1;
      setCurrentImageIndex((prev) => {
        const newIndex = prev + direction;
        if (newIndex < 0) return images.length - 1;
        if (newIndex >= images.length) return 0;
        return newIndex;
      });
      setLastMouseX(e.touches[0].clientX);
    }
  }, [isDragging, lastMouseX, images.length]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Control functions
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const rotateLeft = () => {
    setIsPlaying(false);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const rotateRight = () => {
    setIsPlaying(false);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const resetToFirst = () => {
    setIsPlaying(false);
    setCurrentImageIndex(0);
  };

  if (images.length === 0) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
          No 360° images available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-0">
        <div
          ref={containerRef}
          className={cn(
            "relative bg-gray-50 overflow-hidden transition-all duration-300",
            isFullscreen 
              ? "fixed inset-0 z-50 bg-black" 
              : "aspect-square rounded-lg"
          )}
        >
          {/* Main Image Display */}
          <div
            className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={images[currentImageIndex]}
              alt={`${productName} - View ${currentImageIndex + 1}`}
              className="w-full h-full object-cover user-select-none"
              draggable={false}
            />
            
            {/* Loading Indicator */}
            {isDragging && (
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <div className="bg-white/90 px-3 py-1 rounded text-sm">
                  Rotating...
                </div>
              </div>
            )}

            {/* 360° Badge */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
              360°
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-black/50 text-white px-3 py-1 rounded text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={resetToFirst}
              className="bg-white/90 hover:bg-white"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={rotateLeft}
              className="bg-white/90 hover:bg-white"
            >
              <RotateCw className="h-4 w-4 rotate-180" />
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={togglePlayPause}
              className="bg-white/90 hover:bg-white"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={rotateRight}
              className="bg-white/90 hover:bg-white"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleFullscreen}
              className="bg-white/90 hover:bg-white"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>

          {/* Fullscreen Exit */}
          {isFullscreen && (
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Instructions */}
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded text-xs max-w-48 opacity-80">
            <div className="mb-1 font-medium">Interactie:</div>
            <div>• Sleep om te draaien</div>
            <div>• Klik play voor auto-rotatie</div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="p-4 bg-gray-50">
          <div className="flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setIsPlaying(false);
                }}
                className={cn(
                  "flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all",
                  index === currentImageIndex
                    ? "border-primary shadow-md"
                    : "border-gray-300 hover:border-gray-400"
                )}
              >
                <img
                  src={image}
                  alt={`View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}