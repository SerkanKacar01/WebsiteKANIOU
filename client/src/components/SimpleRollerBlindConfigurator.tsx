import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2, ChevronRight, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const emailSchema = z.object({
  email: z.string().email("Vul een geldig e-mailadres in"),
  website: z.string().max(0).optional(),
});

type EmailFormValues = z.infer<typeof emailSchema>;

const colorOptions = [
  { id: "wit", name: "Wit", color: "#FFFFFF", borderColor: "#E5E7EB" },
  { id: "creme", name: "Crème", color: "#FDF6E3", borderColor: "#E5D3B3" },
  { id: "beige", name: "Beige", color: "#F5F5DC", borderColor: "#D1D5DB" },
  { id: "grijs", name: "Grijs", color: "#9CA3AF", borderColor: "#6B7280" },
  { id: "taupe", name: "Taupe", color: "#D2B48C", borderColor: "#B8956A" },
  { id: "zand", name: "Zand", color: "#F4A460", borderColor: "#CD853F" },
  { id: "antraciet", name: "Antraciet", color: "#4B5563", borderColor: "#374151" },
  { id: "zwart", name: "Zwart", color: "#1F2937", borderColor: "#111827" },
];

const SimpleRollerBlindConfigurator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedColor, setSelectedColor] = useState<typeof colorOptions[0] | null>(null);
  const [fabricType, setFabricType] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", website: "" },
  });

  const emailMutation = useMutation({
    mutationFn: async (data: EmailFormValues) => {
      return apiRequest("POST", "/api/contact", {
        name: "Staalverzoek",
        email: data.email,
        subject: "Gratis stofstalen rolgordijn",
        message: `Kleur: ${selectedColor?.name || "onbekend"} — Stoftype: ${fabricType || "onbekend"}`,
        type: "question",
      });
    },
    onSuccess: () => {
      setEmailSubmitted(true);
      toast({ title: "Aanvraag ontvangen!", description: "U ontvangt uw gratis stofstalen binnen 2–3 werkdagen." });
    },
    onError: () => {
      toast({ title: "Er ging iets mis", description: "Probeer het later opnieuw.", variant: "destructive" });
    },
  });

  const handleColorSelect = (color: typeof colorOptions[0]) => {
    setSelectedColor(color);
  };

  const handleFabricTypeSelect = (value: string) => {
    setFabricType(value);
    setCurrentStep(3);
  };

  const handleEmailSubmit = (data: EmailFormValues) => {
    if (data.website) return;
    emailMutation.mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      {/* Stap 1 – Kleur kiezen */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 1 ? "bg-[#2C3E50] text-white" : "bg-gray-200 text-gray-600"}`}>1</span>
            Kies uw favoriete kleur
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-6">
            {colorOptions.map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorSelect(color)}
                className={`flex flex-col items-center group transition-all duration-200 ${
                  selectedColor?.id === color.id ? "scale-105" : "hover:scale-105"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-full border-4 mx-auto transition-all ${
                    selectedColor?.id === color.id ? "ring-4 ring-[#D5B992] ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: color.color, borderColor: color.borderColor }}
                />
                <p className="text-xs font-medium mt-2 text-gray-700 text-center">{color.name}</p>
                {selectedColor?.id === color.id && (
                  <CheckCircle className="w-5 h-5 text-[#D5B992] mt-1" />
                )}
              </button>
            ))}
          </div>

          {selectedColor && !emailSubmitted && (
            <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-amber-900 mb-4 text-center font-medium">
                Ontvang gratis stofstalen in <strong>{selectedColor.name}</strong> — vul uw e-mailadres in:
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleEmailSubmit)} className="space-y-3">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <input {...field} type="text" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mailadres</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="uw@email.be" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={emailMutation.isPending}
                    className="w-full bg-[#2C3E50] hover:bg-[#1a252f] text-white"
                  >
                    {emailMutation.isPending ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Bezig met verzenden...</>
                    ) : (
                      <>Gratis stalen aanvragen <ChevronRight className="w-4 h-4 ml-1" /></>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          )}

          {emailSubmitted && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-800 font-medium mb-3">
                Aanvraag ontvangen! U ontvangt uw stofstalen binnen 2–3 werkdagen.
              </p>
              <Button onClick={() => setCurrentStep(2)} className="bg-green-600 hover:bg-green-700 text-white">
                Ga verder met stap 2 <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}

          {selectedColor && !emailSubmitted && (
            <div className="mt-3 text-center">
              <button
                onClick={() => setCurrentStep(2)}
                className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2"
              >
                Overslaan en verder gaan zonder stalen
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stap 2 – Stoftype kiezen */}
      {currentStep >= 2 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 2 ? "bg-[#2C3E50] text-white" : "bg-gray-200 text-gray-600"}`}>2</span>
              Kies het type stof
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={fabricType} onValueChange={handleFabricTypeSelect} className="space-y-3">
              {[
                { value: "verduisterend", label: "Verduisterend (Blackout)", desc: "Blokkeert licht volledig — ideaal voor slaapkamers" },
                { value: "lichtdoorlatend", label: "Lichtdoorlatend", desc: "Laat zachte lichtinval door voor een aangename sfeer" },
                { value: "screenstof", label: "Screenstof", desc: "Perfecte balans tussen licht en privacy" },
              ].map((opt) => (
                <div key={opt.value} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value={opt.value} id={opt.value} />
                  <div className="flex-1">
                    <Label htmlFor={opt.value} className="text-base font-medium cursor-pointer">{opt.label}</Label>
                    <p className="text-sm text-gray-500">{opt.desc}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Stap 3 – Offerte aanvragen */}
      {currentStep >= 3 && (
        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            <h3 className="text-xl font-bold text-gray-900">Uitstekend! Uw voorkeuren zijn opgeslagen.</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-left space-y-1 max-w-xs mx-auto">
              {selectedColor && (
                <p className="text-sm text-gray-600">Kleur: <span className="font-medium">{selectedColor.name}</span></p>
              )}
              <p className="text-sm text-gray-600">Stoftype: <span className="font-medium capitalize">{fabricType}</span></p>
            </div>
            <p className="text-gray-600 text-sm">
              Vraag nu een vrijblijvende offerte aan — onze specialist neemt contact met u op.
            </p>
            <Button
              onClick={() => window.location.href = "/offerte"}
              size="lg"
              className="bg-[#2C3E50] hover:bg-[#1a252f] text-white px-8"
            >
              Offerte aanvragen <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Voortgangsindicator */}
      <div className="mt-8 flex justify-center items-center space-x-3">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              currentStep >= step ? "bg-[#2C3E50] text-white" : "bg-gray-200 text-gray-600"
            }`}>
              {step}
            </div>
            {step < 3 && (
              <div className={`w-10 h-1 transition-colors ${currentStep > step ? "bg-[#2C3E50]" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleRollerBlindConfigurator;
