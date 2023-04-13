interface ActivityStatsProps {
  maxActivity: number;
}

export default function ActivityStats({ maxActivity }: ActivityStatsProps) {
  const activityStats = [maxActivity, Math.floor(maxActivity / 2), 0];

  return (
    <ul className="flex flex-col gap-2">
      {activityStats.map((stat) => (
        <li key={stat}>
          <b className="font-700 text-xxs text-deactive text-right block">
            {stat}
          </b>
        </li>
      ))}
    </ul>
  );
}
