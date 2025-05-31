import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Palette, Layers, Ruler, ArrowRight } from "lucide-react";

interface ProductCustomizerProps {
  category: string;
  onCustomizationComplete: (settings: ProductSettings) => void;
  initialSettings?: ProductSettings;
}

interface ProductSettings {
  material?: string;
  color?: string;
  style?: string;
  opacity?: number;
}

const productOptions = {
  'overgordijnen': {
    materials: ['Katoen', 'Linnen', 'Zijde', 'Velvet', 'Polyester'],
    colors: ['Wit', 'Beige', 'Grijs', 'Blauw', 'Groen', 'Rood', 'Zwart'],
    styles: ['Klassiek', 'Modern', 'Landelijk', 'Minimalistisch']
  },
  'rolgordijnen': {
    materials: ['Polyester', 'PVC', 'Bamboe', 'Linnen'],
    colors: ['Wit', 'Creme', 'Grijs', 'Beige', 'Zwart', 'Blauw'],
    styles: ['Lichtdoorlatend', 'Verduisterend', 'Dag-nacht']
  },
  'vitrages': {
    materials: ['Voile', 'Organza', 'Tule', 'Kant'],
    colors: ['Wit', 'Creme', 'Ecru', 'Lichtgrijs'],
    styles: ['Transparant', 'Semi-transparant', 'Met patroon']
  },
  'houten-jaloezieen': {
    materials: ['Basswood', 'Bamboe', 'Eiken', 'Walnoot'],
    colors: ['Naturel', 'Wit', 'Mahonie', 'Eiken', 'Grijs'],
    styles: ['25mm lamellen', '35mm lamellen', '50mm lamellen']
  },
  'default': {
    materials: ['Standaard'],
    colors: ['Wit', 'Beige', 'Grijs'],
    styles: ['Klassiek', 'Modern']
  }
};

export const ProductCustomizer = ({ 
  category, 
  onCustomizationComplete, 
  initialSettings = {} 
}: ProductCustomizerProps) => {
  const [settings, setSettings] = useState<ProductSettings>({
    material: initialSettings.material || '',
    color: initialSettings.color || '',
    style: initialSettings.style || '',
    opacity: initialSettings.opacity || 80
  });

  const options = productOptions[category as keyof typeof productOptions] || productOptions.default;

  const handleSettingChange = (key: keyof ProductSettings, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const isComplete = settings.material && settings.color && settings.style;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">
          Customize Your {category.replace('-', ' ')}
        </h3>
        <p className="text-gray-600">
          Choose your preferred material, color, and style options
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Material Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Layers className="mr-2 w-5 h-5" />
              Material
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={settings.material} onValueChange={(value) => handleSettingChange('material', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose material" />
              </SelectTrigger>
              <SelectContent>
                {options.materials.map((material) => (
                  <SelectItem key={material} value={material}>
                    {material}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {settings.material && (
              <div className="mt-2">
                <Badge variant="outline">Selected: {settings.material}</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Color Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Palette className="mr-2 w-5 h-5" />
              Color
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={settings.color} onValueChange={(value) => handleSettingChange('color', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose color" />
              </SelectTrigger>
              <SelectContent>
                {options.colors.map((color) => (
                  <SelectItem key={color} value={color}>
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-2 border"
                        style={{ 
                          backgroundColor: color.toLowerCase() === 'wit' ? '#ffffff' :
                                         color.toLowerCase() === 'beige' ? '#f5f5dc' :
                                         color.toLowerCase() === 'grijs' ? '#808080' :
                                         color.toLowerCase() === 'zwart' ? '#000000' :
                                         color.toLowerCase() === 'blauw' ? '#0066cc' :
                                         color.toLowerCase() === 'groen' ? '#008000' :
                                         color.toLowerCase() === 'rood' ? '#cc0000' :
                                         '#cccccc'
                        }}
                      />
                      {color}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {settings.color && (
              <div className="mt-2">
                <Badge variant="outline">Selected: {settings.color}</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Style Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Ruler className="mr-2 w-5 h-5" />
              Style
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={settings.style} onValueChange={(value) => handleSettingChange('style', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose style" />
              </SelectTrigger>
              <SelectContent>
                {options.styles.map((style) => (
                  <SelectItem key={style} value={style}>
                    {style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {settings.style && (
              <div className="mt-2">
                <Badge variant="outline">Selected: {settings.style}</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Opacity Control */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Label>Preview Opacity: {settings.opacity}%</Label>
            <Slider
              value={[settings.opacity || 80]}
              onValueChange={(value) => handleSettingChange('opacity', value[0])}
              max={100}
              min={20}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>More Transparent</span>
              <span>More Opaque</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Summary */}
      {isComplete && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-2">Preview Configuration</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Material:</span> {settings.material}
              </div>
              <div>
                <span className="font-medium">Color:</span> {settings.color}
              </div>
              <div>
                <span className="font-medium">Style:</span> {settings.style}
              </div>
              <div>
                <span className="font-medium">Opacity:</span> {settings.opacity}%
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      <div className="flex justify-center pt-4">
        <Button 
          size="lg"
          onClick={() => onCustomizationComplete(settings)}
          disabled={!isComplete}
          className="bg-yellow-600 hover:bg-yellow-700"
        >
          Generate Preview
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {/* Information */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">About Customization</h4>
        <p className="text-sm text-blue-800">
          All KANIOU products are made-to-measure. The preview will show how your selected options 
          will look in your room. You can request a quote for the exact specifications shown.
        </p>
      </div>
    </div>
  );
};