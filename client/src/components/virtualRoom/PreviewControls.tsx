import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, Move, RotateCcw, Eye, EyeOff } from "lucide-react";

interface PreviewControlsProps {
  settings: {
    zoom: number;
    position: { x: number; y: number };
    showBefore: boolean;
  };
  onSettingsChange: (settings: any) => void;
}

export const PreviewControls = ({ settings, onSettingsChange }: PreviewControlsProps) => {
  const handleZoomChange = (value: number[]) => {
    onSettingsChange({ zoom: value[0] });
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(settings.zoom + 0.1, 2);
    onSettingsChange({ zoom: newZoom });
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(settings.zoom - 0.1, 0.5);
    onSettingsChange({ zoom: newZoom });
  };

  const handleReset = () => {
    onSettingsChange({
      zoom: 1,
      position: { x: 0, y: 0 },
      showBefore: false
    });
  };

  const toggleBeforeAfter = () => {
    onSettingsChange({ showBefore: !settings.showBefore });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Zoom Controls */}
          <div className="space-y-3">
            <Label>Zoom Level: {Math.round(settings.zoom * 100)}%</Label>
            <div className="flex items-center space-x-4">
              <Button
                size="sm"
                variant="outline"
                onClick={handleZoomOut}
                disabled={settings.zoom <= 0.5}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              
              <Slider
                value={[settings.zoom]}
                onValueChange={handleZoomChange}
                min={0.5}
                max={2}
                step={0.1}
                className="flex-1"
              />
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleZoomIn}
                disabled={settings.zoom >= 2}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>50%</span>
              <span>200%</span>
            </div>
          </div>

          {/* View Controls */}
          <div className="flex justify-center space-x-2">
            <Button
              size="sm"
              variant={settings.showBefore ? "default" : "outline"}
              onClick={toggleBeforeAfter}
            >
              {settings.showBefore ? (
                <>
                  <EyeOff className="w-4 h-4 mr-1" />
                  Show Before
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-1" />
                  Show After
                </>
              )}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleReset}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset View
            </Button>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Preview Controls</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use zoom slider to get a closer look</li>
              <li>• Toggle before/after to see the difference</li>
              <li>• Reset view to return to original position</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};