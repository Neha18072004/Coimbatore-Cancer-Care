import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const container = useRef<HTMLElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Thank you for consulting Dr. Madhulika. We will contact you shortly.\nIf you are consulting, please add your reports.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/918754626295?text=${message}`, '_blank');
  };

  const contactItems = [
    {
      icon: MapPin,
      content: "Annaii Hospital, Raja Street (West), Near Ragavendra Temple, Town Hall, Coimbatore - 641001",
      href: undefined,
    },
    {
      icon: Phone,
      content: "+91-8754626295",
      href: "tel:+918754626295",
    },
    {
      icon: MessageCircle,
      content: "WhatsApp: +91-8754626295",
      href: "https://wa.me/918754626295?text=Hi%20Dr.%20Madhulika%2C%20I%20would%20like%20to%20book%20an%20appointment.",
    },
    {
      icon: Mail,
      content: "Dr.Madhulikavijayakumar@gmail.com",
      href: "mailto:Dr.Madhulikavijayakumar@gmail.com",
    },
    {
      icon: Clock,
      content: "Mon - Fri: 10:00 AM - 6:00 PM",
      href: undefined,
    },
  ];

  useGSAP(() => {
    gsap.from(".contact-info-item", {
      scrollTrigger: {
        trigger: ".contact-info-container",
        start: "top 80%",
      },
      opacity: 0,
      x: -20,
      duration: 0.4,
      stagger: 0.1,
      ease: "power3.out"
    });

    gsap.from(".contact-map", {
      scrollTrigger: {
        trigger: ".contact-info-container",
        start: "top 80%",
      },
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.5,
      ease: "power3.out"
    });

    gsap.from(".contact-form", {
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 80%",
      },
      opacity: 0,
      x: 30,
      duration: 0.6,
      delay: 0.2,
      ease: "power3.out"
    });

    const infoItems = gsap.utils.toArray<HTMLElement>('.contact-info-item');
    infoItems.forEach(item => {
      item.addEventListener('mouseenter', () => gsap.to(item, { x: 5, duration: 0.2, ease: "power2.out" }));
      item.addEventListener('mouseleave', () => gsap.to(item, { x: 0, duration: 0.2, ease: "power2.out" }));
    });

    // Form fields focus micro-animations
    const fields = document.querySelectorAll('input, select, textarea');
    fields.forEach(f => {
      f.addEventListener('focus', () => gsap.to(f, { scale: 1.01, duration: 0.2, ease: 'power2.out' }));
      f.addEventListener('blur', () => gsap.to(f, { scale: 1, duration: 0.2 }));
    });

    // Submit bounce
    const btn = document.querySelector('.form-submit');
    if (btn) {
      btn.addEventListener('mousedown', () => gsap.to(btn, { scale: 0.96, duration: 0.1 }));
      btn.addEventListener('mouseup', () => gsap.to(btn, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' }));
    }

  }, { scope: container });

  return (
    <section ref={container} id="contact" className="section-padding bg-[var(--blush)]/20 overflow-hidden">
      <div className="section-container">
        <div className="contact-header text-center mb-12">
          <span className="section-label uppercase tracking-wider text-[var(--rose-deep)] font-semibold text-sm mb-2 block">Get in Touch</span>
          <h2 className="contact-title section-title text-4xl md:text-5xl font-heading text-[var(--text)]">
            Contact Us
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="contact-info-container space-y-5">
            {contactItems.map((item, i) => (
              <div
                key={i}
                className="contact-info-item flex items-start gap-4 group cursor-default"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--rose)]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--rose)]/40 transition-colors duration-300">
                  <item.icon className="text-[var(--rose-deep)]" size={18} />
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-[var(--text-soft)] text-sm hover:text-[var(--rose-deep)] transition-colors pt-2.5 font-medium"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-[var(--text-soft)] text-sm pt-2.5 font-medium">{item.content}</p>
                )}
              </div>
            ))}

            <div className="contact-map rounded-2xl overflow-hidden shadow-sm mt-6 border border-[var(--rose)]/30">
              <iframe
                title="Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3!2d76.9517!3d10.9938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU5JzM3LjciTiA3NsKwNTcnMDYuMyJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="contact-form bg-white p-8 space-y-5 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[var(--rose)]/20"
          >
            {[
              { name: "name", label: "Name *", type: "text", required: true },
              { name: "phone", label: "Phone", type: "tel", required: false },
              { name: "email", label: "Email *", type: "email", required: true },
            ].map((field) => (
              <div key={field.name} className="form-group">
                <label className="text-sm font-medium text-[var(--text)] mb-1 block">{field.label}</label>
                <input
                  type={field.type}
                  required={field.required}
                  value={form[field.name as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                />
              </div>
            ))}
            <div className="form-group">
              <label className="text-sm font-medium text-[var(--text)] mb-1 block">Message</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="form-submit flex items-center justify-center gap-2 mt-4"
            >
              Send Message
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
