import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Camera, Palette, Loader2, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
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
  const [isCompressing, setIsCompressing] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

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
      
      // Auto-scroll to results after a short delay
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 500);
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

  // Image compression function
  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions (max 1200px width/height)
        const maxSize = 1200;
        let { width, height } = img;
        
        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        }, 'image/jpeg', 0.8);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 25MB before compression)
      if (file.size > 25 * 1024 * 1024) {
        toast({
          title: "Bestand te groot",
          description: "Kies een afbeelding kleiner dan 25MB.",
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

      setAnalysis(null);
      setIsCompressing(true);

      try {
        // Compress image if it's larger than 2MB
        const finalFile = file.size > 2 * 1024 * 1024 ? await compressImage(file) : file;
        setSelectedFile(finalFile);

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(finalFile);

        toast({
          title: "Foto succesvol geüpload",
          description: `Afbeelding geoptimaliseerd (${Math.round(finalFile.size / 1024)}KB). Klaar voor analyse!`,
        });
      } catch (error) {
        console.error('Error processing image:', error);
        toast({
          title: "Fout bij verwerken",
          description: "Er ging iets mis bij het verwerken van uw foto. Probeer het opnieuw.",
          variant: "destructive",
        });
      } finally {
        setIsCompressing(false);
      }
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
              className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                isCompressing 
                  ? "border-primary bg-primary/5" 
                  : "border-gray-300 bg-gray-50 hover:bg-gray-100"
              }`}
            >
              {isCompressing ? (
                <div className="flex flex-col items-center justify-center">
                  <Loader2 className="w-8 h-8 mb-4 text-primary animate-spin" />
                  <p className="text-sm text-primary font-medium">Afbeelding wordt geoptimaliseerd...</p>
                  <p className="text-xs text-gray-500 mt-1">Dit duurt slechts enkele seconden</p>
                </div>
              ) : preview ? (
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
                  <p className="text-xs text-gray-500">PNG, JPG of JPEG (MAX. 25MB)</p>
                </div>
              )}
              <Input
                id="room-image"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isCompressing}
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
              disabled={!selectedFile || analyzeImageMutation.isPending || isCompressing}
              className="flex-1"
            >
              {analyzeImageMutation.isPending ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                  AI analyseert...
                </>
              ) : (
                <>
                  <Palette className="mr-2 h-4 w-4" />
                  Start AI Kleuranalyse
                </>
              )}
            </Button>
          </div>

          {analyzeImageMutation.isPending && (
            <Alert className="border-primary/20 bg-primary/5">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <AlertDescription className="text-primary">
                <strong>AI verwerkt uw foto en analyseert de kleuren. Een moment geduld alstublieft...</strong>
                <br />
                <span className="text-sm text-gray-600 mt-1">
                  Onze geavanceerde AI detecteert dominante kleuren en genereert gepersonaliseerde kleuradviezen voor uw raambekleding.
                </span>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {analysis && (
        <div ref={resultsRef}>
          <ColorRecommendations analysis={analysis} />
        </div>
      )}
    </div>
  );
};

export default ColorMatcher;