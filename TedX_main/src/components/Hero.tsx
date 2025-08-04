import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import tedxLogo from "@/assets/tedx-logo.png";

interface HeroProps {
  onRegisterClick: () => void;
}

const Hero = ({ onRegisterClick }: HeroProps) => {
  return (
    <section className="min-h-screen bg-gradient-hero flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-tedx-red rounded-full animate-glow-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 border border-tedx-red rotate-45"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-tedx-red opacity-20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <img 
            src={tedxLogo} 
            alt="TEDx Logo" 
            className="w-32 h-auto mx-auto mb-4 filter drop-shadow-lg"
          />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold text-tedx-white mb-6 leading-tight tracking-tight">
            Ideas Change
            <span className="text-tedx-red block">Everything</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-tedx-white/90 mb-8 font-light">
            Where Innovation Meets Inspiration-Join the TEDx Movement
          </p>

          {/* Event Details */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12 text-tedx-white">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-tedx-red" />
              <span className="text-lg">August 6, 2025</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-tedx-red" />
              <span className="text-lg">University Auditorium</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-tedx-red" />
              <span className="text-lg">VITB Tedx Community</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={onRegisterClick}
            size="lg"
            className="bg-tedx-red hover:bg-tedx-red/90 text-tedx-white text-xl px-12 py-6 h-auto font-semibold transform transition-all duration-300 hover:scale-105 shadow-red-glow hover:shadow-elegant"
          >
            Register Now
          </Button>
        </div>

        {/* Scroll Indicator */}
        {/* Removed scroll indicator for cleaner layout */}
      </div>
    </section>
  );
};

export default Hero;