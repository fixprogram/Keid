export default function RoundProgressBar({ progress = 0 }) {
  return (
    <div className="w-[40px] h-[40px] rounded-full bg-background1 grid place-items-center relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="30px"
        height="30px"
        style={{ transform: "rotate(280deg" }}
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="#E42A6C" />
            <stop offset="70%" stopColor="#C393FF" />
          </linearGradient>
        </defs>
        <circle
          cx={15}
          cy={15}
          r={12}
          strokeLinecap="round"
          style={{
            fill: "none",
            stroke: "url(#GradientColor)",
            strokeWidth: 6,
            strokeDasharray: 100,
            strokeDashoffset: `calc(100 - ${progress * 0.75})`, // 25 = 100%
          }}
        />
        <circle cx={15} cy={15} r={4} fill="white" />
      </svg>
    </div>
  );
}
