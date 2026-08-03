import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { clipReveal, viewportOnce } from "@/components/Animations/motion";
import { cn } from "@/lib/utils";
import type { Photo } from "@/lib/images";

interface ImageRevealProps {
  photo: Photo;
  className?: string;
  imgClassName?: string;
  /** Parallax strength in pixels; 0 disables it. */
  parallax?: number;
  priority?: boolean;
  sizes?: string;
}

/** Photograph that reveals through a clip-path mask, with optional parallax. */
export function ImageReveal({
  photo,
  className,
  imgClassName,
  parallax = 0,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      {...(reduced ? {} : { variants: clipReveal })}
      className={cn("relative overflow-hidden bg-linen", className)}
    >
      <motion.img
        src={photo.src}
        alt={photo.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        {...(reduced || !parallax ? {} : { style: { y, scale: 1.12 } })}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </motion.div>
  );
}
