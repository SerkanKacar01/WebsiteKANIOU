import { useState } from "react";
import { useLocation } from "wouter";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const OrderTrackingSearchBar = () => {
  const [, navigate] = useLocation();
  const [orderNumber, setOrderNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTrackOrder = async () => {
    if (!orderNumber.trim()) {
      toast({
        title: "Bestelnummer vereist",
        description: "Voer uw bestelnummer in om uw bestelling te volgen.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Check if order exists by bonnummer
      const response = await fetch(`/api/orders/track/bonnummer/${orderNumber.trim()}`);
      
      if (response.ok) {
        const order = await response.json();
        // Redirect to order status page using the order ID
        navigate(`/bestelling-status/${order.id}`);
      } else if (response.status === 404) {
        toast({
          title: "Bestelling niet gevonden",
          description: "Er is geen bestelling gevonden met dit bestelnummer. Controleer het nummer en probeer opnieuw.",
          variant: "destructive",
        });
      } else {
        throw new Error("Network error");
      }
    } catch (error) {
      console.error("Error tracking order:", error);
      toast({
        title: "Fout bij het opzoeken",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTrackOrder();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <Search className="h-5 w-5 text-[#E9C882]" />
          </div>
          
          <Input
            type="text"
            placeholder="Bestelnummer invoeren..."
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-700 placeholder:text-gray-500"
            disabled={isLoading}
          />
          
          <Button
            onClick={handleTrackOrder}
            disabled={isLoading || !orderNumber.trim()}
            className="bg-[#E9C882] hover:bg-[#D5B992] text-gray-800 font-medium px-6 py-2 rounded-xl transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? "..." : "Volg"}
          </Button>
        </div>
        
        <div className="text-xs text-gray-600 mt-2 text-center">
          Voer uw bestelnummer in om de status van uw bestelling te bekijken
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingSearchBar;