import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ShoppingCart, FileText, Info } from "lucide-react";

interface Configuration {
  fabricType: string;
  profileType: string;
  width: number;
  height: number;
  operationType: "manual" | "motorized";
  controlMethod: string;
  installationType: string;
  controlSide: string;
  quantity: number;
}

const SinglePageConfigurator: React.FC = () => {
  const [configuration, setConfiguration] = useState<Configuration>({
    fabricType: "",
    profileType: "",
    width: 0,
    height: 0,
    operationType: "manual",
    controlMethod: "",
    installationType: "",
    controlSide: "",
    quantity: 1,
  });

  // Fabric types with pricing
  const fabricTypes = [
    { id: "lichtdoorlatend", name: "Lichtdoorlatend", price: 25, description: "Laat licht door, biedt privacy" },
    { id: "verduisterend", name: "Verduisterend", price: 32, description: "Blokkeert vrijwel al het licht" },
    { id: "semi-verduisterend", name: "Semi-verduisterend", price: 28, description: "Gedeeltelijke lichtblokkering" },
  ];

  // Profile types
  const profileTypes = [
    { id: "open", name: "Open profiel", price: 0, description: "Standaard open profiel" },
    { id: "cassette", name: "Dichte cassette", price: 30, description: "Elegante dichte cassette (+15%)" },
  ];

  // Control methods
  const manualControls = [
    { id: "plastic-chain", name: "Kunststof ketting", price: 0, description: "Gratis bij handmatige bediening" },
    { id: "metal-chain", name: "Metalen ketting", price: 12.5, description: "Duurzame metalen ketting" },
  ];

  const motorizedControls = [
    { id: "remote-only", name: "Alleen afstandsbediening", price: 150, description: "BREL BLE20 motor + afstandsbediening" },
    { id: "remote-app", name: "Afstandsbediening + App-bediening", price: 200, description: "Inclusief HUB-04 voor app-bediening" },
  ];

  // Installation types
  const installationTypes = [
    { id: "wall-mount", name: "Wandmontage", price: 0, description: "Standaard wandbevestiging" },
    { id: "ceiling-mount", name: "Plafondmontage", price: 15, description: "Bevestiging aan plafond" },
  ];

  // Control sides
  const controlSides = [
    { id: "left", name: "Links", description: "Bediening aan de linkerkant" },
    { id: "right", name: "Rechts", description: "Bediening aan de rechterkant" },
  ];

  const updateConfiguration = (key: keyof Configuration, value: any) => {
    setConfiguration(prev => ({ ...prev, [key]: value }));
  };

  const calculatePrice = () => {
    let basePrice = 0;
    const area = (configuration.width * configuration.height) / 10000; // Convert to m²
    
    // Fabric price
    const fabricType = fabricTypes.find(f => f.id === configuration.fabricType);
    if (fabricType) {
      basePrice += fabricType.price * area;
    }

    // Profile price
    const profileType = profileTypes.find(p => p.id === configuration.profileType);
    if (profileType) {
      basePrice += profileType.price;
    }

    // Control method price
    if (configuration.operationType === "manual") {
      const control = manualControls.find(c => c.id === configuration.controlMethod);
      if (control) basePrice += control.price;
    } else {
      const control = motorizedControls.find(c => c.id === configuration.controlMethod);
      if (control) basePrice += control.price;
    }

    // Installation price
    const installation = installationTypes.find(i => i.id === configuration.installationType);
    if (installation) {
      basePrice += installation.price;
    }

    return basePrice * configuration.quantity;
  };

  const getSelectedItems = () => {
    const items = [];
    
    if (configuration.fabricType) {
      const fabric = fabricTypes.find(f => f.id === configuration.fabricType);
      const area = (configuration.width * configuration.height) / 10000;
      items.push({
        name: `Stoffering (${fabric?.name})`,
        price: fabric ? fabric.price * area : 0
      });
    }

    if (configuration.profileType && configuration.profileType !== "open") {
      const profile = profileTypes.find(p => p.id === configuration.profileType);
      items.push({
        name: profile?.name || "",
        price: profile?.price || 0
      });
    }

    if (configuration.controlMethod) {
      if (configuration.operationType === "manual") {
        const control = manualControls.find(c => c.id === configuration.controlMethod);
        if (control && control.price > 0) {
          items.push({
            name: control.name,
            price: control.price
          });
        }
      } else {
        const control = motorizedControls.find(c => c.id === configuration.controlMethod);
        if (control) {
          items.push({
            name: "Elektrische bediening",
            price: control.price
          });
        }
        
        // Add HUB-04 for app control
        if (configuration.controlMethod === "remote-app") {
          items.push({
            name: "App-bediening (incl. HUB-04)",
            price: 50
          });
        }
      }
    }

    if (configuration.installationType && configuration.installationType !== "wall-mount") {
      const installation = installationTypes.find(i => i.id === configuration.installationType);
      items.push({
        name: installation?.name || "",
        price: installation?.price || 0
      });
    }

    return items;
  };

  const isConfigurationComplete = () => {
    return configuration.fabricType && 
           configuration.profileType && 
           configuration.width > 0 && 
           configuration.height > 0 && 
           configuration.controlMethod && 
           configuration.installationType && 
           configuration.controlSide;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Sections */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Fabric Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-[#d5c096] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">①</span>
                Kies uw stofsoort
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {fabricTypes.map((fabric) => (
                  <div
                    key={fabric.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      configuration.fabricType === fabric.id
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => updateConfiguration("fabricType", fabric.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold">{fabric.name}</h5>
                      <span className="text-sm font-medium text-[#d5c096]">€{fabric.price}/m²</span>
                    </div>
                    <p className="text-sm text-gray-600">{fabric.description}</p>
                    {configuration.fabricType === fabric.id && (
                      <div className="flex items-center text-[#d5c096] mt-2">
                        <Check className="h-4 w-4 mr-1" />
                        <span className="text-sm">Geselecteerd</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Profile Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-[#d5c096] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">②</span>
                Selecteer uw profiel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileTypes.map((profile) => (
                  <div
                    key={profile.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      configuration.profileType === profile.id
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => updateConfiguration("profileType", profile.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold">{profile.name}</h5>
                      {profile.price > 0 && (
                        <span className="text-sm font-medium text-[#d5c096]">+€{profile.price}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{profile.description}</p>
                    {configuration.profileType === profile.id && (
                      <div className="flex items-center text-[#d5c096] mt-2">
                        <Check className="h-4 w-4 mr-1" />
                        <span className="text-sm">Geselecteerd</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Dimensions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-[#d5c096] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">③</span>
                Voer afmetingen in
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="width">Breedte (cm)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={configuration.width || ""}
                    onChange={(e) => updateConfiguration("width", parseInt(e.target.value) || 0)}
                    placeholder="bijv. 120"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Hoogte (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={configuration.height || ""}
                    onChange={(e) => updateConfiguration("height", parseInt(e.target.value) || 0)}
                    placeholder="bijv. 160"
                    className="mt-1"
                  />
                </div>
              </div>
              {configuration.width > 0 && configuration.height > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Oppervlakte: {((configuration.width * configuration.height) / 10000).toFixed(2)} m²
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section 4: Operation Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-[#d5c096] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">④</span>
                Kies bedieningstype
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    configuration.operationType === "manual"
                      ? "border-[#d5c096] bg-[#d5c096]/5"
                      : "border-gray-200 hover:border-[#d5c096]/50"
                  }`}
                  onClick={() => {
                    updateConfiguration("operationType", "manual");
                    updateConfiguration("controlMethod", "");
                  }}
                >
                  <h5 className="font-semibold mb-2">Handmatige bediening</h5>
                  <p className="text-sm text-gray-600">Bediening met ketting</p>
                  {configuration.operationType === "manual" && (
                    <div className="flex items-center text-[#d5c096] mt-2">
                      <Check className="h-4 w-4 mr-1" />
                      <span className="text-sm">Geselecteerd</span>
                    </div>
                  )}
                </div>
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    configuration.operationType === "motorized"
                      ? "border-[#d5c096] bg-[#d5c096]/5"
                      : "border-gray-200 hover:border-[#d5c096]/50"
                  }`}
                  onClick={() => {
                    updateConfiguration("operationType", "motorized");
                    updateConfiguration("controlMethod", "");
                  }}
                >
                  <h5 className="font-semibold mb-2">Elektrische bediening</h5>
                  <p className="text-sm text-gray-600">BREL motor met afstandsbediening</p>
                  {configuration.operationType === "motorized" && (
                    <div className="flex items-center text-[#d5c096] mt-2">
                      <Check className="h-4 w-4 mr-1" />
                      <span className="text-sm">Geselecteerd</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Control Method Options */}
              {configuration.operationType === "manual" && (
                <div className="space-y-4">
                  <h6 className="font-medium">Kies uw ketting:</h6>
                  {manualControls.map((control) => (
                    <div
                      key={control.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                        configuration.controlMethod === control.id
                          ? "border-[#d5c096] bg-[#d5c096]/5"
                          : "border-gray-200 hover:border-[#d5c096]/50"
                      }`}
                      onClick={() => updateConfiguration("controlMethod", control.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h6 className="font-medium">{control.name}</h6>
                          <p className="text-sm text-gray-600">{control.description}</p>
                        </div>
                        <div className="text-right">
                          {control.price > 0 ? (
                            <span className="text-sm font-medium text-[#d5c096]">+€{control.price}</span>
                          ) : (
                            <Badge variant="secondary">Gratis</Badge>
                          )}
                        </div>
                      </div>
                      {configuration.controlMethod === control.id && (
                        <div className="flex items-center text-[#d5c096] mt-2">
                          <Check className="h-4 w-4 mr-1" />
                          <span className="text-sm">Geselecteerd</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {configuration.operationType === "motorized" && (
                <div className="space-y-4">
                  <h6 className="font-medium">Kies uw bedieningsoptie:</h6>
                  {motorizedControls.map((control) => (
                    <div key={control.id}>
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                          configuration.controlMethod === control.id
                            ? "border-[#d5c096] bg-[#d5c096]/5"
                            : "border-gray-200 hover:border-[#d5c096]/50"
                        }`}
                        onClick={() => updateConfiguration("controlMethod", control.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h6 className="font-medium">{control.name}</h6>
                            <p className="text-sm text-gray-600">{control.description}</p>
                          </div>
                          <span className="text-sm font-medium text-[#d5c096]">+€{control.price}</span>
                        </div>
                        {configuration.controlMethod === control.id && (
                          <div className="flex items-center text-[#d5c096] mt-2">
                            <Check className="h-4 w-4 mr-1" />
                            <span className="text-sm">Geselecteerd</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Expandable details for remote-only option */}
                      {control.id === "remote-only" && configuration.controlMethod === control.id && (
                        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg animate-in fade-in duration-300">
                          <h6 className="font-medium text-amber-900 mb-3">
                            Inbegrepen in deze keuze:
                          </h6>
                          <div className="space-y-2 text-sm text-amber-800">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-amber-600" />
                              <span>BREL BLE20 motor (twv €120)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-amber-600" />
                              <span>Afstandsbediening (handzender – twv €25)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-amber-600" />
                              <span>USB-C oplader (twv €5)</span>
                            </div>
                          </div>
                          <div className="mt-3 p-3 bg-amber-100 rounded text-sm text-amber-900">
                            💬 Geschikt voor eenvoudige draadloze bediening zonder app-integratie.
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section 5: Installation Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-[#d5c096] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">⑤</span>
                Kies montagewijze
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {installationTypes.map((installation) => (
                  <div
                    key={installation.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      configuration.installationType === installation.id
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => updateConfiguration("installationType", installation.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold">{installation.name}</h5>
                      {installation.price > 0 && (
                        <span className="text-sm font-medium text-[#d5c096]">+€{installation.price}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{installation.description}</p>
                    {configuration.installationType === installation.id && (
                      <div className="flex items-center text-[#d5c096] mt-2">
                        <Check className="h-4 w-4 mr-1" />
                        <span className="text-sm">Geselecteerd</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Control Side */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-[#d5c096] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">⑥</span>
                Kies bedieningszijde
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {controlSides.map((side) => (
                  <div
                    key={side.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      configuration.controlSide === side.id
                        ? "border-[#d5c096] bg-[#d5c096]/5"
                        : "border-gray-200 hover:border-[#d5c096]/50"
                    }`}
                    onClick={() => updateConfiguration("controlSide", side.id)}
                  >
                    <h5 className="font-semibold mb-2">{side.name}</h5>
                    <p className="text-sm text-gray-600">{side.description}</p>
                    {configuration.controlSide === side.id && (
                      <div className="flex items-center text-[#d5c096] mt-2">
                        <Check className="h-4 w-4 mr-1" />
                        <span className="text-sm">Geselecteerd</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sticky Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <Card>
              <CardHeader>
                <CardTitle>Overzicht & Prijs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Selected Items Summary */}
                {getSelectedItems().length > 0 && (
                  <div className="space-y-3">
                    <h6 className="font-medium text-gray-900">Geselecteerde opties:</h6>
                    <div className="space-y-2">
                      {getSelectedItems().map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.name}</span>
                          <span className="font-medium">€{item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dimensions Summary */}
                {configuration.width > 0 && configuration.height > 0 && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span>Afmetingen:</span>
                        <span>{configuration.width} × {configuration.height} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Oppervlakte:</span>
                        <span>{((configuration.width * configuration.height) / 10000).toFixed(2)} m²</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="quantity">Aantal:</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateConfiguration("quantity", Math.max(1, configuration.quantity - 1))}
                    >
                      -
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      value={configuration.quantity}
                      onChange={(e) => updateConfiguration("quantity", parseInt(e.target.value) || 1)}
                      className="w-16 text-center"
                      min="1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateConfiguration("quantity", configuration.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold text-[#d5c096]">
                    <span>Totaal (incl. BTW):</span>
                    <span>€{calculatePrice().toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button 
                    className="w-full bg-[#d5c096] hover:bg-[#d5c096]/90"
                    disabled={!isConfigurationComplete()}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Toevoegen aan winkelwagen
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    disabled={!isConfigurationComplete()}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Offerte aanvragen
                  </Button>
                </div>

                {!isConfigurationComplete() && (
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Maak alle keuzes om door te gaan
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePageConfigurator;