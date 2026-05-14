import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const QualificationsSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 1. Draw the line with scroll
    gsap.to('.qual-line-fill', {
      scrollTrigger: {
        trigger: '.qual-timeline',
        start: 'top 70%',
        end: 'bottom 80%',
        scrub: 1.5, // smooth, tied to scroll
      },
      height: '100%',
      ease: 'none'
    });

    // 2. Each qual item animates in from alternating sides
    document.querySelectorAll('.qual-item').forEach((item) => {
      const isLeft = item.classList.contains('qi-left');
      const card = item.querySelector('.qual-card');
      const dot = item.querySelector('.qual-dot');
      const ring = item.querySelector('.dot-ring');

      // Card slides in
      gsap.from(card, {
        scrollTrigger: { trigger: item, start: 'top 82%', once: true },
        x: isLeft ? -60 : 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Dot pops in
      gsap.from(dot, {
        scrollTrigger: { trigger: item, start: 'top 82%', once: true },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: 'back.out(2)'
      });

      // Ring pulses once when dot appears
      ScrollTrigger.create({
        trigger: item,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          gsap.fromTo(ring,
            { scale: 1, opacity: 0.8 },
            { scale: 2.5, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.5 }
          );
        }
      });
    });

    // 3. Hover — cards glow
    document.querySelectorAll('.qual-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { boxShadow: '0 12px 32px rgba(0,0,0,0.1)', scale: 1.01, duration: 0.3, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { boxShadow: '0 2px 8px rgba(0,0,0,0.04)', scale: 1, duration: 0.4, ease: 'power2.inOut' });
      });
    });

  }, { scope: containerRef });

  return (
    <section id="qualifications" ref={containerRef} className="reveal">
      <div className="section-header center">
        <span className="section-label">Academic Journey</span>
        <h2 className="section-title">Qualification &amp; Training</h2>
        <p className="section-sub">A lifetime of learning, built in the world's finest institutions.</p>
      </div>

      <div className="qual-timeline">
        {/* The animated line */}
        <div className="qual-line">
          <div className="qual-line-fill"></div>
        </div>

        {/* Item 1 — left side */}
        <div className="qual-item qi-left">
          <div className="qual-dot">
            <div className="dot-ring"></div>
            <span>🎓</span>
          </div>
          <div className="qual-card qc-blush">
            <div className="qual-year">2007</div>
            <h3 className="qual-degree">MBBS</h3>
            <p className="qual-school">Coimbatore Medical College</p>
            <p className="qual-detail">Affiliated with Dr. M.G.R. Medical University, Tamil Nadu.</p>
            <div className="qual-badge">🏥 Foundation in Medicine</div>
          </div>
        </div>

        {/* Item 2 — right side */}
        <div className="qual-item qi-right">
          <div className="qual-dot">
            <div className="dot-ring"></div>
            <span>⚕️</span>
          </div>
          <div className="qual-card qc-lav">
            <div className="qual-year">2012</div>
            <h3 className="qual-degree">MD in Radiation Oncology</h3>
            <p className="qual-school">Barnard Institute of Radiation &amp; Oncology</p>
            <p className="qual-detail">Madras Medical College, Chennai — specialization in radiotherapy modalities.</p>
            <div className="qual-badge">🔬 Radiation Specialist</div>
          </div>
        </div>

        {/* Item 3 — left */}
        <div className="qual-item qi-left">
          <div className="qual-dot">
            <div className="dot-ring"></div>
            <span>🌍</span>
          </div>
          <div className="qual-card qc-sage">
            <div className="qual-year">2023</div>
            <h3 className="qual-degree">FRCR – Clinical Oncology</h3>
            <p className="qual-school">Guy's and St Thomas' NHS Foundation Trust</p>
            <p className="qual-detail">London, United Kingdom — Fellowship of the Royal College of Radiologists.</p>
            <div className="qual-badge">🇬🇧 International Fellowship</div>
          </div>
        </div>

        {/* Item 4 — right */}
        <div className="qual-item qi-right">
          <div className="qual-dot">
            <div className="dot-ring"></div>
            <span>🤍</span>
          </div>
          <div className="qual-card qc-peach">
            <div className="qual-year">Ongoing</div>
            <h3 className="qual-degree">Palliative Care Certification</h3>
            <p className="qual-school">Indian Academy of Palliative Care (IAPC)</p>
            <p className="qual-detail">And Pallium India — focused on compassionate end-of-life and symptom care.</p>
            <div className="qual-badge">💝 Compassionate Care</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default QualificationsSection;
