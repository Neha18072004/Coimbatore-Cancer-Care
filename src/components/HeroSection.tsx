import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import doctorHero from "@/assets/doctor-hero-new.jpg";

gsap.registerPlugin(useGSAP);

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // @ts-ignore
    const SplitText = window.SplitText;
    let split: any;
    if (SplitText) {
      split = new SplitText('.hero-title', { type: 'chars, words' });
    }

    const tl = gsap.timeline();

    if (split) {
      tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' })
        .from(split.chars, { y: 60, opacity: 0, rotateX: -40, duration: 0.7, stagger: 0.022, ease: 'power4.out' }, '-=0.3')
        .from('.hero-sub', { y: 25, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .from('.hero-buttons .btn-primary, .hero-buttons .btn-secondary',
          { y: 20, opacity: 0, stagger: 0.13, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .from('.stat', { y: 15, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        .from('.chip', { scale: 0.8, opacity: 0, stagger: 0.08, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.2')
        .from('.hero-photo-wrap', { x: 60, opacity: 0, duration: 1, ease: 'power4.out' }, '-=1.2')
        .from('.float-card', { scale: 0.7, opacity: 0, stagger: 0.2, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.5')
        .from('.ring-1, .ring-2', { scale: 0, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.8');
    } else {
      tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' })
        .from('.hero-title', { y: 60, opacity: 0, duration: 0.7, ease: 'power4.out' }, '-=0.3')
        .from('.hero-sub', { y: 25, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .from('.hero-buttons .btn-primary, .hero-buttons .btn-secondary',
          { y: 20, opacity: 0, stagger: 0.13, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .from('.stat', { y: 15, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        .from('.chip', { scale: 0.8, opacity: 0, stagger: 0.08, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.2')
        .from('.hero-photo-wrap', { x: 60, opacity: 0, duration: 1, ease: 'power4.out' }, '-=1.2')
        .from('.float-card', { scale: 0.7, opacity: 0, stagger: 0.2, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.5')
        .from('.ring-1, .ring-2', { scale: 0, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.8');
    }

    // Count-up for stats
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = parseInt((el as HTMLElement).dataset.target || "0");
      gsap.fromTo(el,
        { textContent: 0 },
        {
          textContent: target,
          duration: 2,
          delay: 1.2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate: function () {
            el.textContent = Math.round(Number(el.textContent)).toString();
          }
        }
      );
    });

    // Mouse parallax on blobs
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      gsap.to('.blob-1', { x: x * 35, y: y * 25, duration: 1.5, ease: 'power1.out' });
      gsap.to('.blob-2', { x: x * -25, y: y * 35, duration: 1.5, ease: 'power1.out' });
      gsap.to('.blob-3', { x: x * 45, y: y * -30, duration: 1.5, ease: 'power1.out' });
    };
    document.addEventListener('mousemove', handleMouseMove);

    // Float cards continuous animation
    gsap.to('.hero-photo-wrap', { y: -12, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    }
  }, { scope: heroRef });

  return (
    <section id="home" ref={heroRef}>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <div className="hero-text">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Coimbatore's Trusted Oncologist
        </div>

        <h1 className="hero-title">
          Beyond Treatment,<br />
          We <em>Care</em> &amp; Support<br />
          Every Step.
        </h1>

        <p className="hero-sub">
          Dr. Madhulika Vijayakumar — Senior Consultant in Oncology,
          bringing over a decade of expertise, compassion, and advanced
          radiotherapy to patients across Coimbatore.
        </p>

        <div className="hero-buttons">
          <a href="https://wa.me/918754626295?text=Hi%20Dr.%20Madhulika%2C%20I%20would%20like%20to%20book%20an%20appointment." target="_blank" rel="noopener noreferrer" className="btn-primary">Book Appointment</a>
          <a href="#about" className="btn-secondary">Learn More</a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num" data-target="13">0</span><span className="stat-plus">+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-num" data-target="6">0</span>
            <span className="stat-label">Services Offered</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-num" data-target="5">0</span>
            <span className="stat-label">Specialisations</span>
          </div>
        </div>

        <div className="hero-chips">
          <span className="chip chip-rose">🎓 FRCR – London</span>
          <span className="chip chip-lav">⚡ IMRT · VMAT · SBRT</span>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-photo-wrap">
          <div className="photo-ring ring-1"></div>
          <div className="photo-ring ring-2"></div>
          <img src={doctorHero} alt="Dr. Madhulika Vijayakumar" className="hero-photo" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
