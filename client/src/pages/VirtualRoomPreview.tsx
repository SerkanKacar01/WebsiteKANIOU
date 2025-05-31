import { useState, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Upload, 
  Download, 
  Share2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Quote,
  Palette,
  Settings,
  Eye,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react";
import { ProductCategorySelector } from "@/components/virtualRoom/ProductCategorySelector";
import { ProductCustomizer } from "@/components/virtualRoom/ProductCustomizer";
import { RoomImageUploader } from "@/components/virtualRoom/RoomImageUploader";
import { CameraCapture } from "@/components/virtualRoom/CameraCapture";
import { PreviewCanvas } from "@/components/virtualRoom/PreviewCanvas";
import { PreviewControls } from "@/components/virtualRoom/PreviewControls";
import { QuoteRequestModal } from "@/components/virtualRoom/QuoteRequestModal";

interface PreviewState {
  step: 'upload' | 'category' | 'customize' | 'preview';
  roomImage: string | null;
  selectedCategory: string | null;
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
}

const VirtualRoomPreview = () => {
  const { t, language } = useLanguage();
  const [previewState, setPreviewState] = useState<PreviewState>({
    step: 'upload',
    roomImage: null,
    selectedCategory: null,
    productSettings: {},
    previewSettings: {
      zoom: 1,
      position: { x: 0, y: 0 },
      showBefore: false
    }
  });
  
  const [isUsingCamera, setIsUsingCamera] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Official KANIOU product categories
  const productCategories = [
    { id: 'overgordijnen', name: t('products.overgordijnen', 'Overgordijnen'), icon: '🪟' },
    { id: 'vitrages', name: t('products.vitrages', 'Vitrages'), icon: '✨' },
    { id: 'rolgordijnen', name: t('products.rolgordijnen', 'Rolgordijnen'), icon: '📜' },
    { id: 'vouwgordijnen', name: t('products.vouwgordijnen', 'Vouwgordijnen'), icon: '🪭' },
    { id: 'duo-rolgordijnen', name: t('products.duo-rolgordijnen', 'Duo rolgordijnen'), icon: '🔄' },
    { id: 'textiel-lamellen', name: t('products.textiel-lamellen', 'Textiel lamellen'), icon: '📏' },
    { id: 'kunststof-lamellen', name: t('products.kunststof-lamellen', 'Kunststof lamellen'), icon: '🏢' },
    { id: 'houten-jaloezieen', name: t('products.houten-jaloezieen', 'Houten jaloezieën'), icon: '🌳' },
    { id: 'kunststof-jaloezieen', name: t('products.kunststof-jaloezieen', 'Kunststof jaloezieën'), icon: '🏗️' },
    { id: 'textiel-raamfolie', name: t('products.textiel-raamfolie', 'Textiel raamfolie'), icon: '🎭' },
    { id: 'houten-shutters', name: t('products.houten-shutters', 'Houten shutters'), icon: '🚪' },
    { id: 'inzethorren', name: t('products.inzethorren', 'Inzethorren'), icon: '🦟' },
    { id: 'opzethorren', name: t('products.opzethorren', 'Opzethorren'), icon: '🛡️' },
    { id: 'plisse-hordeuren', name: t('products.plisse-hordeuren', 'Plissé hordeuren'), icon: '🚫' },
    { id: 'plisse', name: t('products.plisse', 'Plissé'), icon: '📐' },
    { id: 'duo-plisse', name: t('products.duo-plisse', 'Duo plissé'), icon: '🔃' },
    { id: 'dakraam-zonweringen', name: t('products.dakraam-zonweringen', 'Dakraam zonweringen (Fakro & Velux)'), icon: '☀️' },
    { id: 'gordijnrails', name: t('products.gordijnrails', 'Gordijnrails'), icon: '🛤️' },
    { id: 'gordijnroedes', name: t('products.gordijnroedes', 'Gordijnroedes'), icon: '📏' },
    { id: 'squid-textiel-folie', name: t('products.squid-textiel-folie', 'SQUID textiel folie'), icon: '🦑' }
  ];

  const handleImageUpload = useCallback((imageUrl: string) => {
    setPreviewState(prev => ({
      ...prev,
      roomImage: imageUrl,
      step: 'category'
    }));
    setIsUsingCamera(false);
  }, []);

  const handleCameraCapture = useCallback((imageUrl: string) => {
    setPreviewState(prev => ({
      ...prev,
      roomImage: imageUrl,
      step: 'category'
    }));
    setIsUsingCamera(false);
  }, []);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setPreviewState(prev => ({
      ...prev,
      selectedCategory: categoryId,
      step: 'customize'
    }));
  }, []);

  const handleProductCustomization = useCallback((settings: any) => {
    setPreviewState(prev => ({
      ...prev,
      productSettings: settings,
      step: 'preview'
    }));
  }, []);

  const handleDownloadPreview = useCallback(() => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `kaniou-room-preview-${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  }, []);

  const handleSharePreview = useCallback(async () => {
    if (navigator.share && canvasRef.current) {
      try {
        canvasRef.current.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], 'kaniou-room-preview.png', { type: 'image/png' });
            await navigator.share({
              title: 'KANIOU Virtual Room Preview',
              text: 'Check out how this window treatment looks in my room!',
              files: [file]
            });
          }
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  }, []);

  const resetPreview = () => {
    setPreviewState({
      step: 'upload',
      roomImage: null,
      selectedCategory: null,
      productSettings: {},
      previewSettings: {
        zoom: 1,
        position: { x: 0, y: 0 },
        showBefore: false
      }
    });
    setIsUsingCamera(false);
  };

  const getStepTitle = () => {
    switch (previewState.step) {
      case 'upload':
        return t('virtualRoom.uploadStep', 'Upload Room Photo');
      case 'category':
        return t('virtualRoom.categoryStep', 'Choose Product Category');
      case 'customize':
        return t('virtualRoom.customizeStep', 'Customize Product');
      case 'preview':
        return t('virtualRoom.previewStep', 'Virtual Preview');
      default:
        return t('virtualRoom.title', 'Virtual Room Preview');
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('virtualRoom.pageTitle', 'Virtual Room Preview')} | KANIOU</title>
        <meta
          name="description"
          content={t('virtualRoom.pageDescription', 'Visualize how KANIOU window treatments will look in your room with our AI-powered Virtual Room Preview. Upload a photo or use your camera to see realistic previews.')}
        />
      </Helmet>

      <Container className="py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('virtualRoom.title', 'Virtual Room Preview')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('virtualRoom.subtitle', 'See how our premium window treatments will transform your space before you buy. Upload a photo or use your camera for an instant preview.')}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {['upload', 'category', 'customize', 'preview'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  previewState.step === step || 
                  (['upload', 'category', 'customize', 'preview'].indexOf(previewState.step) > index)
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                {index < 3 && (
                  <div className={`w-12 h-0.5 ${
                    ['upload', 'category', 'customize', 'preview'].indexOf(previewState.step) > index
                      ? 'bg-yellow-500'
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">{getStepTitle()}</h2>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {previewState.step === 'upload' && (
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Upload className="mr-2" />
                  {t('virtualRoom.uploadPhoto', 'Upload Room Photo')}
                </h3>
                <RoomImageUploader onImageUpload={handleImageUpload} />
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Camera className="mr-2" />
                  {t('virtualRoom.useCamera', 'Use Camera')}
                </h3>
                {!isUsingCamera ? (
                  <Button
                    onClick={() => setIsUsingCamera(true)}
                    className="w-full"
                    size="lg"
                  >
                    <Camera className="mr-2" />
                    {t('virtualRoom.openCamera', 'Open Camera')}
                  </Button>
                ) : (
                  <CameraCapture 
                    onCapture={handleCameraCapture}
                    onCancel={() => setIsUsingCamera(false)}
                  />
                )}
              </Card>
            </div>
          )}

          {previewState.step === 'category' && (
            <ProductCategorySelector
              categories={productCategories}
              onCategorySelect={handleCategorySelect}
              selectedCategory={previewState.selectedCategory}
            />
          )}

          {previewState.step === 'customize' && previewState.selectedCategory && (
            <ProductCustomizer
              category={previewState.selectedCategory}
              onCustomizationComplete={handleProductCustomization}
              initialSettings={previewState.productSettings}
            />
          )}

          {previewState.step === 'preview' && previewState.roomImage && previewState.selectedCategory && (
            <div className="space-y-6">
              {/* Preview Mode Selector */}
              <div className="flex justify-center space-x-2">
                <Button
                  variant={previewMode === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('desktop')}
                >
                  <Monitor className="w-4 h-4 mr-1" />
                  Desktop
                </Button>
                <Button
                  variant={previewMode === 'tablet' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('tablet')}
                >
                  <Tablet className="w-4 h-4 mr-1" />
                  Tablet
                </Button>
                <Button
                  variant={previewMode === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('mobile')}
                >
                  <Smartphone className="w-4 h-4 mr-1" />
                  Mobile
                </Button>
              </div>

              {/* Preview Canvas */}
              <div className={`mx-auto ${
                previewMode === 'mobile' ? 'max-w-sm' :
                previewMode === 'tablet' ? 'max-w-2xl' :
                'max-w-5xl'
              }`}>
                <PreviewCanvas
                  ref={canvasRef}
                  roomImage={previewState.roomImage}
                  category={previewState.selectedCategory}
                  productSettings={previewState.productSettings}
                  previewSettings={previewState.previewSettings}
                  onSettingsChange={(settings) => 
                    setPreviewState(prev => ({
                      ...prev,
                      previewSettings: { ...prev.previewSettings, ...settings }
                    }))
                  }
                />
              </div>

              {/* Preview Controls */}
              <PreviewControls
                settings={previewState.previewSettings}
                onSettingsChange={(settings) => 
                  setPreviewState(prev => ({
                    ...prev,
                    previewSettings: { ...prev.previewSettings, ...settings }
                  }))
                }
              />

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <Button onClick={handleDownloadPreview} variant="outline">
                  <Download className="mr-2 w-4 h-4" />
                  {t('virtualRoom.download', 'Download')}
                </Button>
                
                {navigator.share && (
                  <Button onClick={handleSharePreview} variant="outline">
                    <Share2 className="mr-2 w-4 h-4" />
                    {t('virtualRoom.share', 'Share')}
                  </Button>
                )}

                <Button onClick={() => setShowQuoteModal(true)}>
                  <Quote className="mr-2 w-4 h-4" />
                  {t('virtualRoom.requestQuote', 'Request Quote')}
                </Button>

                <Button onClick={resetPreview} variant="outline">
                  <RotateCcw className="mr-2 w-4 h-4" />
                  {t('virtualRoom.startOver', 'Start Over')}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Quote Request Modal */}
        {showQuoteModal && (
          <QuoteRequestModal
            isOpen={showQuoteModal}
            onClose={() => setShowQuoteModal(false)}
            previewData={{
              roomImage: previewState.roomImage,
              category: previewState.selectedCategory,
              productSettings: previewState.productSettings
            }}
          />
        )}
      </Container>
    </>
  );
};

export default VirtualRoomPreview;