import { Helmet } from 'react-helmet-async';
import Container from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Sun, Shield, Phone, Mail, MapPin } from 'lucide-react';

export default function ScreenPage() {
  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      <Helmet>
        <title>Screen Buiten Zonwering - Moderne Buitenzonwering | KANIOU Zilvernaald</title>
        <meta 
          name="description" 
          content="Screen buiten zonwering van KANIOU Zilvernaald. Moderne buitenzonwering voor optimale bescherming tegen zon en wind. Professionele montage en maatwerk." 
        />
        <meta name="keywords" content="screen zonwering, buiten zonwering, buitenzonwering, screens op maat, België" />
      </Helmet>
      
      <Container className="py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/producten">Producten</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Screen</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-6">
          {/* Hero Section */}
          <Card className="bg-white shadow-sm border-[#E6C988]/20">
            <CardHeader className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sun className="h-8 w-8 text-[#D5B992]" />
                <div className="bg-[#D5B992] text-white px-4 py-2 rounded-full text-sm font-medium">
                  BUITEN ZONWERING
                </div>
              </div>
              <CardTitle className="text-4xl font-bold text-[#2C3E50] mb-2">
                Screen
              </CardTitle>
              <p className="text-xl text-[#2C3E50] font-medium">
                Moderne Buitenzonwering voor Optimale Bescherming
              </p>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                Ontdek onze hoogwaardige screen zonwering voor buiten. Perfect voor moderne woningen en bedrijven die zoeken naar stijlvolle bescherming tegen zon, wind en inkijk.
              </p>
            </CardHeader>
          </Card>

          {/* Placeholder voor content die later komt */}
          <Card className="bg-white shadow-sm border-[#E6C988]/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#2C3E50] flex items-center gap-2">
                <Shield className="h-6 w-6 text-[#D5B992]" />
                Productinformatie volgt binnenkort
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#F8F9FA] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Sun className="h-8 w-8 text-[#D5B992]" />
                </div>
                <p className="text-gray-600 text-lg">
                  Gedetailleerde informatie over onze screen buiten zonwering wordt binnenkort toegevoegd.
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Neem contact op voor meer informatie over onze screen producten.
                  Betaalbare Buiten Zonwering met Premium Kwaliteit

                  Bij KANIOU Zilvernaald geloven we dat kwaliteit niet onbereikbaar hoeft te zijn. Onze screen zonwering is niet alleen stijlvol en functioneel, maar ook toegankelijk geprijsd. Dankzij onze rechtstreekse samenwerking met fabrikanten kunnen we maatwerk bieden tegen eerlijke en betaalbare tarieven — zonder in te leveren op duurzaamheid of design.

                  👉 Investeer slim in comfort én uitstraling, zonder je budget te overschrijden.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] text-white shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold mb-2">Interesse in Screen Buiten Zonwering?</CardTitle>
              <p className="text-lg">
                Neem contact op voor advies en informatie over onze screen producten
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <MapPin className="h-8 w-8 text-[#E6C988]" />
                  <p className="text-sm">Pauwengraaf 66, Maasmechelen</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Mail className="h-8 w-8 text-[#E6C988]" />
                  <p className="text-sm">info@kaniou.be</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Phone className="h-8 w-8 text-[#E6C988]" />
                  <p className="text-sm">+32 467 85 64 05</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}