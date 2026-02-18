import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 text-center">
          <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pagina niet gevonden</h1>
          <p className="text-gray-600 mb-6">
            De pagina die u zoekt bestaat niet of is verplaatst.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/">
              <Button variant="default" className="gap-2">
                <Home className="h-4 w-4" />
                Naar homepage
              </Button>
            </Link>
            <Button variant="outline" className="gap-2" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4" />
              Ga terug
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
