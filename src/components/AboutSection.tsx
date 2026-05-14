import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import doctorAbout from "@/assets/doctor-about.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AboutSection = () => {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Image container animation
    gsap.from(".about-img-container", {
      scrollTrigger: {
        trigger: ".about-img-container",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      x: -60,
      rotation: -2,
      duration: 0.8,
      ease: "power3.out"
    });

    // Decorative corner accent
    gsap.from(".about-corner", {
      scrollTrigger: {
        trigger: ".about-img-container",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      scale: 0,
      duration: 0.5,
      delay: 0.5,
      ease: "back.out(1.7)"
    });

    // Text content timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    tl.from(".about-content", { opacity: 0, x: 60, duration: 0.8, ease: "power3.out" })
      .from(".about-title", { opacity: 0, y: 20, duration: 0.5 }, "-=0.5")
      .from(".about-divider", { scaleX: 0, transformOrigin: "left center", duration: 0.5 }, "-=0.3")
      .from(".about-text-1", { opacity: 0, y: 15, duration: 0.5 }, "-=0.3")
      .from(".about-text-2", { opacity: 0, y: 15, duration: 0.5 }, "-=0.2");

  }, { scope: container });

  return (
    <section ref={container} id="about" className="section-padding bg-background overflow-hidden">
      <div className="section-container grid md:grid-cols-2 gap-12 items-center">
        <div className="about-img-container relative group">
          <div className="absolute -inset-3 bg-gradient-to-tr from-primary/15 to-rose-medium/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src={doctorAbout}
            alt="Dr. Madhulika Vijayakumar"
            className="relative rounded-xl shadow-lg max-h-[450px] object-cover object-top w-full transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {/* Decorative corner accent */}
          <div className="about-corner absolute -bottom-3 -right-3 w-20 h-20 border-2 border-primary/30 rounded-xl" />
        </div>

        <div className="about-content">
          <h2 className="about-title section-title">
            About
          </h2>
          <div className="about-divider section-divider mb-6" />
          <p className="about-text-1 text-muted-foreground leading-relaxed mb-4">
            Dr. Madhulika Vijayakumar is a highly respected Senior Consultant and Associate Professor in Oncology, bringing over a decade of expertise to her practice in Coimbatore. Dedicated to providing comprehensive cancer care, she is associated with some of the most renowned hospitals in and around Coimbatore.
          </p>
          <p className="about-text-2 text-muted-foreground leading-relaxed">
            Dr. Madhulika is committed to delivering personalized treatment with a focus on clinical excellence, compassion, and patient comfort, ensuring the highest standard of care throughout every stage of the cancer journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
