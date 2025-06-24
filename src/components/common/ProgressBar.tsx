import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";

export default function ProgressBar() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="w-full text-center text-themeDarkGray font-bold text-sm">
        <LinearProgress variant="determinate" value={progress} />
      </div>
    </div>
  );
}
