import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Menu, 
  X, 
  Cpu, 
  Activity, 
  Calendar,
  Lock,
  ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import logoUrl from '/logo.png';

// --- UTILS ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(ScrollTrigger);


// --- COMPONENTS ---

// Navbar: "The Floating Island"
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      ref={navRef}
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 h-16 px-6 flex items-center justify-between gap-12",
        isScrolled 
          ? "w-[min(90%,1200px)] pill-container opacity-100" 
          : "w-[95%] bg-transparent border-transparent"
      )}
    >
      <div className="h-16 flex items-center">
        <img 
          src={logoUrl} 
          alt="Devbhumi Enterprises" 
          className="h-full w-auto transition-transform duration-500 hover:scale-105 origin-left"
        />
      </div>
      
      <ul className="hidden md:flex gap-8 text-sm font-medium opacity-70">
        <li><a href="#hero" className="hover:text-accent transition-colors">Vision</a></li>
        <li><a href="#capabilities" className="hover:text-accent transition-colors">Capabilities</a></li>
        <li><a href="#protocol" className="hover:text-accent transition-colors">Protocol</a></li>
        <li><a href="#engagement" className="hover:text-accent transition-colors">Engagement</a></li>
      </ul>

      <button className="btn btn-primary h-12 px-6 text-sm">
        Discuss Your Project
      </button>
    </nav>
  );
};

// Hero Section: "The Opening Shot"
const Hero = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero"
      ref={sectionRef}
      className="relative h-[100dvh] w-full flex items-end overflow-hidden p-8 md:p-24 bg-dark"
    >
      {/* Background Image with Gradient */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000" 
          alt="Brutalist Railway Structure"
          className="w-full h-full object-cover opacity-60 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl">
        <div className="flex flex-col gap-6">
          <h1 ref={headlineRef} className="flex flex-col">
            <span className="hero-anim text-3xl md:text-5xl font-bold text-background uppercase tracking-tight">
              Electrify the
            </span>
            <span className="hero-anim text-7xl md:text-[12rem] font-serif italic text-accent leading-[0.85] tracking-tighter -ml-1 md:-ml-3 mt-2">
              Future.
            </span>
          </h1>
          <p className="hero-anim max-w-xl text-lg md:text-xl text-background/60 leading-relaxed font-light mt-8">
            Devbhumi Enterprises: Executing railway electrification projects faster, cleaner, and more reliably than traditional contractors.
          </p>
          <div className="hero-anim flex gap-4 mt-8">
            <button className="btn btn-accent group">
              Discuss Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn btn-outline border-white/20 text-white hover:bg-white/10">
              View Our Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features: "Interactive Functional Artifacts"
const Features = () => {
  return (
    <section id="capabilities" className="py-32 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row md:items-center md:justify-between gap-12">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3 text-accent font-mono text-sm tracking-widest uppercase">
              <span className="w-12 h-px bg-accent/30" />
              Capabilities
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
              Field-Proven <br />Precision.
            </h2>
          </div>
          <div className="hidden md:flex justify-end opacity-90 relative pr-8">
            <img 
              src={logoUrl} 
              alt="Devbhumi Enterprises" 
              className="h-32 md:h-56 w-auto mix-blend-multiply drop-shadow-sm object-contain" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Diagnostic Shuffler */}
          <CardWrapper 
            index={1} 
            title="End-to-End Execution" 
            description="From foundation to OHE wiring — complete electrification under one roof."
          >
            <DiagnosticShuffler />
          </CardWrapper>

          {/* Card 2: Telemetry Typewriter */}
          <CardWrapper 
            index={2} 
            title="Reliable & Timely Delivery" 
            description="Consistent on-ground execution with minimal delays and strong site control."
          >
            <TelemetryTypewriter />
          </CardWrapper>

          {/* Card 3: Cursor Protocol Scheduler */}
          <CardWrapper 
            index={3} 
            title="Field-Tested Expertise" 
            description="6+ years of hands-on railway project execution with skilled teams."
          >
            <ProtocolScheduler />
          </CardWrapper>
        </div>
      </div>
    </section>
  );
};

const CardWrapper = ({ index, title, description, children }) => (
  <div className="card-premium group h-[500px] flex flex-col justify-between overflow-hidden">
    <div className="flex flex-col gap-4">
      <div className="font-mono text-xs text-accent opacity-50">ARCHIVE_0{index}</div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-sm text-dark/60 leading-relaxed">{description}</p>
    </div>
    <div className="relative h-48 mt-8 -mx-4">
      {children}
    </div>
  </div>
);

const DiagnosticShuffler = () => {
  const [items, setItems] = useState(['Foundation Casting', 'Mast Erection', 'Wiring Phase', 'Final Testing']);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const next = [...prev];
        next.unshift(next.pop());
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-1000">
      {items.map((item, i) => (
        <div 
          key={item}
          className="absolute w-4/5 h-16 bg-white border border-dark/10 rounded-2xl flex items-center px-6 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            transform: `translateY(${(i - 1.5) * 50}px) translateZ(${(3 - i) * -30}px) scale(${1 - i * 0.05})`,
            opacity: 1 - i * 0.25,
            zIndex: 10 - i
          }}
        >
          <div className={cn("w-2 h-2 rounded-full mr-4", i === 0 ? "bg-accent" : "bg-dark/10")} />
          <span className="text-sm font-medium tracking-tight uppercase text-dark/80">{item}</span>
        </div>
      ))}
    </div>
  );
};

const TelemetryTypewriter = () => {
  const messages = ["SYNCING SITES...", "OPTIMIZING OHE GRID...", "ENFORCING SAFETY...", "TRACKING LIVE ASSETS..."];
  const [msgIndex, setMsgIndex] = useState(0);
  const [text, setText] = useState('');
  
  useEffect(() => {
    const fullText = messages[msgIndex];
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(timer);
        setTimeout(() => {
          setMsgIndex(prev => (prev + 1) % messages.length);
        }, 1500);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [msgIndex]);

  return (
    <div className="w-full h-full p-6 bg-dark/5 rounded-3xl overflow-hidden font-mono flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Activity className="w-3 h-3 text-accent animate-pulse" />
        <span className="text-[10px] tracking-widest text-dark/40 uppercase">Live Telemetry Feed</span>
      </div>
      <div className="text-xs text-dark/80 flex items-center">
        {text}<span className="w-1.5 h-3 bg-accent ml-1 animate-pulse" />
      </div>
      <div className="mt-auto grid grid-cols-4 gap-1 opacity-20">
        {Array.from({length: 24}).map((_, i) => (
          <div key={i} className="h-1 bg-dark rounded-full" style={{ opacity: Math.random() }} />
        ))}
      </div>
    </div>
  );
};

const ProtocolScheduler = () => {
  const [active, setActive] = useState(2);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <div className="flex gap-2">
        {days.map((day, i) => (
          <div 
            key={i} 
            className={cn(
              "w-8 h-10 rounded-lg flex items-center justify-center text-xs font-mono transition-colors duration-500",
              active === i ? "bg-accent text-white" : "bg-dark/5 text-dark/40"
            )}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="relative">
        <button className="btn btn-primary h-10 px-6 text-[10px] uppercase tracking-widest">
          Initiate Shift
        </button>
        <div className="absolute -right-4 -bottom-4 w-6 h-6 flex items-center justify-center animate-bounce">
          <Cpu className="w-4 h-4 text-accent/40" />
        </div>
      </div>
    </div>
  );
};

// Philosophy: "The Manifesto"
const Philosophy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".philosophy-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-48 bg-dark text-background overflow-hidden px-8">
      {/* Organic Grid Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-20" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col gap-12">
        <p className="philosophy-reveal text-sm font-mono tracking-widest opacity-40 uppercase">Manifesto / 001</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          <div className="philosophy-reveal font-light text-2xl md:text-3xl opacity-60 leading-relaxed italic border-l border-white/10 pl-12">
            "Most contractors focus on: <br /> 
            <span className="text-white/80 not-italic">Manual labor and fragmented management."</span>
          </div>
          
          <h3 className="philosophy-reveal text-4xl md:text-6xl font-bold leading-tight">
            We focus on: <br />
            <span className="font-serif italic text-accent">Strategic.</span> <br />
            <span className="font-serif italic text-accent">Reliable.</span> <br />
            <span className="font-serif italic text-accent">End-to-End.</span>
          </h3>
        </div>
      </div>
    </section>
  );
};

// Protocol: "Sticky Stacking Archive"
const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: "top top+=100",
          endTrigger: ".protocol-cards-container",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          scrub: true,
          animation: gsap.fromTo(card, {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)"
          }, {
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(10px)",
            ease: "none"
          })
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Foundation & Setup",
      desc: "Robust physical infrastructure established with modern equipment and precision casting.",
      icon: <Cpu className="w-12 h-12 text-accent" />
    },
    {
      num: "02",
      title: "Precision OHE System",
      desc: "High-voltage overhead equipment wiring executed by expert teams with real-time site control.",
      icon: <TimelineIcon />
    },
    {
      num: "03",
      title: "Section Commissioning",
      desc: "Comprehensive testing and full-section electrification delivery, cleaner and faster.",
      icon: <WaveformIcon />
    }
  ];

  return (
    <section id="protocol" ref={containerRef} className="bg-background pt-32 px-8">
      <div className="max-w-7xl mx-auto mb-24">
        <div className="flex items-center gap-3 text-accent font-mono text-sm tracking-widest uppercase mb-4">
          <span className="w-12 h-px bg-accent/30" />
          The Protocol
        </div>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Systemic <br />Efficiency.</h2>
      </div>

      <div className="protocol-cards-container flex flex-col gap-[30vh] pb-[30vh]">
        {steps.map((step, i) => (
          <div key={i} className="protocol-card w-full h-[600px] pill-container bg-white p-12 md:p-24 flex flex-col md:flex-row gap-12 items-center shadow-2xl border-accent/5">
            <div className="flex-1 flex flex-col gap-8">
              <span className="font-mono text-xl text-accent">STEP_{step.num}</span>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">{step.title}</h3>
              <p className="text-xl text-dark/50 leading-relaxed max-w-md">{step.desc}</p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              {step.icon}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const TimelineIcon = () => (
  <div className="relative w-48 h-48 flex items-center justify-center">
    <div className="absolute inset-0 border-[0.5px] border-dark/10 rounded-full animate-[spin_20s_linear_infinite]" />
    <div className="absolute inset-4 border-[0.5px] border-dark/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
    <Activity className="w-16 h-16 text-accent opacity-40" />
    <div className="absolute h-px w-full bg-accent/20 animate-[moveHorizontal_4s_ease-in-out_infinite]" />
  </div>
);

const WaveformIcon = () => (
  <svg width="200" height="100" viewBox="0 0 200 100" className="opacity-40">
    <path 
      d="M0 50 Q 25 20, 50 50 T 100 50 T 150 50 T 200 50" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      className="text-accent stroke-dash-offset-anim"
    />
  </svg>
);

// Engagement / Footer
const Footer = () => {
  return (
    <section id="engagement" className="bg-dark rounded-t-[4rem] text-background pt-32 pb-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32">
          <div className="flex flex-col gap-12">
            <h2 className="text-6xl md:text-8xl font-bold font-serif italic tracking-tighter">
              Let's <br />Discuss.
            </h2>
            <div className="flex flex-col gap-4">
              <button className="btn btn-accent w-fit group text-lg h-20 px-12">
                Discuss Your Project
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="flex gap-4">
                <button className="btn btn-outline border-white/10 text-white/50 hover:text-white px-8 h-16">
                  Request Capability Profile
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 pt-12 text-sm opacity-40 uppercase tracking-widest font-mono">
            <div className="flex flex-col gap-6">
              <span className="text-white">Directory</span>
              <ul className="flex flex-col gap-4">
                <li><a href="#" className="hover:text-accent">Overview</a></li>
                <li><a href="#" className="hover:text-accent">Services</a></li>
                <li><a href="#" className="hover:text-accent">Process</a></li>
                <li><a href="#" className="hover:text-accent">Legacy</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-white">Email</span>
              <ul className="flex flex-col gap-4">
                <li>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=projects@devbhumi.net.in" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-accent font-mono text-xs"
                  >
                    projects@devbhumi.net.in
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-40">System Operational // Devbhumi_Core_v2</span>
          </div>
          <div className="font-mono text-[10px] opacity-20 uppercase">
            &copy; 2026 devbhumi enterprises // all physical infrastructure protected
          </div>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <main className="relative selection:bg-accent selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Footer />
    </main>
  );
};

export default App;
