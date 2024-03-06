
import { EvaluateOptions, evaluateSync } from "@mdx-js/mdx";
import { MDXComponents, MDXModule } from "mdx/types";
import { useHotkeys } from "react-hotkeys-hook";
import { useMemo, useState } from "react";
import * as runtime from "react/jsx-runtime";
import React from "react";
import {AspectRatio} from "@radix-ui/react-aspect-ratio";
import {useResizeDetector} from "react-resize-detector";


export function Slides({
  mdx,
  components,
}: {
  mdx: MDXModule[];
  components: MDXComponents;
}) {

  const [currentPage, setCurrentPage] = useState(0);
  const pageUp = () => setCurrentPage((page) => (page = Math.max(page - 1, 0)));
  const pageDown = () =>
    setCurrentPage((page) => (page = Math.min(page + 1, mdx.length - 1)));
  useHotkeys("left", pageUp);
  useHotkeys("right", pageDown);


  const { width = 1920, height, ref } = useResizeDetector();

  const styleVariables = {
    "--border": "240 3.7% 15.9%",
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        border: "1px hsl(var(--border)) solid",
        borderRadius: "10px",
        overflow: "hidden",
        ...styleVariables
      }}
    >
      <div
        style={{
          fontSize: `${width * 0.03}`,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
        >
          {mdx[currentPage]?.default({
            components,
          })}
        </div>
        <AspectRatio ratio={16 / 9}/>
      </div>
    </div>
  );
}