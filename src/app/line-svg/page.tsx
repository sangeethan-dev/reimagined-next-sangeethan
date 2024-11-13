"use client";
import { useEffect, useRef } from "react";
import styles from "./page.module.css";

export default function LineSvg() {
  const path = useRef<SVGPathElement | null>(null);
  let progress = 0;
  let time = Math.PI / 2;
  let reqId: number | null = null;

  useEffect(() => {
    setPath(progress);
  }, [progress]);

  const setPath = (progress: number) => {
    const { innerWidth } = window;
    const width = innerWidth * 0.7;
    path.current?.setAttributeNS(
      "",
      "d",
      `M0 50 Q${width / 2} ${50 + progress}, ${width} 50`
    );
  };

  const manageMouseEnter = () => {
    if (reqId) {
      window.cancelAnimationFrame(reqId);
    }
  };

  const manageMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const { movementY } = e;
    progress += movementY;
    setPath(progress);
  };

  const manageMouseLeave = () => {
    animateOut();
  };

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    time += 0.2;
    setPath(newProgress);
    progress = lerp(progress, 0, 0.025);
    if (Math.abs(progress) > 0.75) {
      reqId = window.requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className="h-[1px] w-full relative mb-5">
          <div
            onMouseEnter={manageMouseEnter}
            onMouseMove={manageMouseMove}
            onMouseLeave={manageMouseLeave}
            className="relative h-[40px] top-[-20px] hover:h-[150px] hover:top-[-75px] z-10"
          ></div>
          <svg className="w-full h-[100px] top-[-50px]  absolute">
            <path ref={path} className="stroke-white stroke-1"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
