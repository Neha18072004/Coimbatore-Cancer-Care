import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, CustomEase, ScrollTrigger);

const Splash = () => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        document.documentElement.classList.add('splash-active');
        document.body.classList.add('splash-active');
        document.body.style.overflow = 'hidden';

        // ── 1. Create and scatter particles ──
        const particles = gsap.utils.toArray('.s-particle') as HTMLElement[];
        particles.forEach((p) => {
            gsap.set(p, {
                left: `${5 + Math.random() * 90}%`,
                top: `${10 + Math.random() * 80}%`,
                fontSize: `${1 + Math.random() * 1.2}rem`
            });
        });

        // ── 2. Master timeline ──
        const tl = gsap.timeline({
            onComplete: () => {
                // After curtain opens, clean up
                setTimeout(() => {
                    if (container.current) container.current.style.display = 'none';
                    document.documentElement.classList.remove('splash-active');
                    document.body.classList.remove('splash-active');
                    document.body.style.overflow = '';

                    document.querySelectorAll('body > *:not(#splash)').forEach(el => {
                        (el as HTMLElement).style.visibility = 'visible';
                    });

                    ScrollTrigger.refresh();
                }, 300);
            }
        });

        // ── Phase 1: Particles drift in (0s) ──
        tl.to('.s-particle', {
            opacity: 0.2,
            duration: 0.8,
            stagger: { amount: 1, from: 'random' },
            ease: 'power2.out'
        }, 0);

        // Particles drift upward + rotate slowly throughout
        gsap.to('.s-particle', {
            y: '-30vh',
            rotation: () => gsap.utils.random(-40, 40),
            duration: () => gsap.utils.random(5, 9),
            stagger: { amount: 2, from: 'random' },
            ease: 'none',
            repeat: -1,
            yoyo: true,
        });

        // ── Phase 2: Ring draws itself (0.3s) ──
        tl.to('.s-ring-fill', {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power2.inOut'
        }, 0.3);

        // ── Phase 3: Logo fades & scales in (0.8s) ──
        tl.to('.s-logo-inner', {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
        }, 0.8)
            .to('.s-logo-img', {
                scale: 1,
                duration: 0.7,
                ease: 'back.out(1.7)'
            }, 0.8);

        // Logo gentle pulse after it appears
        gsap.to('.s-logo-img', {
            scale: 1.08,
            duration: 1.4,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            delay: 1.5
        });

        // ── Phase 4: Brand words fly in with stagger (1.4s) ──
        tl.to('.s-word', {
            opacity: 1,
            y: 0,
            skewX: 0,
            duration: 0.7,
            stagger: 0.18,
            ease: 'power4.out'
        }, 1.4);

        // ── Phase 5: Tagline fades in (2.3s) ──
        tl.to('.s-tagline', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, 2.3);

        // ── Phase 6: Load bar appears and fills (2.5s) ──
        tl.to('.s-loadbar', { opacity: 1, duration: 0.3 }, 2.5)
            .to('.s-loadbar-fill', {
                width: '100%',
                duration: 1.1,
                ease: 'power1.inOut'
            }, 2.5);

        // ── Phase 7: Everything fades/scales out (3.8s) ──
        tl.to('.s-content', {
            opacity: 0,
            scale: 0.96,
            duration: 0.45,
            ease: 'power2.in'
        }, 3.8);

        // Particles fade out
        tl.to('.s-particle', {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in'
        }, 3.8);

        // ── Phase 8: CURTAIN RIPS OPEN (4.1s) ──
        // Custom ease that starts slow then accelerates (like a curtain being pulled)
        const curtainEase = CustomEase.create('curtain', 'M0,0 C0.4,0 0.2,1 1,1');

        tl.to('.s-panel-left', {
            xPercent: -101,
            duration: 1.0,
            ease: curtainEase
        }, 4.1)
            .to('.s-panel-right', {
                xPercent: 101,
                duration: 1.0,
                ease: curtainEase
            }, 4.1);

        // ── Ring rotation animation (decorative) ──
        gsap.to('.s-ring-svg', {
            rotation: 360,
            duration: 8,
            repeat: -1,
            ease: 'none',
            transformOrigin: 'center center'
        });

    }, { scope: container });

    const particleIcons = ['🎗️', '🩺', '💊', '✚', '🌸', '🩻', '💉', '🌷', '🔬', '🧬', '💝', '⚕️'];

    return (
        <div id="splash" aria-hidden="true" ref={container}>
            {/* Two curtain panels */}
            <div className="s-panel s-panel-left"></div>
            <div className="s-panel s-panel-right"></div>

            {/* All content sits above the panels */}
            <div className="s-content">
                {/* Floating ambient particles */}
                <div className="s-particles" id="splashParticles">
                    {particleIcons.map((icon, i) => (
                        <span key={i} className="s-particle">{icon}</span>
                    ))}
                </div>

                {/* Circular SVG progress ring */}
                <div className="s-ring-wrap">
                    <svg className="s-ring-svg" viewBox="0 0 120 120">
                        <circle className="s-ring-track" cx="60" cy="60" r="54" />
                        <circle className="s-ring-fill" cx="60" cy="60" r="54" />
                    </svg>
                    {/* Cancer ribbon logo sits INSIDE the ring */}
                    <div className="s-logo-inner">
                        <img src="/splash logo.png" alt="Coimbatore Cancer Care" className="s-logo-img" />
                    </div>
                </div>

                {/* Brand text — each word on its own line, stagger in */}
                <div className="s-brand">
                    <div className="s-word" data-word="COIMBATORE">COIMBATORE</div>
                    <div className="s-word" data-word="CANCER">CANCER</div>
                    <div className="s-word" data-word="CARE">CARE</div>
                </div>

                {/* Tagline fades in last */}
                <p className="s-tagline">Beyond Treatment, We Care Every Step of Your Journey</p>

                {/* Thin bottom line that fills like a loading bar */}
                <div className="s-loadbar">
                    <div className="s-loadbar-fill"></div>
                </div>
            </div>
        </div>
    );
};

export default Splash;
