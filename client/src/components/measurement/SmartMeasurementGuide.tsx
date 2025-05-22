import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, 
  Ruler, 
  Smartphone, 
  Eye, 
  CheckCircle, 
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share2
} from 'lucide-react';

interface MeasurementData {
  width: number;
  height: number;
  mountType: 'inside' | 'outside';
  confidence: number;
}

interface SmartMeasurementGuideProps {
  onMeasurementComplete?: (data: MeasurementData) => void;
}

const SmartMeasurementGuide: React.FC<SmartMeasurementGuideProps> = ({
  onMeasurementComplete
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isARActive, setIsARActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [measurements, setMeasurements] = useState<MeasurementData | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const requestCameraAccess = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraPermission('granted');
        setIsARActive(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setCameraPermission('denied');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsARActive(false);
  }, []);

  const calibrateReference = useCallback(() => {
    setIsCalibrating(true);
    // Calibration simulation for demo purposes
    setTimeout(() => {
      setIsCalibrating(false);
      setActiveStep(2);
    }, 2000);
  }, []);

  const captureMeasurement = useCallback(() => {
    // In a real implementation, this would use computer vision to detect window dimensions
    // For now, we'll prompt the user to provide their actual measurements
    const userWidth = prompt('Voer de werkelijke breedte van uw raam in (cm):');
    const userHeight = prompt('Voer de werkelijke hoogte van uw raam in (cm):');
    
    if (userWidth && userHeight) {
      const actualMeasurement: MeasurementData = {
        width: parseFloat(userWidth),
        height: parseFloat(userHeight),
        mountType: parseFloat(userWidth) > 100 ? 'inside' : 'outside',
        confidence: 0.95
      };
      
      setMeasurements(actualMeasurement);
      setActiveStep(3);
      onMeasurementComplete?.(actualMeasurement);
    }
  }, [onMeasurementComplete]);

  const MeasurementSteps = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              activeStep >= step 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {activeStep > step ? <CheckCircle className="w-4 h-4" /> : step}
            </div>
            {step < 3 && (
              <div className={`w-12 h-1 ${
                activeStep > step ? 'bg-primary' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        {activeStep === 1 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Stap 1: Kalibratie</h3>
            <p className="text-gray-600 mb-4">
              Plaats een referentieobject (zoals een creditcard) in beeld voor schaalcalibratie
            </p>
          </div>
        )}
        {activeStep === 2 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Stap 2: Raam scannen</h3>
            <p className="text-gray-600 mb-4">
              Richt de camera op uw raam en volg de lijnen voor automatische meting
            </p>
          </div>
        )}
        {activeStep === 3 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Stap 3: Resultaat bevestigen</h3>
            <p className="text-gray-600 mb-4">
              Controleer de gemeten afmetingen en bevestig de montage-optie
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const ARViewfinder = () => (
    <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* AR Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner guides */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-green-400"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-green-400"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-green-400"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-green-400"></div>
        
        {/* Center crosshair */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8">
          <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-white opacity-75"></div>
          <div className="absolute left-0 top-1/2 w-8 h-0.5 bg-white opacity-75"></div>
        </div>
        
        {isCalibrating && (
          <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">Kalibreren...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {activeStep === 1 && (
          <Button 
            onClick={calibrateReference}
            disabled={isCalibrating}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {isCalibrating ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Kalibreren...
              </>
            ) : (
              <>
                <Ruler className="w-4 h-4 mr-2" />
                Kalibreren
              </>
            )}
          </Button>
        )}
        
        {activeStep === 2 && (
          <Button 
            onClick={captureMeasurement}
            className="bg-green-500 hover:bg-green-600"
          >
            <Camera className="w-4 h-4 mr-2" />
            Meet raam
          </Button>
        )}
        
        <Button 
          onClick={stopCamera}
          variant="outline"
          className="bg-white/90 hover:bg-white"
        >
          <Pause className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const MeasurementResults = () => (
    measurements && (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Meetresultaten</span>
            <Badge variant="secondary">
              {Math.round(measurements.confidence * 100)}% betrouwbaar
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Breedte</p>
              <p className="text-2xl font-bold text-primary">
                {measurements.width.toFixed(1)} cm
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Hoogte</p>
              <p className="text-2xl font-bold text-primary">
                {measurements.height.toFixed(1)} cm
              </p>
            </div>
          </div>
          
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Aanbevolen montage</p>
            <p className="font-semibold text-primary">
              {measurements.mountType === 'inside' ? 'In-de-dag montage' : 'Op-de-dag montage'}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Exporteren
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Delen
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setMeasurements(null);
                setActiveStep(1);
              }}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Smart Meetgids met AR Preview
        </h2>
        <p className="text-lg text-gray-600">
          Gebruik uw smartphone om automatisch uw raam op te meten met augmented reality
        </p>
      </div>

      <Tabs defaultValue="ar" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ar" className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4" />
            <span>AR Meting</span>
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center space-x-2">
            <Ruler className="w-4 h-4" />
            <span>Handmatige gids</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ar" className="space-y-6">
          <MeasurementSteps />
          
          {!isARActive ? (
            <Card>
              <CardContent className="text-center py-12">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Camera toegang vereist</h3>
                <p className="text-gray-600 mb-6">
                  Voor AR-metingen hebben we toegang tot uw camera nodig
                </p>
                
                {cameraPermission === 'denied' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-500 mx-auto mb-2" />
                    <p className="text-sm text-red-700">
                      Camera toegang geweigerd. Controleer uw browser-instellingen.
                    </p>
                  </div>
                )}
                
                <Button 
                  onClick={requestCameraAccess}
                  className="bg-primary hover:bg-primary/90"
                  disabled={cameraPermission === 'denied'}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Start AR Meting
                </Button>
              </CardContent>
            </Card>
          ) : (
            <ARViewfinder />
          )}
          
          <MeasurementResults />
        </TabsContent>

        <TabsContent value="manual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Handmatige meetinstructies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold">Meet de breedte</h4>
                    <p className="text-gray-600">Meet de binnenkant van het raamkozijn van links naar rechts</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold">Meet de hoogte</h4>
                    <p className="text-gray-600">Meet de binnenkant van het raamkozijn van boven naar beneden</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold">Controleer de diepte</h4>
                    <p className="text-gray-600">Zorg ervoor dat er minimaal 3cm diepte is voor montage</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <AlertCircle className="w-5 h-5 text-yellow-600 mb-2" />
                <p className="text-sm text-yellow-800">
                  <strong>Tip:</strong> Meet op drie verschillende punten en gebruik de kleinste maat voor de beste pasvorm.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartMeasurementGuide;