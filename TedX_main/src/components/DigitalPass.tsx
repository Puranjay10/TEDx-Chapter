import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, ArrowLeft, Calendar, MapPin, Hash } from "lucide-react";

// For a full project with a build process, this is the correct way to import assets.
import tedxLogo from "@/assets/tedx-logo.png";

// For a full project, you should install these dependencies via npm:
// npm install jspdf html2canvas
// and then import them directly like this:
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


interface DigitalPassProps {
  userData: {
    name: string;
    email: string;
    passId: string; // Added passId to the interface
  };
  onBack: () => void;
  onNewRegistration: () => void;
}

const DigitalPass = ({ userData, onBack, onNewRegistration }: DigitalPassProps) => {
  // Create a ref to reference the Card DOM element
  const passRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // This is the new, functional download handler
  const handleDownload = async () => {
    // Check if the ref is attached to a DOM element
    if (passRef.current) {
      setIsDownloading(true);
      try {
        const passElement = passRef.current;
        const canvas = await html2canvas(passElement, {
          scale: 4,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
        });

        // Use the html2canvas output for the QR code and other non-textual elements
        const qrCodeElement = passElement.querySelector('.qr-code-placeholder') as HTMLElement;
        const qrCanvas = await html2canvas(qrCodeElement, { scale: 4 });
        const qrImgData = qrCanvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const margin = 20;
        const width = 170; // Width of the pass in the PDF
        let yPos = margin;

        // Draw the main pass details
        pdf.setFillColor(0, 0, 0);
        pdf.rect(margin, yPos, width, 180, 'F'); // A black background for the pass

        // Add the logo
        pdf.addImage(tedxLogo, 'PNG', margin + 8, yPos + 8, 20, 20);

        // Add event pass details
        pdf.setFontSize(8);
        pdf.setTextColor(255, 255, 255, 0.7);
        pdf.text('EVENT PASS', margin + width - 8, yPos + 12, { align: 'right' });
        pdf.setFontSize(10);
        pdf.setTextColor(255, 255, 255);
        pdf.text(userData.passId, margin + width - 8, yPos + 18, { align: 'right' });

        // Add event title
        yPos += 40;
        pdf.setFontSize(24);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(255, 255, 255);
        pdf.text('TEDx Community Talk', margin + 8, yPos);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(255, 255, 255, 0.8);
        pdf.text('Ideas Worth Spreading', margin + 8, yPos + 6);

        // Add attendee info
        yPos += 24;
        pdf.setFontSize(8);
        pdf.setTextColor(255, 255, 255, 0.7);
        pdf.text('ATTENDEE', margin + 8, yPos);
        pdf.setFontSize(16);
        pdf.setTextColor(255, 255, 255);
        pdf.text(userData.name, margin + 8, yPos + 6);

        yPos += 14;
        pdf.setFontSize(8);
        pdf.setTextColor(255, 255, 255, 0.7);
        pdf.text('EMAIL', margin + 8, yPos);
        pdf.setFontSize(10);
        pdf.setTextColor(255, 255, 255);
        pdf.text(userData.email, margin + 8, yPos + 6);
        
        // Add event details
        yPos += 20;
        pdf.setDrawColor(255, 255, 255, 0.2);
        pdf.line(margin + 8, yPos, margin + width - 8, yPos);
        yPos += 8;
        
        pdf.setFontSize(10);
        pdf.setTextColor(255, 255, 255);
        pdf.text('August 6, 2025 • 6:00 PM', margin + 14, yPos);
        yPos += 8;
        pdf.text('University Auditorium', margin + 14, yPos);
        yPos += 8;
        pdf.text('Student Community Event', margin + 14, yPos);

        // Add QR code
        yPos += 18;
        const qrSize = 40;
        const qrX = margin + (width - qrSize) / 2;
        pdf.addImage(qrImgData, 'PNG', qrX, yPos, qrSize, qrSize);

        pdf.save(`TEDx-Pass-${userData.name.replace(/\s+/g, '-')}.pdf`);

      } catch (error) {
        console.error("Failed to generate PDF:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <section className="min-h-screen bg-tedx-black flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-tedx-white hover:text-tedx-red hover:bg-tedx-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onNewRegistration}
            className="border-tedx-red text-tedx-red hover:bg-tedx-red hover:text-tedx-white"
          >
            New Registration
          </Button>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 bg-tedx-red rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-tedx-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-tedx-white mb-2">Registration Complete!</h2>
          <p className="text-tedx-white/70">Your digital pass has been generated successfully.</p>
        </div>

        {/* Digital Pass */}
        {/* Attach the ref to the Card component */}
        <Card 
          ref={passRef} 
          className="bg-gradient-pass border-none shadow-elegant animate-slide-up relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-20 h-20 border border-tedx-white rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border border-tedx-white rotate-45"></div>
          </div>

          <div className="relative z-10 p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <img 
                src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2FTEDxEvents%2F&psig=AOvVaw0yyul0sFGouF4N50vyJ-wU&ust=1754414070167000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJCXy-zT8Y4DFQAAAAAdAAAAABAE" // Using the correct local import now
                alt="TEDx Logo" 
                className="w-20 h-auto filter brightness-0 invert"
              />
              <div className="text-right">
                <div className="text-xs text-tedx-white/70 uppercase tracking-wider">Event Pass</div>
                <div className="text-sm font-mono text-tedx-white">{userData.passId}</div>
              </div>
            </div>

            {/* Event Title */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-tedx-white mb-1">
                TEDx Community Talk
              </h3>
              <p className="text-tedx-white/80 text-sm">Ideas Change Everything</p>
            </div>

            {/* Attendee Info */}
            <div className="mb-6 space-y-3">
              <div>
                <div className="text-xs text-tedx-white/70 uppercase tracking-wider mb-1">Attendee</div>
                <div className="text-lg font-semibold text-tedx-white">{userData.name}</div>
              </div>
              <div>
                <div className="text-xs text-tedx-white/70 uppercase tracking-wider mb-1">Email</div>
                <div className="text-sm text-tedx-white font-mono">{userData.email}</div>
              </div>
            </div>

            {/* Event Details */}
            <div className="border-t border-tedx-white/20 pt-6 space-y-3">
              <div className="flex items-center gap-3 text-tedx-white">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">August 6, 2025 • 6:00 PM</span>
              </div>
              <div className="flex items-center gap-3 text-tedx-white">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">University Auditorium</span>
              </div>
              <div className="flex items-center gap-3 text-tedx-white">
                <Hash className="w-4 h-4" />
                <span className="text-sm">Student Community Event</span>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="mt-6 flex justify-center qr-code-placeholder">
              <div className="w-20 h-20 bg-tedx-white rounded-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-tedx-black rounded grid grid-cols-4 gap-0.5 p-1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`${Math.random() > 0.5 ? 'bg-tedx-white' : 'bg-tedx-black'} rounded-sm`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Download Button */}
        <div className="mt-6 text-center">
          <Button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-tedx-white text-tedx-black hover:bg-tedx-white/90 font-semibold px-8 py-3 transform transition-all duration-300 hover:scale-105"
          >
            <Download className={`w-4 h-4 mr-2 ${isDownloading ? 'animate-bounce' : ''}`} />
            {isDownloading ? 'Generating...' : 'Download Pass'}
          </Button>
          
          <p className="text-xs text-tedx-white/60 mt-3">
            Save this pass and present it at the event entrance
          </p>
        </div>
      </div>
    </section>
  );
};

export default DigitalPass;
