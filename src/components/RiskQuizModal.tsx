import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type QuizStep = "intro" | "bmi" | "bmiResult" | "hpv" | "result";

interface BMIData {
  age: number;
  height: number;
  weight: number;
}

interface RiskQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) return { label: "Underweight", color: "#5B9BD5", emoji: "⚖️", advice: "Being underweight may weaken your immune system. Consider consulting a nutritionist." };
  if (bmi < 25) return { label: "Normal", color: "#5EAF52", emoji: "✅", advice: "Great! Maintaining a healthy weight reduces your cancer risk significantly." };
  if (bmi < 30) return { label: "Overweight", color: "#F5A623", emoji: "⚠️", advice: "Being overweight increases the risk of several cancers. Regular exercise and a balanced diet can help." };
  return { label: "Obese", color: "#D4547A", emoji: "🔴", advice: "Obesity is a significant risk factor for cancer. Please consult a healthcare professional for guidance." };
};

const getScreeningRecommendations = (age: number) => {
  const recs: string[] = [];
  if (age >= 21) recs.push("🔬 Pap smear every 3 years (ages 21–65)");
  if (age >= 30) recs.push("🧬 HPV test every 5 years (ages 30–65)");
  if (age >= 40) recs.push("🩺 Annual mammogram recommended");
  if (age >= 45) recs.push("🔍 Colorectal cancer screening recommended");
  if (age >= 50) recs.push("📋 Discuss lung cancer screening if applicable");
  if (recs.length === 0) recs.push("💡 Stay informed and follow your doctor's guidance for age-appropriate screenings");
  return recs;
};

const RiskQuizModal = ({ isOpen, onClose }: RiskQuizModalProps) => {
  const [step, setStep] = useState<QuizStep>("intro");
  const [bmiData, setBmiData] = useState<BMIData>({ age: 30, height: 160, weight: 60 });
  const [bmiValue, setBmiValue] = useState<number>(0);
  const [hpvVaccinated, setHpvVaccinated] = useState<boolean | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);

  // Reset quiz when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("intro");
      setBmiData({ age: 30, height: 160, weight: 60 });
      setBmiValue(0);
      setHpvVaccinated(null);
    }
  }, [isOpen]);

  // Animate popup in/out
  useEffect(() => {
    if (isOpen && popupRef.current) {
      gsap.fromTo(popupRef.current,
        { opacity: 0, y: 40, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)" }
      );
    }
  }, [isOpen]);

  const animateStepIn = () => {
    if (stepRef.current) {
      gsap.fromTo(stepRef.current,
        { opacity: 0, y: 20, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }
      );
    }
  };

  const goToStep = (nextStep: QuizStep) => {
    if (stepRef.current) {
      gsap.to(stepRef.current, {
        opacity: 0, y: -15, duration: 0.25, ease: "power2.in",
        onComplete: () => {
          setStep(nextStep);
          setTimeout(animateStepIn, 50);
        }
      });
    } else {
      setStep(nextStep);
    }
  };

  const calculateBMI = () => {
    const heightM = bmiData.height / 100;
    const bmi = bmiData.weight / (heightM * heightM);
    setBmiValue(parseFloat(bmi.toFixed(1)));
    goToStep("bmiResult");
  };

  const handleHPV = (vaccinated: boolean) => {
    setHpvVaccinated(vaccinated);
    goToStep("result");
  };

  const handleClose = () => {
    if (popupRef.current) {
      gsap.to(popupRef.current, {
        opacity: 0, y: 30, scale: 0.95, duration: 0.3, ease: "power2.in",
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  const category = getBMICategory(bmiValue);
  const screenings = getScreeningRecommendations(bmiData.age);

  const whatsAppLink = `https://wa.me/918754626295?text=${encodeURIComponent(
    `Hi Dr. Madhulika, I took the Cancer Risk Assessment Quiz on your website.\n\nMy BMI: ${bmiValue} (${category.label})\nAge: ${bmiData.age}\nHPV Vaccinated: ${hpvVaccinated ? "Yes" : "No"}\n\nI would like to book a consultation for a screening.`
  )}`;

  return (
    <div className="quiz-corner-popup" ref={popupRef}>
      {/* Header bar */}
      <div className="quiz-corner-header">
        <div className="quiz-corner-header-left">
          <span className="quiz-corner-icon">🛡️</span>
          <span className="quiz-corner-header-title">Risk Assessment</span>
        </div>
        <button className="quiz-corner-close" onClick={handleClose} aria-label="Close quiz">
          ✕
        </button>
      </div>

      {/* Progress indicator */}
      <div className="quiz-corner-progress">
        {["intro", "bmi", "bmiResult", "hpv", "result"].map((s, i) => (
          <div
            key={s}
            className={`quiz-corner-progress-dot ${
              ["intro", "bmi", "bmiResult", "hpv", "result"].indexOf(step) >= i ? "active" : ""
            }`}
          />
        ))}
      </div>

      {/* Content area */}
      <div className="quiz-corner-body" ref={stepRef}>

        {/* ── INTRO ── */}
        {step === "intro" && (
          <div className="quiz-corner-card">
            <h3 className="quiz-corner-title">Am I At Risk?</h3>
            <p className="quiz-corner-subtitle">
              Quick assessment for personalized cancer screening recommendations.
            </p>
            <div className="quiz-corner-chips">
              <span className="quiz-corner-chip">⏱ 2 min</span>
              <span className="quiz-corner-chip">🔒 Private</span>
              <span className="quiz-corner-chip">📋 Personal</span>
            </div>
            <button className="quiz-corner-btn-primary" onClick={() => goToStep("bmi")}>
              Start Assessment →
            </button>
          </div>
        )}

        {/* ── BMI INPUTS ── */}
        {step === "bmi" && (
          <div className="quiz-corner-card">
            <h3 className="quiz-corner-step-title">📊 Your Body Profile</h3>
            <p className="quiz-corner-step-desc">Help us calculate your BMI.</p>

            <div className="quiz-corner-form">
              <div className="quiz-corner-slider-group">
                <label className="quiz-corner-label">
                  Age
                  <span className="quiz-corner-value">{bmiData.age} yrs</span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={bmiData.age}
                  onChange={e => setBmiData({ ...bmiData, age: parseInt(e.target.value) })}
                  className="quiz-corner-slider"
                />
              </div>

              <div className="quiz-corner-slider-group">
                <label className="quiz-corner-label">
                  Height
                  <span className="quiz-corner-value">{bmiData.height} cm</span>
                </label>
                <input
                  type="range"
                  min={100}
                  max={220}
                  value={bmiData.height}
                  onChange={e => setBmiData({ ...bmiData, height: parseInt(e.target.value) })}
                  className="quiz-corner-slider"
                />
              </div>

              <div className="quiz-corner-slider-group">
                <label className="quiz-corner-label">
                  Weight
                  <span className="quiz-corner-value">{bmiData.weight} kg</span>
                </label>
                <input
                  type="range"
                  min={30}
                  max={200}
                  value={bmiData.weight}
                  onChange={e => setBmiData({ ...bmiData, weight: parseInt(e.target.value) })}
                  className="quiz-corner-slider"
                />
              </div>

              <button className="quiz-corner-btn-primary" onClick={calculateBMI}>
                Calculate My BMI →
              </button>
            </div>
          </div>
        )}

        {/* ── BMI RESULT ── */}
        {step === "bmiResult" && (
          <div className="quiz-corner-card">
            <h3 className="quiz-corner-step-title">{category.emoji} BMI Result</h3>

            <div className="quiz-corner-bmi-gauge">
              <div className="quiz-corner-bmi-bar">
                <div className="quiz-corner-bmi-fill" style={{
                  width: `${Math.min((bmiValue / 40) * 100, 100)}%`,
                  background: category.color
                }} />
              </div>
            </div>

            <div className="quiz-corner-bmi-result">
              <span className="quiz-corner-bmi-number" style={{ color: category.color }}>{bmiValue}</span>
              <span className="quiz-corner-bmi-label" style={{ color: category.color }}>{category.label}</span>
            </div>

            <p className="quiz-corner-advice">{category.advice}</p>

            <button className="quiz-corner-btn-primary" onClick={() => goToStep("hpv")}>
              Continue →
            </button>
          </div>
        )}

        {/* ── HPV VACCINE ── */}
        {step === "hpv" && (
          <div className="quiz-corner-card">
            <h3 className="quiz-corner-step-title">💉 Cancer Protection</h3>
            <p className="quiz-corner-step-desc">
              HPV vaccine protects against cervical, throat, and other cancers.
            </p>

            <h4 className="quiz-corner-question">Have you been vaccinated against HPV?</h4>

            <div className="quiz-corner-choices">
              <button className="quiz-corner-choice quiz-corner-choice-yes" onClick={() => handleHPV(true)}>
                <span>✅</span>
                <span>Yes, vaccinated</span>
              </button>
              <button className="quiz-corner-choice quiz-corner-choice-no" onClick={() => handleHPV(false)}>
                <span>❌</span>
                <span>No, not yet</span>
              </button>
            </div>
          </div>
        )}

        {/* ── FINAL RESULT ── */}
        {step === "result" && (
          <div className="quiz-corner-card quiz-corner-result">
            <h3 className="quiz-corner-step-title">
              {hpvVaccinated ? "🎉 Stay Protected" : "⚠️ Time for Screening"}
            </h3>

            {!hpvVaccinated && (
              <div className="quiz-corner-alert">
                <p><strong>Not HPV vaccinated.</strong> The vaccine can prevent up to 90% of HPV-related cancers.</p>
              </div>
            )}

            {hpvVaccinated && (
              <div className="quiz-corner-success">
                <p>Being HPV vaccinated significantly reduces your cancer risk. Keep up with regular screenings!</p>
              </div>
            )}

            <div className="quiz-corner-screenings">
              <h4 className="quiz-corner-screenings-title">📋 Screenings for Age {bmiData.age}</h4>
              {screenings.map((rec, i) => (
                <div key={i} className="quiz-corner-screening-item">{rec}</div>
              ))}
            </div>

            <div className="quiz-corner-summary">
              <div className="quiz-corner-summary-row">
                <span>BMI</span>
                <span style={{ color: category.color, fontWeight: 600 }}>{bmiValue} — {category.label}</span>
              </div>
              <div className="quiz-corner-summary-row">
                <span>HPV</span>
                <span style={{ color: hpvVaccinated ? "#5EAF52" : "#D4547A", fontWeight: 600 }}>
                  {hpvVaccinated ? "✅ Yes" : "❌ No"}
                </span>
              </div>
            </div>

            <div className="quiz-corner-cta">
              <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="quiz-corner-btn-whatsapp">
                💬 Book via WhatsApp
              </a>
              <button className="quiz-corner-btn-secondary" onClick={() => goToStep("intro")}>
                ↻ Retake
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskQuizModal;
