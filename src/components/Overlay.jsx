import React from 'react';
import { motion, useTransform } from 'framer-motion';

const Overlay = ({ scrollYProgress }) => {
    // Center Logo (Visible over empty plate at start)
    // [0 to 0.1]: Fully visible
    // [0.1 to 0.2]: Fades out as the dish starts forming
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
    const y = useTransform(scrollYProgress, [0, 0.2], [-50, -80]);

    return (
        <div className="pointer-events-none absolute inset-0 z-10 w-full h-full overflow-hidden">
            <motion.section
                style={{ opacity: opacity, scale: scale, y: y }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
            >
                <div className="max-w-[70vw] md:max-w-[35vw]">
                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl logo-font mb-2 tracking-tight text-orange-500 drop-shadow-[0_5px_15px_rgba(214,40,40,0.35)] leading-[1.1]"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        Noodle Artistry
                    </motion.h1>
                    <motion.p
                        className="mt-6 text-orange-200 italic tracking-widest"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 300 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        Fresh noodles, made to order
                    </motion.p>
                </div>
            </motion.section>
        </div>
    );
};

export default Overlay;