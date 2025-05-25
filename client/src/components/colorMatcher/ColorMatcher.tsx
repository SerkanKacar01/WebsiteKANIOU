import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Camera, Palette, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import ColorRecommendations from "./ColorRecommendations";

interface ColorRecommendation {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  colorName: string;
  description: string;
  reasoning: string;
  confidence: number;
  productTypes: string[];
}

interface RoomAnalysis {
  dominantColors: string[];
  lightingType: string;
  roomStyle: string;
  recommendations: ColorRecommendation[];
}

const ColorMatcher = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<RoomAnalysis | null>(null);

  const analyzeImageMutation = useMutation({
    mutationFn: async (file: File): Promise<RoomAnalysis> => {
      const formData = new FormData();
      formData.append('roomImage', file);
      
      const response = await fetch('/api/color-matcher', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysis(data);
      toast({
        title: "Analyse voltooid!",
        description: "Uw kameranalyse is gereed met kleuradvies.",
      });
    },
    onError: (error) => {
      console.error('Analysis error:', error);
      toast({
        title: "Analyse mislukt",
        description: "Er ging iets mis bij het analyseren van uw foto. Probeer het opnieuw.",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Bestand te groot",
          description: "Kies een afbeelding kleiner dan 10MB.",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Ongeldig bestandstype",
          description: "Kies een geldige afbeelding (JPG, PNG, etc.).",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      setAnalysis(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      analyzeImageMutation.mutate(selectedFile);
    }
  };

  const resetMatcher = () => {
    setSelectedFile(null);
    setPreview(null);
    setAnalysis(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Upload Uw Kamerfoto
          </CardTitle>
          <CardDescription>
            Upload een foto van uw kamer om gepersonaliseerde kleuradvies te ontvangen voor uw raambekleding.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <Label
              htmlFor="room-image"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Room preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Klik om te uploaden</span> of sleep hier naartoe
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG of JPEG (MAX. 10MB)</p>
                </div>
              )}
              <Input
                id="room-image"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </Label>
          </div>

          {selectedFile && (
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">{selectedFile.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={resetMatcher}>
                Andere foto
              </Button>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleAnalyze}
              disabled={!selectedFile || analyzeImageMutation.isPending}
              className="flex-1"
            >
              {analyzeImageMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyseren...
                </>
              ) : (
                <>
                  <Palette className="mr-2 h-4 w-4" />
                  Analyseer Kleuren
                </>
              )}
            </Button>
          </div>

          {analyzeImageMutation.isPending && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Onze AI analyseert uw kamerfoto en bepaalt de beste kleuradviezen voor uw raambekleding. 
                Dit kan enkele seconden duren...
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {analysis && (
        <ColorRecommendations analysis={analysis} />
      )}
    </div>
  );
};

export default ColorMatcher;