import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegistrationFormProps {
  onBack: () => void;
  onSubmit: (data: { name: string; email: string }) => void;
}

const RegistrationForm = ({ onBack, onSubmit }: RegistrationFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Correct environment variable for the API URL
  const API_URL = import.meta.env.VITE_API_URL || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // The API endpoint should be a single, non-redundant path
      // This will correctly resolve to 'http://localhost:4000/register' locally
      // and '/api/register' in production on Vercel
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to register');
      }
      
      const data = await response.json();
      onSubmit(data);
      setIsSubmitting(false);
      toast({
        title: "Registration Successful!",
        description: "Your digital pass has been generated.",
        variant: "success"
      });
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Registration Failed",
        description: "There was an error generating your pass. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <section className="min-h-screen bg-tedx-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 text-tedx-white hover:text-tedx-red hover:bg-tedx-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="bg-card border-tedx-gray shadow-elegant animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-tedx-white">
              Register for TEDx
            </CardTitle>
            <CardDescription className="text-tedx-white/70">
              Join our community of innovators and changemakers
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-tedx-white font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-tedx-red" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-12 bg-input border-tedx-gray text-tedx-white placeholder:text-tedx-white/50 focus:ring-tedx-red focus:border-tedx-red"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-tedx-white font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-tedx-red" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-12 bg-input border-tedx-gray text-tedx-white placeholder:text-tedx-white/50 focus:ring-tedx-red focus:border-tedx-red"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-tedx-red hover:bg-tedx-red/90 text-tedx-white font-semibold py-3 transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Generating Pass..." : "Generate My Pass"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-tedx-white/60">
                By registering, you agree to receive event updates and communications.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RegistrationForm;
