"use client";

import useScrollRestoration from "@/hooks/useScrollRestoration";
import useSmoothAnchorLinks from "@/hooks/useSmoothAnchorLinks";

export default function GlobalBehaviours() {
  useScrollRestoration();
  useSmoothAnchorLinks();

  return null;
}