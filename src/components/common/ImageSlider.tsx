import React, { useEffect, useRef, useState } from "react";

interface Props {
  arr1: string[];
  arr2: string[];
  speed?: number; // px per second
  imageWidth?: number;
  gap?: number;
  height?: number;
  shadowWidth?: number; // width of vertical band where images flip
}

const ImageSlider: React.FC<Props> = ({
  arr1,
  arr2,
  speed = 100,
  imageWidth = 250,
  gap = 30,
  height = 280,
  shadowWidth = 200, // default band width
}) => {
  if (arr1.length !== arr2.length) {
    throw new Error("arr1 and arr2 must be the same length");
  }

  const [positions, setPositions] = useState<number[]>([]);
  const [showSecond, setShowSecond] = useState<boolean[]>(
    new Array(arr1.length).fill(false)
  );

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // initialize positions
  useEffect(() => {
    const start: number[] = [];
    arr1.forEach((_, i) => {
      start.push(i * (imageWidth + gap));
    });
    setPositions(start);
    setShowSecond(new Array(arr1.length).fill(false));
  }, [arr1, arr2, imageWidth, gap]);

  // animation loop (positions + crossing check)
  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current != null) {
        const delta = (time - lastTimeRef.current) / 1000; // seconds
        setPositions((prev) => {
          const moved = prev.map((x) => x - speed * delta);
          const totalWidth = arr1.length * (imageWidth + gap);
          const newPositions = moved.map((x) =>
            x < -imageWidth ? x + totalWidth : x
          );

          // crossing check here
          const center = window.innerWidth / 2;
          const halfShadow = shadowWidth / 2;
          const bandLeft = center - halfShadow;
          const bandRight = center + halfShadow;

          setShowSecond(
            newPositions.map((x) => {
              const imgCenter = x + imageWidth / 2;
              if (imgCenter >= bandLeft && imgCenter <= bandRight) {
                return true; // inside shadow → show arr2
              }
              if (imgCenter < bandLeft) {
                return true; // passed shadow → keep arr2
              }
              return false; // before shadow → arr1
            })
          );

          return newPositions;
        });
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [arr1.length, imageWidth, gap, speed, shadowWidth]);

  return (
    <div
      className="relative w-full overflow-hidden bg-gray-50"
      style={{ height }}
    >
      {/* shadow band */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          width: shadowWidth,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.25), rgba(0,0,0,0.05), rgba(0,0,0,0.25))",
        }}
      />
      {/* center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-red-500 z-30" />

      {/* images */}
      {positions.map((x, i) => (
        <div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 rounded-xl overflow-hidden shadow-lg transition-opacity"
          style={{
            width: imageWidth,
            height: height * 0.9,
            left: x,
          }}
        >
          <img
            src={arr1[i]}
            alt={`a1-${i}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              showSecond[i] ? "opacity-0" : "opacity-100"
            }`}
          />
          <img
            src={arr2[i]}
            alt={`a2-${i}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              showSecond[i] ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
