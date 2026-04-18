import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AreasSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Scroll-triggered entrance — cards pop in with stagger
    gsap.from('.flip-card', {
      scrollTrigger: { trigger: '.areas-grid', start: 'top 80%', once: true },
      y: 70,
      opacity: 0,
      scale: 0.9,
      stagger: {
        amount: 0.6,
        grid: [2, 3],
        from: 'start'
      },
      duration: 0.7,
      ease: 'power3.out'
    });

    // ── First card wiggles on scroll to hint at flip ──
    ScrollTrigger.create({
      trigger: '.areas-grid',
      start: 'top 68%',
      once: true,
      onEnter: () => {
        setTimeout(() => {
          const firstInner = document.querySelector('.flip-card:first-child .flip-inner');
          gsap.timeline()
            .to(firstInner, { rotateY: 30, duration: 0.4, ease: 'power2.out' })
            .to(firstInner, { rotateY: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)', clearProps: 'transform' });
        }, 900);
      }
    });

    // Pulsing opacity on all hint texts to invite interaction
    gsap.to('.flip-hint', {
      opacity: 0.35,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      stagger: 0.3,
      ease: 'sine.inOut'
    });

    // Mobile: tap to flip
    document.querySelectorAll('.flip-card').forEach(card => {
      card.addEventListener('click', () => {
        if (window.matchMedia('(hover: none)').matches) {
          card.classList.toggle('is-flipped');
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section id="areas" ref={containerRef} className="section-padding bg-background reveal">
      <div className="section-container">
        <div className="section-header text-center mb-12">
          <span className="section-label uppercase tracking-wider text-[var(--rose-deep)] font-semibold text-sm mb-2 block">Specializations</span>
          <h2 className="section-title text-4xl md:text-5xl font-heading text-[var(--text)]">Areas of Interest</h2>
          <div className="section-divider mx-auto mt-4" />
        </div>

        <div className="areas-grid">

          {/* ── Card 1: Gynae-Oncology ── */}
          <div className="flip-card">
            <div className="flip-inner">
              <div className="flip-front fc-blush">
                <span className="flip-icon">🎗️</span>
                <h3 className="flip-title">Gynae-Oncology</h3>
                <p className="flip-preview">Specialized care for ovarian, cervical, uterine &amp; vaginal cancers in women.</p>
                <span className="flip-hint">↻ Hover to learn more</span>
              </div>
              <div className="flip-back fb-blush">
                <div className="flip-back-top">
                  <span className="flip-back-icon">🎗️</span>
                  <h3>Gynaecologic Oncology</h3>
                  <p>Specializes in cancers of the female reproductive system — ovarian, cervical, uterine, vulvar, and vaginal. Covers early detection, surgical treatment, chemotherapy, and personalized care for women.</p>
                </div>
                <a href="https://wa.me/918754626295?text=Hi%20Dr.%20Madhulika%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank" rel="noopener noreferrer" className="flip-cta">
                  Book a Consultation <span className="flip-cta-arrow">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Card 2: Breast Oncology ── */}
          <div className="flip-card">
            <div className="flip-inner">
              <div className="flip-front fc-lav">
                <span className="flip-icon">🌸</span>
                <h3 className="flip-title">Breast Oncology</h3>
                <p className="flip-preview">Prevention, diagnosis, treatment &amp; survivorship care for breast cancer.</p>
                <span className="flip-hint">↻ Hover to learn more</span>
              </div>
              <div className="flip-back fb-lav">
                <div className="flip-back-top">
                  <span className="flip-back-icon">🌸</span>
                  <h3>Breast Oncology</h3>
                  <p>Focuses on prevention, diagnosis, and treatment of breast cancer. Includes screening (mammograms, biopsies), treatment (surgery, chemotherapy, radiation, targeted therapy), and survivorship care for long-term well-being.</p>
                </div>
                <a href="https://wa.me/918754626295?text=Hi%20Dr.%20Madhulika%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank" rel="noopener noreferrer" className="flip-cta">
                  Book a Consultation <span className="flip-cta-arrow">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Card 3: Gastrointestinal ── */}
          <div className="flip-card">
            <div className="flip-inner">
              <div className="flip-front fc-sage">
                <span className="flip-icon">🫁</span>
                <h3 className="flip-title">Gastrointestinal</h3>
                <p className="flip-preview">Digestive system cancers — stomach, liver, intestines &amp; pancreas.</p>
                <span className="flip-hint">↻ Hover to learn more</span>
              </div>
              <div className="flip-back fb-sage">
                <div className="flip-back-top">
                  <span className="flip-back-icon">🫁</span>
                  <h3>Gastrointestinal Oncology</h3>
                  <p>Addresses cancers of the digestive system — stomach, intestines, liver, and pancreas. Focuses on cancer prevention through dietary management, lifestyle changes, regular screenings, and advanced treatment.</p>
                </div>
                <a href="https://wa.me/918754626295?text=Hi%20Dr.%20Madhulika%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank" rel="noopener noreferrer" className="flip-cta">
                  Book a Consultation <span className="flip-cta-arrow">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Card 4: Preventive Oncology ── */}
          <div className="flip-card">
            <div className="flip-inner">
              <div className="flip-front fc-peach">
                <span className="flip-icon">🛡️</span>
                <h3 className="flip-title">Preventive Oncology</h3>
                <p className="flip-preview">HPV vaccines, Pap smears &amp; mammograms — catch cancer before it starts.</p>
                <span className="flip-hint">↻ Hover to learn more</span>
              </div>
              <div className="flip-back fb-peach">
                <div className="flip-back-top">
                  <span className="flip-back-icon">🛡️</span>
                  <h3>Preventive Oncology</h3>
                  <p>Prioritizes early detection through routine screenings — Pap smears, mammograms, colonoscopies. Includes preventive immunizations like HPV and Hepatitis B vaccines to lower the risk of virus-related cancers.</p>
                </div>
                <a href="https://wa.me/918754626295?text=Hi%20Dr.%20Madhulika%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank" rel="noopener noreferrer" className="flip-cta">
                  Book a Consultation <span className="flip-cta-arrow">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Card 5: Pain & Palliative Care ── */}
          <div className="flip-card">
            <div className="flip-inner">
              <div className="flip-front fc-blush">
                <span className="flip-icon">🤝</span>
                <h3 className="flip-title">Pain &amp; Palliative Care</h3>
                <p className="flip-preview">Pain relief, symptom management &amp; emotional support throughout treatment.</p>
                <span className="flip-hint">↻ Hover to learn more</span>
              </div>
              <div className="flip-back fb-blush">
                <div className="flip-back-top">
                  <span className="flip-back-icon">🤝</span>
                  <h3>Pain &amp; Palliative Care</h3>
                  <p>Aimed at enhancing quality of life — provides relief from pain and symptoms. Involves physical, emotional, and psychosocial support for patients and their families throughout their entire cancer journey.</p>
                </div>
                <a href="https://wa.me/918754626295?text=Hi%20Dr.%20Madhulika%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank" rel="noopener noreferrer" className="flip-cta">
                  Book a Consultation <span className="flip-cta-arrow">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Card 6: Chemotherapy Care ── */}
          <div className="flip-card">
            <div className="flip-inner">
              <div className="flip-front fc-lav">
                <span className="flip-icon">💊</span>
                <h3 className="flip-title">Chemotherapy Care</h3>
                <p className="flip-preview">Systemic treatment balancing cancer control with quality of life.</p>
                <span className="flip-hint">↻ Hover to learn more</span>
              </div>
              <div className="flip-back fb-lav">
                <div className="flip-back-top">
                  <span className="flip-back-icon">💊</span>
                  <h3>Chemotherapy Care</h3>
                  <p>Carefully designed systemic treatment plans that balance cancer control with quality of life. Focuses on managing symptoms, reducing tumor burden, and supporting patients through each stage of their treatment.</p>
                </div>
                <a href="https://wa.me/918754626295?text=Hi%20Dr.%20Madhulika%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank" rel="noopener noreferrer" className="flip-cta">
                  Book a Consultation <span className="flip-cta-arrow">→</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AreasSection;
