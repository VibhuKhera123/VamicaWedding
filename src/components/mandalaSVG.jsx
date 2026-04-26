export default function MandalaSVG({ size = 500 }) {
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