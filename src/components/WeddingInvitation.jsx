import { useState, useEffect, useRef } from "react";
import "./weddingCss.css";


/* ─── TINY COMPONENTS ─── */
function CornerSVG() {
  return (
    <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4 56L4 4L56 4" />
      <path d="M4 30 Q18 18 30 4" />
      <circle cx="4" cy="4" r="3" fill="currentColor" stroke="none" />
      <circle cx="4" cy="56" r="2" fill="currentColor" stroke="none" opacity=".4" />
      <circle cx="56" cy="4" r="2" fill="currentColor" stroke="none" opacity=".4" />
    </svg>
  );
}

function MandalaSVG() {
  return (
    <svg width="500" height="500" viewBox="0 0 500 500" fill="none" stroke="#C9A96E" strokeWidth=".8">
      {[0, 30, 60, 90, 120, 150].map(a => (
        <g key={a} transform={`rotate(${a} 250 250)`}>
          <ellipse cx="250" cy="250" rx="200" ry="60" />
          <ellipse cx="250" cy="250" rx="160" ry="40" />
        </g>
      ))}
      {[0, 45, 90, 135].map(a => (
        <g key={a} transform={`rotate(${a} 250 250)`}>
          <line x1="250" y1="50" x2="250" y2="450" />
          <line x1="50" y1="250" x2="450" y2="250" />
        </g>
      ))}
      <circle cx="250" cy="250" r="200" strokeDasharray="4 8" />
      <circle cx="250" cy="250" r="150" strokeDasharray="2 6" />
      <circle cx="250" cy="250" r="80" />
      <circle cx="250" cy="250" r="30" />
    </svg>
  );
}

function CalIcon() { return <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>; }
function ClockIcon() { return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></svg>; }
function PinIcon() { return <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>; }

/* ─── PETAL PARTICLE ─── */
function Petals() {
  const petals = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    size: 10 + Math.random() * 10,
    delay: Math.random() * 10,
    dur: 8 + Math.random() * 8,
    symbol: ['🌸', '🌺', '✿', '❀', '✾'][Math.floor(Math.random() * 5)],
  }));
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {petals.map(p => (
        <div key={p.id} className="petal" style={{
          left: p.left, top: '-20px',
          fontSize: `${p.size}px`,
          animationDuration: `${p.dur}s`,
          animationDelay: `${p.delay}s`,
          opacity: .5,
        }}>{p.symbol}</div>
      ))}
    </div>
  );
}

/* ─── SCROLL REVEAL HOOK ─── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── COUNTDOWN ─── */
function useCountdown(target) {
  const [t, setT] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) return setT({ d: 0, h: 0, m: 0, s: 0 });
      setT({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    calc(); const id = setInterval(calc, 1000); return () => clearInterval(id);
  }, [target]);
  return t;
}

/* ─── GOLDEN DIVIDER ─── */
function GoldenDivider({ text = "✦" }) {
  return (
    <div className="golden-divider">
      <div className="gdiv-line" />
      <div className="gdiv-diamond" />
      <div className="gdiv-text">{text}</div>
      <div className="gdiv-diamond" />
      <div className="gdiv-line" />
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function WeddingInvitation() {
  useReveal();
  const { d, h, m, s } = useCountdown("2026-07-11T19:00:00+05:30");
  const pad = n => String(n ?? 0).padStart(2, '0');

  return (
    <>
      <Petals />

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="deco-border" />
        <div className="deco-border2" />
        <span className="corner tl"><CornerSVG /></span>
        <span className="corner tr"><CornerSVG /></span>
        <span className="corner bl"><CornerSVG /></span>
        <span className="corner br"><CornerSVG /></span>
        <div className="mandala-wrap"><MandalaSVG /></div>

        {/* Illustration */}
        <div className="hero-illustration" style={{ maxWidth: '420px', width: '90%', margin: '40px auto 0' }}>
          <div className="illustration-glow" />
          <img src="/Invite.png" alt="Vamica & Bhavuk" style={{ width: '100%', display: 'block' }} />
        </div>

        {/* Text */}
        <div className="hero-text-overlay">
          <p className="pre-tag">Wedding Invitation</p>

          <div className="reveal">
            <div className="hero-bride"><span className="shimmer-name">Vamica Khera</span></div>
            <div className="hero-parent">D/O Sh. Rajiv Khera &amp; Smt. Anshu Khera</div>
          </div>

          <div className="hero-amp-wrapper">
            <div className="vline" />
            <span className="hero-amp">&amp;</span>
            <div className="vline" />
          </div>

          <div className="reveal anim-delay-1">
            <div className="hero-groom"><span className="shimmer-name">Bhavuk Narang</span></div>
            <div className="hero-parent">S/O Sh. Jagdish Narang &amp; Smt. Varsha Narang</div>
          </div>

          <div className="hero-date-block reveal anim-delay-2">
            <div className="hero-date-label">request the pleasure of your company</div>
            <div className="hero-date-main">Saturday, the 11th of July, 2026</div>
          </div>
        </div>
      </section>

      <GoldenDivider text="Together We Begin" />

      {/* ══ COUNTDOWN ══ */}
      <section className="countdown-section">
        <p className="cd-label">Counting down to the big day</p>
        <h3 className="cd-title">The Wedding Awaits</h3>
        <div className="cd-grid">
          {[{ n: pad(d), w: 'Days' }, { n: pad(h), w: 'Hours' }, { n: pad(m), w: 'Minutes' }, { n: pad(s), w: 'Seconds' }].map((u, i) => (
            <div key={i} style={{ display: 'contents' }}>
              {i > 0 && <div className="cd-sep">:</div>}
              <div className="cd-unit" style={{ animationDelay: `${i * .5}s` }}>
                <div className="cd-num" style={{ animationDelay: `${i * .5}s` }}>{u.n}</div>
                <div className="cd-word">{u.w}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <GoldenDivider text="The Couple" />

      {/* ══ PHOTOS ══ */}
      <section className="photos-section">
        <p className="section-micro" style={{ color: 'rgba(255,255,255,.3)' }}>With joy in their hearts</p>
        <div className="photos-row">
          <div className="photo-card reveal-left">
            <div className="photo-frame">
              <img src="/vamica.jpeg" alt="Vamica Khera" />
            </div>
            <div className="photo-name">Vamica</div>
            <div className="photo-role">The Bride</div>
          </div>
          <div className="photo-connector">
            <div className="conn-line" /><div className="conn-amp">&amp;</div><div className="conn-line" />
          </div>
          <div className="photo-card reveal-right">
            <div className="photo-frame">
              <img src="/Bhavuk.jpeg" alt="Bhavuk Narang" />
            </div>
            <div className="photo-name">Bhavuk</div>
            <div className="photo-role">The Groom</div>
          </div>
        </div>
      </section>

      <GoldenDivider text="The Celebration" />

      {/* ══ EVENT DETAILS ══ */}
      <section className="details-section">
        <div className="sec-head reveal">
          <p className="sec-pre">Join us to celebrate</p>
          <h2 className="sec-title">Wedding Ceremony</h2>
        </div>

        <div className="event-card reveal">
          <div className="event-head">
            <div className="event-type-tag">Reception &amp; Celebration</div>
            <div className="event-title-main">The Wedding</div>
          </div>
          <div className="event-body">
            <div className="detail-row">
              <div className="icon-circle"><CalIcon /></div>
              <div>
                <div className="d-label">Date</div>
                <div className="d-value">Saturday, 11th July 2026</div>
              </div>
            </div>
            <hr className="thin-rule" />
            <div className="detail-row">
              <div className="icon-circle"><ClockIcon /></div>
              <div>
                <div className="d-label">Time</div>
                <div className="d-value">7:00 PM Onwards</div>
                <div className="d-sub">Dinner &amp; celebrations to follow</div>
              </div>
            </div>
            <hr className="thin-rule" />
            <div className="detail-row">
              <div className="icon-circle"><PinIcon /></div>
              <div>
                <div className="d-label">Venue</div>
                <div className="d-value">Seven Seas Banquet &amp; Lawn</div>
                <div className="d-sub">Britania Chowk, B-28, Lawrence Rd,<br />Dr Lohia Industrial Area, Indira Colony,<br />Shakurpur, New Delhi – 110035</div>
              </div>
            </div>
            <a href="https://maps.app.goo.gl/nkNGr6xkcoFUy9Kp6" target="_blank" rel="noreferrer" className="map-btn">
              <PinIcon /> Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* ══ FLORAL QUOTE BANNER ══ */}
      <div className="floral-banner reveal">
        <div style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--ch-d)', opacity: .7 }}>A NEW CHAPTER BEGINS</div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontStyle: 'italic', color: 'var(--bark)', maxWidth: '360px', lineHeight: 1.6, textAlign: 'center' }}>
          "Two hearts, one love — two families, one beautiful beginning."
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', color: 'var(--ch)', opacity: .6 }}>✦</span>
          <span style={{ fontSize: '14px', color: 'var(--ch)', opacity: .6 }}>Vamica &amp; Bhavuk</span>
          <span style={{ fontSize: '18px', color: 'var(--ch)', opacity: .6 }}>✦</span>
        </div>
      </div>

      <GoldenDivider text="Our Families" />

      {/* ══ FAMILIES ══ */}
      <section className="families-section">
        <div style={{ textAlign: 'center' }} className="reveal">
          <p style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--ch)', opacity: .7, marginBottom: '10px' }}>With Blessings of</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '38px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,.85)' }}>Our Families</h2>
        </div>
        <div className="families-grid">
          <div className="fam-card reveal-left">
            <div className="fam-label">Bride's Family</div>
            <div className="fam-names">Sh. Rajiv Khera<span className="fam-and">&amp;</span>Smt. Anshu Khera</div>
          </div>
          <div className="fam-card reveal-right">
            <div className="fam-label">Groom's Family</div>
            <div className="fam-names">Sh. Jagdish Narang<span className="fam-and">&amp;</span>Smt. Varsha Narang</div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="footer">
        <div className="footer-orn">✦ ✦ ✦</div>
        <p className="footer-msg reveal">"Two souls, one heart — beginning a beautiful journey together."</p>
        <div className="footer-couple">Vamica &amp; Bhavuk</div>
        <p className="footer-meta">11 · 07 · 2026 &nbsp;·&nbsp; New Delhi</p>
        <p className="footer-meta" style={{ opacity: .5, fontSize: '11px' }}>We look forward to celebrating this joyous occasion with you.</p>
        <div style={{ marginTop: '8px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ width: '40px', height: '1px', background: 'var(--ch)', opacity: .4, display: 'block' }} />
          <span style={{ fontSize: '16px', color: 'var(--ch)', opacity: .5 }}>✦</span>
          <span style={{ width: '40px', height: '1px', background: 'var(--ch)', opacity: .4, display: 'block' }} />
        </div>
      </footer>
    </>
  );
}
