"use client";

import { useEffect, useRef } from "react";

export function MachineScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateRotation = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const element = ref.current;
        if (!element) return;

        const scroll = window.scrollY;

        // Scroll-linked 3D rotation.
        // About 600px of scrolling = 360 degrees.
        const rotation = -(scroll * 0.6);

        element.style.transform =
          `perspective(1000px) rotateY(${rotation}deg)`;
      });
    };

    updateRotation();

    window.addEventListener("scroll", updateRotation, {
      passive: true,
    });

    window.addEventListener("resize", updateRotation);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateRotation);
      window.removeEventListener("resize", updateRotation);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex min-h-[380px] items-center justify-center lg:min-h-[520px]"
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        willChange: "transform",
      }}
    >
      <div className="absolute inset-4 rounded-full bg-[#B65C20]/12 blur-[70px] opacity-70" />
      <div className="absolute inset-20 rounded-full bg-[#D7D9E0]/5 blur-[45px]" />
      <div className="absolute inset-8 rounded-full bg-[#B65C20]/10 blur-3xl" />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[88%] h-28 rounded-[50%] border border-[#B65C20]/20 bg-[radial-gradient(ellipse_at_center,rgba(182,92,32,0.10)_0%,rgba(8,6,6,0.05)_45%,transparent_72%)]" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[74%] h-16 rounded-[50%] border border-[#D7D9E0]/10" />
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[58%] h-10 rounded-[50%] border border-[#B65C20]/15" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[82%] h-px bg-gradient-to-r from-transparent via-[#B65C20]/35 to-transparent" />

      <img
        src="/images/bariq-machine.png"
        alt="Bariq Electronics repair machine"
        className="relative z-10 h-auto w-full max-w-[620px] object-contain drop-shadow-[0_30px_35px_rgba(0,0,0,0.35)]"
        draggable={false}
      />
    </div>
  );
}