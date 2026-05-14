import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // @ts-ignore
    const SplitText = window.SplitText;

    // Section title
    ScrollTrigger.create({
      trigger: '#testimonials',
      start: 'top 75%',
      once: true,
      onEnter: () => {
        if (SplitText) {
          const split = new SplitText('#testimonials .section-title', { type: 'words' });
          gsap.from(split.words, {
            y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out'
          });
        }
      }
    });

    // Cards slide in — center card last (more dramatic)
    gsap.from('.testi-card:nth-child(1)', {
      scrollTrigger: { trigger: '.testi-grid', start: 'top 80%', once: true },
      x: -60, opacity: 0, duration: 0.75, ease: 'power3.out', clearProps: 'all'
    });
    gsap.from('.testi-card:nth-child(2)', {
      scrollTrigger: { trigger: '.testi-grid', start: 'top 80%', once: true },
      y: 60, opacity: 0, duration: 0.75, delay: 0.2, ease: 'power3.out', clearProps: 'all'
    });
    gsap.from('.testi-card:nth-child(3)', {
      scrollTrigger: { trigger: '.testi-grid', start: 'top 80%', once: true },
      x: 60, opacity: 0, duration: 0.75, ease: 'power3.out', clearProps: 'all'
    });

    // Stars fill in with stagger on scroll
    ScrollTrigger.create({
      trigger: '.testi-grid',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.from('.testi-stars', {
          scale: 0, opacity: 0, stagger: 0.3, duration: 0.5,
          delay: 0.6, ease: 'back.out(2)'
        });
      }
    });

    // Hover glow
    document.querySelectorAll('.testi-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { boxShadow: '0 16px 50px rgba(217,123,143,0.18)', scale: 1.02, duration: 0.3, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { boxShadow: '0 2px 12px rgba(0,0,0,0.04)', scale: 1, duration: 0.35 });
      });
    });
  }, { scope: containerRef });

  return (
    <section id="testimonials" ref={containerRef} className="section-padding section-container bg-background reveal">
      <div className="wave-top"></div>
      <div className="section-header text-center">
        <span className="section-label uppercase tracking-wider text-[var(--rose-deep)] font-semibold text-sm mb-2 block">Patient Stories</span>
        <h2 className="section-title text-4xl md:text-5xl font-heading text-[var(--text)]">Words That Inspire Hope</h2>
      </div>

      <div className="testi-grid">
        <div className="testi-card">
          <div className="testi-stars">★★★★★</div>
          <div className="testi-quote-icon">"</div>
          <p className="testi-text">Dr. Madhulika has been a pillar of strength and reassurance, ensuring no one feels alone in their cancer journey. She brings the same kindness and warmth to every patient.</p>
          <div className="testi-author">
            <div className="testi-avatar ta-rose">A</div>
            <div>
              <strong>A Childhood Friend</strong>
              <span>Coimbatore</span>
            </div>
          </div>
        </div>

        <div className="testi-card">
          <div className="testi-stars">★★★★★</div>
          <div className="testi-quote-icon">"</div>
          <p className="testi-text">I came in with so many fears. She answered every single question without making me feel rushed. The care I received here was truly world-class for our city.</p>
          <div className="testi-author">
            <div className="testi-avatar ta-lav">R</div>
            <div>
              <strong>Rajan M.</strong>
              <span>Tiruppur</span>
            </div>
          </div>
        </div>

        <div className="testi-card">
          <div className="testi-stars">★★★★★</div>
          <div className="testi-quote-icon">"</div>
          <p className="testi-text">After my breast cancer diagnosis, I felt completely lost. Dr. Madhulika created a treatment plan that felt right for me — I'm now in remission and eternally grateful.</p>
          <div className="testi-author">
            <div className="testi-avatar ta-sage">L</div>
            <div>
              <strong>Lakshmi V.</strong>
              <span>Pollachi</span>
            </div>
          </div>
        </div>
      </div>
      <div className="wave-bottom"></div>
    </section>
  );
};

export default TestimonialsSection;
