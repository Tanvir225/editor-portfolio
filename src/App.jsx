import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowUpRight,
  Play,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Pause,
} from "lucide-react";


gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const heroRef = useRef(null);
  const introRef = useRef(null);
  const showreelRef = useRef(null);
  const projectsRef = useRef(null);


  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);



  useEffect(() => {
    const ctx = gsap.context(() => {
      // --------------------------------
      // HERO ANIMATION
      // --------------------------------

      const heroTimeline = gsap.timeline();

      heroTimeline
        .from(".hero-small-text", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".hero-name span",
          {
            opacity: 0,
            y: 100,
            rotateX: 80,
            stagger: 0.08,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-role",
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          ".hero-buttons",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.5"
        );

      // --------------------------------
      // HERO PARALLAX
      // --------------------------------

      gsap.to(".hero-bg", {
        scale: 1.15,
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-content", {
        yPercent: -25,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // --------------------------------
      // INTRO OVERLAP
      // --------------------------------

      gsap.from(".intro-card", {
        y: 200,
        opacity: 0,
        borderRadius: "80px",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 80%",
          end: "top 25%",
          scrub: true,
        },
      });

      gsap.from(".intro-big-text", {
        y: 120,
        opacity: 0,
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: true,
        },
      });

      // --------------------------------
      // SKILLS
      // --------------------------------

      gsap.utils.toArray(".skill-card").forEach((card, index) => {
        gsap.from(card, {
          y: 150,
          opacity: 0,
          rotate: index % 2 === 0 ? -5 : 5,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 50%",
            scrub: true,
          },
        });
      });

      // --------------------------------
      // SKILL TEXT HORIZONTAL
      // --------------------------------

      gsap.utils.toArray(".moving-text").forEach((text, index) => {
        gsap.to(text, {
          xPercent: index % 2 === 0 ? -20 : 20,
          ease: "none",
          scrollTrigger: {
            trigger: ".skills-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // --------------------------------
      // SHOWREEL
      // --------------------------------

      gsap.fromTo(
        ".showreel-video",
        {
          scale: 0.65,
          borderRadius: "40px",
        },
        {
          scale: 1,
          borderRadius: "0px",
          scrollTrigger: {
            trigger: showreelRef.current,
            start: "top 80%",
            end: "top 10%",
            scrub: true,
          },
        }
      );

      gsap.from(".showreel-title", {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: showreelRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: true,
        },
      });

      // --------------------------------
      // PROJECT CARDS
      // --------------------------------

      gsap.utils.toArray(".project-card").forEach((card, index) => {
        gsap.from(card, {
          y: 180,
          opacity: 0,
          scale: 0.9,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 45%",
            scrub: true,
          },
        });
      });

      // --------------------------------
      // ABOUT
      // --------------------------------

      gsap.from(".about-photo", {
        x: -150,
        opacity: 0,
        rotate: -5,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      });

      gsap.from(".about-content", {
        x: 150,
        opacity: 0,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      });

      // --------------------------------
      // CONTACT
      // --------------------------------

      gsap.from(".contact-title", {
        y: 150,
        opacity: 0,
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
          end: "top 25%",
          scrub: true,
        },
      });

      gsap.from(".contact-button", {
        scale: 0.5,
        opacity: 0,
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 70%",
          end: "top 35%",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // --------------------------------
  // SMOOTH SCROLL
  // --------------------------------

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // --------------------------------
  // MAGNETIC BUTTON
  // --------------------------------

  const magneticMove = (e) => {
    const button = e.currentTarget;

    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const magneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <main className="bg-[#080808] text-white overflow-hidden">
      {/* =====================================================
          CUSTOM CURSOR
      ====================================================== */}

      <div
        className={`hidden lg:flex fixed z-[9999] pointer-events-none
        items-center justify-center transition-opacity duration-300
        ${cursorText
            ? "opacity-100"
            : "opacity-0"
          }`}
        style={{
          left: "var(--mouse-x)",
          top: "var(--mouse-y)",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-20 h-20 rounded-full bg-lime-300 text-black flex items-center justify-center text-xs font-bold">
          {cursorText}
        </div>
      </div>

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="fixed top-0 left-0 bg-base-200 w-full z-[100] px-5 md:px-10 py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("home")}
            className="font-black tracking-tight text-xl"
          >
            TANVIR<span className="text-lime-300">.</span>
          </button>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <button onClick={() => scrollToSection("home")}>
              Home
            </button>

            <button onClick={() => scrollToSection("work")}>
              Work
            </button>

            <button onClick={() => scrollToSection("about")}>
              About
            </button>

            <button onClick={() => scrollToSection("contact")}>
              Contact
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-11 h-11 rounded-full border border-white/20 flex items-center justify-center"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU */}

        {menuOpen && (
          <div className="md:hidden mt-4 bg-[#111] border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col gap-6 text-lg">
              <button onClick={() => scrollToSection("home")}>
                Home
              </button>

              <button onClick={() => scrollToSection("work")}>
                Work
              </button>

              <button onClick={() => scrollToSection("about")}>
                About
              </button>

              <button onClick={() => scrollToSection("contact")}>
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        id="home"
        ref={heroRef}
        className="relative h-screen overflow-hidden"
      >
        {/* Background */}

        <div className="hero-bg absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=2200&q=90"
            alt="Video editing setup"
            className="w-full h-full object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#080808]" />
        </div>

        {/* Hero Content */}

        <div className="hero-content relative z-10 h-full flex items-center px-5 md:px-10 lg:px-20">
          <div className="max-w-6xl">

            <p className="hero-small-text text-lime-300 uppercase tracking-[0.35em] text-xs md:text-sm mb-5 md:mt-20">
              Video Editor · Creative Designer · Web Developer
            </p>

            <h1 className="hero-name  uppercase font-black leading-[0.9] tracking-[-0.06em] text-[10vw] md:text-[7vw] lg:text-[7vw]">
              <span className="inline-block">MD</span>{" "}
              <span className="inline-block">ABDUR</span>
              <br />
              <span className="inline-block">RAHAMAN</span>
              <br />
              <span className="inline-block text-lime-300">
                TANVIR.
              </span>
            </h1>

            <div className="hero-role mt-10 text-xl md:text-3xl font-medium">
              I EDIT. I DESIGN. I BUILD.
            </div>

            <p className="hero-description mt-3 max-w-xl text-white/60 text-sm md:text-base leading-relaxed">
              I transform raw footage, creative ideas and digital
              experiences into visuals that people remember.
            </p>

            <div className="hero-buttons flex flex-wrap gap-4 mt-8">

              {/* WATCH SHOWREEL */}

              <button
                type="button"
                onClick={() => scrollToSection("showreel")}
                onMouseEnter={() => setCursorText("WATCH")}
                onMouseMove={magneticMove}
                onMouseLeave={(e) => {
                  setCursorText("");
                  magneticLeave(e);
                }}
                className="bg-lime-300 text-black px-7 py-4 rounded-full font-bold flex items-center gap-3 cursor-pointer"
              >
                <Play size={10} fill="currentColor" />


                SHOW REEL
              </button>


              {/* VIEW WORK */}

              <button
                type="button"
                onClick={() => scrollToSection("work")}
                onMouseEnter={() => setCursorText("VIEW")}
                onMouseMove={magneticMove}
                onMouseLeave={(e) => {
                  setCursorText("");
                  magneticLeave(e);
                }}
                className="border border-white/20 px-7 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-white hover:text-black transition cursor-pointer"
              >
                VIEW WORK

                <ArrowUpRight size={10} />
              </button>

            </div>
          </div>
        </div>

        {/* Scroll Indicator */}

        <div className="absolute bottom-8 left-5 md:left-10 flex items-center gap-3 text-xs text-white/50">
          <ArrowDown size={16} />
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section
        ref={introRef}
        className="relative z-20 -mt-10 md:-mt-24 px-3 md:px-8"
      >
        <div className="intro-card bg-[#f2f2ed] text-black rounded-[20px] md:rounded-[40px] min-h-[80vh] flex items-center px-6 md:px-16 lg:px-24 py-24">

          <div className="max-w-7xl mx-auto">

            <p className="uppercase tracking-[0.3em] text-black text-xs mb-8">
              01 / INTRO
            </p>

            <h2 className="intro-big-text uppercase font-black tracking-[-0.06em] leading-[0.85] text-[10vw] md:text-[8vw]">
              I DON'T
              <br />
              JUST EDIT.
              <br />
              <span className="text-black/20">
                I CREATE.
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-10 mt-16">

              <p className="text-xl md:text-3xl font-medium leading-tight">
                Turning raw footage into stories, moments into emotions,
                and ideas into visual experiences.
              </p>

              <p className="text-black/50 leading-relaxed max-w-md">
                My work combines video editing, creative design and web
                development. I enjoy creating digital experiences that
                look good, feel smooth and communicate clearly.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EXPERTISE
      ====================================================== */}

      <section
        className="skills-section relative z-30 bg-[#080808] py-32 md:py-48"
      >
        <div className="px-5 md:px-10 lg:px-20">

          <p className="text-lime-300 uppercase tracking-[0.3em] text-xs mb-10">
            02 / EXPERTISE
          </p>

          <h2 className="font-black uppercase tracking-[-0.06em] text-[13vw] leading-[0.8]">
            WHAT
            <br />
            I DO<span className="text-lime-300">.</span>
          </h2>
        </div>

        {/* Moving Typography */}

        <div className="mt-24 overflow-hidden whitespace-nowrap">
          <div className="moving-text text-[8vw] font-black uppercase text-white/[0.04] leading-none">
            VIDEO · DESIGN · WEB · VIDEO · DESIGN · WEB
          </div>
        </div>

        {/* Skill Cards */}

        <div className="px-5 md:px-7 lg:px-10 mt-10 grid md:grid-cols-1 lg:grid-cols-3 gap-5">

          {/* VIDEO */}

          <div className="skill-card bg-[#121212] border border-white/10 rounded-[35px] p-8 md:p-10 min-h-[420px] flex flex-col justify-between">

            <div>
              <span className="text-lime-300 text-sm">
                01
              </span>

              <h3 className="text-4xl md:text-5xl font-black uppercase mt-8">
                Video
                <br />
                Editing
              </h3>
            </div>

            <div className="text-white/50 space-y-2">
              <p>CapCut</p>
              <p>Short Form Content</p>
              <p>Reels & Shorts</p>
              <p>YouTube Videos</p>
              <p>Transitions & Effects</p>
            </div>

          </div>

          {/* DESIGN */}

          <div className="skill-card bg-lime-300 text-black rounded-[35px] p-8 md:p-10 min-h-[420px] flex flex-col justify-between">

            <div>
              <span className="text-black/50 text-sm">
                02
              </span>

              <h3 className="text-4xl md:text-5xl font-black uppercase mt-8">
                Creative
                <br />
                Design
              </h3>
            </div>

            <div className="text-black/60 space-y-2">
              <p>Canva</p>
              <p>Social Media Design</p>
              <p>Thumbnail Design</p>
              <p>Visual Branding</p>
            </div>

          </div>

          {/* WEB */}

          <div className="skill-card bg-[#121212] border border-white/10 rounded-[35px] p-8 md:p-10 min-h-[420px] flex flex-col justify-between">

            <div>
              <span className="text-lime-300 text-sm">
                03
              </span>

              <h3 className="text-4xl md:text-5xl font-black uppercase mt-8">
                Web
                <br />
                Development
              </h3>
            </div>

            <div className="text-white/50 space-y-2">
              <p>React.js</p>
              <p>JavaScript</p>
              <p>Tailwind CSS</p>
              <p>Responsive UI</p>
              <p>Modern Web Experiences</p>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          SHOWREEL
      ====================================================== */}

      <section
        id="showreel"
        ref={showreelRef}
        className="relative z-40 bg-[#080808] py-8 md:py-10 overflow-hidden"
      >
        {/* =====================================================
      HEADER
  ====================================================== */}

        <div className="px-5 md:px-10 lg:px-10 mb-16 md:mb-24">
          <p className="text-lime-300 uppercase tracking-[0.3em] text-xs mb-8">
            03 / SHOWREEL
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="showreel-title uppercase font-black leading-[0.8] tracking-[-0.06em] text-[12vw] md:text-[9vw]">
              WATCH
              <br />
              THE REEL<span className="text-lime-300">.</span>
            </h2>

            <p className="text-white/40 max-w-sm text-sm md:text-base leading-relaxed">
              A collection of selected edits, creative videos and visual
              stories crafted with rhythm, movement and emotion.
            </p>
          </div>
        </div>

        {/* =====================================================
      VIDEO CAROUSEL
  ====================================================== */}

        <div className="relative">

          {/* VIDEO TRACK */}

          <div className="flex items-center justify-center gap-5 md:gap-8 px-2">

            {videos.map((video, index) => {
              const isActive = index === activeVideo;

              return (
                <div
                  key={video.id}
                  className={`
              relative flex-shrink-0 overflow-hidden rounded-[30px]
              md:rounded-[40px]
              transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
              ${isActive
                      ? "w-[86vw] md:w-[55vw] lg:w-[50vw] h-[58vh] md:h-[68vh] opacity-100 scale-100"
                      : "hidden md:block md:w-[18vw] lg:w-[15vw] h-[45vh] opacity-30 scale-90"
                    }
            `}
                >

                  {/* VIDEO */}

                  <video
                    key={video.src}
                    className="w-full h-full object-cover"
                    src={video.src}
                    poster={video.poster}
                    autoPlay={isActive && isPlaying}
                    muted
                    loop
                    playsInline
                  />

                  {/* DARK GRADIENT */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20 pointer-events-none" />

                  {/* CENTER PLAY / PAUSE */}

                  {isActive && (
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      onMouseEnter={() => setCursorText(isPlaying ? "PAUSE" : "PLAY")}
                      onMouseLeave={() => setCursorText("")}
                      className="
                  absolute
                  top-1/2
                  left-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  w-20
                  h-20
                  md:w-24
                  md:h-24
                  rounded-full
                  bg-lime-300
                  text-black
                  flex
                  items-center
                  justify-center
                  hover:scale-110
                  transition-transform
                  z-10
                "
                    >
                      {isPlaying ? (
                        <Pause size={25} fill="currentColor" />
                      ) : (
                        <Play size={28} fill="currentColor" />
                      )}
                    </button>
                  )}

                  {/* VIDEO INFORMATION */}

                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">

                      <div className="flex items-end justify-between gap-5">

                        <div>
                          <p className="text-lime-300 text-xs uppercase tracking-[0.3em] mb-3">
                            {video.category}
                          </p>

                          <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
                            {video.title}
                          </h3>
                        </div>

                        <span className="text-white/50 text-sm">
                          {video.year}
                        </span>

                      </div>

                    </div>
                  )}

                  {/* NUMBER */}

                  {isActive && (
                    <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
                      <span className="text-white/60 text-xs tracking-[0.3em]">
                        0{video.id} / 0{videos.length}
                      </span>
                    </div>
                  )}

                </div>
              );
            })}

          </div>

          {/* =================================================
        PREVIOUS BUTTON
    ================================================== */}

          <button
            type="button"
            onClick={() => {
              setActiveVideo(
                activeVideo === 0
                  ? videos.length - 1
                  : activeVideo - 1
              );

              setIsPlaying(true);
            }}
            onMouseEnter={() => setCursorText("PREV")}
            onMouseLeave={() => setCursorText("")}
            className="
        absolute
        left-4
        md:left-8
        lg:left-12
        top-1/2
        -translate-y-1/2
        z-30
        w-12
        h-12
        md:w-16
        md:h-16
        rounded-full
        border
        border-white/20
        bg-black/50
        backdrop-blur-md
        flex
        items-center
        justify-center
        hover:bg-lime-300
        hover:text-black
        hover:border-lime-300
        transition
      "
          >
            <ChevronLeft size={22} />
          </button>

          {/* =================================================
        NEXT BUTTON
    ================================================== */}

          <button
            type="button"
            onClick={() => {
              setActiveVideo(
                activeVideo === videos.length - 1
                  ? 0
                  : activeVideo + 1
              );

              setIsPlaying(true);
            }}
            onMouseEnter={() => setCursorText("NEXT")}
            onMouseLeave={() => setCursorText("")}
            className="
        absolute
        right-4
        md:right-8
        lg:right-12
        top-1/2
        -translate-y-1/2
        z-30
        w-12
        h-12
        md:w-16
        md:h-16
        rounded-full
        border
        border-white/20
        bg-black/50
        backdrop-blur-md
        flex
        items-center
        justify-center
        hover:bg-lime-300
        hover:text-black
        hover:border-lime-300
        transition
      "
          >
            <ChevronRight size={22} />
          </button>

        </div>

        {/* =====================================================
      DOT NAVIGATION
  ====================================================== */}

        <div className="flex justify-center items-center gap-3 mt-10">

          {videos.map((video, index) => (
            <button
              key={video.id}
              type="button"
              onClick={() => {
                setActiveVideo(index);
                setIsPlaying(true);
              }}
              className={`
          h-1.5
          rounded-full
          transition-all
          duration-500
          ${index === activeVideo
                  ? "w-12 bg-lime-300"
                  : "w-5 bg-white/20 hover:bg-white/50"
                }
        `}
            />
          ))}

        </div>

        {/* =====================================================
      BOTTOM TEXT
  ====================================================== */}

        <div className="px-5 md:px-10 lg:px-10 mt-14 flex items-center justify-between">

          <span className="text-xs uppercase tracking-[0.3em] text-white/30">
            SELECTED WORK / 2026
          </span>

          <span className="text-xs uppercase tracking-[0.3em] text-white/30">
            SWIPE / CLICK TO EXPLORE
          </span>

        </div>

      </section>

      {/* =====================================================
          PROJECTS
      ====================================================== */}

      <section
        id="work"
        ref={projectsRef}
        className="relative z-50 bg-[#f2f2ed] text-black py-10 md:py-20 px-5 md:px-10 lg:px-20"
      >

        <div className="max-w-7xl mx-auto">

          <p className="text-black/40 uppercase tracking-[0.3em] text-xs mb-10">
            04 / SELECTED WORK
          </p>

          <h2 className="font-black uppercase tracking-[-0.06em] text-[10vw] leading-[0.8]">
            SELECTED
            <br />
            WORK<span className="text-lime-500">.</span>
          </h2>

          {/* Project 01 */}

          <div className="project-card mt-16 grid lg:grid-cols-[0.3fr_1fr] gap-10 items-center">

            <div>
              <span className="text-sm text-black/40">
                01
              </span>

              <h3 className="text-4xl md:text-6xl font-black uppercase mt-5 leading-none">
                SOCIAL
                <br />
                VIDEO
              </h3>

              <p className="text-black/50 mt-6 max-w-xs">
                Short-form content designed to capture attention
                quickly and communicate a clear message.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="px-4 py-2 rounded-full bg-black text-white text-xs">
                  CAPCUT
                </span>

                <span className="px-4 py-2 rounded-full bg-black/10 text-xs">
                  REELS
                </span>
              </div>
            </div>

            <div
              className="relative h-[60vh] rounded-[35px] overflow-hidden group"
              onMouseEnter={() => setCursorText("VIEW")}
              onMouseLeave={() => setCursorText("")}
            >
              <img
                src="https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1800&q=90"
                alt="Video editing project"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition" />
            </div>

          </div>

          {/* Project 02 */}

          <div className="project-card mt-10 grid lg:grid-cols-[1fr_0.3fr] gap-10 items-center">

            <div className="relative h-[60vh] rounded-[35px] overflow-hidden group order-2 lg:order-1">
        
              <img
                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1800&q=90"
                alt="Creative video project"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/20" />

            </div>

            <div className="order-1 lg:order-2">

              <span className="text-sm text-black/40">
                02
              </span>

              <h3 className="text-4xl md:text-6xl font-black uppercase mt-5 leading-none">
                YOUTUBE
                <br />
                CONTENT
              </h3>

              <p className="text-black/50 mt-6 max-w-xs">
                Engaging edits, pacing and visual elements for
                long-form and short-form video content.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="px-4 py-2 rounded-full bg-black text-white text-xs">
                  EDITING
                </span>

                <span className="px-4 py-2 rounded-full bg-black/10 text-xs">
                  YOUTUBE
                </span>
              </div>

            </div>

          </div>

          {/* Project 03 */}

          <div className="project-card mt-10 grid lg:grid-cols-[0.3fr_1fr] gap-10 items-center">

            <div>

              <span className="text-sm text-black/40">
                03
              </span>

              <h3 className="text-4xl md:text-6xl font-black uppercase mt-5 leading-none">
                CREATIVE
                <br />
                DESIGN
              </h3>

              <p className="text-black/50 mt-6 max-w-xs">
                Thumbnails, social graphics and visual content
                created with Canva.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="px-4 py-2 rounded-full bg-black text-white text-xs">
                  CANVA
                </span>

                <span className="px-4 py-2 rounded-full bg-black/10 text-xs">
                  DESIGN
                </span>
              </div>

            </div>

            <div className="relative h-[60vh] rounded-[35px] overflow-hidden group">

              <img
                src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1800&q=90"
                alt="Creative design project"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/20" />

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          ABOUT
      ====================================================== */}

      <section
        id="about"
        className="about-section relative z-60 bg-[#080808] py-10 md:py-20 px-5 md:px-10 lg:px-20"
      >

        <div className="max-w-7xl mx-auto">

          <p className="text-lime-300 uppercase tracking-[0.3em] text-xs mb-12">
            05 / ABOUT ME
          </p>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            {/* Photo */}

            <div className="about-photo relative">

              <div className="aspect-[4/5] rounded-[40px] overflow-hidden">

                {/* Replace this with your own photo */}

                <img
                  src="https://i.ibb.co.com/1tBQYXSj/tanvir.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />

              </div>

              <div className="absolute -bottom-5 -right-5 bg-lime-300 text-black px-6 py-5 rounded-xl font-black">
                TANVIR.
              </div>

            </div>

            {/* Content */}

            <div className="about-content">

              <h2 className="font-black uppercase text-xl md:text-7xl tracking-[-0.06em] leading-[0.8]">
                WHO'S
                <br />
                BEHIND
                <br />
                THE EDIT<span className="text-lime-300">?</span>
              </h2>

              <p className="text-xl md:text-xl font-medium mt-12 leading-tight">
                I'm MD Abdur Rahaman Tanvir, a creative professional
                combining video editing, design and web development.
              </p>

              <p className="text-white/50 mt-6 leading-relaxed max-w-xl">
                I hold a B.Sc. in Engineering in Computer Science &
                Engineering. Alongside web development, I enjoy working
                with visual content, editing videos and creating
                engaging digital experiences.
              </p>

              {/* Education */}

              <div className="border-t border-white/10 mt-12 pt-8">

                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  EDUCATION
                </p>

                <p className="text-xl font-bold mt-3">
                  B.Sc. in Engineering
                </p>

                <p className="text-white/50">
                  Computer Science & Engineering
                </p>

              </div>

              {/* Skills */}

              <div className="flex flex-wrap gap-3 mt-8">

                {[
                  "CapCut",
                  "Canva",
                  "React.js",
                  "JavaScript",
                  "Tailwind CSS",
                  "Web Development",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="border border-white/10 rounded-full px-5 py-3 text-sm"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          CONTACT
      ====================================================== */}

      <section
        id="contact"
        className="contact-section relative z-70 bg-lime-300 text-black min-h-screen flex items-center px-5 md:px-10 lg:px-20 py-16"
      >

        <div className="max-w-7xl mx-auto w-full">

          <p className="text-black/50 uppercase tracking-[0.3em] text-xs mb-12">
            06 / CONTACT
          </p>

          <h2 className="contact-title font-black uppercase tracking-[-0.07em] leading-[0.95] text-[10vw]">
            HAVE A
            <br />
            STORY
            <br />
            TO TELL<span className="text-white">?</span>
          </h2>

          <div className="mt-20 flex flex-col md:flex-row md:items-center justify-between gap-10">

            <div>

              <p className="text-2xl md:text-4xl font-bold">
                LET'S CREATE IT.
              </p>

              <p className="mt-3 text-black/50">
                Have a project, video or creative idea?
              </p>

            </div>

            <a
              href="https://wa.me/8801782407546"
              onMouseEnter={() => setCursorText("EMAIL")}
              onMouseLeave={() => setCursorText("")}
              className="contact-button inline-flex items-center justify-center gap-4 bg-black text-white rounded-full px-8 py-5 text-lg font-bold hover:scale-105 transition"
            >
              START A PROJECT
              <ArrowUpRight />
            </a>

          </div>

          {/* Social Links */}

          <a
            href="https://www.facebook.com/abdurrahman.tanvir.3"
            className="flex items-center gap-2 hover:opacity-50 transition"
          >
            FACEBOOK ↗
          </a>

          <a
            href="https://www.fiverr.com/tanvir_200"
            className="flex items-center gap-2 hover:opacity-50 transition"
          >
            FIVERR ↗
          </a>

          <a
            href="https://www.linkedin.com/in/a-rahaman"
            className="flex items-center gap-2 hover:opacity-50 transition"
          >
            LINKEDIN ↗
          </a>

          {/* Footer */}

          <div className="mt-20 flex flex-col md:flex-row justify-between gap-4 text-black/40">

            <a href="https://bumpy-low.surge.sh" className="hover:opacity-50 text-black transition">
              © 2026 MD ABDUR RAHAMAN TANVIR
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}


const videos = [
  {
    id: 1,
    title: "Social Media Reel",
    category: "Short Form",
    year: "2026",
    src: "/videos/reel-01.mp4",
    poster:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 2,
    title: "Creative Campaign",
    category: "Video Editing",
    year: "2026",
    src: "/videos/reel-02.mp4",
    poster:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 3,
    title: "YouTube Content",
    category: "Content Editing",
    year: "2026",
    src: "/videos/reel-03.mp4",
    poster:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 4,
    title: "Brand Story",
    category: "Creative Video",
    year: "2026",
    src: "/videos/reel-04.mp4",
    poster:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=90",
  },
];