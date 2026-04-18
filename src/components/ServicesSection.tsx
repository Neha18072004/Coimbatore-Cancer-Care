import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { Search, ClipboardList, HeartPulse, Pill, Zap, Scissors, ArrowRight, X } from "lucide-react";

gsap.registerPlugin(useGSAP, CustomEase);

const serviceData: Record<string, any> = {
  'screening': {
    icon: '🔍',
    label: 'Prevention',
    title: 'Screening & Immunisation',
    desc: 'Early detection is the most powerful weapon against cancer. Dr. Madhulika\'s screening programs are designed to catch cancer at its most treatable stage — before symptoms appear.',
    points: [
      '🎗️ Pap smears for cervical cancer detection',
      '🩺 Mammograms for breast cancer screening',
      '🔬 Colonoscopy for colorectal cancer',
      '💉 HPV & Hepatitis B vaccination programs',
      '📊 Personalized risk assessment'
    ]
  },
  'diagnosis': {
    icon: '🧬',
    label: 'Diagnosis',
    title: 'Diagnosis & Staging',
    desc: 'Accurate staging is the foundation of effective treatment. Using the most advanced imaging technologies available, Dr. Madhulika ensures every diagnosis is precise and complete.',
    points: [
      '🖥️ PET-CT Fusion Planning',
      '📡 4D-CT with motion management',
      '🔬 Image-guided biopsy and pathology',
      '📋 Comprehensive staging workup',
      '🤝 Multidisciplinary tumor board review'
    ]
  },
  'comprehensive': {
    icon: '🌿',
    label: 'Holistic Care',
    title: 'Comprehensive Cancer Care',
    desc: 'Cancer treatment is not just medical — it\'s emotional, psychological, and social. Our comprehensive care model addresses the whole person, not just the disease.',
    points: [
      '💝 Psychological and emotional support',
      '🍃 Nutritional guidance during treatment',
      '🧘 Lifestyle and wellness coaching',
      '👨‍👩‍👧 Family counseling and caregiver support',
      '🌙 Symptom and side-effect management'
    ]
  },
  'chemotherapy': {
    icon: '💊',
    label: 'Systemic Treatment',
    title: 'Chemotherapy',
    desc: 'Systemic cancer treatment using carefully selected drug protocols to target and destroy rapidly dividing cancer cells throughout the body.',
    points: [
      '💊 Individualized drug protocol design',
      '🩺 Close monitoring throughout treatment',
      '⚕️ Anti-nausea and supportive care',
      '🧪 Targeted and immunotherapy options',
      '📅 Flexible scheduling around your life'
    ]
  },
  'radiotherapy': {
    icon: '⚡',
    label: 'Advanced Radiation',
    title: 'Radiotherapy',
    desc: 'Using the most advanced radiation techniques available — IMRT, IGRT, VMAT, SBRT, and SRS — Dr. Madhulika delivers high-precision treatment that maximizes tumor control while protecting healthy tissue.',
    points: [
      '⚡ IMRT (Intensity-Modulated Radiotherapy)',
      '📡 IGRT (Image-Guided Radiotherapy)',
      '🔄 VMAT (Volumetric Modulated Arc Therapy)',
      '🎯 SBRT / SRS (Stereotactic treatments)',
      '🩻 Image-Guided Adaptive Brachytherapy'
    ]
  },
  'surgery': {
    icon: '🏥',
    label: 'Surgical Care',
    title: 'Surgery',
    desc: 'Surgical intervention with the primary goal of complete tumor removal — using the most precise techniques to ensure full eradication while minimizing impact on surrounding healthy tissue.',
    points: [
      '🔬 Margin-negative resection planning',
      '🩺 Pre-surgical imaging and staging',
      '⚕️ Minimally invasive where possible',
      '💝 Post-operative care and recovery',
      '🤝 Coordination with oncology team'
    ]
  }
};

const services = [
  { id: 'screening', icon: Search, title: "Screening & Immunisation", desc: "Prevent. Detect. Protect. Early Screening and Immunization Save Lives." },
  { id: 'diagnosis', icon: ClipboardList, title: "Diagnosis & Staging", desc: "Accurate Diagnosis. Precise Staging. Personalized Cancer Care." },
  { id: 'comprehensive', icon: HeartPulse, title: "Comprehensive Cancer Care", desc: "Holistic Care. Advanced Treatment. Compassionate Support." },
  { id: 'chemotherapy', icon: Pill, title: "Chemotherapy", desc: "Systemic cancer treatment using powerful drugs to destroy rapidly dividing cancer cells." },
  { id: 'radiotherapy', icon: Zap, title: "Radiotherapy", desc: "Highly precise treatment using high-energy radiation to destroy cancer cells and shrink tumors." },
  { id: 'surgery', icon: Scissors, title: "Surgery", desc: "Removing the tumor entirely or partially, along with surrounding tissue to ensure complete eradication." },
];

const ServicesSection = () => {
  const container = useRef<HTMLElement>(null);
  const [activeModalData, setActiveModalData] = useState<any>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openServiceModal = (key: string) => {
    setActiveModalData(serviceData[key]);
  };

  const closeServiceModal = () => {
    if (!modalRef.current) return;
    const modal = modalRef.current;
    const drawer = modal.querySelector('.svc-modal-drawer');
    const backdrop = modal.querySelector('.svc-modal-backdrop');

    gsap.timeline({
      onComplete: () => {
        setActiveModalData(null);
        document.body.style.overflow = '';
      }
    })
      .to(drawer, { y: '100%', duration: 0.45, ease: 'power3.in' })
      .to(backdrop, { opacity: 0, duration: 0.3 }, '-=0.2');
  };

  useGSAP(() => {
    if (activeModalData && modalRef.current) {
      document.body.style.overflow = 'hidden';
      const modal = modalRef.current;
      const drawer = modal.querySelector('.svc-modal-drawer');
      const backdrop = modal.querySelector('.svc-modal-backdrop');

      gsap.set(drawer, { y: '100%' });

      const tl = gsap.timeline();
      tl.to(backdrop, {
        opacity: 1, duration: 0.3, ease: 'power2.out'
      })
        .to(drawer, {
          y: 0, duration: 0.55, ease: CustomEase.create('drawer', 'M0,0 C0.2,0 0,1 1,1')
        }, '-=0.15')
        .from('.svc-point', {
          x: -20, opacity: 0, stagger: 0.07, duration: 0.4, ease: 'power3.out'
        }, '-=0.1');
    }
  }, [activeModalData]);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.service-card');

    cards.forEach((card) => {
      const icon = card.querySelector('.service-icon');
      const arrow = card.querySelector('.service-arrow');

      const handleMouseEnter = () => {
        gsap.to(card, { y: -8, boxShadow: '0 20px 50px rgba(217,123,143,0.2)', duration: 0.3, ease: 'power2.out' });
        if (icon) gsap.to(icon, { scale: 1.15, rotate: 8, duration: 0.35, ease: 'back.out(1.7)' });
        if (arrow) gsap.to(arrow, { x: 8, duration: 0.3, ease: 'power2.out' });
      };

      const handleMouseLeave = () => {
        gsap.to(card, { y: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', duration: 0.35 });
        if (icon) gsap.to(icon, { scale: 1, rotate: 0, duration: 0.35 });
        if (arrow) gsap.to(arrow, { x: 0, duration: 0.3 });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, { scope: container });

  return (
    <section ref={container} id="services" className="section-padding bg-[var(--cream)] overflow-hidden reveal">
      <div className="section-container">
        <div className="services-header text-center mb-16">
          <span className="section-label uppercase tracking-wider text-[var(--rose-deep)] font-semibold text-sm mb-2 block">Our Expertise</span>
          <h2 className="services-title section-title text-4xl md:text-5xl font-heading text-[var(--text)]">
            Services
          </h2>
        </div>

        <div className="services-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <div
              key={s.id}
              className={`service-card sc-${idx + 1}`}
              onClick={(e) => {
                const r = document.createElement('div');
                Object.assign(r.style, {
                  position: 'absolute', borderRadius: '50%',
                  width: '10px', height: '10px',
                  background: 'rgba(217,123,143,0.25)',
                  left: e.nativeEvent.offsetX + 'px', top: e.nativeEvent.offsetY + 'px',
                  transform: 'translate(-50%,-50%)',
                  pointerEvents: 'none',
                  zIndex: "0"
                });
                e.currentTarget.appendChild(r);
                gsap.to(r, { scale: 30, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => r.remove() });

                openServiceModal(s.id);
              }}
            >
              <div className="relative z-10">
                <div className="service-icon">
                  <s.icon size={28} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-[var(--text)] mb-2">{s.title}</h3>
                <p className="text-[var(--text-soft)] text-sm leading-relaxed">{s.desc}</p>

                <div className="service-arrow">
                  Learn more <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Modal Drawer */}
      <div
        id="service-modal"
        className={`svc-modal ${activeModalData ? 'open' : ''}`}
        aria-hidden={!activeModalData}
        ref={modalRef}
      >
        <div className="svc-modal-backdrop" onClick={closeServiceModal}></div>
        <div className="svc-modal-drawer">
          <button className="svc-modal-close" aria-label="Close" onClick={closeServiceModal}>
            <X size={20} />
          </button>

          {activeModalData && (
            <div className="svc-modal-content">
              <div className="svc-modal-icon">{activeModalData.icon}</div>
              <div className="svc-modal-label">{activeModalData.label}</div>
              <h2 className="svc-modal-title">{activeModalData.title}</h2>
              <p className="svc-modal-desc">{activeModalData.desc}</p>

              <div className="svc-modal-points">
                {activeModalData.points.map((point: string, i: number) => (
                  <div key={i} className="svc-point">{point}</div>
                ))}
              </div>

              <a href="https://wa.me/918754626295?text=Hi%20Dr.%20Madhulika%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank" rel="noopener noreferrer" className="btn-primary svc-modal-cta" onClick={closeServiceModal}>
                Book a Consultation →
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
