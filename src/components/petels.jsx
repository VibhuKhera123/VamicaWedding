/* ── Petals ── */
export default function Petals() {
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