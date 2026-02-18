import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Copy,
  Trash2,
  Check,
  Building2,
  Home,
  Ruler,
  Palette,
  Calendar,
  User,
  Send,
  ChevronDown,
  ChevronUp,
  X,
  Layers,
  SquareStack,
  Info,
} from "lucide-react";

interface Window {
  id: string;
  label: string;
  width: string;
  height: string;
  mountType: string;
  quantity: string;
}

interface Room {
  id: string;
  name: string;
  customName: string;
  notes: string;
  windows: Window[];
}

interface FormData {
  customerType: string;
  projectType: string;
  planning: string;
  hasMeasurements: string;
  roomCount: string;
  rooms: Room[];
  prefMode: string;
  productTypes: string[];
  lightControl: string;
  style: string;
  colorPref: string;
  extraNotes: string;
  services: string[];
  contactPref: string;
  preferredTime: string;
  region: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  companyName: string;
  vatNumber: string;
  gdprConsent: boolean;
}

const INITIAL_WINDOW: () => Window = () => ({
  id: crypto.randomUUID(),
  label: "",
  width: "",
  height: "",
  mountType: "",
  quantity: "1",
});

const INITIAL_ROOM: () => Room = () => ({
  id: crypto.randomUUID(),
  name: "",
  customName: "",
  notes: "",
  windows: [INITIAL_WINDOW()],
});

const STEPS = [
  { label: "Project", icon: Building2 },
  { label: "Ruimtes & Ramen", icon: Ruler },
  { label: "Voorkeuren", icon: Palette },
  { label: "Diensten", icon: Calendar },
  { label: "Contact", icon: User },
];

const ROOM_OPTIONS = ["Woonkamer", "Keuken", "Slaapkamer", "Bureau", "Hal", "Kinderkamer", "Badkamer", "Andere"];

const PRODUCT_OPTIONS = [
  "Overgordijnen", "Vitrage", "Wave gordijnen", "Dubbele plooi",
  "Vouwgordijnen", "Rolgordijnen", "Duo rolgordijnen",
  "Lamellen", "Jaloezieën", "Shutters",
];

const QuoteWizard = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [mobileOverview, setMobileOverview] = useState(false);

  const [form, setForm] = useState<FormData>({
    customerType: "",
    projectType: "",
    planning: "",
    hasMeasurements: "",
    roomCount: "1",
    rooms: [INITIAL_ROOM()],
    prefMode: "all",
    productTypes: [],
    lightControl: "",
    style: "",
    colorPref: "",
    extraNotes: "",
    services: [],
    contactPref: "",
    preferredTime: "",
    region: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    postalCode: "",
    city: "",
    country: "België",
    companyName: "",
    vatNumber: "",
    gdprConsent: false,
  });

  const update = useCallback((key: keyof FormData, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateRoom = useCallback((roomId: string, key: keyof Room, value: any) => {
    setForm((prev) => ({
      ...prev,
      rooms: prev.rooms.map((r) => (r.id === roomId ? { ...r, [key]: value } : r)),
    }));
  }, []);

  const updateWindow = useCallback((roomId: string, winId: string, key: keyof Window, value: any) => {
    setForm((prev) => ({
      ...prev,
      rooms: prev.rooms.map((r) =>
        r.id === roomId
          ? { ...r, windows: r.windows.map((w) => (w.id === winId ? { ...w, [key]: value } : w)) }
          : r
      ),
    }));
  }, []);

  const addRoom = useCallback(() => {
    setForm((prev) => ({ ...prev, rooms: [...prev.rooms, INITIAL_ROOM()] }));
  }, []);

  const removeRoom = useCallback((roomId: string) => {
    setForm((prev) => ({
      ...prev,
      rooms: prev.rooms.length > 1 ? prev.rooms.filter((r) => r.id !== roomId) : prev.rooms,
    }));
  }, []);

  const addWindow = useCallback((roomId: string) => {
    setForm((prev) => ({
      ...prev,
      rooms: prev.rooms.map((r) =>
        r.id === roomId ? { ...r, windows: [...r.windows, INITIAL_WINDOW()] } : r
      ),
    }));
  }, []);

  const duplicateWindow = useCallback((roomId: string, winId: string) => {
    setForm((prev) => ({
      ...prev,
      rooms: prev.rooms.map((r) => {
        if (r.id !== roomId) return r;
        const source = r.windows.find((w) => w.id === winId);
        if (!source) return r;
        return { ...r, windows: [...r.windows, { ...source, id: crypto.randomUUID(), label: source.label + " (kopie)" }] };
      }),
    }));
  }, []);

  const removeWindow = useCallback((roomId: string, winId: string) => {
    setForm((prev) => ({
      ...prev,
      rooms: prev.rooms.map((r) =>
        r.id === roomId && r.windows.length > 1
          ? { ...r, windows: r.windows.filter((w) => w.id !== winId) }
          : r
      ),
    }));
  }, []);

  const toggleProduct = useCallback((product: string) => {
    setForm((prev) => ({
      ...prev,
      productTypes: prev.productTypes.includes(product)
        ? prev.productTypes.filter((p) => p !== product)
        : [...prev.productTypes, product],
    }));
  }, []);

  const toggleService = useCallback((service: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  }, []);

  const totalWindows = form.rooms.reduce((sum, r) => sum + r.windows.length, 0);

  const validateStep = (s: number): string | null => {
    if (s === 0) {
      if (!form.customerType) return "Kies een type klant";
      if (!form.projectType) return "Kies een type project";
      if (!form.planning) return "Kies een planning";
      if (!form.hasMeasurements) return "Geef aan of u maten heeft";
    }
    if (s === 1) {
      for (const room of form.rooms) {
        if (!room.name) return "Geef elke ruimte een naam";
        for (const win of room.windows) {
          if (!win.width || !win.height) return "Vul breedte en hoogte in voor elk raam";
          if (Number(win.width) <= 0 || Number(win.height) <= 0) return "Maten moeten positieve getallen zijn";
        }
      }
    }
    if (s === 2) {
      if (form.productTypes.length === 0) return "Selecteer minstens één producttype";
    }
    if (s === 4) {
      if (!form.firstName) return "Voornaam is verplicht";
      if (!form.lastName) return "Achternaam is verplicht";
      if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Geldig e-mailadres is verplicht";
      if (!form.phone) return "Telefoonnummer is verplicht";
      if (!form.gdprConsent) return "Geef toestemming voor gegevensverwerking";
    }
    return null;
  };

  const nextStep = () => {
    const error = validateStep(step);
    if (error) {
      toast({ title: "Controleer uw invoer", description: error, variant: "destructive" });
      return;
    }
    setStep((s) => Math.min(s + 1, 4));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        customerType: form.customerType,
        projectType: form.projectType,
        planning: form.planning,
        hasMeasurements: form.hasMeasurements === "ja",
        rooms: form.rooms.map((r) => ({
          name: r.name === "Andere" ? r.customName : r.name,
          notes: r.notes,
          windows: r.windows.map((w) => ({
            label: w.label,
            widthCm: Number(w.width),
            heightCm: Number(w.height),
            mountType: w.mountType,
            quantity: Number(w.quantity) || 1,
          })),
        })),
        preferences: {
          mode: form.prefMode,
          productTypes: form.productTypes,
          lightControl: form.lightControl,
          style: form.style,
          colorPref: form.colorPref,
          extraNotes: form.extraNotes,
        },
        services: {
          selected: form.services,
          contactPref: form.contactPref,
          preferredTime: form.preferredTime,
          region: form.region,
        },
        contact: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          street: form.street,
          postalCode: form.postalCode,
          city: form.city,
          country: form.country,
          companyName: form.companyName,
          vatNumber: form.vatNumber,
        },
      };
      const res = await apiRequest("POST", "/api/enterprise-quote-requests", payload);
      return res.json();
    },
    onSuccess: (data: any) => {
      setSubmissionId(data.submissionId || "");
      setSubmitted(true);
    },
    onError: () => {
      toast({ title: "Fout", description: "Verzending mislukt. Probeer het opnieuw.", variant: "destructive" });
    },
  });

  const handleSubmit = () => {
    const error = validateStep(4);
    if (error) {
      toast({ title: "Controleer uw invoer", description: error, variant: "destructive" });
      return;
    }
    mutation.mutate();
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-10 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-[#2C3E50] mb-3">
              Bedankt — uw offerteaanvraag werd succesvol ontvangen.
            </h2>
            <p className="text-gray-500 mb-2">Referentienummer: <span className="font-mono font-semibold text-[#2C3E50]">{submissionId}</span></p>
            <p className="text-gray-500 mb-8">Wij nemen binnen 24 uur contact met u op.</p>

            <div className="text-left bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-[#2C3E50] mb-4">Overzicht</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium text-gray-800">Type:</span> {form.customerType} — {form.projectType}</p>
                <p><span className="font-medium text-gray-800">Ruimtes:</span> {form.rooms.length} | <span className="font-medium text-gray-800">Ramen:</span> {totalWindows}</p>
                <p><span className="font-medium text-gray-800">Producten:</span> {form.productTypes.join(", ")}</p>
                <p><span className="font-medium text-gray-800">Contact:</span> {form.firstName} {form.lastName} — {form.email}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={() => { setSubmitted(false); setStep(0); }}>
                Aanvraag bewerken
              </Button>
              <Button onClick={() => { setForm({ ...form, rooms: [INITIAL_ROOM()], productTypes: [], services: [], gdprConsent: false }); setSubmitted(false); setStep(0); }}>
                Nieuwe aanvraag
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const planningLabels: Record<string, string> = {
    asap: "Zo snel mogelijk",
    "2-4w": "Binnen 2–4 weken",
    "1-2m": "Binnen 1–2 maanden",
    later: "Geen haast",
  };

  const lightLabels: Record<string, string> = {
    transparant: "Transparant",
    lichtdoorlatend: "Lichtdoorlatend",
    verduisterend: "Verduisterend",
    "weet-niet": "Weet ik niet",
  };

  const colorLabels: Record<string, string> = {
    neutraal: "Neutraal (wit/beige/grijs)",
    warm: "Warme tinten",
    donker: "Donkere tinten",
    aardetinten: "Aardetinten",
    geen: "Geen voorkeur",
  };

  const contactPrefLabels: Record<string, string> = {
    telefoon: "Telefoon",
    whatsapp: "WhatsApp",
    email: "E-mail",
  };

  const timeLabels: Record<string, string> = {
    ochtend: "Weekdag ochtend",
    namiddag: "Weekdag namiddag",
    avond: "Weekdag avond",
    zaterdag: "Zaterdag",
  };

  const OverviewRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between text-sm gap-2">
      <span className="text-gray-500 flex-shrink-0">{label}</span>
      <span className="font-medium text-[#2C3E50] text-right">{value}</span>
    </div>
  );

  const OverviewPanel = () => (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-[#2C3E50] uppercase tracking-wider">Offerteoverzicht</h3>

      {(form.customerType || form.projectType || form.planning || form.hasMeasurements) && (
        <div className="space-y-1.5 pb-3 border-b border-gray-100">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Project</p>
          {form.customerType && <OverviewRow label="Klant" value={form.customerType} />}
          {form.projectType && <OverviewRow label="Project" value={form.projectType} />}
          {form.planning && <OverviewRow label="Planning" value={planningLabels[form.planning] || form.planning} />}
          {form.hasMeasurements && <OverviewRow label="Maten" value={form.hasMeasurements === "ja" ? "Ja, beschikbaar" : "Nee, opmeting gewenst"} />}
        </div>
      )}

      <div className="space-y-1.5 pb-3 border-b border-gray-100">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Ruimtes & Ramen</p>
        <OverviewRow label="Ruimtes" value={String(form.rooms.length)} />
        <OverviewRow label="Totaal ramen" value={String(totalWindows)} />
        {form.rooms.map((room, ri) => (
          <div key={room.id} className="text-sm mt-1">
            <p className="font-medium text-[#2C3E50] text-xs">{room.name === "Andere" ? room.customName || "Ruimte" : room.name || `Ruimte ${ri + 1}`}</p>
            {room.notes && <p className="text-[11px] text-gray-400 ml-3 italic">{room.notes}</p>}
            {room.windows.map((w, wi) => (
              <div key={w.id} className="ml-3 text-gray-500 text-xs flex items-center gap-1.5 py-0.5">
                <span className="w-1.5 h-1.5 bg-[#C4A36C] rounded-full flex-shrink-0"></span>
                <span>{w.label || `Raam ${wi + 1}`}</span>
                {w.width && w.height && <span className="text-gray-400">— {w.width}×{w.height} cm</span>}
                {w.mountType && <span className="text-gray-400">({w.mountType})</span>}
                {Number(w.quantity) > 1 && <span className="text-gray-400">×{w.quantity}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>

      {(form.productTypes.length > 0 || form.lightControl || form.style || form.colorPref) && (
        <div className="space-y-1.5 pb-3 border-b border-gray-100">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Voorkeuren</p>
          {form.productTypes.length > 0 && (
            <div className="text-sm">
              <span className="text-gray-500 text-xs">Producten</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {form.productTypes.map((p) => (
                  <span key={p} className="px-2 py-0.5 bg-[#2C3E50]/5 text-[#2C3E50] rounded text-xs">{p}</span>
                ))}
              </div>
            </div>
          )}
          {form.lightControl && <OverviewRow label="Lichtinval" value={lightLabels[form.lightControl] || form.lightControl} />}
          {form.style && <OverviewRow label="Stijl" value={form.style} />}
          {form.colorPref && <OverviewRow label="Kleur" value={colorLabels[form.colorPref] || form.colorPref} />}
          {form.extraNotes && (
            <div className="text-sm">
              <span className="text-gray-500 text-xs">Extra wensen</span>
              <p className="text-xs text-[#2C3E50] mt-0.5 italic leading-relaxed">{form.extraNotes}</p>
            </div>
          )}
        </div>
      )}

      {(form.services.length > 0 || form.contactPref || form.preferredTime || form.region) && (
        <div className="space-y-1.5 pb-3 border-b border-gray-100">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Diensten & Planning</p>
          {form.services.length > 0 && (
            <div className="text-sm">
              <span className="text-gray-500 text-xs">Diensten</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {form.services.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-[#C4A36C]/10 text-[#2C3E50] rounded text-xs">{s}</span>
                ))}
              </div>
            </div>
          )}
          {form.contactPref && <OverviewRow label="Contact via" value={contactPrefLabels[form.contactPref] || form.contactPref} />}
          {form.preferredTime && <OverviewRow label="Voorkeur" value={timeLabels[form.preferredTime] || form.preferredTime} />}
          {form.region && <OverviewRow label="Regio" value={form.region} />}
        </div>
      )}

      {(form.firstName || form.lastName || form.email || form.phone) && (
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Contact</p>
          {(form.firstName || form.lastName) && <OverviewRow label="Naam" value={`${form.firstName} ${form.lastName}`.trim()} />}
          {form.email && <OverviewRow label="E-mail" value={form.email} />}
          {form.phone && <OverviewRow label="Telefoon" value={form.phone} />}
          {(form.street || form.city) && (
            <div className="text-sm">
              <span className="text-gray-500 text-xs">Adres</span>
              <p className="text-xs text-[#2C3E50] mt-0.5">
                {form.street && <>{form.street}<br /></>}
                {form.postalCode} {form.city}{form.country && form.country !== "België" ? `, ${form.country}` : ""}
              </p>
            </div>
          )}
          {form.companyName && <OverviewRow label="Bedrijf" value={form.companyName} />}
          {form.vatNumber && <OverviewRow label="BTW" value={form.vatNumber} />}
        </div>
      )}
    </div>
  );

  const RadioGroup = ({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string; desc?: string }[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`text-left p-3.5 rounded-lg border-2 transition-all duration-200 ${
            value === opt.value
              ? "border-[#2C3E50] bg-[#2C3E50]/[0.03]"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              value === opt.value ? "border-[#2C3E50]" : "border-gray-300"
            }`}>
              {value === opt.value && <div className="w-2 h-2 rounded-full bg-[#2C3E50]"></div>}
            </div>
            <div>
              <span className="text-sm font-medium text-[#2C3E50]">{opt.label}</span>
              {opt.desc && <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>}
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-sm font-semibold text-[#2C3E50] mb-3 block">Type klant</Label>
              <RadioGroup
                value={form.customerType}
                onChange={(v) => update("customerType", v)}
                options={[
                  { value: "Particulier", label: "Particulier", desc: "Voor thuis" },
                  { value: "Zakelijk", label: "Zakelijk", desc: "Kantoor of bedrijf" },
                  { value: "Project", label: "Project", desc: "Vastgoed / horeca / groot project" },
                ]}
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-[#2C3E50] mb-3 block">Type project</Label>
              <RadioGroup
                value={form.projectType}
                onChange={(v) => update("projectType", v)}
                options={[
                  { value: "Nieuwbouw", label: "Nieuwbouw" },
                  { value: "Renovatie", label: "Renovatie" },
                  { value: "Vervanging", label: "Vervanging" },
                ]}
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-[#2C3E50] mb-3 block">Gewenste planning</Label>
              <Select value={form.planning} onValueChange={(v) => update("planning", v)}>
                <SelectTrigger className="h-12"><SelectValue placeholder="Selecteer planning" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">Zo snel mogelijk</SelectItem>
                  <SelectItem value="2-4w">Binnen 2–4 weken</SelectItem>
                  <SelectItem value="1-2m">Binnen 1–2 maanden</SelectItem>
                  <SelectItem value="later">Geen haast / later plannen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-semibold text-[#2C3E50] mb-3 block">Heeft u al maten?</Label>
              <RadioGroup
                value={form.hasMeasurements}
                onChange={(v) => update("hasMeasurements", v)}
                options={[
                  { value: "ja", label: "Ja, ik heb maten" },
                  { value: "nee", label: "Nee, ik wens een opmeting" },
                ]}
              />
            </div>
            <div className="bg-[#2C3E50]/[0.03] rounded-lg p-4 flex gap-3 items-start">
              <Info className="w-4 h-4 text-[#C4A36C] mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-500 leading-relaxed">
                Deze offerteaanvraag is ontworpen voor maatwerkoplossingen. U kunt meerdere ruimtes en meerdere ramen met verschillende afmetingen toevoegen.
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            {form.rooms.map((room, ri) => (
              <div key={room.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 flex items-center justify-between border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#C4A36C]" />
                    <span className="text-sm font-semibold text-[#2C3E50]">Ruimte {ri + 1}</span>
                  </div>
                  {form.rooms.length > 1 && (
                    <button type="button" onClick={() => removeRoom(room.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-medium text-gray-500 mb-1.5 block">Ruimte</Label>
                      <Select value={room.name} onValueChange={(v) => updateRoom(room.id, "name", v)}>
                        <SelectTrigger className="h-10"><SelectValue placeholder="Kies ruimte" /></SelectTrigger>
                        <SelectContent>
                          {ROOM_OPTIONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    {room.name === "Andere" && (
                      <div>
                        <Label className="text-xs font-medium text-gray-500 mb-1.5 block">Naam</Label>
                        <Input value={room.customName} onChange={(e) => updateRoom(room.id, "customName", e.target.value)} placeholder="Bijv. Veranda" className="h-10" />
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-500 mb-1.5 block">Opmerkingen (optioneel)</Label>
                    <Textarea value={room.notes} onChange={(e) => updateRoom(room.id, "notes", e.target.value)} placeholder="Is er iets bijzonder aan deze ruimte? (bijv. radiator, schuin dak, grote raampartijen)" rows={2} className="text-sm resize-none" />
                  </div>

                  <div className="space-y-3">
                    {room.windows.map((win, wi) => (
                      <div key={win.id} className="bg-white border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <SquareStack className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-xs font-medium text-gray-500">Raam {wi + 1}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button type="button" onClick={() => duplicateWindow(room.id, win.id)} className="text-gray-400 hover:text-[#2C3E50] transition-colors p-1" title="Dupliceren">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            {room.windows.length > 1 && (
                              <button type="button" onClick={() => removeWindow(room.id, win.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1" title="Verwijderen">
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="col-span-2 sm:col-span-1">
                            <Label className="text-xs text-gray-400 mb-1 block">Label</Label>
                            <Input value={win.label} onChange={(e) => updateWindow(room.id, win.id, "label", e.target.value)} placeholder="Bijv. Links" className="h-9 text-sm" />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-400 mb-1 block">Breedte (cm)</Label>
                            <Input type="number" min="1" value={win.width} onChange={(e) => updateWindow(room.id, win.id, "width", e.target.value)} placeholder="cm" className="h-9 text-sm" />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-400 mb-1 block">Hoogte (cm)</Label>
                            <Input type="number" min="1" value={win.height} onChange={(e) => updateWindow(room.id, win.id, "height", e.target.value)} placeholder="cm" className="h-9 text-sm" />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-400 mb-1 block">Montage</Label>
                            <Select value={win.mountType} onValueChange={(v) => updateWindow(room.id, win.id, "mountType", v)}>
                              <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Kies" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="in-de-dag">In de dag</SelectItem>
                                <SelectItem value="op-de-dag">Op de dag</SelectItem>
                                <SelectItem value="weet-niet">Weet ik niet</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        {win.mountType === "weet-niet" && (
                          <p className="text-xs text-[#C4A36C] mt-2 flex items-center gap-1.5">
                            <Info className="w-3 h-3" />
                            Geen probleem — wij controleren de maten tijdens de opmeting.
                          </p>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addWindow(room.id)}
                      className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-500 hover:border-[#C4A36C] hover:text-[#C4A36C] transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Raam toevoegen
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addRoom}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-[#2C3E50] hover:border-[#C4A36C] hover:text-[#C4A36C] transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ruimte toevoegen
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-sm font-semibold text-[#2C3E50] mb-3 block">Producttype</Label>
              <p className="text-xs text-gray-400 mb-3">Selecteer één of meerdere producttypes</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PRODUCT_OPTIONS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => toggleProduct(p)}
                    className={`p-3 rounded-lg border-2 text-sm text-left transition-all duration-200 ${
                      form.productTypes.includes(p)
                        ? "border-[#2C3E50] bg-[#2C3E50]/[0.03] font-medium"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                        form.productTypes.includes(p) ? "bg-[#2C3E50] border-[#2C3E50]" : "border-gray-300"
                      }`}>
                        {form.productTypes.includes(p) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      {p}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold text-[#2C3E50] mb-3 block">Lichtinval</Label>
              <RadioGroup
                value={form.lightControl}
                onChange={(v) => update("lightControl", v)}
                options={[
                  { value: "transparant", label: "Transparant / decoratief" },
                  { value: "lichtdoorlatend", label: "Lichtdoorlatend" },
                  { value: "verduisterend", label: "Verduisterend" },
                  { value: "weet-niet", label: "Weet ik niet" },
                ]}
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-[#2C3E50] mb-3 block">Stijl</Label>
              <Select value={form.style} onValueChange={(v) => update("style", v)}>
                <SelectTrigger className="h-12"><SelectValue placeholder="Selecteer stijl" /></SelectTrigger>
                <SelectContent>
                  {["Modern", "Hotel chic", "Minimalistisch", "Klassiek", "Scandinavisch", "Warm & gezellig", "Weet ik niet"].map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-semibold text-[#2C3E50] mb-3 block">Kleurvoorkeur</Label>
              <RadioGroup
                value={form.colorPref}
                onChange={(v) => update("colorPref", v)}
                options={[
                  { value: "neutraal", label: "Neutraal (wit / beige / grijs)" },
                  { value: "warm", label: "Warme tinten" },
                  { value: "donker", label: "Donkere tinten" },
                  { value: "aardetinten", label: "Aardetinten" },
                  { value: "geen", label: "Geen voorkeur" },
                ]}
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-[#2C3E50] mb-3 block">Extra wensen (optioneel)</Label>
              <Textarea
                value={form.extraNotes}
                onChange={(e) => update("extraNotes", e.target.value)}
                placeholder="Heeft u specifieke wensen? (privacy, thermische isolatie, akoestiek, kindveilig, huisdieren, enz.)"
                rows={3}
                className="resize-none"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-sm font-semibold text-[#2C3E50] mb-3 block">Gewenste diensten</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Opmeting aan huis",
                  "Installatieservice",
                  "Oude gordijnen verwijderen",
                  "Advies aan huis",
                  "Showroombezoek",
                  "Projectbegeleiding",
                ].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleService(s)}
                    className={`p-3 rounded-lg border-2 text-sm text-left transition-all duration-200 ${
                      form.services.includes(s)
                        ? "border-[#2C3E50] bg-[#2C3E50]/[0.03] font-medium"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                        form.services.includes(s) ? "bg-[#2C3E50] border-[#2C3E50]" : "border-gray-300"
                      }`}>
                        {form.services.includes(s) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      {s}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold text-[#2C3E50] mb-3 block">Contactvoorkeur</Label>
              <RadioGroup
                value={form.contactPref}
                onChange={(v) => update("contactPref", v)}
                options={[
                  { value: "telefoon", label: "Telefoon" },
                  { value: "whatsapp", label: "WhatsApp" },
                  { value: "email", label: "E-mail" },
                ]}
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-[#2C3E50] mb-3 block">Gewenst moment</Label>
              <RadioGroup
                value={form.preferredTime}
                onChange={(v) => update("preferredTime", v)}
                options={[
                  { value: "ochtend", label: "Weekdag ochtend" },
                  { value: "namiddag", label: "Weekdag namiddag" },
                  { value: "avond", label: "Weekdag avond" },
                  { value: "zaterdag", label: "Zaterdag" },
                ]}
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-[#2C3E50] mb-3 block">Stad / regio</Label>
              <Input value={form.region} onChange={(e) => update("region", e.target.value)} placeholder="Bijv. Antwerpen, Gent, Brussel" className="h-12" />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-medium text-gray-500 mb-1.5 block">Voornaam *</Label>
                <Input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="h-11" />
              </div>
              <div>
                <Label className="text-xs font-medium text-gray-500 mb-1.5 block">Achternaam *</Label>
                <Input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="h-11" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-medium text-gray-500 mb-1.5 block">E-mail *</Label>
                <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="h-11" />
              </div>
              <div>
                <Label className="text-xs font-medium text-gray-500 mb-1.5 block">Telefoonnummer *</Label>
                <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+32" className="h-11" />
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-500 mb-1.5 block">Straat + huisnummer</Label>
              <Input value={form.street} onChange={(e) => update("street", e.target.value)} className="h-11" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs font-medium text-gray-500 mb-1.5 block">Postcode</Label>
                <Input value={form.postalCode} onChange={(e) => update("postalCode", e.target.value)} className="h-11" />
              </div>
              <div>
                <Label className="text-xs font-medium text-gray-500 mb-1.5 block">Gemeente</Label>
                <Input value={form.city} onChange={(e) => update("city", e.target.value)} className="h-11" />
              </div>
              <div>
                <Label className="text-xs font-medium text-gray-500 mb-1.5 block">Land</Label>
                <Select value={form.country} onValueChange={(v) => update("country", v)}>
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="België">België</SelectItem>
                    <SelectItem value="Nederland">Nederland</SelectItem>
                    <SelectItem value="Luxemburg">Luxemburg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(form.customerType === "Zakelijk" || form.customerType === "Project") && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <div>
                  <Label className="text-xs font-medium text-gray-500 mb-1.5 block">Bedrijfsnaam</Label>
                  <Input value={form.companyName} onChange={(e) => update("companyName", e.target.value)} className="h-11" />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-500 mb-1.5 block">BTW-nummer</Label>
                  <Input value={form.vatNumber} onChange={(e) => update("vatNumber", e.target.value)} placeholder="BE0123.456.789" className="h-11" />
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  onClick={() => update("gdprConsent", !form.gdprConsent)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    form.gdprConsent ? "bg-[#2C3E50] border-[#2C3E50]" : "border-gray-300 group-hover:border-gray-400"
                  }`}
                >
                  {form.gdprConsent && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-xs text-gray-500 leading-relaxed">
                  Ik ga akkoord dat mijn gegevens gebruikt worden om contact met mij op te nemen over mijn offerteaanvraag, conform het{" "}
                  <a href="/privacybeleid" target="_blank" className="text-[#C4A36C] underline">privacybeleid</a>.
                </span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="py-8 lg:py-12">
      <Container>
        {/* Step Indicator */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex items-center flex-1 last:flex-initial">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      i < step ? "bg-[#2C3E50] text-white" :
                      i === step ? "bg-[#2C3E50] text-white ring-4 ring-[#2C3E50]/20" :
                      "bg-gray-100 text-gray-400"
                    }`}>
                      {i < step ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className={`text-[11px] mt-1.5 font-medium hidden sm:block ${
                      i <= step ? "text-[#2C3E50]" : "text-gray-400"
                    }`}>{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                      i < step ? "bg-[#2C3E50]" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">Stap {step + 1} van {STEPS.length}</p>
        </div>

        {/* Main Layout */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            {/* Form */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-[#2C3E50] mb-1">{STEPS[step].label}</h2>
                <p className="text-sm text-gray-400 mb-6">
                  {step === 0 && "Vertel ons over uw project"}
                  {step === 1 && "Voeg uw ruimtes en ramen toe"}
                  {step === 2 && "Kies uw product- en stijlvoorkeuren"}
                  {step === 3 && "Selecteer gewenste diensten en afspraakvoorkeur"}
                  {step === 4 && "Uw contactgegevens voor de offerte"}
                </p>
                {renderStep()}

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                  <Button variant="ghost" onClick={prevStep} disabled={step === 0} className="gap-2 text-gray-500">
                    <ChevronLeft className="w-4 h-4" /> Vorige
                  </Button>
                  {step < 4 ? (
                    <Button onClick={nextStep} className="gap-2 bg-[#2C3E50] hover:bg-[#1a2530]">
                      Volgende <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={mutation.isPending} className="gap-2 bg-[#C4A36C] hover:bg-[#b08f56] text-white px-8">
                      {mutation.isPending ? "Verzenden..." : "Offerte aanvragen"}
                      <Send className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Sticky Overview - Desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <Card className="border-0 shadow-lg bg-[#FAFAF8]">
                  <CardContent className="p-5">
                    <OverviewPanel />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Overview Button */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40">
          {mobileOverview && (
            <div className="bg-white border-t border-gray-200 shadow-2xl rounded-t-2xl max-h-[60vh] overflow-y-auto p-5 animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[#2C3E50]">Offerteoverzicht</h3>
                <button onClick={() => setMobileOverview(false)} className="p-1 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <OverviewPanel />
            </div>
          )}
          <button
            onClick={() => setMobileOverview(!mobileOverview)}
            className="w-full bg-[#2C3E50] text-white py-3.5 flex items-center justify-center gap-2 text-sm font-medium"
          >
            {mobileOverview ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            {mobileOverview ? "Sluiten" : `Toon overzicht (${form.rooms.length} ruimte, ${totalWindows} ramen)`}
          </button>
        </div>
      </Container>
    </div>
  );
};

export default QuoteWizard;
