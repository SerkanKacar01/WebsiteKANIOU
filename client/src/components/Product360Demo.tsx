import { Product360Viewer } from '@/components/ui/product-360-viewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import rolgordijnenImg from '@/assets/Rolgordijnen.jpeg';
import duorolgordijnenImg from '@/assets/Duorolgordijnen.jpeg';
import plisseImg from '@/assets/Plisse.jpeg';
import duoplisseImg from '@/assets/Duoplisse.jpeg';
import inbetweenImg from '@/assets/Inbetween.jpeg';
import inbetweensImg from '@/assets/Inbetweens.jpeg';
import opzethorrenImg from '@/assets/Opzethorren.jpeg';
import overgordijnenImg from '@/assets/Overgordijnen.jpeg';

export function Product360Demo() {
  // Using actual product images from the attached assets

  const rolgordijnImages = [
    rolgordijnenImg,
    duorolgordijnenImg,
    plisseImg,
    duoplisseImg,
    inbetweenImg,
    inbetweensImg,
    opzethorrenImg,
    overgordijnenImg
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Interactive Product Visualization</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Bekijk onze producten in 360 graden. Sleep om te draaien, gebruik de bedieningsknoppen of laat automatisch roteren.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 360° Viewer */}
        <div>
          <Product360Viewer
            images={rolgordijnImages}
            productName="Premium Rolgordijn"
            autoRotate={false}
            rotationSpeed={150}
            className="mb-4"
          />
          <div className="flex gap-2 justify-center">
            <Badge variant="secondary">360° View</Badge>
            <Badge variant="outline">8 Angles</Badge>
            <Badge variant="outline">HD Quality</Badge>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Premium Rolgordijn - 360° Weergave</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Interactieve Functies:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• <strong>Sleep om te draaien:</strong> Klik en sleep horizontaal om het product te roteren</li>
                  <li>• <strong>Automatische rotatie:</strong> Klik op play voor automatische weergave</li>
                  <li>• <strong>Pijltjesbesturing:</strong> Gebruik de linker/rechter knoppen voor handmatige controle</li>
                  <li>• <strong>Volledig scherm:</strong> Bekijk in volledig scherm voor gedetailleerde weergave</li>
                  <li>• <strong>Thumbnail navigatie:</strong> Klik op miniaturen voor directe navigatie</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Voordelen voor klanten:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Bekijk alle details en afwerkingen</li>
                  <li>• Zie hoe het product er vanuit elke hoek uitziet</li>
                  <li>• Beoordeel kwaliteit en materialen</li>
                  <li>• Vermindert onzekerheid bij online aankopen</li>
                  <li>• Interactieve ervaring verhoogt betrokkenheid</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Technische specificaties:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• <strong>Beeldkwaliteit:</strong> Hoge resolutie</li>
                  <li>• <strong>Aantal hoeken:</strong> 8-36 frames voor vloeiende rotatie</li>
                  <li>• <strong>Interactie:</strong> Mouse/touch support</li>
                  <li>• <strong>Mobiel:</strong> Volledig responsive ontwerp</li>
                  <li>• <strong>Prestaties:</strong> Geoptimaliseerd voor snelle laadtijden</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Implementatie Mogelijkheden</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Voor Rolgordijnen:</h4>
                  <p className="text-sm text-muted-foreground">Toon verschillende stofpatronen, oprolmechanisme, en montage details</p>
                </div>
                <div>
                  <h4 className="font-medium">Voor Jaloeziën:</h4>
                  <p className="text-sm text-muted-foreground">Demonstreer lamelbeweging, materiaalstructuur, en bedieningsmogelijkheden</p>
                </div>
                <div>
                  <h4 className="font-medium">Voor Plissé gordijnen:</h4>
                  <p className="text-sm text-muted-foreground">Laat de plooiwerking zien en verschillende lichtdoorlatingen</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}