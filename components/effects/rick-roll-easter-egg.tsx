"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { assetPath } from "@/lib/asset";

const SECRET_CODE = ["s", "s"] as const;
const AUDIO_SRC =
    "https://ia801602.us.archive.org/11/items/Rick_Astley_Never_Gonna_Give_You_Up/Rick_Astley_Never_Gonna_Give_You_Up.mp3";

export function RickRollEasterEgg() {
    const [isVisible, setIsVisible] = useState(false);
    const keySequence = useRef<string[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const close = useCallback(() => {
        setIsVisible(false);
        keySequence.current = [];

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, []);

    const trigger = useCallback(async () => {
        setIsVisible(true);

        window.setTimeout(async () => {
            if (!audioRef.current) return;

            try {
                audioRef.current.currentTime = 0;
                await audioRef.current.play();
            } catch {
                // Autoplay may be blocked by the browser until a user gesture.
            }
        }, 100);
    }, []);

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (isVisible) {
                if (event.key === "Escape") {
                    close();
                }
                return;
            }

            keySequence.current = [
                ...keySequence.current,
                event.key.toLowerCase(),
            ].slice(-SECRET_CODE.length);

            if (
                keySequence.current.length === SECRET_CODE.length &&
                keySequence.current.every(
                    (key, index) => key === SECRET_CODE[index],
                )
            ) {
                void trigger();
            }
        };

        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown);
    }, [close, isVisible, trigger]);

    return (
        <>
            <audio
                ref={audioRef}
                onEnded={close}
                className="hidden"
                preload="none"
            >
                <source src={AUDIO_SRC} type="audio/mpeg" />
            </audio>

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        key="rick-roll"
                        initial={{
                            opacity: 0,
                            y: 120,
                            scale: 0.7,
                            rotate: -5,
                            x: "-50%",
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            rotate: 0,
                            x: "-50%",
                        }}
                        exit={{
                            opacity: 0,
                            y: 120,
                            scale: 0.7,
                            rotate: -5,
                            x: "-50%",
                        }}
                        transition={{
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="fixed left-1/2 bottom-0 z-99999 pointer-events-auto"
                        role="dialog"
                        aria-label="Easter egg"
                    >
                        <button
                            type="button"
                            onClick={close}
                            className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/90 text-foreground shadow-lg backdrop-blur-md transition-colors hover:bg-foreground hover:text-background"
                            aria-label="Close"
                        >
                            ×
                        </button>

                        <div className="relative">
                            <Image
                                src={assetPath("/rickroll.gif")}
                                alt="Rick Roll"
                                width={600}
                                height={400}
                                unoptimized
                                className="block max-w-[min(90vw,600px)] h-auto rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] animate-[rick-glow_3s_ease-in-out_infinite]"
                                priority
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
