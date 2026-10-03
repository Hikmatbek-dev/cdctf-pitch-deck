import React, { useState, useEffect } from "react";
import {
  ArrowRight, ArrowLeft, ArrowUpRight,
  CheckCircle2, Laptop, Server, Database,
  Cpu, Copy, Check,
  Maximize2, Minimize2, Grid,
  Flame, Award, Zap
} from "lucide-react";

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  
  // Interactive challenge flag test state
  const [testFlag, setTestFlag] = useState("");
  const [flagResult, setFlagResult] = useState<"idle" | "correct" | "incorrect">("idle");
  const sampleFlag = "cdctf{sql_1nj3ct10n_byp4ss_2026}";

  // Demo section states
  const [youtubeId, setYoutubeId] = useState("inWWhr5tnEA");
  const [customVidInput, setCustomVidInput] = useState("");
  const [showVidEditor, setShowVidEditor] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const totalSlides = 9;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      } else if (e.key === "Escape") {
        setShowOverview(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleApplyVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customVidInput.trim()) return;
    let vid = customVidInput.trim();
    if (vid.includes("v=")) {
      vid = vid.split("v=")[1].split("&")[0];
    } else if (vid.includes("youtu.be/")) {
      vid = vid.split("youtu.be/")[1].split("?")[0];
    }
    setYoutubeId(vid);
    setShowVidEditor(false);
  };

  const slideTitles = [
    "Muqova (cdCTF)",
    "01. Muammo",
    "02. Yechim",
    "03. Jamoa",
    "04. Nega Biz?",
    "05. Arxitektura",
    "06. Yo'l Xaritasi",
    "07. Amalga Oshirish",
    "08. Demo & Prototip",
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between selection:bg-red-500 selection:text-white font-sans overflow-hidden">
      
      {/* ── TOP CONTROL BAR ── */}
      <header className="h-14 border-b border-white/[0.08] bg-[#0c0e17]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-40 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-black font-mono text-xs flex items-center justify-center shadow-lg shadow-red-600/30">
            CD
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight text-white">cdCTF</span>
              <span className="text-white/20">|</span>
              <span className="text-xs font-mono text-slate-400">PITCH DECK</span>
            </div>
          </div>
        </div>

        {/* Slide Tracker */}
        <div className="hidden md:flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-full text-xs font-mono">
          <span className="text-red-400 font-bold">{String(currentSlide + 1).padStart(2, "0")}</span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-400">{String(totalSlides).padStart(2, "0")}</span>
          <span className="text-slate-500 mx-1">•</span>
          <span className="text-slate-300 font-sans truncate max-w-[180px]">{slideTitles[currentSlide]}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOverview(!showOverview)}
            title="Slaydlar ro'yxati"
            className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors text-xs flex items-center gap-1.5"
          >
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">Mundarija</span>
          </button>

          <button
            onClick={toggleFullscreen}
            title="To'liq ekran (F)"
            className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors text-xs hidden sm:flex items-center"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <a
            href="https://cdctf.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-red-600/20"
          >
            <span>cdctf.uz</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* ── MAIN SLIDE VIEWPORT ── */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 max-w-6xl mx-auto w-full relative">
        <div className="w-full h-full flex flex-col justify-center animate-slide-enter" key={currentSlide}>
          
          {/* ========================================================================= */}
          {/* SLIDE 0: TITLE SLIDE */}
          {/* ========================================================================= */}
          {currentSlide === 0 && (
            <div className="space-y-8 max-w-4xl mx-auto text-center py-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>PITCH DAY 3.0 • INTERAKTIV TAQDIMOT</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
                  cdCTF
                </h1>
                <p className="text-xl sm:text-2xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                  Kiberxavfsizlikni amalda o'rganish bo'yicha <span className="text-red-400 underline decoration-red-500/50 underline-offset-4">birinchi milliy poligon</span>.
                </p>
              </div>

              {/* Visual 3-Stat Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 max-w-2xl mx-auto text-left">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Topshiriqlar</div>
                  <div className="text-xl font-bold text-white">100% Amaliy</div>
                  <div className="text-xs text-slate-400">Docker konteynerlarda</div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Tili va Muhit</div>
                  <div className="text-xl font-bold text-white">O'zbek Tilida</div>
                  <div className="text-xs text-slate-400">Milliy kontent</div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Holati</div>
                  <div className="text-xl font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Jonli Ishlamoqda
                  </div>
                  <div className="text-xs text-slate-400">cdctf.uz maydoni</div>
                </div>
              </div>

              {/* Founders minimal badge */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
                <div>
                  <span className="text-slate-500">Founder:</span> <strong className="text-slate-200">Hikmatbek</strong> (Full-Stack Dev)
                </div>
                <div>•</div>
                <div>
                  <span className="text-slate-500">CEO:</span> <strong className="text-slate-200">Bobur Qadamov</strong> (CyberSecurity)
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 1: MUAMMO (THE PROBLEM) */}
          {/* ========================================================================= */}
          {currentSlide === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-red-500">01</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Mavjud Muammo</h2>
                </div>
                <span className="text-xs font-mono text-slate-400 uppercase">Problem Statement</span>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                
                <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center font-black text-xl font-mono">
                      01
                    </div>
                    <h3 className="text-lg font-bold text-white">Quruq Nazariya</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      OTM va kurslarda faqat slaydlar va eski kitoblar o'qitiladi. Talaba biror marta real serverdagi zaiflikni buzib ko'rmaydi.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-red-500/20 font-mono text-[11px] text-red-400">
                    Oqibat: 0% real amaliy ko'nikma
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black text-xl font-mono">
                      02
                    </div>
                    <h3 className="text-lg font-bold text-white">Qimmat Xorijiy Saytlar</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      HackTheBox yoki TryHackMe oyiga <strong>$14 — $68</strong> turadi va to'liq ingliz tilida. Yangi boshlovchilar uchun katta to'lov to'sig'i mavjud.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-amber-500/20 font-mono text-[11px] text-amber-400">
                    Oqibat: Yoshlarga yetib bormaydi
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center font-black text-xl font-mono">
                      03
                    </div>
                    <h3 className="text-lg font-bold text-white">Amaliyotchi Tanqisligi</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Kompaniyalar va banklar diplomli emas, real zaiflikni topib yopa oladigan mutaxassis qidirmoqda, ammo ularni baholash tizimi yo'q.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 font-mono text-[11px] text-slate-400">
                    Oqibat: Bozor xavf ostida
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 2: YECHIM (THE SOLUTION - cdCTF) */}
          {/* ========================================================================= */}
          {currentSlide === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-400">02</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">cdCTF Yechimi</h2>
                </div>
                <span className="text-xs font-mono text-slate-400 uppercase">The Solution</span>
              </div>

              <div className="grid lg:grid-cols-12 gap-6 items-center">
                
                {/* 3 Solution Features */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                    <div className="text-xs font-mono font-bold text-emerald-400">01 / Brauzerda 1-Klikda Ishga Tushadi</div>
                    <p className="text-xs text-slate-300">
                      Hech qanday ISO yoki og'ir dastur o'rnatish shart emas. Har bir talaba uchun shaxsiy Docker sandbox ishga tushadi.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <div className="text-xs font-mono font-bold text-white">02 / 100% O'zbek Tilidagi Kontent</div>
                    <p className="text-xs text-slate-300">
                      Web, Crypto, Reverse, Forensics bo'yicha masalalar va video tahlillar to'liq ona tilimizda.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <div className="text-xs font-mono font-bold text-white">03 / Shaffof Reyting (Scoreboard)</div>
                    <p className="text-xs text-slate-300">
                      Yechilgan har bir topshiriq uchun ball beriladi va respublika bo'yicha jonli reyting yuritiladi.
                    </p>
                  </div>
                </div>

                {/* Interactive CTF Workbench Mockup */}
                <div className="lg:col-span-7 rounded-2xl border border-slate-700 bg-[#0d1117] p-5 space-y-3 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      <span className="text-slate-400 ml-2">cdctf-arena // challenge-solve</span>
                    </div>
                    <span className="text-emerald-400 text-[11px] font-bold">150 PTS</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="text-slate-400 font-mono text-[11px]">
                      Topshiriq: <span className="text-white font-bold">SQL Injection Authentication Bypass</span>
                    </div>
                    <div className="p-2.5 rounded bg-black/60 border border-slate-800 font-mono text-[11px] text-cyan-300">
                      curl -X POST http://challenge.cdctf.uz/auth -d "user=admin' OR '1'='1"
                    </div>
                  </div>

                  {/* Flag Test Form */}
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Flag maydoni:</span>
                      <button
                        onClick={() => {
                          setTestFlag(sampleFlag);
                          setFlagResult("idle");
                        }}
                        className="text-cyan-400 hover:underline text-[11px]"
                      >
                        Namuna flagni qo'yish
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={testFlag}
                        onChange={(e) => {
                          setTestFlag(e.target.value);
                          setFlagResult("idle");
                        }}
                        placeholder="cdctf{...}"
                        className="flex-1 bg-black/80 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                      />
                      <button
                        onClick={() => {
                          if (testFlag.trim() === sampleFlag) setFlagResult("correct");
                          else setFlagResult("incorrect");
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors"
                      >
                        Yuborish
                      </button>
                    </div>

                    {flagResult === "correct" && (
                      <div className="p-2 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>To'g'ri! +150 ball hisobingizga yozildi.</span>
                      </div>
                    )}
                    {flagResult === "incorrect" && (
                      <div className="p-2 rounded bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono">
                        Noto'g'ri flag. Qayta urinib ko'ring!
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 3: JAMOA (THE TEAM - 2 MEMBERS) */}
          {/* ========================================================================= */}
          {currentSlide === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-red-500">03</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Jamoa</h2>
                </div>
                <span className="text-xs font-mono text-slate-400 uppercase">Core Founders (2 Kishi)</span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Hikmatbek */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">Hikmatbek</h3>
                        <div className="text-xs font-mono font-bold text-red-400 mt-0.5">Founder / Lead Software Engineer</div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 font-mono font-bold text-lg flex items-center justify-center">
                        H
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3">
                      <div>
                        <span className="text-slate-500 font-mono text-[10px] uppercase block">Mas'uliyat:</span>
                        <span className="text-slate-100 font-medium">To'liq dasturiy ta'minot, Docker konteynerizatsiyasi va server arxitekturasi.</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-mono text-[10px] uppercase block">Texnologiyalar:</span>
                        <span className="font-mono text-slate-300 text-[11px]">React, TypeScript, Node.js, Express, PostgreSQL, Docker, Linux sysadmin</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <a
                      href="https://github.com/Hikmatbek-dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <span>github.com/Hikmatbek-dev</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                    </a>
                  </div>
                </div>

                {/* Bobur Qadamov */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">Qadamov Bobur</h3>
                        <div className="text-xs font-mono font-bold text-slate-300 mt-0.5">CEO / CyberSecurity Lead</div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 text-white font-mono font-bold text-lg flex items-center justify-center">
                        B
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3">
                      <div>
                        <span className="text-slate-500 font-mono text-[10px] uppercase block">Mas'uliyat:</span>
                        <span className="text-slate-100 font-medium">Loyiha boshqaruvi, Bug Bounty topshiriqlari bazasi va xavfsizlik metodologiyasi.</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-mono text-[10px] uppercase block">Yo'nalishlar:</span>
                        <span className="font-mono text-slate-300 text-[11px]">Web Pentesting, Bug Bounty, CTF Challenge Design, Zaifliklarni tahlil qilish</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
                    Fokus: Real kiber-hujum ssenariylari & Kontent
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 4: NEGA AYNAN BIZ? (UNFAIR ADVANTAGE) */}
          {/* ========================================================================= */}
          {currentSlide === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-red-500">04</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Nima Uchun Aynan Biz?</h2>
                </div>
                <span className="text-xs font-mono text-slate-400 uppercase">Competitive Advantage</span>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Dasturchi + Pentester</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Xavfsizlik mutaxassislari ko'pincha tizim qura olmaydi, dasturchilar esa zaiflikni bilmaydi. Bizda ikkala yo'nalish bir jamoada uyg'unlashgan.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Flame className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Real Bug Bounty</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Biz quruq kitobdagi misollarni emas, real tizimlarda uchragan haqiqiy zaifliklarni (SQLi, IDOR, SSRF, XSS) topshiriqqa aylantiramiz.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Ishlayotgan Jonli Tizim</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Biz faqat g'oya bilan emas, allaqachon internetda to'liq ishga tushirilgan <a href="https://cdctf.uz" target="_blank" rel="noopener noreferrer" className="text-white underline font-semibold">cdctf.uz</a> maydoni bilan keldik.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 5: ARXITEKTURA VA TEXNIK STEK */}
          {/* ========================================================================= */}
          {currentSlide === 5 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-cyan-400">05</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Mahsulot Arxitekturasi</h2>
                </div>
                <span className="text-xs font-mono text-slate-400 uppercase">Architecture & Stack</span>
              </div>

              {/* Visual Pipeline Schematic */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-black/40 border border-slate-700 space-y-1">
                    <Laptop className="w-5 h-5 text-cyan-400 mx-auto" />
                    <div className="text-xs font-bold text-white">Talaba Brauzeri</div>
                    <div className="text-[10px] text-slate-400 font-mono">React / Tailwind</div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-slate-700 space-y-1">
                    <Server className="w-5 h-5 text-purple-400 mx-auto" />
                    <div className="text-xs font-bold text-white">Yadro API</div>
                    <div className="text-[10px] text-slate-400 font-mono">Node.js Express</div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-slate-700 space-y-1">
                    <Cpu className="w-5 h-5 text-red-400 mx-auto" />
                    <div className="text-xs font-bold text-white">Docker Sandbox</div>
                    <div className="text-[10px] text-slate-400 font-mono">Izolyatsiyalangan Lab</div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-slate-700 space-y-1">
                    <Database className="w-5 h-5 text-emerald-400 mx-auto" />
                    <div className="text-xs font-bold text-white">Baza & Reyting</div>
                    <div className="text-[10px] text-slate-400 font-mono">PostgreSQL / Sockets</div>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <span className="text-slate-400">Texnologiyalar:</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-200">React 19</span>
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-200">TypeScript</span>
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-200">Node.js</span>
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-200">PostgreSQL</span>
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-200">Docker Containers</span>
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-200">Linux Ubuntu</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 6: YO'L XARITASI (ROADMAP) */}
          {/* ========================================================================= */}
          {currentSlide === 6 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-red-500">06</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Yo'l Xaritasi</h2>
                </div>
                <span className="text-xs font-mono text-slate-400 uppercase">Product Roadmap</span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>v0.1 / YADRO</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-sm text-white">Baza & Arxitektura</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Avtorizatsiya, Docker izolatsiyasi va bayroq tekshirish tizimi.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>v0.5 / KONTENT</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-sm text-white">Topshiriqlar To'plami</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Web, Crypto, Reverse, Forensics bo'yicha amaliy masalalar bazasi.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/40 space-y-2 shadow-lg shadow-red-500/10">
                  <div className="flex items-center justify-between text-xs font-mono text-red-400">
                    <span>v1.0 / HOZIR</span>
                    <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px]">JONLI</span>
                  </div>
                  <h3 className="font-bold text-sm text-white">cdctf.uz Relizi</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Platforma to'liq ishlab turibdi. Ochiq reyting, videolar va musobaqa tizimi.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-dashed border-white/20 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>v1.5 / KELGUSI</span>
                    <span>Rejada</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-200">OTMlar CTF Ligasi</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Universitetlar o'rtasida turnirlar va talabalarga yo'l ko'rsatuvchi AI mentor.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 7: AMALGA OSHIRISH REJASI */}
          {/* ========================================================================= */}
          {currentSlide === 7 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-red-500">07</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Amalga Oshirish Rejasi</h2>
                </div>
                <span className="text-xs font-mono text-slate-400 uppercase">Execution Plan</span>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="text-xs font-mono font-bold text-slate-400">1-BOSQICH (Qisqa muddat)</div>
                  <h3 className="text-base font-bold text-white">Topshiriqlar Bazasini Kengaytirish</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Topshiriqlar sonini 100+ taga yetkazish, har bir yangi zaiflik uchun o'zbekcha video masterklasslar qo'shish.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="text-xs font-mono font-bold text-slate-400">2-BOSQICH (O'rta muddat)</div>
                  <h3 className="text-base font-bold text-white">OTMlararo CTF Turniri</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    O'zbekiston universitetlari talabalari o'rtasida birinchi respublika onlayn CTF turnirini o'tkazish.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="text-xs font-mono font-bold text-slate-400">3-BOSQICH (Uzoq muddat)</div>
                  <h3 className="text-base font-bold text-white">Korxonalarga Talent-Platforma</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Kompaniyalar o'z xodimlarini sinash va eng kuchli kiber-kadrlarni reyting bo'yicha ishga olishi uchun korporativ profil ochish.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 8: DEMO VIDEO VA ISHLAYOTGAN PROTOTIP (SECTION 6) */}
          {/* ========================================================================= */}
          {currentSlide === 8 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-red-500">08</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Demo Video va Jonli Prototip</h2>
                </div>
                <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">cdctf.uz Live</span>
              </div>

              <div className="grid lg:grid-cols-12 gap-5 items-start">
                
                {/* Video Player */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black shadow-xl">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                      title="cdCTF Demo Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>

                  {showVidEditor ? (
                    <form onSubmit={handleApplyVideo} className="flex gap-2 text-xs">
                      <input
                        type="text"
                        value={customVidInput}
                        onChange={(e) => setCustomVidInput(e.target.value)}
                        placeholder="YouTube video havolasi..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                      <button type="submit" className="px-3 py-1.5 bg-red-600 rounded-lg text-white font-bold text-xs">
                        Saqlash
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => setShowVidEditor(true)}
                      className="text-[11px] font-mono text-slate-400 hover:text-white underline text-left block"
                    >
                      Videoni o'zgartirish (YouTube URL)
                    </button>
                  )}
                </div>

                {/* Video Chapters & Direct Links */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Timeline timestamps */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="text-xs font-mono font-bold text-slate-300">Video Bo'limlari (Daqiqama-daqiqa):</div>
                    <div className="space-y-1.5 text-[11px] text-slate-300 font-mono">
                      <div className="flex gap-2">
                        <span className="text-red-400 font-bold shrink-0">0:00 - 0:45</span>
                        <span className="font-sans text-slate-300">Ro'yxatdan o'tish & Profil</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-red-400 font-bold shrink-0">0:45 - 1:40</span>
                        <span className="font-sans text-slate-300">CTF Arena topshiriqlari</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-red-400 font-bold shrink-0">1:40 - 2:40</span>
                        <span className="font-sans text-slate-300">Zaiflikni yechish & Flag</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-red-400 font-bold shrink-0">2:40 - 3:30</span>
                        <span className="font-sans text-slate-300">Scoreboard reytingi</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-red-400 font-bold shrink-0">3:30 - 4:30</span>
                        <span className="font-sans text-slate-300">Video darslar bo'limi</span>
                      </div>
                    </div>
                  </div>

                  {/* Direct Prototip Links */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <a
                        href="https://cdctf.uz/ctf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-center transition-colors"
                      >
                        <div className="text-xs font-bold text-white">CTF Arena</div>
                        <div className="text-[10px] text-slate-400">/ctf</div>
                      </a>

                      <a
                        href="https://cdctf.uz/scoreboard"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-center transition-colors"
                      >
                        <div className="text-xs font-bold text-white">Scoreboard</div>
                        <div className="text-[10px] text-slate-400">/scoreboard</div>
                      </a>

                      <a
                        href="https://cdctf.uz/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-center transition-colors"
                      >
                        <div className="text-xs font-bold text-white">Videolar</div>
                        <div className="text-[10px] text-slate-400">/videos</div>
                      </a>
                    </div>

                    <button
                      onClick={() => copyUrl("https://cdctf.uz")}
                      className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-600/20"
                    >
                      {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedLink ? "Havola nusxalandi!" : "cdctf.uz havolasini nusxalash"}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>

      {/* ── BOTTOM SLIDE NAVIGATION BAR ── */}
      <footer className="h-16 border-t border-white/[0.08] bg-[#0c0e17]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-40 shrink-0">
        <div className="flex items-center gap-2">
          <button
            disabled={currentSlide === 0}
            onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
            className="px-3.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/[0.05] text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Oldingi</span>
          </button>

          <button
            disabled={currentSlide === totalSlides - 1}
            onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1))}
            className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-30 disabled:hover:bg-red-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-red-600/20"
          >
            <span>Keyingi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === idx ? "w-6 bg-red-500" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
              title={slideTitles[idx]}
            />
          ))}
        </div>

        {/* Keyboard Hint */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-slate-500">
          <span className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/10 text-slate-400">←</span>
          <span className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/10 text-slate-400">→</span>
          <span>yoki Space</span>
        </div>
      </footer>

      {/* ── OVERVIEW DRAWER MODAL ── */}
      {showOverview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f121d] border border-white/10 rounded-2xl max-w-3xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white font-mono">Barcha Slaydlar Mundarijasi</h3>
              <button
                onClick={() => setShowOverview(false)}
                className="text-xs font-mono text-slate-400 hover:text-white"
              >
                Yopish [ESC]
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {slideTitles.map((title, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentSlide(idx);
                    setShowOverview(false);
                  }}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    currentSlide === idx
                      ? "bg-red-500/20 border-red-500 text-white"
                      : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/30"
                  }`}
                >
                  <div className="text-[11px] font-mono text-slate-400">Slayd {idx + 1}</div>
                  <div className="font-bold text-xs mt-1">{title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
