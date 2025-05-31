import { forwardRef, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff } from "lucide-react";

interface PreviewCanvasProps {
  roomImage: string;
  category: string;
  productSettings: {
    material?: string;
    color?: string;
    style?: string;
    opacity?: number;
  };
  previewSettings: {
    zoom: number;
    position: { x: number; y: number };
    showBefore: boolean;
  };
  onSettingsChange: (settings: any) => void;
}

export const PreviewCanvas = forwardRef<HTMLCanvasElement, PreviewCanvasProps>(({
  roomImage,
  category,
  productSettings,
  previewSettings,
  onSettingsChange
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Combine refs
  const canvas = ref && typeof ref === 'object' ? ref.current : canvasRef.current;

  useEffect(() => {
    if (!canvas || !roomImage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsLoading(true);

    const img = new Image();
    img.onload = () => {
      // Set canvas size
      const container = containerRef.current;
      if (container) {
        const maxWidth = container.clientWidth;
        const maxHeight = 600;
        
        const aspectRatio = img.width / img.height;
        let width = maxWidth;
        let height = width / aspectRatio;
        
        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }

        canvas.width = width;
        canvas.height = height;
        setDimensions({ width, height });

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw room image
        ctx.drawImage(img, 0, 0, width, height);

        // If not showing before/after comparison, overlay the product
        if (!previewSettings.showBefore) {
          drawProductOverlay(ctx, width, height);
        }
      }
      setIsLoading(false);
    };

    img.src = roomImage;
  }, [roomImage, productSettings, previewSettings, canvas]);

  const drawProductOverlay = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // This is a simplified overlay - in a real implementation, you would use AI/ML
    // to detect windows and apply realistic product overlays
    
    const opacity = (productSettings.opacity || 80) / 100;
    ctx.globalAlpha = opacity;

    // Enhanced window detection - multiple potential window areas
    const windowAreas = detectWindowAreas(width, height);

    windowAreas.forEach(area => {
      ctx.fillStyle = getProductColor(productSettings.color || 'Wit');
      
      // Draw product based on category
      switch (category) {
        case 'rolgordijnen':
          drawRollerBlind(ctx, area);
          break;
        case 'overgordijnen':
          drawCurtains(ctx, area);
          break;
        case 'houten-jaloezieen':
          drawVenetianBlinds(ctx, area);
          break;
        case 'plisse':
          drawPlisseBlinds(ctx, area);
          break;
        case 'duo-rolgordijnen':
          drawDuoRollerBlinds(ctx, area);
          break;
        default:
          drawGenericProduct(ctx, area);
      }
    });

    ctx.globalAlpha = 1;
  };

  const detectWindowAreas = (width: number, height: number) => {
    // Enhanced AI-like window detection with multiple common window positions
    const areas = [
      // Main window (center)
      { x: width * 0.25, y: height * 0.15, w: width * 0.5, h: height * 0.6 }
    ];

    // Add side windows if room is wide enough
    if (width > 800) {
      areas.push(
        { x: width * 0.05, y: height * 0.2, w: width * 0.15, h: height * 0.5 },
        { x: width * 0.8, y: height * 0.2, w: width * 0.15, h: height * 0.5 }
      );
    }

    return areas;
  };

  const getProductColor = (colorName: string): string => {
    const colors = {
      'Wit': '#ffffff',
      'Beige': '#f5f5dc',
      'Grijs': '#808080',
      'Zwart': '#2c2c2c',
      'Blauw': '#4a90e2',
      'Groen': '#7ed321',
      'Rood': '#d0021b',
      'Creme': '#fffdd0',
      'Naturel': '#deb887'
    };
    return colors[colorName as keyof typeof colors] || '#ffffff';
  };

  const drawRollerBlind = (ctx: CanvasRenderingContext2D, area: any) => {
    // Draw roller blind
    ctx.fillRect(area.x, area.y, area.w, area.h);
    
    // Add some texture/pattern
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const y = area.y + (area.h / 5) * i;
      ctx.beginPath();
      ctx.moveTo(area.x, y);
      ctx.lineTo(area.x + area.w, y);
      ctx.stroke();
    }
  };

  const drawCurtains = (ctx: CanvasRenderingContext2D, area: any) => {
    // Draw curtains with folds
    const folds = 8;
    const foldWidth = area.w / folds;
    
    for (let i = 0; i < folds; i++) {
      const x = area.x + i * foldWidth;
      const curveAmount = i % 2 === 0 ? 10 : -10;
      
      ctx.beginPath();
      ctx.moveTo(x, area.y);
      ctx.quadraticCurveTo(x + foldWidth/2 + curveAmount, area.y + area.h/2, x + foldWidth, area.y + area.h);
      ctx.lineTo(x, area.y + area.h);
      ctx.closePath();
      ctx.fill();
    }
  };

  const drawVenetianBlinds = (ctx: CanvasRenderingContext2D, area: any) => {
    // Draw venetian blinds
    const slats = 12;
    const slatHeight = area.h / slats;
    
    for (let i = 0; i < slats; i++) {
      const y = area.y + i * slatHeight;
      ctx.fillRect(area.x, y, area.w, slatHeight * 0.8);
      
      // Add shadow for 3D effect
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(area.x, y + slatHeight * 0.8, area.w, slatHeight * 0.2);
      ctx.fillStyle = getProductColor(productSettings.color || 'Wit');
    }
  };

  const drawGenericProduct = (ctx: CanvasRenderingContext2D, area: any) => {
    ctx.fillRect(area.x, area.y, area.w, area.h);
  };

  return (
    <div ref={containerRef} className="space-y-4">
      <Card className="overflow-hidden">
        <div className="relative">
          <canvas
            ref={ref || canvasRef}
            className="w-full h-auto border rounded-lg"
            style={{ maxHeight: '600px' }}
          />
          
          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <div>Generating Preview...</div>
              </div>
            </div>
          )}

          {/* Before/After Toggle */}
          <div className="absolute top-4 right-4">
            <Button
              size="sm"
              variant={previewSettings.showBefore ? "default" : "outline"}
              onClick={() => onSettingsChange({ showBefore: !previewSettings.showBefore })}
            >
              {previewSettings.showBefore ? (
                <>
                  <EyeOff className="w-4 h-4 mr-1" />
                  Before
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-1" />
                  After
                </>
              )}
            </Button>
          </div>

          {/* Product Info Overlay */}
          <div className="absolute bottom-4 left-4">
            <div className="flex space-x-2">
              <Badge>{category.replace('-', ' ')}</Badge>
              {productSettings.material && <Badge variant="outline">{productSettings.material}</Badge>}
              {productSettings.color && <Badge variant="outline">{productSettings.color}</Badge>}
            </div>
          </div>
        </div>
      </Card>

      {/* Canvas Info */}
      <div className="text-center text-sm text-gray-500">
        <p>Preview dimensions: {dimensions.width} × {dimensions.height}px</p>
        <p className="text-xs mt-1">
          This is a demonstration preview. Actual AI-powered room visualization would provide more realistic results.
        </p>
      </div>
    </div>
  );
});