import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";
type SpinProps = { spin?: boolean };
const SpinningWheel = ({ spin }: SpinProps) => {
  const wheelRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      startSpin();
    }, 5000);
    return () => clearTimeout(timeout);
  }, [spin]);



  const startSpin = () => {
    if (!isSpinning) {
      const randomRotation = Math.floor(Math.random() * 360) + 720;
      wheelRef.current.start({
        transform: `rotate(${randomRotation}deg)`,

        onRest: () => {
          setIsSpinning(false);
        },
      });
    }
  };

  const wheelStyle = useSpring({
    to: { transform: isSpinning ? "rotate(0deg)" : "rotate(0deg)" },
    config: { tension: 300, friction: 10 },
  });
  return (
    <div className="relative flex">
      <animated.div
        ref={wheelRef}
        style={{
          width: "200px",
          height: "200px",
          background: "conic-gradient(#ff4500, #ffd700, #ff4500)",
          borderRadius: "50%",
          cursor: "pointer",
          ...wheelStyle,
        }}
        role="button"
         {/* // tabIndex={0}     */}
      />
            
     
      <div className="absolute top-½ bottom-½ text-center z-10 w-½ h-½ rounded-full">
        {isSpinning ? (
          <p>Winner Selection in Progress </p>
        ) : (
          <p>Congrats! A lucky winner has been selected </p>
        )}
         
      </div>
       
    </div>
  );
};
export default SpinningWheel;
