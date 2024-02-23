import Icon from "@/shared/ui/Icon";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress = 0 }: ProgressBarProps) {
  return (
    <div className="min-w-[80px] h-[80px] rounded-full grid place-items-center relative">
      <div className="absolute">
        <Icon name="logo" width={32} height={32} />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="80px"
        height="80px"
        style={{ transform: "rotate(90deg" }}
      >
        <defs>
          <linearGradient id="ProgressBar">
            <stop offset="0%" stopColor="#BBFFE7" />
            <stop offset="70%" stopColor="#86FFCA" />
          </linearGradient>
        </defs>

        <circle
          cx={40}
          cy={40}
          r={36}
          strokeLinecap="round"
          style={{
            fill: "none",
            stroke: "rgba(94, 98, 114, .5)",
            strokeWidth: 8,
          }}
        />
        {progress ? (
          <circle
            cx={40}
            cy={40}
            r={36}
            strokeLinecap="round"
            style={{
              fill: "none",
              stroke: `url(#ProgressBar)`,
              strokeWidth: 8,
              strokeDasharray: 222,
              strokeDashoffset: `calc(222 - ${(progress * 222) / 100})`,
            }}
          />
        ) : null}
      </svg>
    </div>
  );
}
