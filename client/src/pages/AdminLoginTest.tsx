import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const loginSchema = z.object({
  email: z.string().email("Voer een geldig e-mailadres in"),
  password: z.string().min(1, "Wachtwoord is vereist"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLoginTest() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@kaniou.be",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Important for session cookies
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Er is een fout opgetreden bij het inloggen");
        return;
      }

      toast({
        title: "Succesvol ingelogd",
        description: "U wordt doorgestuurd naar het dashboard...",
      });

      // Wait a moment for session to be properly set, then verify auth status
      setTimeout(async () => {
        try {
          const authCheck = await fetch("/api/admin/auth-status", {
            credentials: "include",
          });
          const authResult = await authCheck.json();
          
          if (authResult.authenticated) {
            setLocation("/entrepreneur-dashboard");
          } else {
            setError("Er is een probleem opgetreden met de authenticatie. Probeer opnieuw.");
            setIsLoading(false);
          }
        } catch (authError) {
          console.error("Auth check error:", authError);
          // Fallback to direct redirect if auth check fails
          setLocation("/entrepreneur-dashboard");
        }
      }, 500); // 500ms delay to ensure session is set

    } catch (error) {
      console.error("Login error:", error);
      setError("Er is een verbindingsfout opgetreden. Probeer het opnieuw.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-[#E6C988] rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-black">
                KANIOU Admin Dashboard
              </CardTitle>
              <CardDescription className="text-gray-600">
                Toegang tot het Business Dashboard
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black font-medium">E-mailadres</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="admin@kaniou.be"
                          className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black font-medium">Wachtwoord</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Voer uw wachtwoord in"
                            className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988] pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Inloggen..." : "Inloggen"}
                </Button>
              </form>
            </Form>

            <div className="text-center">
              <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                <p className="font-medium mb-1">Test Credentials:</p>
                <p>Email: admin@kaniou.be</p>
                <p>Password: Use ADMIN_PASSWORD secret</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}