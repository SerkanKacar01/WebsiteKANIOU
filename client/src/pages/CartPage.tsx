import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "wouter";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard,
  Package,
  ArrowLeft,
  Heart
} from "lucide-react";

export default function CartPage() {
  const { items, summary, loading, updateQuantity, removeFromCart, clearCart } = useCart();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const content = {
    nl: {
      title: "Winkelwagen",
      subtitle: "Bekijk en beheer uw geselecteerde producten",
      empty: "Uw winkelwagen is leeg",
      emptyDesc: "Voeg producten toe om te beginnen met winkelen",
      quantity: "Aantal",
      remove: "Verwijderen",
      clear: "Wagen leegmaken",
      total: "Totaal",
      subtotal: "Subtotaal",
      items: "artikelen",
      checkout: "Afrekenen",
      processing: "Verwerken...",
      continueShopping: "Verder winkelen",
      dimensions: "Afmetingen",
      material: "Materiaal",
      color: "Kleur",
      customizations: "Aanpassingen",
      productAdded: "Product toegevoegd aan winkelwagen",
      updated: "Winkelwagen bijgewerkt",
      removed: "Product verwijderd uit winkelwagen"
    },
    en: {
      title: "Shopping Cart",
      subtitle: "Review and manage your selected products",
      empty: "Your cart is empty",
      emptyDesc: "Add products to start shopping",
      quantity: "Quantity",
      remove: "Remove",
      clear: "Clear cart",
      total: "Total",
      subtotal: "Subtotal",
      items: "items",
      checkout: "Checkout",
      processing: "Processing...",
      continueShopping: "Continue shopping",
      dimensions: "Dimensions",
      material: "Material",
      color: "Color",
      customizations: "Customizations",
      productAdded: "Product added to cart",
      updated: "Cart updated",
      removed: "Product removed from cart"
    },
    fr: {
      title: "Panier",
      subtitle: "Vérifiez et gérez vos produits sélectionnés",
      empty: "Votre panier est vide",
      emptyDesc: "Ajoutez des produits pour commencer vos achats",
      quantity: "Quantité",
      remove: "Supprimer",
      clear: "Vider le panier",
      total: "Total",
      subtotal: "Sous-total",
      items: "articles",
      checkout: "Commander",
      processing: "Traitement...",
      continueShopping: "Continuer les achats",
      dimensions: "Dimensions",
      material: "Matériau",
      color: "Couleur",
      customizations: "Personnalisations",
      productAdded: "Produit ajouté au panier",
      updated: "Panier mis à jour",
      removed: "Produit retiré du panier"
    },
    tr: {
      title: "Alışveriş Sepeti",
      subtitle: "Seçili ürünlerinizi inceleyin ve yönetin",
      empty: "Sepetiniz boş",
      emptyDesc: "Alışverişe başlamak için ürün ekleyin",
      quantity: "Miktar",
      remove: "Kaldır",
      clear: "Sepeti temizle",
      total: "Toplam",
      subtotal: "Ara toplam",
      items: "ürün",
      checkout: "Ödeme",
      processing: "İşleniyor...",
      continueShopping: "Alışverişe devam et",
      dimensions: "Boyutlar",
      material: "Malzeme",
      color: "Renk",
      customizations: "Özelleştirmeler",
      productAdded: "Ürün sepete eklendi",
      updated: "Sepet güncellendi",
      removed: "Ürün sepetten kaldırıldı"
    }
  };

  const currentContent = content[language as keyof typeof content] || content.nl;

  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Winkelwagen leeg",
        description: "Voeg eerst producten toe aan uw winkelwagen",
        variant: "destructive"
      });
      return;
    }

    setCheckoutLoading(true);
    
    try {
      // Create Mollie payment
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          totalAmount: summary.totalAmount,
          currency: 'EUR',
          description: `KANIOU Bestelling - ${items.length} artikel${items.length !== 1 ? 'en' : ''}`,
          redirectUrl: `${window.location.origin}/bedankt`,
          webhookUrl: `${window.location.origin}/api/payment/webhook`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment');
      }

      const { checkoutUrl } = await response.json();
      
      // Redirect to Mollie checkout
      window.location.href = checkoutUrl;
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout fout",
        description: "Er is een fout opgetreden bij het afrekenen. Probeer het opnieuw.",
        variant: "destructive"
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

  const formatDimensions = (item: any) => {
    if (item.width && item.height) {
      return `${item.width} × ${item.height} cm`;
    }
    return null;
  };

  return (
    <>
      <Helmet>
        <title>{currentContent.title} | KANIOU Zilvernaald</title>
        <meta name="description" content={currentContent.subtitle} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <Container>
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {currentContent.title}
                </h1>
                <p className="text-gray-600">{currentContent.subtitle}</p>
              </div>
              <Link href="/producten">
                <Button variant="outline" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {currentContent.continueShopping}
                </Button>
              </Link>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#E6C988] mx-auto"></div>
              <p className="mt-4 text-gray-600">{currentContent.processing}</p>
            </div>
          )}

          {/* Empty Cart */}
          {!loading && items.length === 0 && (
            <Card className="text-center py-16">
              <CardContent>
                <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentContent.empty}
                </h2>
                <p className="text-gray-600 mb-8">{currentContent.emptyDesc}</p>
                <Link href="/producten">
                  <Button size="lg" className="bg-[#E6C988] hover:bg-[#D5B992] text-gray-900">
                    <Package className="w-5 h-5 mr-2" />
                    {currentContent.continueShopping}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Cart Items */}
          {!loading && items.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">
                    {summary.totalItems} {currentContent.items}
                  </h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleClearCart}
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {currentContent.clear}
                  </Button>
                </div>

                {items.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.imageUrl || '/images/htc-620-cleaning-product.jpg'}
                          alt={item.productName}
                          className="w-20 h-20 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = '/images/htc-620-cleaning-product.jpg';
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {item.productName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{item.productType}</p>
                        
                        {/* Product Specifications */}
                        <div className="space-y-1 text-sm text-gray-600">
                          {item.material && (
                            <p><span className="font-medium">{currentContent.material}:</span> {item.material}</p>
                          )}
                          {item.color && (
                            <p><span className="font-medium">{currentContent.color}:</span> {item.color}</p>
                          )}
                          {formatDimensions(item) && (
                            <p><span className="font-medium">{currentContent.dimensions}:</span> {formatDimensions(item)}</p>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{currentContent.quantity}:</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || loading}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              max="50"
                              value={item.quantity}
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value);
                                if (newQuantity >= 1 && newQuantity <= 50) {
                                  handleUpdateQuantity(item.id, newQuantity);
                                }
                              }}
                              className="w-16 h-8 text-center"
                              disabled={loading}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= 50 || loading}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={loading}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            {currentContent.remove}
                          </Button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          €{item.totalPrice.toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500">
                            €{item.unitPrice.toFixed(2)} per stuk
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      Bestelsamenvatting
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>{currentContent.subtotal}:</span>
                      <span>€{summary.totalAmount.toFixed(2)}</span>
                    </div>
                    
                    <div className="text-sm text-gray-600 text-center py-2">
                      Prijs is incl. 21% BTW
                    </div>

                    <hr />

                    <div className="flex justify-between text-lg font-bold">
                      <span>{currentContent.total}:</span>
                      <span>€{summary.totalAmount.toFixed(2)} <span className="text-sm text-gray-600 font-normal">(incl. €{(summary.totalAmount * 0.21 / 1.21).toFixed(2)} BTW)</span></span>
                    </div>

                    <Button 
                      size="lg" 
                      className="w-full bg-[#E10000] hover:bg-[#C50000] text-white"
                      disabled={loading || checkoutLoading}
                      onClick={handleCheckout}
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      {checkoutLoading ? currentContent.processing : currentContent.checkout}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Veilig betalen via Mollie
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}