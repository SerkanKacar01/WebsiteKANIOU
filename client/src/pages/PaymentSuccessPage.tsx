import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PaymentOrder {
  id: number;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  mollieStatus: string;
  paidAt?: string;
  productDetails?: any;
}

const PaymentSuccessPage = () => {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [order, setOrder] = useState<PaymentOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const orderId = searchParams.get('orderId');

    if (orderId) {
      fetchOrderDetails(parseInt(orderId));
    } else {
      setLoading(false);
    }
  }, []);

  const fetchOrderDetails = async (orderId: number) => {
    try {
      const response = await fetch(`/api/payment/order/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data.order);
      }
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    } finally {
      setLoading(false);
    }
  };

  const content = {
    nl: {
      title: "Betaling Succesvol!",
      subtitle: "Bedankt voor uw bestelling",
      orderNumber: "Bestelnummer",
      amount: "Bedrag",
      status: "Status",
      paid: "Betaald",
      confirmationEmail: "Een bevestigingsmail is verzonden naar",
      nextSteps: "Volgende Stappen",
      step1: "U ontvangt binnen 24 uur een gedetailleerde offerte",
      step2: "Onze specialist neemt contact met u op voor de opmeting", 
      step3: "Productie en levering binnen 2-3 weken",
      continueShoppingBtn: "Verder Winkelen",
      homeBtn: "Naar Homepage",
      loading: "Laden...",
      orderNotFound: "Bestelling niet gevonden",
      thankYou: "Hartelijk dank voor uw vertrouwen in onze diensten!"
    },
    en: {
      title: "Payment Successful!",
      subtitle: "Thank you for your order",
      orderNumber: "Order Number",
      amount: "Amount",
      status: "Status",
      paid: "Paid",
      confirmationEmail: "A confirmation email has been sent to",
      nextSteps: "Next Steps",
      step1: "You will receive a detailed quote within 24 hours",
      step2: "Our specialist will contact you for measurements",
      step3: "Production and delivery within 2-3 weeks",
      continueShoppingBtn: "Continue Shopping",
      homeBtn: "Go to Homepage",
      loading: "Loading...",
      orderNotFound: "Order not found",
      thankYou: "Thank you for trusting our services!"
    },
    fr: {
      title: "Paiement Réussi!",
      subtitle: "Merci pour votre commande",
      orderNumber: "Numéro de Commande",
      amount: "Montant",
      status: "Statut",
      paid: "Payé",
      confirmationEmail: "Un email de confirmation a été envoyé à",
      nextSteps: "Prochaines Étapes",
      step1: "Vous recevrez un devis détaillé dans les 24 heures",
      step2: "Notre spécialiste vous contactera pour les mesures",
      step3: "Production et livraison dans 2-3 semaines",
      continueShoppingBtn: "Continuer vos Achats",
      homeBtn: "Aller à l'Accueil",
      loading: "Chargement...",
      orderNotFound: "Commande non trouvée",
      thankYou: "Merci de faire confiance à nos services!"
    },
    tr: {
      title: "Ödeme Başarılı!",
      subtitle: "Siparişiniz için teşekkürler",
      orderNumber: "Sipariş Numarası",
      amount: "Tutar",
      status: "Durum",
      paid: "Ödendi",
      confirmationEmail: "Onay e-postası gönderildi",
      nextSteps: "Sonraki Adımlar",
      step1: "24 saat içinde detaylı teklif alacaksınız",
      step2: "Uzmanımız ölçüm için sizinle iletişime geçecek",
      step3: "2-3 hafta içinde üretim ve teslimat",
      continueShoppingBtn: "Alışverişe Devam",
      homeBtn: "Ana Sayfaya Git",
      loading: "Yükleniyor...",
      orderNotFound: "Sipariş bulunamadı",
      thankYou: "Hizmetlerimize güvendiğiniz için teşekkürler!"
    }
  };

  const currentContent = content[t.language as keyof typeof content] || content.nl;

  if (loading) {
    return (
      <Container className="py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-light">{currentContent.loading}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-text-dark mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-text-light mb-2">
            {currentContent.subtitle}
          </p>
          <p className="text-text-light">
            {currentContent.thankYou}
          </p>
        </div>

        {/* Order Details */}
        {order && (
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6 text-text-dark">
                {currentContent.orderNumber}: #{order.id}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-text-light mb-2">
                    <strong>{currentContent.amount}:</strong> €{order.amount.toFixed(2)} {order.currency}
                  </p>
                  <p className="text-text-light mb-2">
                    <strong>{currentContent.status}:</strong> 
                    <span className="text-green-600 ml-2">{currentContent.paid}</span>
                  </p>
                  <p className="text-text-light">
                    <strong>{currentContent.confirmationEmail}:</strong> {order.customerEmail}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-text-dark">Product Details:</h3>
                  <p className="text-text-light">{order.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-text-dark flex items-center">
              <Package className="w-6 h-6 mr-3" />
              {currentContent.nextSteps}
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                  1
                </div>
                <p className="text-text-light">{currentContent.step1}</p>
              </div>
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                  2
                </div>
                <p className="text-text-light">{currentContent.step2}</p>
              </div>
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                  3
                </div>
                <p className="text-text-light">{currentContent.step3}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            className="flex items-center"
          >
            <Home className="w-4 h-4 mr-2" />
            {currentContent.homeBtn}
          </Button>
          <Button
            onClick={() => setLocation("/products")}
            className="flex items-center"
          >
            {currentContent.continueShoppingBtn}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default PaymentSuccessPage;