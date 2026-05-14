import { useEffect, useRef } from "react";
import gsap from "gsap";

const WhatsAppButton = () => {
    const btnRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (!btnRef.current) return;

        // Floating bob
        gsap.to(btnRef.current, {
            y: -8,
            duration: 1.8,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
        });

        const handleMouseEnter = () => {
            gsap.to(btnRef.current, { scale: 1.12, duration: 0.25, ease: "power2.out" });
        };

        const handleMouseLeave = () => {
            gsap.to(btnRef.current, { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.5)" });
        };

        const btn = btnRef.current;
        btn.addEventListener("mouseenter", handleMouseEnter);
        btn.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            btn.removeEventListener("mouseenter", handleMouseEnter);
            btn.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <a
            ref={btnRef}
            href="https://wa.me/918754626295?text=Hi%20Dr.%20Madhulika%2C%20I%20would%20like%20to%20book%20an%20appointment."
            id="whatsapp-btn"
            title="Chat on WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
        >
            💬
        </a>
    );
};

export default WhatsAppButton;
