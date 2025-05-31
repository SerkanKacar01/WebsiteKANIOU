import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Quote, Send, CheckCircle } from "lucide-react";

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  previewData: {
    roomImage: string | null;
    category: string | null;
    productSettings: any;
  };
}

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const QuoteRequestModal = ({ isOpen, onClose, previewData }: QuoteRequestModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof QuoteFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real implementation, this would save to the virtual room previews table
      // and send the quote request with the preview data
      
      const quoteData = {
        ...formData,
        productCategory: previewData.category,
        productSettings: previewData.productSettings,
        roomImageUrl: previewData.roomImage,
        source: 'virtual-room-preview'
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSubmitted(true);
      toast({
        title: "Quote Request Sent!",
        description: "We'll contact you within 24 hours with your personalized quote.",
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitted(false);
    onClose();
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={resetAndClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quote Request Sent!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your interest. We'll review your virtual room preview and 
              contact you within 24 hours with a personalized quote.
            </p>
            <Button onClick={resetAndClose}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Quote className="mr-2 w-5 h-5" />
            Request Quote for Your Virtual Preview
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview Summary */}
          <Card>
            <CardContent className="pt-4">
              <h4 className="font-medium mb-3">Your Selection</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge>{previewData.category?.replace('-', ' ')}</Badge>
                  {previewData.productSettings.material && 
                    <Badge variant="outline">{previewData.productSettings.material}</Badge>
                  }
                  {previewData.productSettings.color && 
                    <Badge variant="outline">{previewData.productSettings.color}</Badge>
                  }
                  {previewData.productSettings.style && 
                    <Badge variant="outline">{previewData.productSettings.style}</Badge>
                  }
                </div>
                <p className="text-sm text-gray-600">
                  Based on your virtual room preview, we'll provide a detailed quote 
                  including measurements, materials, and installation.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quote Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="message">Additional Requirements (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Any specific requirements, dimensions, or questions about your selection..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={4}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• We'll review your virtual preview and specifications</li>
                <li>• Schedule a free measurement appointment if needed</li>
                <li>• Provide a detailed quote within 24 hours</li>
                <li>• No obligation - completely free service</li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 w-4 h-4" />
                    Send Quote Request
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};