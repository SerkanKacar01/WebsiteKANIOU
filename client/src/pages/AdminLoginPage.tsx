import { useState, useEffect } from "react";
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

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
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

      // Immediate redirect after successful login - the session is already set
      console.log("Login successful, redirecting to dashboard...");
      setLocation("/entrepreneur-dashboard");

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
                Admin Dashboard
              </CardTitle>
              <CardDescription className="text-gray-600">
                Voer uw inloggegevens in om toegang te krijgen
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
                <fieldset disabled={isLoading}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black font-medium">
                        E-mailadres
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="admin@kaniou.be"
                          className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988]"
                          {...field}
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
                      <FormLabel className="text-black font-medium">
                        Wachtwoord
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Voer uw wachtwoord in"
                            className="border-gray-300 focus:border-[#E6C988] focus:ring-[#E6C988] pr-10"
                            {...field}
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
                  className="w-full bg-[#E6C988] hover:bg-[#D4B976] text-black font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Bezig met inloggen..." : "Inloggen"}
                </Button>
                </fieldset>
              </form>
            </Form>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Alleen geautoriseerde gebruikers hebben toegang
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}