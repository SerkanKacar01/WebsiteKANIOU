import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard,
  Package,
  X
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CartItem {
  id: number;
  sessionId: string;
  productType: string;
  productName: string;
  material?: string;
  color?: string;
  width?: number;
  height?: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customizations?: any;
  imageUrl?: string;
}

interface CartSummary {
  totalAmount: number;
  totalItems: number;
  currency: string;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
}

const ShoppingCartComponent: React.FC<ShoppingCartProps> = ({ 
  isOpen, 
  onClose, 
  sessionId 
}) => {
  const { t } = useLanguage();
  const [items, setItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<CartSummary>({ totalAmount: 0, totalItems: 0, currency: 'EUR' });
  const [loading, setLoading] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    if (isOpen && sessionId) {
      fetchCartItems();
    }
  }, [isOpen, sessionId]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/cart/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
        setSummary(data.summary || { totalAmount: 0, totalItems: 0, currency: 'EUR' });
      }
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(`/api/cart/item/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.ok) {
        await fetchCartItems();
      }
    } catch (error) {
      console.error('Failed to update item quantity:', error);
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      const response = await fetch(`/api/cart/item/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCartItems();
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`/api/cart/${sessionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setItems([]);
        setSummary({ totalAmount: 0, totalItems: 0, currency: 'EUR' });
      }
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const proceedToCheckout = async () => {
    if (items.length === 0) return;

    try {
      setIsCheckingOut(true);

      // Create payment with Mollie
      const paymentData = {
        amount: summary.totalAmount,
        currency: summary.currency,
        description: `Order for ${items.length} item(s) - KANIOU`,
        customerName: "Customer",
        customerEmail: "customer@example.com",
        productDetails: {
          items: items.map(item => ({
            name: item.productName,
            type: item.productType,
            quantity: item.quantity,
            price: item.unitPrice,
            material: item.material,
            color: item.color,
            dimensions: item.width && item.height ? `${item.width}x${item.height}cm` : null,
          }))
        },
        customerDetails: {
          sessionId: sessionId,
        }
      };

      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        const result = await response.json();
        // Redirect to Mollie checkout
        window.location.href = result.checkoutUrl;
      } else {
        throw new Error('Failed to create payment');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const content = {
    nl: {
      title: "Offerte",
      empty: "Uw offerte is leeg",
      emptyDesc: "Voeg producten toe om te beginnen met winkelen",
      quantity: "Aantal",
      remove: "Verwijderen",
      clear: "Wagen leegmaken",
      total: "Totaal",
      items: "artikelen",
      checkout: "Afrekenen",
      processing: "Verwerken...",
      continueShopping: "Verder winkelen",
      dimensions: "Afmetingen",
    },
    en: {
      title: "Shopping Cart",
      empty: "Your cart is empty",
      emptyDesc: "Add products to start shopping",
      quantity: "Quantity",
      remove: "Remove",
      clear: "Clear cart",
      total: "Total",
      items: "items",
      checkout: "Checkout",
      processing: "Processing...",
      continueShopping: "Continue shopping",
      dimensions: "Dimensions",
    },
    fr: {
      title: "Panier",
      empty: "Votre panier est vide",
      emptyDesc: "Ajoutez des produits pour commencer vos achats",
      quantity: "Quantité",
      remove: "Supprimer",
      clear: "Vider le panier",
      total: "Total",
      items: "articles",
      checkout: "Commander",
      processing: "Traitement...",
      continueShopping: "Continuer les achats",
      dimensions: "Dimensions",
    },
    tr: {
      title: "Alışveriş Sepeti",
      empty: "Sepetiniz boş",
      emptyDesc: "Alışverişe başlamak için ürün ekleyin",
      quantity: "Miktar",
      remove: "Kaldır",
      clear: "Sepeti temizle",
      total: "Toplam",
      items: "ürün",
      checkout: "Ödeme",
      processing: "İşleniyor...",
      continueShopping: "Alışverişe devam",
      dimensions: "Boyutlar",
    }
  };

  const currentContent = content[t.language as keyof typeof content] || content.nl;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="flex items-center text-xl">
            <ShoppingCart className="w-5 h-5 mr-2" />
            {currentContent.title}
            {summary.totalItems > 0 && (
              <Badge variant="secondary" className="ml-2">
                {summary.totalItems}
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {currentContent.empty}
              </h3>
              <p className="text-gray-500 mb-4">{currentContent.emptyDesc}</p>
              <Button onClick={onClose} variant="outline">
                {currentContent.continueShopping}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col max-h-[70vh]">
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.productName}</h4>
                        <p className="text-sm text-gray-500">{item.productType}</p>
                        {item.material && (
                          <p className="text-sm text-gray-500">Material: {item.material}</p>
                        )}
                        {item.color && (
                          <p className="text-sm text-gray-500">Color: {item.color}</p>
                        )}
                        {item.width && item.height && (
                          <p className="text-sm text-gray-500">
                            {currentContent.dimensions}: {item.width}x{item.height}cm
                          </p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-medium">€{item.totalPrice.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">€{item.unitPrice.toFixed(2)} each</p>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">
                    {currentContent.total} ({summary.totalItems} {currentContent.items})
                  </span>
                  <span className="text-2xl font-bold">
                    €{summary.totalAmount.toFixed(2)} {summary.currency}
                  </span>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    disabled={items.length === 0}
                  >
                    {currentContent.clear}
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={proceedToCheckout}
                    disabled={items.length === 0 || isCheckingOut}
                  >
                    {isCheckingOut ? (
                      currentContent.processing
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        {currentContent.checkout}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingCartComponent;