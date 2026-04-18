import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Coimbatore Cancer Care</h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Beyond Treatment, We Care and Support Every Step of Your Cancer Journey.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-heading font-semibold mb-3">Contact Info</h4>
            <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
              <Phone size={14} />
              <a href="tel:+918754626295" className="hover:text-primary-foreground transition-colors">+91-8754626295</a>
            </div>
            <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
              <MessageCircle size={14} />
              <a href="https://wa.me/918754626295?text=Hi%20Dr.%20Madhulika%2C%20I%20would%20like%20to%20book%20an%20appointment." target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">WhatsApp: +91-8754626295</a>
            </div>
            <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
              <Mail size={14} />
              <a href="mailto:Dr.Madhulikavijayakumar@gmail.com" className="hover:text-primary-foreground transition-colors">Dr.Madhulikavijayakumar@gmail.com</a>
            </div>
            <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
              <span>📸</span>
              <a href="https://www.instagram.com/madhulika.vijayakumar" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">Instagram: @madhulika.vijayakumar</a>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Location</h4>
            <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
              <MapPin size={14} className="flex-shrink-0 mt-0.5" />
              <p>Annaii Hospital, Raja Street (West), Near Ragavendra Temple, Town Hall, Coimbatore - 641001</p>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} Coimbatore Cancer Care. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
