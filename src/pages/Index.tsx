import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BeliefSection from "@/components/BeliefSection";
import ExperienceSection from "@/components/ExperienceSection";
import AreasSection from "@/components/AreasSection";
import QualificationsSection from "@/components/QualificationsSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Splash from "@/components/Splash";
import WhatsAppButton from "@/components/WhatsAppButton";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Global Scroll Progress Bar
    gsap.to('.global-progress-bar', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });

    // 2. Smooth scrolling for ALL anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          e.preventDefault();
          gsap.to(window, {
            scrollTo: { y: targetId, offsetY: 70 },
            duration: 1.2,
            ease: 'power3.inOut'
          });
        }
      });
    });

    // 3. Universal Reveal Animations (fades and slides up sections/elements)
    const reveals = gsap.utils.toArray<HTMLElement>('.reveal');
    reveals.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

  }, { scope: container });

  return (
    <div className="min-h-screen bg-background" ref={container}>
      <div className="global-progress-bar"></div>
      <Splash />
      <WhatsAppButton />
      <Navbar />
      <HeroSection />

      <div className="wave-divider">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path fill="#FFF8F4" d="M0,40 C480,70 960,10 1440,45 L1440,70 L0,70 Z" />
        </svg>
      </div>
      <AboutSection />

      <div className="wave-divider">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path fill="#FFF4F6" d="M0,35 C360,70 1080,0 1440,35 L1440,70 L0,70 Z" />
        </svg>
      </div>
      <BeliefSection />

      <div className="wave-divider">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path fill="#F8FDF7" d="M0,35 C480,0 960,70 1440,35 L1440,70 L0,70 Z" />
        </svg>
      </div>
      <ExperienceSection />

      <div className="wave-divider">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path fill="#FAF8FF" d="M0,20 C360,60 1080,0 1440,50 L1440,70 L0,70 Z" />
        </svg>
      </div>
      <AreasSection />

      <div className="wave-divider">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path fill="#FFF8F4" d="M0,50 C480,10 960,70 1440,20 L1440,70 L0,70 Z" />
        </svg>
      </div>
      <QualificationsSection />

      <div className="wave-divider">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path fill="#FFF8F0" d="M0,30 C360,70 1080,10 1440,50 L1440,70 L0,70 Z" />
        </svg>
      </div>
      <ServicesSection />

      <div className="wave-divider">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path fill="#FFF0F3" d="M0,40 C480,80 960,0 1440,40 L1440,70 L0,70 Z" />
        </svg>
      </div>
      <TestimonialsSection />

      <div className="wave-divider">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path fill="#F8F4FF" d="M0,20 C360,60 1080,10 1440,50 L1440,70 L0,70 Z" />
        </svg>
      </div>
      <ContactSection />

      <Footer />
    </div>
  );
};

export default Index;
