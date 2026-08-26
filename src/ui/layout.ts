export type LayoutMode = "compact" | "normal" | "wide";

export function getLayoutMode(width: number): LayoutMode {
  if (width < 60) {
    return "compact";
  }

  if (width < 90) {
    return "normal";
  }

  return "wide";
}
