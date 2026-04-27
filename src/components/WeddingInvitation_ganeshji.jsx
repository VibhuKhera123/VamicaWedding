import { useState, useEffect } from "react";
import VAMICA_IMG from "../assets/vamica.jpeg";
import BHAVUK_IMG from "../assets/Bhavuk.jpeg";
import INVITE_IMG from "../assets/Invite.png";
import GANESH_IMG from "../assets/ganeshji-intro.jpeg"; 
import "../styles/weddingGaneshJi.css";

/* ── SVG / Icon helpers ── */
function CornerSVG() {
  return (
    <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4 56L4 4L56 4" strokeDasharray="200"/>
      <path d="M4 30 Q18 18 30 4"/>
      <circle cx="4" cy="4" r="3" fill="currentColor" stroke="none"/>
      <circle cx="4" cy="56" r="2" fill="currentColor" stroke="none" opacity=".3"/>
      <circle cx="56" cy="4" r="2" fill="currentColor" stroke="none" opacity=".3"/>
    </svg>
  );
}
function MandalaSVG({ size = 500 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 500 500" fill="none" stroke="#C9A96E" strokeWidth=".7">
      {[0,30,60,90,120,150].map(a => (
        <g key={a} transform={`rotate(${a} 250 250)`}>
          <ellipse cx="250" cy="250" rx="195" ry="58"/>
          <ellipse cx="250" cy="250" rx="155" ry="38"/>
        </g>
      ))}
      {[0,45,90,135].map(a => (
        <g key={a} transform={`rotate(${a} 250 250)`}><line x1="250" y1="55" x2="250" y2="445"/></g>
      ))}
      <circle cx="250" cy="250" r="195" strokeDasharray="4 9"/>
      <circle cx="250" cy="250" r="145" strokeDasharray="2 7"/>
      <circle cx="250" cy="250" r="90"/>
      <circle cx="250" cy="250" r="32"/>
      <circle cx="250" cy="250" r="8" fill="#C9A96E" stroke="none"/>
    </svg>
  );
}
function CalIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>; }
function ClockIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg>; }
function PinIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>; }

/* ── Petals ── */
function Petals() {
  const items = Array.from({ length: 14 }, (_, i) => ({
    id: i, left: `${5 + Math.random() * 90}%`,
    size: 10 + Math.random() * 10, delay: Math.random() * 12,
    dur: 9 + Math.random() * 9,
    sym: ['🌸','🌺','✿','❀','🪷','✾'][Math.floor(Math.random() * 6)],
  }));
  return (
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:1, overflow:'hidden' }}>
      {items.map(p => (
        <div key={p.id} className="petal" style={{ left:p.left, top:'-30px', fontSize:`${p.size}px`, animationDuration:`${p.dur}s`, animationDelay:`${p.delay}s`, opacity:.42 }}>{p.sym}</div>
      ))}
    </div>
  );
}

/* ── Golden Divider ── */
function GoldenDivider({ text = "✦" }) {
  return (
    <div className="golden-divider">
      <div className="gdiv-line"/><div className="gdiv-diamond"/>
      <div className="gdiv-text">{text}</div>
      <div className="gdiv-diamond"/><div className="gdiv-line"/>
    </div>
  );
}

/* ── Scroll reveal ── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Countdown ── */
function useCountdown(target) {
  const [t, setT] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) return setT({ d:0, h:0, m:0, s:0 });
      setT({ d:Math.floor(diff/86400000), h:Math.floor((diff%86400000)/3600000), m:Math.floor((diff%3600000)/60000), s:Math.floor((diff%60000)/1000) });
    };
    calc(); const id = setInterval(calc, 1000); return () => clearInterval(id);
  }, [target]);
  return t;
}



const SPARKLE_POS = [
  {top:'11%',left:'17%',delay:'.3s',sym:'✦'},
  {top:'17%',right:'13%',delay:'.7s',sym:'✧'},
  {top:'71%',left:'9%',delay:'1.1s',sym:'✦'},
  {top:'77%',right:'11%',delay:'.5s',sym:'✧'},
  {top:'43%',left:'5%',delay:'.9s',sym:'✦'},
  {top:'43%',right:'5%',delay:'1.3s',sym:'✧'},
];

/* ── Event Card ── */
function EvCard({ num, emoji, name, tag, accent, date, time, venue, venueSub, featured, delay }) {
  return (
    <div className={`ev-card ev-${accent}${featured?' ev-featured':''} reveal`} style={{ animationDelay: delay }}>
      <div className="ev-card-top">
        <span className="ev-number">{num}</span>
        <span className="ev-emoji">{emoji}</span>
        <div className="ev-name">{name}</div>
        <div className="ev-tag">{tag}</div>
      </div>
      <div className="ev-card-body">
        <div className="ev-row">
          <div className="ev-icon"><CalIcon/></div>
          <div><div className="ev-info-label">Date</div><div className="ev-info-val">{date}</div></div>
        </div>
        <hr className="ev-thin-rule"/>
        <div className="ev-row">
          <div className="ev-icon"><ClockIcon/></div>
          <div><div className="ev-info-label">Time</div><div className="ev-info-val">{time}</div></div>
        </div>
        <hr className="ev-thin-rule"/>
        <div className={`ev-row${featured?' ev-map-row':''}`}>
          <div className="ev-icon"><PinIcon/></div>
          <div>
            <div className="ev-info-label">Venue</div>
            <div className="ev-info-val">{venue}</div>
            {venueSub && <div className="ev-info-sub">{venueSub}</div>}
          </div>
        </div>
        {featured && (
          <div className="ev-map-row">
            <a href="https://maps.app.goo.gl/nkNGr6xkcoFUy9Kp6" target="_blank" rel="noreferrer" className="map-btn">
              <PinIcon/> Get Directions
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

const EVENTS = [
  { num:'01', emoji:'🪑', name:'Choki',     tag:'Pre-Wedding Ritual',  accent:'choki',     date:'Saturday, 11th July 2026', time:'7:00 PM Onwards', venue:'Seven Seas Banquet & Lawn', venueSub:'Shakurpur, New Delhi', delay:'.05s' },
  { num:'02', emoji:'🧧', name:'Sagan',     tag:'Blessing Ceremony',    accent:'sagan',     date:'Saturday, 11th July 2026', time:'7:00 PM Onwards', venue:'Seven Seas Banquet & Lawn', venueSub:'Shakurpur, New Delhi', delay:'.10s' },
  { num:'03', emoji:'🌿', name:'Mehendi',   tag:'Henna Ceremony',        accent:'mehendi',   date:'Saturday, 11th July 2026', time:'7:00 PM Onwards', venue:'Seven Seas Banquet & Lawn', venueSub:'Shakurpur, New Delhi', delay:'.15s' },
  { num:'04', emoji:'🌼', name:'Haldi',     tag:'Turmeric Ceremony',     accent:'haldi',     date:'Saturday, 11th July 2026', time:'7:00 PM Onwards', venue:'Seven Seas Banquet & Lawn', venueSub:'Shakurpur, New Delhi', delay:'.20s' },
  { num:'05', emoji:'🍾', name:'Cocktail',  tag:'Evening Party',         accent:'cocktail',  date:'Saturday, 11th July 2026', time:'7:00 PM Onwards', venue:'Seven Seas Banquet & Lawn', venueSub:'Shakurpur, New Delhi', delay:'.25s' },
  { num:'06', emoji:'🥂', name:'Reception', tag:'Grand Celebration',      accent:'reception', date:'Saturday, 11th July 2026', time:'7:00 PM Onwards', venue:'Seven Seas Banquet & Lawn', venueSub:'Shakurpur, New Delhi', delay:'.30s' },
  { num:'07', emoji:'💍', name:'The Wedding', tag:'Main Ceremony', accent:'wedding', featured:true, date:'Saturday, 11th July 2026', time:'7:00 PM Onwards', venue:'Seven Seas Banquet & Lawn', venueSub:'Britania Chowk, B-28, Lawrence Rd, Dr Lohia Industrial Area, Indira Colony, Shakurpur, New Delhi – 110035', delay:'.35s' },
];

/* ══ MAIN ══ */
export default function WeddingInvitation() {
  const [introOpen, setIntroOpen] = useState(true);
  useReveal();
  const { d, h, m, s } = useCountdown("2026-07-11T19:00:00+05:30");
  const pad = n => String(n ?? 0).padStart(2, '0');

  useEffect(() => {
    const t = setTimeout(() => setIntroOpen(false), 4300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Petals/>

      {/* ══ INTRO OVERLAY ══ */}
      {introOpen && (
        <div className="intro-overlay">
          <div className="intro-curtain-left open"/>
          <div className="intro-curtain-right open"/>
          <div className="intro-center">
            {['intro-ring-1','intro-ring-2','intro-ring-3','intro-ring-4'].map(c => (
              <div key={c} className={`intro-ring ${c}`}/>
            ))}
            {SPARKLE_POS.map((sp, i) => (
              <div key={i} className="intro-sparkle" style={{...sp, animationDuration:'2s'}}>{sp.sym}</div>
            ))}
            <div className="intro-top-line"/>
            <div className="intro-top-label">Together with their families</div>
            <div className="intro-bride-name">Vamica Khera</div>
            <div className="intro-amp">&amp;</div>
            <div className="intro-groom-name">Bhavuk Narang</div>
            <div className="intro-date">11 · 07 · 2026 &nbsp;·&nbsp; New Delhi</div>
            <div className="intro-bottom-line" style={{animationDelay:'1.85s'}}/>
          </div>
        </div>
      )}

      {/* ══ GANESH BLESSING SECTION ══ */}
      <section className="ganesh-section">
        <div className="ganesh-svg-wrap">
          <div className="ganesh-ring ganesh-ring-1"/>
          <div className="ganesh-ring ganesh-ring-2"/>
          <div className="ganesh-ring ganesh-ring-3"/>
          <img src={GANESH_IMG} alt="Shri Ganesh Ji" className="ganesh-photo"/>
        </div>
        <div className="ganesh-divider">
          <div className="ganesh-div-line"/><div className="ganesh-div-dot"/><div className="ganesh-div-line"/>
        </div>
        <div className="ganesh-subtitle">Shubh Vivah</div>
        <div className="ganesh-title">॥ श्री गणेशाय नमः ॥</div>
        <div className="ganesh-mantra">
          "Vakratunda Mahakaya, Suryakoti Samaprabha<br/>
          Nirvighnam Kuru Me Deva, Sarva Karyeshu Sarvada"
        </div>
        <div className="ganesh-divider">
          <div className="ganesh-div-line"/><div className="ganesh-div-dot"/><div className="ganesh-div-line"/>
        </div>
      </section>

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-bg"/>
        {[700,900,1100].map(s => <div key={s} className="hero-ring" style={{ width:`${s}px`, height:`${s}px`, animationDelay:`${3.4+(s-700)/1000}s` }}/>)}
        <div className="deco-border"/>
        <div className="deco-border2"/>
        <span className="corner tl"><CornerSVG/></span>
        <span className="corner tr"><CornerSVG/></span>
        <span className="corner bl"><CornerSVG/></span>
        <span className="corner br"><CornerSVG/></span>
        <div className="mandala-wrap">
          <div>
            <div className="mandala-inner"><MandalaSVG size={560}/></div>
          </div>
        </div>

        {/* <div className="hero-ganesh-inline">
          <img src={GANESH_IMG} alt="Ganesh Ji" className="ganesh-photo-small"/>
          <div style={{position:'relative',flex:'0 0 auto'}}>
            <div className="illus-glow"/>
            {[{t:'8%',l:'-8%',d:'3.8s'},{t:'15%',r:'-6%',d:'4.4s'}].map((sp,i) => (
              <span key={i} className="illus-sparkle" style={{ top:sp.t, left:sp.l, right:sp.r, animationDelay:sp.d }}>✦</span>
            ))}
            <img src={INVITE_IMG} alt="Vamica & Bhavuk" className="hero-invite-img"/>
          </div>
        </div> */}

        <div className="hero-text-overlay">
          {/* <p className="pre-tag">Wedding Invitation</p> */}
          <div className="hero-bride"><span className="shimmer-name">Vamica Khera</span></div>
          <div className="hero-parent">D/O Smt. Anshu Khera &amp; Sh. Rajiv Khera</div>
          <div className="vline"/>
          <span className="hero-amp">&amp;</span>
          <div className="vline"/>
          <div className="hero-groom"><span className="shimmer-name">Bhavuk Narang</span></div>
          <div className="hero-parent hero-parent-b">S/O Smt. Varsha Narang &amp; Sh. Jagdish Narang</div>
          <div className="hero-date-block">
            <div className="hero-date-label">request the pleasure of your company</div>
            <div className="hero-date-main">Saturday, the 11th of July, 2026</div>
          </div>
        </div>
      </section>

      <GoldenDivider text="Together We Begin"/>

      {/* ══ COUNTDOWN ══ */}
      <section className="countdown-section">
        <p className="cd-label">Counting down to the big day</p>
        <h3 className="cd-title">The Wedding Awaits</h3>
        <div className="cd-grid">
          {[{ n:pad(d), w:'Days' },{ n:pad(h), w:'Hours' },{ n:pad(m), w:'Minutes' },{ n:pad(s), w:'Seconds' }].map((u, i) => (
            <div key={i} style={{ display:'contents' }}>
              {i > 0 && <div className="cd-sep">:</div>}
              <div className="cd-unit" style={{ animationDelay:`${i*.5}s` }}>
                <div className="cd-num" style={{ animationDelay:`${i*.5}s` }}>{u.n}</div>
                <div className="cd-word">{u.w}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <GoldenDivider text="The Couple"/>

      {/* ══ PHOTOS ══ */}
      <section className="photos-section">
        <p className="section-micro" style={{ color:'rgba(255,255,255,.3)' }}>With joy in their hearts</p>
        <div className="photos-row">
          <div className="photo-card reveal-left">
            <div className="photo-frame"><img src={VAMICA_IMG} alt="Vamica Khera"/></div>
            <div className="photo-name">Vamica</div>
            <div className="photo-role">The Bride</div>
          </div>
          <div className="photo-connector">
            <div className="conn-line"/><div className="conn-amp">&amp;</div><div className="conn-line"/>
          </div>
          <div className="photo-card reveal-right">
            <div className="photo-frame"><img src={BHAVUK_IMG} alt="Bhavuk Narang"/></div>
            <div className="photo-name">Bhavuk</div>
            <div className="photo-role">The Groom</div>
          </div>
        </div>
      </section>

      <GoldenDivider text="The Celebrations"/>

      {/* ══ EVENTS ══ */}
      <section className="events-section">
        <div className="sec-head reveal">
          <p className="sec-pre">Mark your calendars</p>
          <h2 className="sec-title">Wedding Celebrations</h2>
        </div>
        <div className="events-grid">
          {EVENTS.map(ev => <EvCard key={ev.num} {...ev}/>)}
        </div>
      </section>

      {/* ══ QUOTE BANNER ══ */}
      <div className="floral-banner reveal">
        <div className="banner-label">A New Chapter Begins</div>
        <div className="banner-quote">"Two hearts, one love — two families, one beautiful beginning."</div>
        <div className="banner-names">
          <span className="banner-star">✦</span>
          <span className="banner-name">Vamica &amp; Bhavuk</span>
          <span className="banner-star">✦</span>
        </div>
      </div>

      <GoldenDivider text="Our Families"/>

      {/* ══ FAMILIES ══ */}
      <section className="families-section">
        <div className="reveal" style={{ textAlign:'center' }}>
          <p className="families-pre">With Blessings of</p>
          <h2 className="families-title">Our Families</h2>
        </div>
        <div className="families-grid">
          <div className="fam-card reveal-left">
            <div className="fam-label">Bride's Family</div>
            <div className="fam-names">Smt. Anshu Khera<span className="fam-and">&amp;</span>Sh. Rajiv Khera</div>
          </div>
          <div className="fam-card reveal-right">
            <div className="fam-label">Groom's Family</div>
            <div className="fam-names">Smt. Varsha Narang<span className="fam-and">&amp;</span>Sh. Jagdish Narang</div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="footer">
        <div className="footer-orn">✦ ✦ ✦</div>
        <p className="footer-msg reveal">"Two souls, one heart — beginning a beautiful journey together."</p>
        <div className="footer-couple">Vamica &amp; Bhavuk</div>
        <p className="footer-meta">11 · 07 · 2026 &nbsp;·&nbsp; New Delhi</p>
        <p className="footer-meta" style={{ opacity:.5, fontSize:'11px' }}>We look forward to celebrating this joyous occasion with you.</p>
        <div className="footer-rule">
          <span className="footer-rule-line"/><span className="footer-rule-star">✦</span><span className="footer-rule-line"/>
        </div>
      </footer>
    </>
  );
}
