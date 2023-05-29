export type ProjectStyleKey = "01" | "02" | "03" | "04" | "05" | "06" | "07";

export type ProjectStyleType = {
  background: string;
  gradient: string;
  progressGradient: {
    firstStopColor: string;
    secondStopColor: string;
  };
  textColor: string;
  progressChangeGradient: (prevProgress: number) => string;
};

export const projectStyles: Record<ProjectStyleKey, ProjectStyleType> = {
  "01": {
    background: "#A06AF9",
    gradient: "linear-gradient(270deg, #C393FF 34.57%, #E42A6C 100%)",
    progressGradient: {
      firstStopColor: "#E42A6C",
      secondStopColor: "#C393FF",
    },
    textColor: "#FFFFFF",
    progressChangeGradient: (prevProgress: number) =>
      `linear-gradient(270deg, #C393FF 0, #E42A6C 33.85%, rgba(228, 42, 108, 0.3) ${prevProgress}%)`,
  },
  "02": {
    background: "#FBA3FF",
    gradient: "linear-gradient(270deg, #FBA3FF 34.57%, #E42A6C 100%)",
    progressGradient: {
      firstStopColor: "#E42A6C",
      secondStopColor: "#FBA3FF",
    },
    textColor: "#FFFFFF",
    progressChangeGradient: (prevProgress: number) =>
      `linear-gradient(270deg, #FBA3FF 0, #E42A6C 33.85%, rgba(228, 42, 108, 0.3) ${prevProgress}%)`,
  },
  "03": {
    background: "#FFDD72",
    gradient: "linear-gradient(270deg, #FFEBA2 0%, #FF8669 100%)",
    progressGradient: {
      firstStopColor: "#FF8669",
      secondStopColor: "#FFEBA2",
    },
    textColor: "#200745",
    progressChangeGradient: (prevProgress: number) =>
      `linear-gradient(270deg, #FFEBA2 0, #FF8669 33.85%, rgba(255, 134, 105, 0.3) ${prevProgress}%)`,
  },
  "04": {
    background: "#8E96FF",
    gradient:
      "linear-gradient(295.87deg, #FFB8E0 -17.8%, #BE9EFF 23.28%, #88C0FC 53.38%, #86FF99 87.82%)",
    progressGradient: {
      firstStopColor: "#86FF99",
      secondStopColor: "#BE9EFF",
    },
    textColor: "#FFFFFF",
    progressChangeGradient: (prevProgress: number) =>
      `linear-gradient(270deg, #BE9EFF 0, #86FF99 33.85%, rgba(134, 255, 153, 0.3) ${prevProgress}%)`,
  },
  "05": {
    background: "#94F0F0",
    gradient: "linear-gradient(180deg, #BBFFE7 0%, #86FFCA 100%)",
    progressGradient: {
      firstStopColor: "#86FFCA",
      secondStopColor: "#BBFFE7",
    },
    textColor: "#200745",
    progressChangeGradient: (prevProgress: number) =>
      `linear-gradient(270deg, #BBFFE7 0, #86FFCA 33.85%, rgba(134, 255, 202, 0.3) ${prevProgress}%)`,
  },
  "06": {
    background: "#A5F59C",
    gradient: "linear-gradient(180deg, #9ADB7F 0%, #6EA95C 100%)",
    progressGradient: {
      firstStopColor: "#6EA95C",
      secondStopColor: "#9ADB7F",
    },
    textColor: "#FFFFFF",
    progressChangeGradient: (prevProgress: number) =>
      `linear-gradient(270deg, #9ADB7F 0, #6EA95C 33.85%, rgba(110, 169, 92, 0.3) ${prevProgress}%)`,
  },
  "07": {
    background: "#FF968E",
    gradient: "#FF968E",
    progressGradient: {
      firstStopColor: "#FF968E",
      secondStopColor: "#FF968E",
    },
    textColor: "#FFFFFF",
    progressChangeGradient: (prevProgress: number) =>
      `linear-gradient(270deg, #FF968E 0, #FF968E 33.85%, rgba(255, 150, 142, 0.3) ${prevProgress}%)`,
  },
};
