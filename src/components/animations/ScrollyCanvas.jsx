
import React, { useEffect, useRef, useState } from 'react';

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';

import Overlay from '../Overlay';

const frameCount = 120;

const ScrollyCanvas = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 0.758, 1],
    [0, frameCount - 1, frameCount - 1]
  );

  const canvasOpacity = useTransform(
    scrollYProgress,
    [0, 0.98, 1],
    [1, 1, 0]
  );

  // Load all 120 animation frames from the public folder
  useEffect(() => {
    let cancelled = false;

    const preloadImages = async () => {
      const loadedImages = await Promise.all(
        Array.from({ length: frameCount }, (_, i) => {
          return new Promise((resolve) => {
            const img = new Image();

            img.onload = () => resolve(img);

            img.onerror = () => {
              console.error('Image failed to load:', img.src);
              resolve(null);
            };

            const filename =
              `frame_${String(i).padStart(3, '0')}_delay-0.066s.png`;

            img.src =
              `${import.meta.env.BASE_URL}food-sequence/${filename}`;
          });
        })
      );

      if (cancelled) return;

      setImages(loadedImages);

      const validImages = loadedImages.filter(Boolean);

      if (validImages.length > 0) {
        setIsLoaded(true);

        if (validImages.length !== frameCount) {
          console.warn(
            `Loaded ${validImages.length} of ${frameCount} frames.`
          );
        }
      } else {
        console.error(
          'No animation frames loaded. Check the folder and filenames.'
        );
      }
    };

    preloadImages();

    return () => {
      cancelled = true;
    };
  }, []);

  // Draw the selected animation frame on the canvas
  const renderFrame = (index) => {
    const canvas = canvasRef.current;

    if (!canvas || images.length === 0) return;

    const safeIndex = Math.max(
      0,
      Math.min(frameCount - 1, index)
    );

    const img = images[safeIndex];

    if (!img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = Math.round(canvasWidth * pixelRatio);
    canvas.height = Math.round(canvasHeight * pixelRatio);

    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth;
    let drawHeight;
    let offsetX = 0;
    let offsetY = 0;

    // Cover the full screen while preserving the image ratio
    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }
    ctx.drawImage(
      img,
      offsetX,
      offsetY,
      drawWidth,
      drawHeight
    );
  };

  // Update the animation while scrolling
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    requestAnimationFrame(() => {
      renderFrame(Math.floor(latest));
    });
  });

  // Render the first frame after loading
  useEffect(() => {
    if (isLoaded) {
      renderFrame(0);
    }
  }, [isLoaded, images]);

  // Redraw the current frame when the window resizes
  useEffect(() => {
    const handleResize = () => {
      renderFrame(Math.floor(frameIndex.get()));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [images, isLoaded]);

  return (
    <div
      ref={containerRef}
      className="relative h-[660vh] w-full"
    >
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
        <motion.canvas
          ref={canvasRef}
          style={{ opacity: canvasOpacity }}
          className="w-full h-full"
        />

        <Overlay scrollYProgress={scrollYProgress} />

        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-50 transition-opacity duration-1000">
            <div className="text-orange-500 text-3xl logo-font mb-4">
              Noodle Artistry
            </div>

            <div className="text-gray-400 text-sm tracking-widest uppercase animate-pulse">
              Getting your menu ready...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollyCanvas;
