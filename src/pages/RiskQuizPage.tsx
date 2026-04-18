import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

gsap.registerPlugin(useGSAP);

type QuizStep = "intro" | "bmi" | "bmiResult" | "hpv" | "result";

interface BMIData {
  age: number;
  height: number;
  weight: number;
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

const RiskQuizPage = () => {
  const [step, setStep] = useState<QuizStep>("intro");
  const [bmiData, setBmiData] = useState<BMIData>({ age: 30, height: 160, weight: 60 });
  const [bmiValue, setBmiValue] = useState<number>(0);
  const [hpvVaccinated, setHpvVaccinated] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);

  const animateStepIn = () => {
    if (stepRef.current) {
      gsap.fromTo(stepRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  };

  const goToStep = (nextStep: QuizStep) => {
    if (stepRef.current) {
      gsap.to(stepRef.current, {
        opacity: 0, y: -30, duration: 0.3, ease: "power2.in",
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

  useGSAP(() => {
    // Floating background blobs
    gsap.to(".quiz-blob-1", { x: 30, y: -20, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(".quiz-blob-2", { x: -25, y: 25, duration: 7, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1 });
    gsap.to(".quiz-blob-3", { x: 15, y: -35, duration: 8, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 2 });

    animateStepIn();
  }, { scope: containerRef });

  const category = getBMICategory(bmiValue);
  const screenings = getScreeningRecommendations(bmiData.age);

  const whatsAppLink = `https://wa.me/918754626295?text=${encodeURIComponent(
    `Hi Dr. Madhulika, I took the Cancer Risk Assessment Quiz on your website.\n\nMy BMI: ${bmiValue} (${category.label})\nAge: ${bmiData.age}\nHPV Vaccinated: ${hpvVaccinated ? "Yes" : "No"}\n\nI would like to book a consultation for a screening.`
  )}`;

  return (
    <div className="quiz-page" ref={containerRef}>
      {/* Background decoration */}
      <div className="quiz-blob quiz-blob-1"></div>
      <div className="quiz-blob quiz-blob-2"></div>
      <div className="quiz-blob quiz-blob-3"></div>

      {/* Back to home */}
      <Link to="/" className="quiz-back-link">
        ← Back to Home
      </Link>

      <div className="quiz-container">
        {/* Progress indicator */}
        <div className="quiz-progress">
          {["intro", "bmi", "bmiResult", "hpv", "result"].map((s, i) => (
            <div
              key={s}
              className={`quiz-progress-dot ${
                ["intro", "bmi", "bmiResult", "hpv", "result"].indexOf(step) >= i ? "active" : ""
              }`}
            />
          ))}
        </div>

        <div ref={stepRef} className="quiz-step-content">

          {/* ── INTRO ── */}
          {step === "intro" && (
            <div className="quiz-card quiz-intro-card">
              <div className="quiz-card-icon">🛡️</div>
              <h1 className="quiz-title">Am I At Risk?</h1>
              <p className="quiz-subtitle">
                Take this quick assessment to understand your cancer risk profile
                and get personalized screening recommendations.
              </p>
              <div className="quiz-info-chips">
                <span className="quiz-chip">⏱ 2 minutes</span>
                <span className="quiz-chip">🔒 100% Private</span>
                <span className="quiz-chip">📋 Personalized Results</span>
              </div>
              <button className="quiz-btn-primary" onClick={() => goToStep("bmi")}>
                Start Assessment →
              </button>
            </div>
          )}

          {/* ── BMI INPUTS ── */}
          {step === "bmi" && (
            <div className="quiz-card">
              <div className="quiz-card-icon">📊</div>
              <h2 className="quiz-step-title">Your Body Profile</h2>
              <p className="quiz-step-desc">Help us calculate your BMI to assess weight-related cancer risks.</p>

              <div className="quiz-form">
                <div className="quiz-slider-group">
                  <label className="quiz-label">
                    Age
                    <span className="quiz-value-badge">{bmiData.age} years</span>
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={bmiData.age}
                    onChange={e => setBmiData({ ...bmiData, age: parseInt(e.target.value) })}
                    className="quiz-slider"
                  />
                  <div className="quiz-slider-labels">
                    <span>10</span><span>30</span><span>50</span><span>70</span><span>100</span>
                  </div>
                </div>

                <div className="quiz-slider-group">
                  <label className="quiz-label">
                    Height
                    <span className="quiz-value-badge">{bmiData.height} cm</span>
                  </label>
                  <input
                    type="range"
                    min={100}
                    max={220}
                    value={bmiData.height}
                    onChange={e => setBmiData({ ...bmiData, height: parseInt(e.target.value) })}
                    className="quiz-slider"
                  />
                  <div className="quiz-slider-labels">
                    <span>100</span><span>140</span><span>180</span><span>220</span>
                  </div>
                </div>

                <div className="quiz-slider-group">
                  <label className="quiz-label">
                    Weight
                    <span className="quiz-value-badge">{bmiData.weight} kg</span>
                  </label>
                  <input
                    type="range"
                    min={30}
                    max={200}
                    value={bmiData.weight}
                    onChange={e => setBmiData({ ...bmiData, weight: parseInt(e.target.value) })}
                    className="quiz-slider"
                  />
                  <div className="quiz-slider-labels">
                    <span>30</span><span>80</span><span>130</span><span>200</span>
                  </div>
                </div>

                <button className="quiz-btn-primary" onClick={calculateBMI}>
                  Calculate My BMI →
                </button>
              </div>
            </div>
          )}

          {/* ── BMI RESULT ── */}
          {step === "bmiResult" && (
            <div className="quiz-card">
              <div className="quiz-card-icon">{category.emoji}</div>
              <h2 className="quiz-step-title">Your BMI Result</h2>

              <div className="bmi-gauge">
                <div className="bmi-gauge-bar">
                  <div className="bmi-gauge-fill" style={{
                    width: `${Math.min((bmiValue / 40) * 100, 100)}%`,
                    background: category.color
                  }} />
                </div>
                <div className="bmi-gauge-labels">
                  <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
                </div>
              </div>

              <div className="bmi-result-display">
                <span className="bmi-number" style={{ color: category.color }}>{bmiValue}</span>
                <span className="bmi-category" style={{ color: category.color }}>{category.label}</span>
              </div>

              <p className="bmi-advice">{category.advice}</p>

              <button className="quiz-btn-primary" onClick={() => goToStep("hpv")}>
                Continue Assessment →
              </button>
            </div>
          )}

          {/* ── HPV VACCINE ── */}
          {step === "hpv" && (
            <div className="quiz-card">
              <div className="quiz-card-icon">💉</div>
              <h2 className="quiz-step-title">Cancer Protection</h2>
              <p className="quiz-step-desc">
                The HPV vaccine protects against cervical, throat, and other cancers.
                It is one of the most effective cancer prevention tools available.
              </p>

              <h3 className="quiz-question">Have you been vaccinated against HPV?</h3>

              <div className="quiz-choice-grid">
                <button className="quiz-choice-btn quiz-choice-yes" onClick={() => handleHPV(true)}>
                  <span className="quiz-choice-emoji">✅</span>
                  <span className="quiz-choice-text">Yes, I'm vaccinated</span>
                </button>
                <button className="quiz-choice-btn quiz-choice-no" onClick={() => handleHPV(false)}>
                  <span className="quiz-choice-emoji">❌</span>
                  <span className="quiz-choice-text">No, not yet</span>
                </button>
              </div>
            </div>
          )}

          {/* ── FINAL RESULT ── */}
          {step === "result" && (
            <div className="quiz-card quiz-result-card">
              <div className="quiz-card-icon">{hpvVaccinated ? "🎉" : "⚠️"}</div>
              <h2 className="quiz-step-title">
                {hpvVaccinated
                  ? "Great Job! Stay Protected"
                  : "⏰ Time for Screening"}
              </h2>

              {!hpvVaccinated && (
                <div className="quiz-alert">
                  <p><strong>You haven't been vaccinated against HPV.</strong></p>
                  <p>The HPV vaccine can prevent up to 90% of HPV-related cancers. We strongly recommend consulting a doctor about vaccination.</p>
                </div>
              )}

              {hpvVaccinated && (
                <div className="quiz-success">
                  <p>Being HPV vaccinated significantly reduces your cancer risk. Keep up with your regular screenings!</p>
                </div>
              )}

              <div className="quiz-screenings">
                <h3 className="quiz-screenings-title">📋 Recommended Screenings for Age {bmiData.age}</h3>
                <div className="quiz-screening-list">
                  {screenings.map((rec, i) => (
                    <div key={i} className="quiz-screening-item">{rec}</div>
                  ))}
                </div>
              </div>

              <div className="quiz-summary-box">
                <div className="quiz-summary-row">
                  <span>BMI</span>
                  <span style={{ color: category.color, fontWeight: 600 }}>{bmiValue} — {category.label}</span>
                </div>
                <div className="quiz-summary-row">
                  <span>HPV Vaccine</span>
                  <span style={{ color: hpvVaccinated ? "#5EAF52" : "#D4547A", fontWeight: 600 }}>
                    {hpvVaccinated ? "✅ Vaccinated" : "❌ Not Vaccinated"}
                  </span>
                </div>
                <div className="quiz-summary-row">
                  <span>Age</span>
                  <span>{bmiData.age} years</span>
                </div>
              </div>

              <div className="quiz-cta-group">
                <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="quiz-btn-whatsapp">
                  💬 Book Appointment via WhatsApp
                </a>
                <button className="quiz-btn-secondary" onClick={() => goToStep("intro")}>
                  ↻ Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskQuizPage;
