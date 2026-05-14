import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BeliefSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.belief-headline', {
      scrollTrigger: { trigger: '#belief', start: 'top 75%' },
      scale: 0.9, opacity: 0, duration: 0.8, ease: 'power3.out'
    });

    gsap.from('.value-card', {
      scrollTrigger: { trigger: '.values-grid', start: 'top 80%' },
      y: 50, opacity: 0, stagger: 0.18, duration: 0.7, ease: 'power3.out'
    });

    // 3D tilt on value cards
    const cards = document.querySelectorAll('.value-card');

    const handleMouseMove = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      const ev = e as MouseEvent;
      const r = card.getBoundingClientRect();
      const x = (ev.clientX - r.left - r.width / 2) / r.width;
      const y = (ev.clientY - r.top - r.height / 2) / r.height;
      gsap.to(card, { rotateY: x * 12, rotateX: -y * 12, transformPerspective: 600, scale: 1.03, duration: 0.4, ease: 'power2.out' });
    };

    const handleMouseLeave = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    };

    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    }

  }, { scope: containerRef });

  return (
    <section id="belief" ref={containerRef} className="my-16">
      <div className="belief-quote-wrap">
        <div className="belief-icon">🤍</div>
        <h2 className="belief-headline">"Every Life Matters!"</h2>
        <p className="belief-sub">
          Dedicated to delivering personalized, high-quality care with professional excellence and integrity, ensuring affordability and accessibility for all.
        </p>
      </div>

      <div className="values-grid">
        <div className="value-card vc-rose">
          <div className="vc-icon">💝</div>
          <h3>Compassionate Care</h3>
          <p>We treat every patient as family — with patience, warmth, and emotional support at every stage.</p>
        </div>
        <div className="value-card vc-lav">
          <div className="vc-icon">🎯</div>
          <h3>Personalized Treatment</h3>
          <p>No two cancer journeys are the same. Every plan is tailored specifically to you.</p>
        </div>
        <div className="value-card vc-sage">
          <div className="vc-icon">🌍</div>
          <h3>Affordable &amp; Accessible</h3>
          <p>World-class oncology expertise brought to Coimbatore — accessible and affordable for all.</p>
        </div>
      </div>
    </section>
  );
};

export default BeliefSection;
