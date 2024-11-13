import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface CardProps {
  color?: string;
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({
  color,
  i,
  progress,
  range,
  targetScale,
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  return (
    <div className="h-screen flex flex-col justify-center items-center p-4 sticky top-0">
      <motion.div
        style={{
          scale,
          backgroundColor: color,
          top: `calc(-10% + ${i * 25}px)`,
        }}
        className="h-[500px] w-[1000px] relative top-[-10%] rounded-3xl"
      ></motion.div>
    </div>
  );
};

export default Card;
