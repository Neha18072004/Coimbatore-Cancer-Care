import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Qualifications", href: "#qualifications" },
  { label: "Stories", href: "#testimonials" },
  { label: "Risk Quiz", href: "/risk-quiz", isRoute: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef<HTMLElement>(null);
  const topbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const onScroll = () => {
      let current = "";
      sections.forEach((section) => {
        if (window.scrollY >= (section as HTMLElement).offsetTop - 100) {
          current = section.id;
        }
      });
      setActiveSection(current);
      document.getElementById("navbar")?.classList.toggle("scrolled", window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    // Topbar slide down
    gsap.from(topbarRef.current, {
      y: -30, opacity: 0, duration: 0.5, ease: 'power3.out'
    });

    // Nav items stagger in
    gsap.from('.nav-logo', {
      x: -20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.1
    });
    gsap.from('.nav-links li', {
      y: -20, opacity: 0, duration: 0.5,
      stagger: 0.08, ease: 'power3.out', delay: 0.2
    });
  }, []);

  useEffect(() => {
    const links = document.querySelector('.nav-links') as HTMLElement;
    if (!links) return;

    // Hamburger mobile menu
    if (isOpen) {
      links.style.cssText = `
        display: flex; flex-direction: column;
        position: absolute; top: 70px; left: 0; right: 0;
        background: rgba(255,248,244,0.97);
        backdrop-filter: blur(16px);
        padding: 1.5rem 5vw; gap: 1.2rem;
        border-bottom: 1px solid rgba(242,167,184,0.2);
        z-index: 1000;
      `;
      gsap.from('.nav-links li', {
        x: -20, opacity: 0, stagger: 0.07, duration: 0.4, ease: 'power3.out', clearProps: "all"
      });
    } else {
      if (links.style.display === 'flex' && window.innerWidth <= 900) {
        gsap.to('.nav-links', {
          opacity: 0, x: -10, duration: 0.3,
          onComplete: () => {
            links.style.display = 'none';
            links.style.opacity = '1';
            links.style.transform = 'none';
          }
        });
      } else if (window.innerWidth > 900) {
        links.style.cssText = '';
      }
    }

    const handleResize = () => {
      if (window.innerWidth > 900) {
        links.style.cssText = '';
        setIsOpen(false);
      } else {
        if (!isOpen) links.style.display = 'none';
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <>
      <div className="topbar" ref={topbarRef}>
        <span>📞 +91-8754626295</span>
        <span>|</span>
        <span>⏰ Mon–Fri: 10AM – 6PM</span>
        <span>|</span>
        <a href="https://wa.me/918754626295?text=Hi%20Dr.%20Madhulika%2C%20I%20would%20like%20to%20book%20an%20appointment.">💬 WhatsApp Us</a>
        <span>|</span>
        <a href="https://www.instagram.com/madhulika.vijayakumar" target="_blank" rel="noopener noreferrer">📸 Instagram</a>
      </div>

      <nav id="navbar" ref={navRef}>
        <a href="#home" className="nav-logo">
          <img src="/splash logo.png" alt="logo" className="nav-logo-img" style={{ width: '55px', height: '55px' }} />
          <span className="nav-logo-text">Coimbatore Cancer Care</span>
        </a>

        <ul className={`nav-links ${isOpen ? 'nav-open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.href}>
              {(link as any).isRoute ? (
                <a
                  href={link.href}
                  className=""
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  href={link.href}
                  className={activeSection === link.href.slice(1) ? "active" : ""}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
          <li>
            <a href="https://wa.me/918754626295?text=Hi%20Dr.%20Madhulika%2C%20I%20would%20like%20to%20book%20an%20appointment." target="_blank" rel="noopener noreferrer" className="nav-cta" onClick={() => setIsOpen(false)}>Book Appointment</a>
          </li>
        </ul>

        <button
          className="hamburger"
          aria-label="Menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </>
  );
};

export default Navbar;
