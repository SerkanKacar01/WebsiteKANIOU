import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Clock, CheckCircle, Phone, Mail } from "lucide-react";

const OffertePage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    productType: "",
    rooms: "",
    budget: "",
    message: "",
    urgency: "",
    newsletter: false,
  });

  const productTypes = [
    "Rolgordijnen",
    "Plissé Gordijnen",
    "Jaloezieën",
    "Overgordijnen",
    "Fly Screens (Horren)",
    "Combinatie van Producten",
    "Nog niet zeker",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Vereiste velden ontbreken",
        description: "Vul alstublieft alle verplichte velden in.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Offerte aanvraag verzonden!",
      description: "We nemen binnen 24 uur contact met u op.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      productType: "",
      rooms: "",
      budget: "",
      message: "",
      urgency: "",
      newsletter: false,
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <Container>
        <div className="py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Gratis Offerte Aanvragen
            </h1>
            <p className="text-lg text-text-medium max-w-2xl mx-auto">
              Ontvang binnen 24 uur uw persoonlijke offerte voor premium
              raamdecoratie. Geen verplichtingen, wel deskundig advies.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quote Request Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    Offerte Formulier
                  </CardTitle>
                  <CardDescription>
                    Vul onderstaande gegevens in voor uw persoonlijke offerte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Naam *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder="Uw volledige naam"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">E-mail *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="uw.email@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Telefoon *</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            placeholder="06-12345678"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">Adres</Label>
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) =>
                              handleInputChange("address", e.target.value)
                            }
                            placeholder="Straat, nummer, postcode, plaats"
                          />
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="productType">
                            Type Raamdecoratie
                          </Label>
                          <Select
                            onValueChange={(value) =>
                              handleInputChange("productType", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecteer product type" />
                            </SelectTrigger>
                            <SelectContent>
                              {productTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="rooms">Aantal Ramen/Kamers</Label>
                          <Input
                            id="rooms"
                            value={formData.rooms}
                            onChange={(e) =>
                              handleInputChange("rooms", e.target.value)
                            }
                            placeholder="Bijv. 5 ramen, 3 kamers"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="budget">Indicatief Budget</Label>
                          <Select
                            onValueChange={(value) =>
                              handleInputChange("budget", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecteer budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-500">
                                Onder €500
                              </SelectItem>
                              <SelectItem value="500-1000">
                                €500 - €1.000
                              </SelectItem>
                              <SelectItem value="1000-2500">
                                €1.000 - €2.500
                              </SelectItem>
                              <SelectItem value="2500-5000">
                                €2.500 - €5.000
                              </SelectItem>
                              <SelectItem value="over-5000">
                                Boven €5.000
                              </SelectItem>
                              <SelectItem value="unknown">
                                Nog niet bekend
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="urgency">Gewenste Termijn</Label>
                          <Select
                            onValueChange={(value) =>
                              handleInputChange("urgency", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Wanneer wilt u dit realiseren?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asap">
                                Zo snel mogelijk
                              </SelectItem>
                              <SelectItem value="1-month">
                                Binnen 1 maand
                              </SelectItem>
                              <SelectItem value="3-months">
                                Binnen 3 maanden
                              </SelectItem>
                              <SelectItem value="6-months">
                                Binnen 6 maanden
                              </SelectItem>
                              <SelectItem value="flexible">Flexibel</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message">Aanvullende Informatie</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          placeholder="Beschrijf uw wensen, specifieke eisen, of andere relevante informatie..."
                          rows={4}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={formData.newsletter}
                          onCheckedChange={(checked) =>
                            handleInputChange("newsletter", checked as boolean)
                          }
                        />
                        <Label htmlFor="newsletter" className="text-sm">
                          Ja, ik wil graag de nieuwsbrief ontvangen met acties
                          en tips
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-[#D0B378] hover:bg-[#C5A565] text-white"
                        size="lg"
                      >
                        Gratis Offerte Aanvragen
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar with Benefits */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Waarom KANIOU?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">24-uur Service</h4>
                        <p className="text-sm text-text-medium">
                          Offerte binnen 24 uur in uw mailbox
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Gratis Advies</h4>
                        <p className="text-sm text-text-medium">
                          Deskundig advies zonder verplichtingen
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calculator className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Maatwerk</h4>
                        <p className="text-sm text-text-medium">
                          Elke offerte op maat gemaakt
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Direct Contact</CardTitle>
                    <CardDescription>
                      Liever persoonlijk contact? Bel of mail ons direct.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">+32 467 85 64 05</p>
                        <p className="text-sm text-text-medium">
                          Ma-Vr: 10:00-18:00
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">info@kaniou.be</p>
                        <p className="text-sm text-text-medium">
                          24/7 bereikbaar
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => (window.location.href = "/contact")}
                    >
                      Naar Contactpagina
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
        </div>
      </Container>
    </div>
  );
};

export default OffertePage;
