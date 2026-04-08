/* Khang Tran Portfolio App */
import { useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.46-1.2-1.12-1.52-1.12-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.36 1.11 2.93.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.05.8-.23 1.66-.34 2.52-.34.85 0 1.72.12 2.52.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.93-2.34 4.8-4.57 5.05.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.59.69.48A10.1 10.1 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"></path>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.5 23.5h4V7.98h-4V23.5ZM8.5 7.98h3.83v2.12h.05c.53-1 1.83-2.06 3.76-2.06 4.02 0 4.76 2.65 4.76 6.09v9.37h-4v-8.31c0-1.98-.04-4.52-2.76-4.52-2.76 0-3.18 2.16-3.18 4.38v8.45h-4V7.98Z"></path>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"></path>
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.29 9.17 12 2.89 5.71 4.3 4.29l6.29 6.3 6.3-6.3z"></path>
    </svg>
  );
}

function useTheme() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    let saved = "";
    try {
      saved = localStorage.getItem("ktTheme") || "";
    } catch (e) {}
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("dataTheme", theme === "light" ? "light" : "dark");
    try {
      localStorage.setItem("ktTheme", theme);
    } catch (e) {}
  }, [theme]);

  return { theme, setTheme };
}

function Toast({ text, show }) {
  return (
    <div className={"toast" + (show ? " show" : "")} role="status" aria-live="polite" aria-atomic="true">
      {text}
    </div>
  );
}

function Modal({ open, title, children, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function onKey(e) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      if (panelRef.current) panelRef.current.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modalBackdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modalPanel" ref={panelRef} tabIndex={-1}>
        <div className="modalTop">
          <div className="modalTitle">{title}</div>
          <button className="iconBtn" type="button" aria-label="Close" onClick={onClose}>
            <XIcon />
          </button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
}

export default function App() {
  const { theme, setTheme } = useTheme();
  const [activeId, setActiveId] = useState(null);
  const [q, setQ] = useState("");
  const [chip, setChip] = useState("All");
  const [modalId, setModalId] = useState(null);
  const [toast, setToast] = useState({ show: false, text: "" });

  const profile = useMemo(() => {
    return {
      name: "Khang Tran",
      tagline:
        "Cal Poly Computer Engineering sophomore focused on DevOps foundations through cloud infrastructure, automation, and reliable systems.",
      domain: "khangduytran.xyz",
      docs: "docs.khangduytran.xyz",
      email: "khangtran082005@gmail.com",
      github: "https://github.com/khang2005",
      linkedin: "https://www.linkedin.com/in/khang-tran-4ba6b3285"
    };
  }, []);

  const projects = useMemo(() => {
    return [
      {
        id: "ai",
        name: "AI Map Chatbox",
        short:
          "Web application combining a chatbot with an interactive Google Map, powered by Gemini AI for location-based queries.",
        what: [
          "React frontend with chat interface and Google Maps integration",
          "FastAPI backend handling Gemini AI requests",
          "Docker Compose for containerized deployment",
          "Secure API key management for both services"
        ],
        tags: ["React", "FastAPI", "Gemini AI", "Docker"],
        liveUrl: "https://github.com/khang2005/AI_chatbox_map",
        codeUrl: "https://github.com/khang2005/AI_chatbox_map"
      },
      {
        id: "infra",
        name: "Automated Cloud Infrastructure Pipeline",
        short:
          "Azure cloud deployment with Terraform, Python scripts, Docker, and GitHub Actions for repeatable infrastructure.",
        what: [
          "Terraform modules for repeatable Azure infrastructure",
          "Python scripts for network monitoring and port scanning",
          "Docker containerization with multi-stage builds",
          "System reporting and resource usage automation"
        ],
        tags: ["Terraform", "Azure", "Python", "Docker"],
        liveUrl: "https://github.com/khang2005/Cloud_deployment_project",
        codeUrl: "https://github.com/khang2005/Cloud_deployment_project"
      }
    ];
  }, []);

  const chips = useMemo(() => {
    const s = new Set();
    s.add("All");
    for (let i = 0; i < projects.length; i++) {
      for (let j = 0; j < projects[i].tags.length; j++) s.add(projects[i].tags[j]);
    }
    return Array.from(s);
  }, [projects]);

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    return projects.filter((p) => {
      const matchText =
        !s ||
        p.name.toLowerCase().includes(s) ||
        p.short.toLowerCase().includes(s) ||
        p.tags.join(" ").toLowerCase().includes(s);

      const matchChip = chip === "All" || p.tags.includes(chip);

      if (matchText && matchChip) return true;
      return false;
    });
  }, [projects, q, chip]);

  function showToast(text) {
    setToast({ show: true, text });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast({ show: false, text: "" }), 1200);
  }

  async function copy(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showToast("Copied");
        return;
      }
    } catch (e) {}
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast("Copied");
    } catch (e) {
      showToast("Copy failed");
    }
    document.body.removeChild(ta);
  }

  useEffect(() => {
    const ids = ["home", "projects", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (let i = 0; i < entries.length; i++) {
          const e = entries[i];
          if (!e.isIntersecting) continue;
          if (!best) best = e;
          else if (e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best && best.target && best.target.id) setActiveId(best.target.id);
      },
      { threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    for (let i = 0; i < els.length; i++) io.observe(els[i]);
    return () => io.disconnect();
  }, []);

  const modalProject = useMemo(() => {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === modalId) return projects[i];
    }
    return null;
  }, [modalId, projects]);

  return (
    <>
      <div className="bgGlow" aria-hidden="true"></div>

      <header className="topbar">
        <a className="brand" href="#home" aria-label="Go to top">
          <span className="brandDot"></span>
          <span className="brandText">KT</span>
        </a>

        <nav className="nav">
          <a className={activeId === "home" ? "navActive" : ""} href="#home">Home</a>
          <a className={activeId === "projects" ? "navActive" : ""} href="#projects">Projects</a>
          <a className={activeId === "contact" ? "navActive" : ""} href="#contact">Contact</a>
        </nav>

        <button
          className="iconBtn"
          type="button"
          aria-label="Toggle theme"
          onClick={() => {
            if (theme === "dark") setTheme("light");
            else setTheme("dark");
          }}
        >
          <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
            <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16h0Zm0 20h0Zm10-10h0ZM2 12h0Zm17.07 7.07h0ZM4.93 4.93h0Zm14.14-0.01h0ZM4.93 19.07h0Z" />
          </svg>
        </button>
      </header>

      <main id="home" className="container">
        <section className="hero">
          <div className="heroLeft">
            <div className="pill">Computer Engineering • Cal Poly</div>
            <h1 className="title">{profile.name}</h1>
            <p className="subtitle">{profile.tagline}</p>

            <div className="heroActions">
              <a className="btnPrimary" href="#projects">View Projects</a>
              <button className="btnGhost" type="button" onClick={() => copy(profile.email)}>
                Copy Email
              </button>
            </div>

            <div className="socialRow" aria-label="Social links">
              <a className="socialLink" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GithubIcon />
              </a>
              <a className="socialLink" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
              <button
                className="socialLink"
                type="button"
                aria-label="Email"
                onClick={() => {
                  copy(profile.email);
                  window.location.href = "mailto:" + profile.email;
                }}
              >
                <MailIcon />
              </button>
            </div>

            <div className="metaLine">
              <span className="mono">{profile.domain}</span>
              <span className="dotSep">•</span>
              <span className="mono">{profile.email}</span>
            </div>
          </div>

          <div className="heroRight">
            <div className="cardBig">
              <h2 className="cardTitle">What I enjoy building</h2>
              <div className="stackGrid">
                <div className="stackItem">
                  <div className="stackTop">Infrastructure</div>
                  <div className="stackSub">Terraform, cloud resources, repeatable environments</div>
                </div>
                <div className="stackItem">
                  <div className="stackTop">Automation</div>
                  <div className="stackSub">CI CD, scripts, safer deploy workflows</div>
                </div>
                <div className="stackItem">
                  <div className="stackTop">Reliability</div>
                  <div className="stackSub">Logging, monitoring, practical safeguards</div>
                </div>
              </div>

              <div className="ctaLine">
                <a className="btnSmall" href={profile.github} target="_blank" rel="noreferrer">
                  Browse GitHub
                </a>
                <a className="btnSmall" href="#projects">See featured work</a>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="sectionHead">
            <div>
              <h2>Featured Projects</h2>
              <p className="muted">Click a project to open details.</p>
            </div>

            <div className="filterRow">
              <input
                className="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search projects"
              />
            </div>
          </div>

          <div className="chipRow" aria-label="Project filters">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                className={chip === c ? "chip chipOn" : "chip"}
                onClick={() => setChip(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid">
            {filtered.length === 0 ? (
              <div className="projectCard">
                <h3 className="projectName">No results</h3>
                <p className="projectDesc">Try a different search or filter.</p>
              </div>
            ) : (
              filtered.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="projectCard projectBtn"
                  onClick={() => setModalId(p.id)}
                >
                  <div className="projectTop">
                    <h3 className="projectName">{p.name}</h3>
                    <div className="projectTags">
                      {p.tags.slice(0, 3).map((t) => (
                        <span className="tag" key={t}>{t}</span>
                      ))}
                    </div>
                  </div>

                  <p className="projectDesc">{p.short}</p>

                  <div className="projectActions">
                    <span className="hint">Open details</span>
                    <span className="arrow">→</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </section>

        <section id="contact" className="section">
          <div className="sectionHead">
            <div>
              <h2>Contact</h2>
              <p className="muted">Best way is email. Check out my docs site for detailed project documentation.</p>
            </div>
          </div>

          <div className="contactCard">
            <div className="contactRow">
              <div className="contactLabel">Email</div>
              <div className="contactValue mono">{profile.email}</div>
              <button className="btnSmall" type="button" onClick={() => copy(profile.email)}>Copy</button>
              <a className="btnSmall" href={"mailto:" + profile.email}>Open</a>
            </div>

            <div className="contactRow">
              <div className="contactLabel">GitHub</div>
              <div className="contactValue mono">{profile.github}</div>
              <a className="btnSmall" href={profile.github} target="_blank" rel="noreferrer">Open</a>
            </div>

            <div className="contactRow">
              <div className="contactLabel">Docs</div>
              <div className="contactValue mono">{profile.docs}</div>
              <a className="btnSmall" href={"https://" + profile.docs} target="_blank" rel="noreferrer">Open</a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="mono">© {new Date().getFullYear()} {profile.name}</div>
        </footer>
      </main>

      <Modal
        open={Boolean(modalProject)}
        title={modalProject ? modalProject.name : ""}
        onClose={() => setModalId(null)}
      >
        {modalProject ? (
          <>
            <p className="modalLead">{modalProject.short}</p>

            <div className="modalBlock">
              <div className="modalLabel">Highlights</div>
              <ul className="list">
                {modalProject.what.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>

            <div className="modalBlock">
              <div className="modalLabel">Tech</div>
              <div className="pillWrap">
                {modalProject.tags.map((t) => (
                  <span className="pillSmall" key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="modalActions">
              <a className="btnPrimary" href={modalProject.liveUrl} target="_blank" rel="noreferrer">
                Open Project
              </a>
              <a className="btnGhost" href={modalProject.codeUrl} target="_blank" rel="noreferrer">
                View Code
              </a>
            </div>
          </>
        ) : null}
      </Modal>

      <Toast text={toast.text} show={toast.show} />
    </>
  );
}

