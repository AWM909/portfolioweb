'use client';

import { useState, useEffect, useRef, type RefObject } from 'react';
import { Menu, X, Mail, ArrowRight } from 'lucide-react';

const useInView = (ref: RefObject<HTMLElement | null>, options = { threshold: 0.1 }) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isInView;
};

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const aboutRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  const aboutInView = useInView(aboutRef);
  const contactInView = useInView(contactRef);

  // Smooth cursor following
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth cursor animation with easing
  useEffect(() => {
    let animationFrameId = 0;

    const animateCursor = () => {
      setCursorPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.2,
        y: prev.y + (mousePosition.y - prev.y) * 0.2
      }));

      animationFrameId = window.requestAnimationFrame(animateCursor);
    };

    animationFrameId = window.requestAnimationFrame(animateCursor);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [mousePosition]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden cursor-none">
      {/* Custom Gliding Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 pointer-events-none z-50"
        style={{
          left: `${cursorPosition.x - 16}px`,
          top: `${cursorPosition.y - 16}px`,
          transition: 'none'
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-teal-400 animate-pulse-glow" style={{boxShadow: '0 0 15px rgba(20, 184, 166, 0.6)'}}></div>
        <div className="absolute inset-2 rounded-full bg-teal-400/20 blur-sm"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-teal-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotateZ(0deg);
          }
          50% {
            transform: translateY(-30px) rotateZ(2deg);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(20, 184, 166, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(20, 184, 166, 0.6);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            filter: drop-shadow(0 0 10px rgba(20, 184, 166, 0.4));
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 20px rgba(20, 184, 166, 0.8));
          }
        }

        @keyframes morphBlobOne {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
        }

        @keyframes morphBlobTwo {
          0%, 100% {
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          }
          50% {
            border-radius: 70% 30% 46% 66% / 30% 74% 35% 62%;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotate(-10deg) scale(0.9);
          }
          to {
            opacity: 1;
            transform: rotate(0) scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-morph-blob-1 {
          animation: morphBlobOne 8s ease-in-out infinite;
        }

        .animate-morph-blob-2 {
          animation: morphBlobTwo 7s ease-in-out infinite;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-rotate-in {
          animation: rotateIn 0.8s ease-out forwards;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .hover-lift:hover {
          transform: translateY(-12px) translateZ(0);
          box-shadow: 0 25px 50px rgba(20, 184, 166, 0.3);
        }

        .hover-scale {
          transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .hover-scale:hover {
          transform: scale(1.05);
        }

        .text-gradient-animate {
          background: linear-gradient(90deg, #14b8a6, #ffffff, #14b8a6);
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .gradient-border {
          position: relative;
          background: linear-gradient(black, black) padding-box;
          border: 2px solid transparent;
          background-clip: padding-box;
          border-image: linear-gradient(135deg, #14b8a6, #ffffff) 1;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 glass-effect border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#" className={`text-2xl font-bold bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent ${isLoaded ? 'animate-fade-in-down' : 'opacity-0'}`}>
              Portfolio
            </a>
            
            <div className="hidden md:flex gap-8">
              {['home', 'about', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => scrollToSection(item)}
                  className="text-sm font-medium text-white/70 hover:text-teal-400 transition-colors capitalize hover-scale relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors hover-scale"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-3 border-t border-white/10 pt-4">
              {['home', 'about', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => scrollToSection(item)}
                  className="block text-sm font-medium text-white/70 hover:text-teal-400 transition-colors capitalize py-2"
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl animate-float-slow animate-pulse-glow"></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl animate-float-slow" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="max-w-4xl">
            <h1 className={`text-7xl sm:text-8xl font-bold mb-6 leading-tight ${isLoaded ? 'animate-fade-in-up stagger-1' : 'opacity-0'}`}>
              Hi, I'm <span className="text-teal-400 text-gradient-animate">Wasay</span>
            </h1>
            <p className={`text-xl sm:text-2xl text-white/70 mb-8 leading-relaxed max-w-2xl ${isLoaded ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
             Software developer building AI-powered products. Learning C++, passionate about startups, marketing, and growth.            </p>
            <div className={`flex gap-6 flex-wrap ${isLoaded ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}>
              <a
                href="#about"
                className="group px-8 py-4 bg-gradient-to-r from-teal-400 to-teal-500 text-black font-bold rounded-lg hover:shadow-2xl transition-all transform hover:scale-110 active:scale-95 flex items-center gap-3 hover-lift text-lg"
              >
                Learn More 
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border-2 border-teal-400 text-teal-400 font-bold rounded-lg hover:bg-teal-400/10 transition-all hover-lift text-lg"
              >
                Get In Touch
              </a>
            </div>

            {/* Scroll indicator */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${isLoaded ? 'animate-fade-in-up stagger-4' : 'opacity-0'}`}>
              <p className="text-white/50 text-sm">Scroll to explore</p>
              <div className="w-6 h-10 border-2 border-teal-400/50 rounded-full flex justify-center animate-pulse-glow">
                <div className="w-1 h-2 bg-teal-400 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-32 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`text-6xl sm:text-7xl font-bold mb-8 ${aboutInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                About <span className="text-teal-400">Me</span>
              </h2>
              <div className={`w-24 h-1.5 bg-gradient-to-r from-teal-400 to-teal-300 rounded-full mb-10 ${aboutInView ? 'animate-slide-in-left stagger-2' : 'opacity-0'}`}></div>
              
              <p className={`text-lg text-white/70 leading-relaxed mb-6 ${aboutInView ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}>
                I'm a passionate software developer with a strong interest in software engineering and game development. I'm constantly learning, improving my programming skills, and challenging myself by building personal projects that turn ideas into real products.
              </p>
              <p className={`text-lg text-white/70 leading-relaxed mb-10 ${aboutInView ? 'animate-fade-in-up stagger-4' : 'opacity-0'}`}>
                Beyond coding, I'm deeply into AI, entrepreneurship, startups, marketing, and product growth. I believe the best products are built where great engineering meets great marketing.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Frontend", skills: "HTML, Tailwind CSS," },
                  { title: "Backend", skills: "Node.js, Python, C++" },
                  { title: "Tools", skills: "Git, Qt Creator, Figma, VS Code" }
                ].map((skill, i) => (
                  <div key={skill.title} className={`${aboutInView ? `animate-fade-in-up stagger-${4 + i}` : 'opacity-0'}`}>
                    <h3 className="text-teal-400 font-bold mb-2 text-lg">{skill.title}</h3>
                    <p className="text-white/60">{skill.skills}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative ${aboutInView ? 'animate-slide-in-right' : 'opacity-0'}`}>
              {/* Image container with styling */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-teal-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-float"></div>
                
                <div className="relative aspect-square bg-gradient-to-br from-black via-teal-900/20 to-black rounded-2xl overflow-hidden border-2 border-teal-400/50 hover-lift">
                  <img src="/profile.jpg" alt="Wasay" className="w-full h-full object-cover" />
                </div>

                {/* Floating accent elements */}
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-teal-500/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl animate-float-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-32 px-4 sm:px-6 lg:px-8 bg-white text-black relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-30 animate-float-slow"></div>

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <h2 className={`text-6xl sm:text-7xl font-bold mb-8 ${contactInView ? 'animate-fade-in-down' : 'opacity-0'}`}>
            Let's <span className="text-teal-600">Connect</span>
          </h2>
          <div className={`w-24 h-1.5 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full mx-auto mb-12 ${contactInView ? 'animate-slide-in-left stagger-2' : 'opacity-0'}`}></div>
          
          <p className={`text-xl text-black/70 mb-16 leading-relaxed ${contactInView ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
          I'm always open to discussing new projects, collaborations, and opportunities. Whether you have an idea to build, a question, or simply want to connect, feel free to get in touch.          </p>

          <div className="flex gap-6 justify-center mb-16 flex-wrap">
            <a
              href="mailto:abdulwasaymuhammad909@gmail.com"
              className={`group inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-teal-600 transition-all hover-lift text-lg ${contactInView ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}
            >
              <Mail size={22} /> Email Me
            </a>
            <a
              href="https://github.com/AWM909"
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-3 px-8 py-4 border-3 border-black text-black font-bold rounded-xl hover:bg-black hover:text-white transition-all hover-lift text-lg ${contactInView ? 'animate-fade-in-up stagger-4' : 'opacity-0'}`}
            >
              <ArrowRight size={22} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/abdulwasaymuhammad"
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-3 px-8 py-4 border-3 border-black text-black font-bold rounded-xl hover:bg-black hover:text-white transition-all hover-lift text-lg ${contactInView ? 'animate-fade-in-up stagger-5' : 'opacity-0'}`}
            >
              <ArrowRight size={22} /> LinkedIn
            </a>
          </div>

          <div className={`text-black/50 text-sm ${contactInView ? 'animate-fade-in-up stagger-6' : 'opacity-0'}`}>
            © 2026 Wasay. Hosted on Vercel.
          </div>
        </div>
      </section>
    </div>
  );
}