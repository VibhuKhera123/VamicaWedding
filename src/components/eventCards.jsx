/* ── Event Card ── */

function CalIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>; }
function ClockIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg>; }
function PinIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>; }


export default function EvCard({ num, emoji, name, tag, accent, date, time, venue, venueSub, featured, delay }) {
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