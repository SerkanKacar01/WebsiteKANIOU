import { Helmet } from 'react-helmet-async';
import Container from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Paintbrush, Palette, CheckCircle, Clock, Star, ArrowRight, Phone, Mail } from 'lucide-react';
import { Link } from 'wouter';

export default function ScreenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF]">
      <Helmet>
        <title>Design Gereed - Screen Raamdecoratie | KANIOU Zilvernaald</title>
        <meta 
          name="description" 
          content="Design gereed screen raamdecoratie van KANIOU Zilvernaald. Professioneel ontwikkelde designs, klaar voor productie en installatie." 
        />
        <meta name="keywords" content="design gereed, screen design, raamdecoratie ontwerp, België" />
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
              <BreadcrumbPage>Screen - Design Gereed</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-8">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Paintbrush className="h-10 w-10 text-[#D5B992]" />
              <div className="bg-gradient-to-r from-[#D5B992] to-[#C5A565] text-white px-6 py-3 rounded-full text-sm font-bold tracking-wider">
                DESIGN GEREED
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-[#2C3E50] mb-4">
              Screen
            </h1>
            
            <p className="text-2xl text-[#2C3E50] font-medium mb-4">
              Professioneel Design - Klaar voor Realisatie
            </p>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Uw screen raamdecoratie is volledig uitgewerkt en design gereed. Van concept tot technische specificaties - 
              alles is professioneel voorbereid voor een perfecte uitvoering.
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <CardTitle className="text-xl text-[#2C3E50]">Design Voltooid</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Alle technische tekeningen en specificaties zijn afgerond en goedgekeurd.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <Palette className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                <CardTitle className="text-xl text-[#2C3E50]">Materialen Geselecteerd</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Hoogwaardige materialen en kleuren zijn zorgvuldig uitgekozen voor optimaal resultaat.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                <CardTitle className="text-xl text-[#2C3E50]">Productie Klaar</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Uw screen is gereed om in productie te gaan. Snelle levering gegarandeerd.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Design Features */}
          <Card className="bg-white shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-[#2C3E50] mb-4">
                Uw Design Voordelen
              </CardTitle>
              <p className="text-gray-600 text-lg">
                Professioneel uitgewerkt tot in de kleinste details
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D5B992] to-[#C5A565] rounded-full mx-auto flex items-center justify-center">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-[#2C3E50]">Premium Kwaliteit</h3>
                  <p className="text-gray-600 text-sm">Uitsluitend gebruik van hoogwaardige materialen</p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2C3E50] to-[#34495E] rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-[#2C3E50]">Perfecte Pasvorm</h3>
                  <p className="text-gray-600 text-sm">Millimeter precies op maat gemaakt</p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto flex items-center justify-center">
                    <Paintbrush className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-[#2C3E50]">Design Excellence</h3>
                  <p className="text-gray-600 text-sm">Stijlvol en functioneel ontwerp</p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto flex items-center justify-center">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-[#2C3E50]">Snelle Levering</h3>
                  <p className="text-gray-600 text-sm">Efficiënte productie en montage</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] text-white shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold mb-4">Klaar voor de Volgende Stap?</CardTitle>
              <p className="text-xl text-gray-200">
                Uw screen design is gereed. Laten we uw visie werkelijkheid maken.
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
                <Link href="/offerte">
                  <Button 
                    className="w-full bg-[#D5B992] hover:bg-[#C5A565] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                    data-testid="button-offerte"
                  >
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Start Offerte
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    variant="outline" 
                    className="w-full border-white text-white hover:bg-white hover:text-[#2C3E50] font-bold py-3 px-6 rounded-lg transition-all duration-300"
                    data-testid="button-contact"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Contact
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 pt-6 border-t border-gray-600">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-[#D5B992]" />
                  <span className="text-sm">+32 467 85 64 05</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-[#D5B992]" />
                  <span className="text-sm">info@kaniou.be</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}