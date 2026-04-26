import { useState, useEffect } from "react";
import '../styles/allFunctionCss.css';
import CornerSVG from "./iconHelper";
import MandalaSVG from "./mandalaSVG";
import Petals from "./petels";
import EvCard from "./eventCards";
import invite from "../assets/Invite.png";
import vamica from "../assets/vamica.jpeg";
import bhavuk from "../assets/Bhavuk.jpeg";

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
  {top:'12%',left:'18%',delay:'.3s',sym:'✦'},{top:'18%',right:'14%',delay:'.7s',sym:'✧'},
  {top:'72%',left:'10%',delay:'1.1s',sym:'✦'},{top:'78%',right:'12%',delay:'.5s',sym:'✧'},
  {top:'44%',left:'6%',delay:'.9s',sym:'✦'},{top:'44%',right:'6%',delay:'1.3s',sym:'✧'},
];



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
    const t = setTimeout(() => setIntroOpen(false), 4200);
    return () => clearTimeout(t);
  }, []);


  return (
    <>
      <Petals/>

      {/* ══ INTRO ══ */}
      {introOpen && (
        <div className="intro-overlay">
          <div className="intro-curtain-left open"/>
          <div className="intro-curtain-right open"/>
          <div className="intro-center">
            {['intro-ring-1','intro-ring-2','intro-ring-3','intro-ring-4'].map(c => <div key={c} className={`intro-ring ${c}`}/>)}
            {SPARKLE_POS.map((sp, i) => (
              <div key={i} className="intro-sparkle" style={{ ...sp, animationDuration:'2s' }}>{sp.sym}</div>
            ))}
            <div className="intro-top-line"/>
            <div className="intro-top-label">Together with their families</div>
            <div className="intro-bride-name">Vamica Khera</div>
            <div className="intro-amp">&amp;</div>
            <div className="intro-groom-name">Bhavuk Narang</div>
            <div className="intro-date">11 · 07 · 2026 &nbsp;·&nbsp; New Delhi</div>
            <div className="intro-bottom-line" style={{ animationDelay:'1.8s' }}/>
          </div>
        </div>
      )}

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

        <div className="hero-illustration">
          <div className="illus-glow"/>
          {[{t:'8%',l:'4%',d:'3.8s'},{t:'12%',r:'6%',d:'4.2s'},{t:'40%',l:'0',d:'4.6s'},{t:'22%',r:'1%',d:'5s'}].map((sp,i) => (
            <span key={i} className="illus-sparkle" style={{ top:sp.t, left:sp.l, right:sp.r, animationDelay:sp.d }}> ✦</span>
          ))}
          <img src={invite} alt="Vamica & Bhavuk"/>
        </div>

        <div className="hero-text-overlay">
          <p className="pre-tag">Wedding Invitation</p>
          <div className="hero-bride"><span className="shimmer-name">Vamica Khera</span></div>
          <div className="hero-parent">D/O Sh. Rajiv Khera &amp; Smt. Anshu Khera</div>
          <div className="vline"/>
          <span className="hero-amp">&amp;</span>
          <div className="vline"/>
          <div className="hero-groom"><span className="shimmer-name">Bhavuk Narang</span></div>
          <div className="hero-parent hero-parent-b">S/O Sh. Jagdish Narang &amp; Smt. Varsha Narang</div>
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
            <div className="photo-frame"><img src={vamica} alt="Vamica Khera"/></div>
            <div className="photo-name">Vamica</div>
            <div className="photo-role">The Bride</div>
          </div>
          <div className="photo-connector">
            <div className="conn-line"/><div className="conn-amp">&amp;</div><div className="conn-line"/>
          </div>
          <div className="photo-card reveal-right">
            <div className="photo-frame"><img src={bhavuk} alt="Bhavuk Narang"/></div>
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
        <p className="footer-meta" style={{ opacity:.5, fontSize:'11px' }}>We look forward to celebrating this joyous occasion with you.</p>
        <div className="footer-rule">
          <span className="footer-rule-line"/><span className="footer-rule-star">✦</span><span className="footer-rule-line"/>
        </div>
      </footer>
    </>
  );
}
