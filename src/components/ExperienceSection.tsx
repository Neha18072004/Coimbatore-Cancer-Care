import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ExperienceSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // @ts-ignore
    const SplitText = window.SplitText;

    // Section header SplitText
    ScrollTrigger.create({
      trigger: '#experience',
      start: 'top 75%',
      once: true,
      onEnter: () => {
        if (SplitText) {
          const split = new SplitText('#experience .section-title', { type: 'words' });
          gsap.from(split.words, {
            y: 40, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out'
          });
        }
      }
    });

    // Ticker init
    function initTicker() {
      const ticker = document.querySelector('.cred-ticker') as HTMLElement;
      if (!ticker) return;

      const tickerWidth = ticker.scrollWidth / 2;

      gsap.to(ticker, {
        x: -tickerWidth,
        duration: 20,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % tickerWidth)
        }
      });

      ticker.addEventListener('mouseenter', () => gsap.globalTimeline.pause());
      ticker.addEventListener('mouseleave', () => gsap.globalTimeline.resume());
    }

    ScrollTrigger.create({
      trigger: '.cred-ticker-wrap',
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.from('.cred-ticker-wrap', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' });
        initTicker();
      }
    });

    // Cards — stagger with slight Y + scale
    gsap.from('.exp-card', {
      scrollTrigger: { trigger: '.exp-grid', start: 'top 80%', once: true },
      y: 60, opacity: 0, scale: 0.95,
      stagger: 0.2, duration: 0.75, ease: 'power3.out',
      clearProps: 'all'
    });

    // Cinematic Quote Box Animation
    ScrollTrigger.create({
      trigger: '.exp-quote-panel',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();

        // Panel slides up
        tl.from('.exp-quote-panel', {
          y: 50, opacity: 0, duration: 0.8, ease: 'power3.out'
        });

        // Opening quote mark swoops in from top-left
        tl.from('.eq-mark-open', {
          x: -40, y: -30, opacity: 0, scale: 0.5,
          duration: 0.7, ease: 'back.out(1.5)'
        }, '-=0.4');

        // Closing quote mark swoops in from bottom-right
        tl.from('.eq-mark-close', {
          x: 40, y: 30, opacity: 0, scale: 0.5,
          duration: 0.7, ease: 'back.out(1.5)'
        }, '-=0.6');

        // Quote text — word by word reveal
        if (SplitText) {
          const split = new SplitText('.eq-text', { type: 'words' });
          tl.from(split.words, {
            opacity: 0,
            y: 15,
            duration: 0.5,
            stagger: 0.025,
            ease: 'power2.out'
          }, '-=0.3');
        } else {
          tl.from('.eq-text', { opacity: 0, duration: 1 }, '-=0.3');
        }

        // Attribution lines expand outward
        tl.from('.eq-attr-line', {
          scaleX: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        }, '-=0.2');

        tl.from('.eq-attr-text', {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out'
        }, '-=0.3');

        // Blobs slowly drift
        gsap.to('.eq-blob-1', { x: 20, y: -15, duration: 6, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        gsap.to('.eq-blob-2', { x: -15, y: 20, duration: 7, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1 });
      }
    });

    // Hover on exp cards — subtle glow, no vertical movement
    document.querySelectorAll('.exp-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { boxShadow: '0 12px 32px rgba(0,0,0,0.1)', duration: 0.3, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { boxShadow: '0 2px 8px rgba(0,0,0,0.04)', duration: 0.4, ease: 'power2.inOut' });
      });
    });

    return () => {
      // Cleanup if needed
    };
  }, { scope: containerRef });

  return (
    <section id="experience" ref={containerRef} className="section-padding section-container reveal">
      <div className="section-header text-center mb-12">
        <span className="section-label uppercase tracking-wider text-[var(--rose-deep)] font-semibold text-sm mb-2 block">Background</span>
        <h2 className="section-title text-4xl md:text-5xl font-heading text-[var(--text)]">Professional Experience</h2>
      </div>

      <div className="cred-ticker-wrap">
        <div className="cred-ticker">
          <span className="ticker-item"><span className="ticker-icon">🎓</span> FRCR – London, UK</span>
          <span className="ticker-sep">✦</span>
          <span className="ticker-item"><span className="ticker-icon">⚡</span> IMRT · VMAT · SBRT · SRS</span>
          <span className="ticker-sep">✦</span>
          <span className="ticker-item"><span className="ticker-icon">🔬</span> 4D-CT · PET-CT Fusion</span>
          <span className="ticker-sep">✦</span>
          <span className="ticker-item"><span className="ticker-icon">📅</span> 13+ Years Experience</span>
          <span className="ticker-sep">✦</span>
          <span className="ticker-item"><span className="ticker-icon">🎓</span> FRCR – London, UK</span>
          <span className="ticker-sep">✦</span>
          <span className="ticker-item"><span className="ticker-icon">⚡</span> IMRT · VMAT · SBRT · SRS</span>
          <span className="ticker-sep">✦</span>
          <span className="ticker-item"><span className="ticker-icon">🔬</span> 4D-CT · PET-CT Fusion</span>
          <span className="ticker-sep">✦</span>
          <span className="ticker-item"><span className="ticker-icon">📅</span> 13+ Years Experience</span>
          <span className="ticker-sep">✦</span>
        </div>
      </div>

      <div className="exp-grid">
        <div className="exp-card ec-rose">
          <div className="ec-icon">🏥</div>
          <div className="ec-year">2012 – Present</div>
          <h3>Senior Consultant — Radiation Oncology</h3>
          <p>Associate Professor and Clinical Lead in Radiation Oncology. Pivotal in establishing Comprehensive Oncology Centers across leading hospitals in Coimbatore.</p>
        </div>
        <div className="exp-card ec-lav">
          <div className="ec-icon">📚</div>
          <div className="ec-year">Research &amp; Education</div>
          <h3>Teaching &amp; Research Leadership</h3>
          <p>Principal investigator and academic guide for multiple research projects. Trained numerous medical and paramedical students across leading institutions.</p>
        </div>
        <div className="exp-card ec-sage">
          <div className="ec-icon">🌍</div>
          <div className="ec-year">Community Outreach</div>
          <h3>Preventive Oncology Programs</h3>
          <p>Organized awareness programs, health talks, and community screening initiatives across Coimbatore, focusing on women's health and early detection.</p>
        </div>
      </div>

      <div className="exp-quote-panel">
        {/* Decorative background shapes */}
        <div className="eq-blob eq-blob-1"></div>
        <div className="eq-blob eq-blob-2"></div>

        {/* Opening quote mark */}
        <div className="eq-mark eq-mark-open">"</div>

        {/* The quote itself */}
        <blockquote className="eq-text">
          She has successfully contributed to medical education by teaching and
          training numerous medical and paramedical students. As a principal
          investigator and academic guide, she has overseen several research
          projects, papers, and articles, fostering a strong foundation in
          research and evidence-based oncology practice.
        </blockquote>

        {/* Closing quote mark */}
        <div className="eq-mark eq-mark-close">"</div>

        {/* Attribution */}
        <div className="eq-attribution">
          <div className="eq-attr-line"></div>
          <span className="eq-attr-text">Dr. Madhulika Vijayakumar — Coimbatore</span>
          <div className="eq-attr-line"></div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
